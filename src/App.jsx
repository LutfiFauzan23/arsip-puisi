import { useEffect, useState } from "react";
import { Search, Plus, Trash2, BookOpen } from "lucide-react";

const books = [
  {
    title: "Senja yang Pulang",
    author: "Muhammad Lutfi",
    year: "2026",
    color: "bg-[#7A2E2E]",
  },
  {
    title: "Kota dan Kata",
    author: "Muhammad Lutfi",
    year: "2026",
    color: "bg-[#243B53]",
  },
  {
    title: "Rumah Bagi Kata",
    author: "Muhammad Lutfi",
    year: "2026",
    color: "bg-[#6B4F2A]",
  },
  {
    title: "Hujan di Kepala",
    author: "Muhammad Lutfi",
    year: "2026",
    color: "bg-[#2F4F3E]",
  },
];

export default function App() {
  return (
    <main className="min-h-screen bg-[#eadcc3] px-6 py-8 text-[#24160f]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between border-b border-[#24160f]/30 pb-4">
        <h1 className="text-xl font-bold tracking-[0.2em]">Lorem ipsum</h1>
        <p className="text-sm">Lorem ipsum dolor sit amet</p>
      </nav>

      <section className="mx-auto max-w-6xl py-12">
        <h2 className="max-w-2xl text-5xl font-black leading-tight md:text-7xl">
          Lorem ipsum dolor sit amet
        </h2>

        <p className="mt-5 max-w-xl text-lg leading-8 text-[#24160f]/70">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        </p>
      </section>

      <section className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((book, index) => (
            <article key={index} className="group">
              <div
                className={`${book.color} relative aspect-[3/4] border-[10px] border-[#f6eddc] p-6 text-[#f6eddc] shadow-[12px_12px_0_#24160f] transition group-hover:-translate-y-2`}
              >
                <div className="flex h-full flex-col justify-between border border-[#f6eddc]/60 p-5">
                  <div>
                    <p className="text-xs tracking-[0.3em]">PUISI</p>
                    <h3 className="mt-8 text-3xl font-black leading-tight">
                      {book.title}
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm">{book.author}</p>
                    <p className="mt-1 text-xs tracking-[0.25em]">
                      {book.year}
                    </p>
                  </div>
                </div>

                <div className="absolute left-0 top-0 h-full w-3 bg-black/20" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="mx-auto mt-16 max-w-6xl border-t border-[#24160f]/30 py-5 text-sm">
        © 2026 — Lorem ipsum dolor sit amet
      </footer>
    </main>
  );
}