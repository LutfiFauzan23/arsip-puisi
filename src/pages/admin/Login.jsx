import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(e) {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin/dashboard");
    } catch (error) {
      alert("Login gagal: " + error.message);
    }
  }

  return (
    <main className="min-h-screen bg-[#eadcc3] px-6 py-10 text-[#24160f]">
      <form
        onSubmit={login}
        className="mx-auto max-w-md border border-[#24160f]/30 bg-[#f6eddc] p-8"
      >
        <h1 className="text-3xl font-bold">Admin Login</h1>

        <input
          className="mt-8 w-full border border-[#24160f]/30 bg-transparent px-4 py-3"
          placeholder="Email admin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mt-4 w-full border border-[#24160f]/30 bg-transparent px-4 py-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="mt-6 w-full bg-[#24160f] px-4 py-3 font-bold text-[#f6eddc]">
          Masuk
        </button>
      </form>
    </main>
  );
}