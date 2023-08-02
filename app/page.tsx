"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
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
    <div className="flex">
      <div className="flex-1 bg-gradient-to-r from-blue-700 to-purple-700 h-screen flex justify-center items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">Memory Game</h1>
          <p>by Eduardo Pech</p>
        </div>
      </div>
      <div className="flex-1 h-screen bg-white flex justify-center items-center">
        <div className="flex flex-col">
          <label className="text-black font-bold text-lg mb-3">
            ¿Cuál es tu nombre?
          </label>
          <input
            type="text"
            placeholder="Eduardo Pech"
            className="input input-primary w-full mb-3 bg-white placeholder-gray text-black"
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
      </div>
    </div>
  );
}
