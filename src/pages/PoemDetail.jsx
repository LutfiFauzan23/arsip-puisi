import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function PoemDetail() {
  const { slug } = useParams();
  const [poem, setPoem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPoem() {
      const q = query(collection(db, "poems"), where("slug", "==", slug));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        setPoem({
          id: snapshot.docs[0].id,
          ...snapshot.docs[0].data(),
        });
      }

      setLoading(false);
    }

    fetchPoem();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#eadcc3] p-8 text-[#24160f]">
        Memuat puisi...
      </main>
    );
  }

  if (!poem) {
    return (
      <main className="min-h-screen bg-[#eadcc3] p-8 text-[#24160f]">
        <p>Puisi tidak ditemukan.</p>
        <Link to="/" className="underline">
          Kembali
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#eadcc3] px-6 py-8 text-[#24160f]">
      <div className="mx-auto max-w-6xl">
        <Link to="/" className="text-sm underline">
          ← Kembali ke rak puisi
        </Link>

        <section className="mt-10 grid gap-10 md:grid-cols-[360px_1fr]">
          <div>
            <div className="relative aspect-[2/3] overflow-hidden border-[10px] border-[#f6eddc] shadow-[14px_14px_0_#24160f]">
              <img
                src={poem.coverUrl}
                alt={poem.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute left-0 top-0 h-full w-5 bg-black/30" />
            </div>
          </div>

          <article className="border-l border-[#24160f]/30 pl-0 md:pl-10">
            <p className="text-sm uppercase tracking-[0.3em] text-[#7A2E2E]">
              {poem.category} · {poem.year}
            </p>

            <h1 className="mt-4 text-5xl font-black leading-tight md:text-7xl">
              {poem.title}
            </h1>

            <p className="mt-3 text-[#24160f]/60">{poem.author}</p>

            <div className="mt-10 whitespace-pre-line text-2xl leading-[2]">
              {poem.content}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}