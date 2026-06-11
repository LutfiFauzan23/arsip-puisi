import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut } from "firebase/auth";
import { auth, db, storage } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

function makeSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    year: "",
    category: "",
    content: "",
  });

  const [cover, setCover] = useState(null);
  const [loading, setLoading] = useState(false);

  async function publishPoem(e) {
    e.preventDefault();

    if (!form.title || !form.author || !form.content || !cover) {
      alert("Judul, penulis, isi puisi, dan cover wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      const slug = makeSlug(form.title);
      const coverRef = ref(storage, `covers/${slug}-${Date.now()}`);
      await uploadBytes(coverRef, cover);

      const coverUrl = await getDownloadURL(coverRef);

      await addDoc(collection(db, "poems"), {
        title: form.title,
        slug,
        author: form.author,
        year: form.year || new Date().getFullYear().toString(),
        category: form.category || "Tanpa Kategori",
        content: form.content,
        coverUrl,
        createdAt: serverTimestamp(),
      });

      alert("Puisi berhasil dipublish!");

      setForm({
        title: "",
        author: "",
        year: "",
        category: "",
        content: "",
      });
      setCover(null);
    } catch (error) {
      alert("Gagal publish: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await signOut(auth);
    navigate("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#eadcc3] px-6 py-8 text-[#24160f]">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-8 flex items-center justify-between border-b border-[#24160f]/30 pb-4">
          <h1 className="text-2xl font-bold">Dashboard Admin</h1>
          <button onClick={logout} className="underline">
            Logout
          </button>
        </nav>

        <form
          onSubmit={publishPoem}
          className="border border-[#24160f]/30 bg-[#f6eddc] p-6"
        >
          <input
            className="mb-4 w-full border border-[#24160f]/30 bg-transparent px-4 py-3"
            placeholder="Judul puisi"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            className="mb-4 w-full border border-[#24160f]/30 bg-transparent px-4 py-3"
            placeholder="Nama penulis"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <input
              className="border border-[#24160f]/30 bg-transparent px-4 py-3"
              placeholder="Tahun"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            />

            <input
              className="border border-[#24160f]/30 bg-transparent px-4 py-3"
              placeholder="Kategori"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>

          <textarea
            className="mt-4 min-h-64 w-full border border-[#24160f]/30 bg-transparent px-4 py-3"
            placeholder="Isi puisi"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />

          <input
            className="mt-4 block w-full"
            type="file"
            accept="image/*"
            onChange={(e) => setCover(e.target.files[0])}
          />

          <button
            disabled={loading}
            className="mt-6 bg-[#24160f] px-6 py-3 font-bold text-[#f6eddc] disabled:opacity-60"
          >
            {loading ? "Mengupload..." : "Publish Puisi"}
          </button>
        </form>
      </div>
    </main>
  );
}