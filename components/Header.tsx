"use client";

import Image from "next/image";

export function Header() {
  return (
    <header className="bg-red-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <Image
              src="/pokeball.png"
              alt="Pokeball"
              fill
              className="object-contain"
              sizes="40px"
            />
          </div>
          <h1 className="text-2xl font-bold">Pokemon Explorer</h1>
        </div>
        <div className="text-sm">
          Powered by{" "}
          <a
            href="https://pokeapi.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            PokeAPI
          </a>
        </div>
      </div>
    </header>
  );
}
