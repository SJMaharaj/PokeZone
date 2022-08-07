import React from "react";
import Image from "next/image";

const Pokemon = ({ pokemon, pokemonSpecies }) => {
  const hashID = "#" + ("000" + pokemon.id).slice(-3);

  const getBio = () => {
    const flavorText = pokemonSpecies.flavor_text_entries.filter((item) => {
      return item.language.name === "en";
    });

    const bio = flavorText[0].flavor_text.replace(//g, " ");

    return bio;
  };

  return (
    <div className="flex justify-center my-8">
      <div className="flex flex-col w-10/12 bg-white rounded-lg shadow-lg justify-items-center p-4 md:p-4">
        <div className="md:flex">
          <div className="md:w-4/12 p-4 md:p-4 justify-center flex">
            <Image
              width={200}
              height={200}
              layout="fixed"
              src={`http://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            />
          </div>
          <div className="w-8/12 p-4 md:p-4">
            <h1 className="text-2xl font-bold text-black capitalize">
              {pokemon.name}
            </h1>
            <p className="text-sm text-black">{hashID}</p>
            <div className="flex justify-between mt-3 item-center">
              <h1 className="text-lg font-bold text-black md:text-xl">Bio</h1>
            </div>
            <div className="flex justify-between mt-3 item-center">
              <h2 className="text-sm font-bold text-black">{getBio()}</h2>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-4/12 p-4 md:p-4">
            <h1 className="text-xl font-bold text-black flex justify-center">
              Typing
            </h1>
            <div className="flex justify-around mt-3">
              {pokemon.types.map((item) => {
                return (
                  <h2 className="text-sm font-bold text-black">
                    {item.type.name}
                  </h2>
                );
              })}
            </div>
          </div>

          <div className="w-8/12 p-4 md:p-4">
            <h1 className="text-2xl font-bold text-black">Stats</h1>
            <p className="mt-2 text-sm text-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit In odit
            </p>
            <div className="flex justify-between mt-3 item-center">
              <h1 className="text-lg font-bold text-black md:text-xl">Lorem</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;

export const getServerSideProps = async (context) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${context.query.name}`
  );
  const pokemon = await response.json();

  const responseSpecies = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`
  );
  const pokemonSpecies = await responseSpecies.json();

  if (!pokemon || !pokemonSpecies) {
    return {
      notFound: true,
    };
  }

  return {
    props: { pokemon, pokemonSpecies },
  };
};
