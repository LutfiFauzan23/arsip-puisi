import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Home() {
  const [poems, setPoems] = useState([]);

  useEffect(() => {
    async function fetchPoems() {
      const q = query(collection(db, "poems"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      setPoems(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    }

    fetchPoems();
  }, []);

  return (
    <main className="min-h-screen bg-[#eadcc3] px-6 py-8 text-[#24160f]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between border-b border-[#24160f]/30 pb-4">
        <h1 className="text-xl font-bold tracking-[0.2em]">ARSIP PUISI</h1>
        <p className="text-sm">Kumpulan Karya Pribadi</p>
      </nav>

      <section className="mx-auto max-w-6xl py-12">
        <p className="text-sm uppercase tracking-[0.3em] text-[#7A2E2E]">
          Arsip Sastra
        </p>

        <h2 className="mt-3 text-3xl font-bold md:text-4xl">
          Kumpulan Puisi dan Catatan
        </h2>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-[#24160f]/70">
          Tempat menyimpan karya-karya yang telah ditulis, disusun seperti rak
          buku pribadi agar lebih nyaman dibaca dan diarsipkan.
        </p>
      </section>

      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between border-b border-[#24160f]/20 pb-3">
          <div>
            <h3 className="font-semibold">Koleksi Buku</h3>
            <p className="text-sm text-[#24160f]/60">
              {poems.length} karya tersimpan
            </p>
          </div>

          <p className="text-xs uppercase tracking-[0.25em] text-[#24160f]/50">
            Archive Index
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {poems.map((book) => (
            <Link to={`/puisi/${book.slug}`} key={book.id} className="group">
              <div className="relative aspect-[2/3] overflow-hidden border-[8px] border-[#f6eddc] bg-[#24160f] shadow-[12px_12px_0_#24160f] transition group-hover:-translate-y-2">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute left-0 top-0 h-full w-4 bg-black/30" />
              </div>

              <h3 className="mt-5 text-xl font-bold">{book.title}</h3>
              <p className="text-sm text-[#24160f]/60">
                {book.category} · {book.year}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}