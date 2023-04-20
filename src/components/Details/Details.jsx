import { useState, useEffect } from "react";
import "./Details.scss";

const allTypes = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
};

const Details = ({ name, isLightMode }) => {
    const [pokemon, setPokemon] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPokemon = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${name}`
                );
                const data = await response.json();

                const dreamWorldImage =
                    data.sprites.other.dream_world.front_default != null
                        ? data.sprites.other.dream_world.front_default
                        : data.sprites.other.home.front_default != null
                        ? data.sprites.other.home.front_default
                        : data.sprites.front_default != null
                        ? data.sprites.front_default
                        : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"; // use a default image if none is available

                setPokemon({
                    key: data.name,
                    id: `#${data.id.toString().padStart(3, "0")}`,
                    name: data.name,
                    image: dreamWorldImage,
                    hp: data.stats[0].base_stat,
                    attack: data.stats[1].base_stat,
                    defense: data.stats[2].base_stat,
                    specialattack: data.stats[3].base_stat,
                    specialdefense: data.stats[4].base_stat,
                    speed: data.stats[5].base_stat,
                    abilities: data.abilities
                        .map((ability) => ability.ability.name)
                        .join(", "),
                    types: data.types.map((type, index) => (
                        <p
                            key={index}
                            className="types"
                            style={{
                                backgroundColor: allTypes[type.type.name],
                            }}
                        >
                            {type.type.name}
                        </p>
                    )),
                    firsttype: data.types[0].type.name,
                });
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };

        fetchPokemon();
    }, [name]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!pokemon) {
        return null;
    }

    return (
        <section
            id="details"
            className={
                isLightMode
                    ? `detailsPage detailsPage--${pokemon.firsttype}`
                    : `detailsPage detailsPage--${pokemon.firsttype} darkTheme`
            }
        >
            <article className="imgContainer">
                <img src={pokemon.image} alt={pokemon.name} />
                <div id="allTypes">{pokemon.types}</div>
            </article>
            <article className="info">
                <h1>
                    {pokemon.id} {pokemon.name}
                </h1>
                <div>
                    <span>
                        <h2>hp:</h2>
                        <p>{pokemon.hp}</p>
                    </span>
                    <span>
                        <h2>attack:</h2>
                        <p>{pokemon.attack}</p>
                    </span>
                    <span>
                        <h2>defense:</h2>
                        <p>{pokemon.defense}</p>
                    </span>
                    <span>
                        <h2>special-attack:</h2>
                        <p>{pokemon.specialattack}</p>
                    </span>
                    <span>
                        <h2>special-defense:</h2>
                        <p>{pokemon.specialdefense}</p>
                    </span>
                    <span>
                        <h2>speed:</h2>
                        <p>{pokemon.speed}</p>
                    </span>
                </div>
                <h2 className="abilities">Abilities:</h2>
                <p>{pokemon.abilities}</p>
            </article>
        </section>
    );
};

export default Details;
