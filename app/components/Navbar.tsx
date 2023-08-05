"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [name, setName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setName(name);
    }
  }, []);

  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <h1 className="text-xl">Memory Game</h1>
      </div>
      <div className="navbar-end px-5 md:px-10">
        <span>
          <strong>{name}</strong>
        </span>
      </div>
    </div>
  );
}
