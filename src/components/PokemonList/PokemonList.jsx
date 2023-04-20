import { useState, useEffect } from "react";
import "./PokemonList.scss";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

const PokemonList = ({
    selectedTypes,
    searchTerm,
    setSelectedPokemonName,
    isLightMode,
}) => {
    const [pokemonData, setPokemonData] = useState([]);
    const [filteredPokemonData, setFilteredPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPokemon = async (limit, offset) => {
        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
            );
            const data = await response.json();
            const formattedData = data.results.map(async (result) => {
                const pokemonResponse = await fetch(result.url);
                const pokemonData = await pokemonResponse.json();
                const dreamWorldImage =
                    pokemonData.sprites.other.dream_world.front_default != null
                        ? pokemonData.sprites.other.dream_world.front_default
                        : pokemonData.sprites.other.home.front_default != null
                        ? pokemonData.sprites.other.home.front_default
                        : pokemonData.sprites.front_default != null
                        ? pokemonData.sprites.front_default
                        : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"; // use a default image if none is available
                return {
                    id: `#${pokemonData.id.toString().padStart(3, "0")}`,
                    name: pokemonData.name,
                    image: dreamWorldImage,
                    types: pokemonData.types
                        .map((type) => type.type.name)
                        .join(", "),
                    firsttype: pokemonData.types[0].type.name,
                };
            });

            const formattedPokemonData = await Promise.all(formattedData);

            return formattedPokemonData;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            const offset = pokemonData.length;
            const newPokemonData = await fetchPokemon(20, offset);
            setPokemonData((prevData) => [...prevData, ...newPokemonData]);
            setLoading(false);
        }, 100);

        return () => clearInterval(interval);
    }, [pokemonData]);

    useEffect(() => {
        const filteredData = pokemonData
            .filter((pokemon) => {
                if (selectedTypes.length === 0) {
                    return true;
                } else {
                    return pokemon.types
                        .split(", ")
                        .some((type) => selectedTypes.includes(type));
                }
            })
            .filter((pokemon) => {
                return pokemon.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            });

        setFilteredPokemonData(filteredData);
    }, [selectedTypes, searchTerm, pokemonData]);

    return (
        <section id="pokemonList" className={isLightMode ? "" : "darkTheme"}>
            {loading ? (
                <p>Loading...</p>
            ) : filteredPokemonData.length === 0 ? (
                <p id="error">No Pokemon found!</p>
            ) : (
                filteredPokemonData.map((pokemon) => (
                    <button
                        key={uuidv4()}
                        onClick={() =>
                            console.log("Details for: " + pokemon.name) &&
                            setSelectedPokemonName(pokemon.name)
                        }
                    >
                        <article>
                            <div>
                                <img src={pokemon.image} alt={pokemon.name} />
                            </div>
                            <div>
                                <h2>{pokemon.name}</h2>
                                <p>{pokemon.id}</p>
                            </div>
                        </article>
                    </button>
                ))
            )}
        </section>
    );
};

export default PokemonList;
