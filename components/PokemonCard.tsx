"use client";

import { Pokemon } from "@/types/pokemon";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { capitalizeFirstLetter } from "@/lib/utils";
import { TypeBadge } from "@/components/TypeBadge";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  // Get the primary type for background color
  const primaryType = pokemon.types[0]?.type.name || "normal";

  // Map of type to background color
  const typeBackgrounds: Record<string, string> = {
    normal: "bg-gray-400",
    fighting: "bg-red-700",
    flying: "bg-blue-300",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    rock: "bg-yellow-800",
    bug: "bg-green-500",
    ghost: "bg-purple-700",
    steel: "bg-gray-500",
    fire: "bg-orange-500",
    water: "bg-blue-500",
    grass: "bg-green-600",
    electric: "bg-yellow-400",
    psychic: "bg-pink-500",
    ice: "bg-blue-200",
    dragon: "bg-purple-600",
    dark: "bg-gray-800",
    fairy: "bg-pink-300",
    unknown: "bg-gray-300",
    shadow: "bg-gray-700",
  };

  // Get stats with fallbacks
  const hp =
    pokemon.stats.find(
      (stat: { stat: { name: string } }) => stat.stat.name === "hp"
    )?.base_stat ?? 0;
  const attack =
    pokemon.stats?.find(
      (stat: { stat: { name: string } }) => stat.stat.name === "attack"
    )?.base_stat || 0;
  const defense =
    pokemon.stats?.find(
      (stat: { stat: { name: string } }) => stat.stat.name === "defense"
    )?.base_stat || 0;
  const speed =
    pokemon.stats?.find(
      (stat: { stat: { name: string } }) => stat.stat.name === "speed"
    )?.base_stat || 0;

  return (
    <Card className="overflow-hidden py-0 transition-all hover:shadow-lg border-0">
      <div
        className={`${typeBackgrounds[primaryType]} relative h-36`}
        style={{
          borderTopLeftRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
          borderBottomLeftRadius: "50% 40%",
          borderBottomRightRadius: "50% 40%",
        }}
      >
        <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-sm font-semibold shadow-sm">
          HP {hp}
        </div>
      </div>

      <div className="relative -mt-24 flex justify-center">
        <div className="relative w-32 h-32">
          <Image
            src={
              pokemon.sprites.other["official-artwork"].front_default ||
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      <CardHeader className="text-center pt-2 pb-0">
        <h3 className="text-xl font-bold">
          {capitalizeFirstLetter(pokemon.name)}
        </h3>
      </CardHeader>

      <CardContent className="flex justify-center pt-2">
        <div className="flex gap-2">
          {pokemon.types.map((type) => (
            <TypeBadge key={type.type.name} type={type.type.name} />
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between px-6 pb-4">
        <div className="text-center">
          <p className="text-xl font-bold">{attack}</p>
          <p className="text-xs text-gray-500">Attack</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{defense}</p>
          <p className="text-xs text-gray-500">Defense</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{speed}</p>
          <p className="text-xs text-gray-500">Speed</p>
        </div>
      </CardFooter>
    </Card>
  );
}
