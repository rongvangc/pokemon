import { Pokemon, PokemonListResponse } from '@/types/pokemon';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonList(limit: number = 20, offset: number = 0): Promise<PokemonListResponse> {
  const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon list');
  }
  
  return response.json();
}

export async function getPokemonByName(name: string): Promise<Pokemon> {
  const response = await fetch(`${API_BASE_URL}/pokemon/${name}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon: ${name}`);
  }
  
  return response.json();
}

export async function getPokemonByType(type: string): Promise<Pokemon[]> {
  const response = await fetch(`${API_BASE_URL}/type/${type}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon by type: ${type}`);
  }
  
  const data = await response.json();
  
  // Extract Pokemon from the type data
  const pokemonPromises = data.pokemon.map((p: { pokemon: { name: string; url: string } }) => 
    getPokemonByName(p.pokemon.name)
  );
  
  return Promise.all(pokemonPromises);
}

export async function getAllPokemonTypes(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/type`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon types');
  }
  
  const data = await response.json();
  return data.results.map((type: { name: string }) => type.name);
}