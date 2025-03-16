"use client";

import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter } from "@/lib/utils";

interface TypeBadgeProps {
  type: string;
}

const typeColors: Record<string, string> = {
  normal: "bg-gray-400 hover:bg-gray-500",
  fighting: "bg-red-700 hover:bg-red-800 text-white",
  flying: "bg-blue-300 hover:bg-blue-400",
  poison: "bg-purple-500 hover:bg-purple-600 text-white",
  ground: "bg-yellow-600 hover:bg-yellow-700 text-white",
  rock: "bg-yellow-800 hover:bg-yellow-900 text-white",
  bug: "bg-green-500 hover:bg-green-600",
  ghost: "bg-purple-700 hover:bg-purple-800 text-white",
  steel: "bg-gray-500 hover:bg-gray-600 text-white",
  fire: "bg-orange-500 hover:bg-orange-600 text-white",
  water: "bg-blue-500 hover:bg-blue-600 text-white",
  grass: "bg-green-600 hover:bg-green-700 text-white",
  electric: "bg-yellow-400 hover:bg-yellow-500",
  psychic: "bg-pink-500 hover:bg-pink-600 text-white",
  ice: "bg-blue-200 hover:bg-blue-300",
  dragon: "bg-purple-600 hover:bg-purple-700 text-white",
  dark: "bg-gray-800 hover:bg-gray-900 text-white",
  fairy: "bg-pink-300 hover:bg-pink-400",
  unknown: "bg-gray-300 hover:bg-gray-400",
  shadow: "bg-gray-700 hover:bg-gray-800 text-white",
};

export function TypeBadge({ type }: TypeBadgeProps) {
  return (
    <Badge className={`${typeColors[type] || "bg-gray-500"}`}>
      {capitalizeFirstLetter(type)}
    </Badge>
  );
}
