import React from "react";
import Image from "next/image";
import Link from "next/link";

const Pokemon = (props) => {
  const pokeID = props.index + 1;
  const hashID = "#" + ("000" + pokeID).slice(-3);
  return (
    <Link href={`/pokemon/${props.monster.name}`}>
      <a>
        <div className="grid grid-cols-1 justify-items-center p-4 relative">
          <Image
            width={150}
            height={150}
            layout="fixed"
            src={`http://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeID}.png`}
            className=" bg-slate-200 rounded-t shadow-md"
          />
          <span className="absolute h-5 w-10 rounded-full bg-sky-500 top-2.5 right-0  text-xs font-semibold flex items-center justify-center">
            {hashID}
          </span>
          <span className=" bg-slate-300 shadow-md text-black text-transform: capitalize w-[150px] text-xs font-semibold rounded-b h-7 flex items-center justify-center">
            {props.monster.name}
          </span>
        </div>
      </a>
    </Link>
  );
};

export default Pokemon;
