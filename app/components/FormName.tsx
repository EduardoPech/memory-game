"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FormName() {
  const router = useRouter();
  const [name, setName] = useState("");

  const startGame = () => {
    localStorage.setItem("name", name);

    router.push("/game");
  };

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setName(name);
    }
  }, []);

  return (
    <div className="flex flex-col w-full md:w-80">
      <label className="text-black font-bold text-lg mb-3">
        ¿Cuál es tu nombre?
      </label>
      <input
        type="text"
        placeholder="Eduardo Pech"
        className="input input-primary mb-3 bg-white placeholder-gray text-black"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="btn btn-primary"
        disabled={name.length === 0}
        onClick={startGame}
      >
        Iniciar juego
      </button>
    </div>
  );
}
