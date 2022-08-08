import { useState } from "react";
import Pokemon from "../components/Pokemon";

export default function Home({ initialPokemon }) {
  const [pokemon, setPokemon] = useState(initialPokemon);
  const [range, setRange] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPokemon = async (url, next) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const nextPokemon = await response.json();
      setPokemon(nextPokemon);
      setRange((prev) => {
        return next ? prev + 12 : prev - 12;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center w-8/12">
          {pokemon.results.map((monster, index) => {
            return (
              <Pokemon
                key={index + range}
                monster={monster}
                index={index + range}
              />
            );
          })}
        </div>
      </div>
      <div className="flex justify-center gap-8 py-2">
        <button
          onClick={() => fetchPokemon(pokemon.previous, false)}
          disabled={!pokemon.previous || isLoading}
          className="px-4 py-1 font-medium text-white bg-sky-500 rounded-md hover:bg-sky-400 disabled:bg-gray-500"
        >
          Prev
        </button>
        <button
          onClick={() => fetchPokemon(pokemon.next, true)}
          disabled={!pokemon.next || isLoading}
          className="px-4 py-1 font-medium text-white bg-sky-500 rounded-md hover:bg-sky-400 disabled:bg-gray-500"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export const getStaticProps = async (context) => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=12");
  const initialPokemon = await response.json();

  if (!initialPokemon) {
    return {
      notFound: true,
    };
  }

  return {
    props: { initialPokemon },
  };
};
