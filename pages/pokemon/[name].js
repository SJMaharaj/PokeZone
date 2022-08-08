import React from "react";
import Image from "next/image";

const Pokemon = ({ pokemon, pokemonSpecies }) => {
  let statTotal = 0;
  const hashID = "#" + ("000" + pokemon.id).slice(-3);

  const getBio = () => {
    const flavorText = pokemonSpecies.flavor_text_entries.filter((item) => {
      return item.language.name === "en";
    });

    const bio = flavorText[0].flavor_text.replace(//g, " ");

    return bio;
  };

  const getType = () => {
    return pokemon.types.map((item, index) => {
      let type = item.type.name;
      return (
        <h2
          key={index}
          className={`text-sm font-bold text-white rounded py-1 px-4 ${type}`}
        >
          {type}
        </h2>
      );
    });
  };

  const getStats = () => {
    return pokemon.stats.map((item, index) => {
      let width = Math.round((item.base_stat / 255) * 100);
      statTotal += item.base_stat;
      let style = {
        width: `${width}%`,
      };

      let tier = "";
      if (item.base_stat < 50) {
        tier = "tier1";
      } else if (item.base_stat < 100) {
        tier = "tier2";
      } else if (item.base_stat < 150) {
        tier = "tier3";
      } else if (item.base_stat < 200) {
        tier = "tier4";
      } else {
        tier = "tier5";
      }

      return (
        <div key={index} className="grid grid-cols-4">
          <div className="bg-slate-300 rounded my-1 w-11/12">
            <h3 className="text-black text-xs p-1 font-bold">
              {item.stat.name}
            </h3>
          </div>
          <div className={`rounded my-1 col-span-3 ${tier}`} style={style}>
            <h3 className="text-white font-bold text-xs p-1">
              {item.base_stat}
            </h3>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex justify-center my-8">
      <div className="flex flex-col w-9/12 bg-slate-200 rounded-lg shadow-lg justify-items-center p-4 md:p-4">
        <div className="md:flex">
          <div className="md:w-4/12 p-4 md:p-4 justify-center flex">
            <Image
              width={200}
              height={200}
              layout="fixed"
              src={`http://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            />
          </div>
          <div className="md:w-8/12 p-4 md:p-4">
            <h1 className="text-3xl font-bold text-black capitalize">
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
        <div className="md:flex">
          <div className="md:w-4/12 p-4 md:p-4">
            <div className="flex justify-around mt-3">{getType()}</div>
          </div>

          <div className="md:w-8/12 p-4 md:p-4">
            <h1 className="text-xl font-bold text-black">Stats</h1>
            <div className="my-2">{getStats()}</div>
            <div className="grid grid-cols-4">
              <div className="bg-slate-300 rounded my-1 w-11/12">
                <h3 className="text-black text-xs p-1 capitalize font-bold">
                  Total
                </h3>
              </div>
              <div className="rounded my-1 col-span-3">
                <h3 className="text-black text-xs p-1 font-bold">
                  {statTotal}
                </h3>
              </div>
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
