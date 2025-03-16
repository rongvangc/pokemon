"use client";

import { useState, useEffect } from "react";
import { Pokemon, PokemonTypeOption } from "@/types/pokemon";
import { PokemonGrid } from "@/components/PokemonGrid";
import { PaginationControls } from "@/components/PaginationControls";
import {
  getAllPokemonTypes,
  getPokemonByName,
  getPokemonByType,
  getPokemonList,
} from "@/services/pokemonService";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Header } from "@/components/Header";
import { TypeFilter } from "@/components/TypeFilter";

const ITEMS_PER_PAGE = 20;

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [types, setTypes] = useState<PokemonTypeOption[]>([]);

  // Fetch Pokemon types
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const typeNames = await getAllPokemonTypes();
        setTypes(
          typeNames.map((type) => ({
            value: type,
            label: type,
          }))
        );
      } catch (err) {
        setError("Failed to load Pokemon types");
        console.error(err);
      }
    };

    fetchTypes();
  }, []);

  // Fetch Pokemon data
  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      setError(null);

      try {
        if (selectedType === "all") {
          // Fetch all Pokemon with pagination
          const offset = (currentPage - 1) * ITEMS_PER_PAGE;
          const data = await getPokemonList(ITEMS_PER_PAGE, offset);

          setTotalCount(data.count);
          setTotalPages(Math.ceil(data.count / ITEMS_PER_PAGE));

          // Fetch details for each Pokemon
          const pokemonDetails = await Promise.all(
            data.results.map((pokemon) => getPokemonByName(pokemon.name))
          );

          setPokemons(pokemonDetails);
        } else {
          // Fetch Pokemon by type
          const pokemonByType = await getPokemonByType(selectedType);

          // Apply pagination to filtered results
          const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
          const endIndex = startIndex + ITEMS_PER_PAGE;

          setTotalCount(pokemonByType.length);
          setTotalPages(Math.ceil(pokemonByType.length / ITEMS_PER_PAGE));

          setPokemons(pokemonByType.slice(startIndex, endIndex));
        }
      } catch (err) {
        setError("Failed to load Pokemon data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [currentPage, selectedType]);

  // Handle type change
  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1); // Reset to first page when changing type
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
            <TypeFilter
              types={types}
              selectedType={selectedType}
              onTypeChange={handleTypeChange}
            />

            <p className="text-sm text-gray-500">Total count: {totalCount}</p>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center text-red-500 p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="font-semibold">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : pokemons.length === 0 ? (
          <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
            No Pokemon found
          </div>
        ) : (
          <>
            <PokemonGrid pokemons={pokemons} />

            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </>
  );
}
