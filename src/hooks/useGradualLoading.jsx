import { useEffect, useState } from "react";
import axios from "axios";
import DefaultImage from "../assets/images/defaultImage.png";

export default function useGradualLoading(pageNumber) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pokemonData, setPokemonData] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        axios({
            method: "GET",
            url: "https://pokeapi.co/api/v2/pokemon",
            params: { limit: 50, offset: pageNumber },
        })
            .then((res) => {
                const newPokemonData = res.data.results.map(async (pokemon) => {
                    const pokemonDetails = await axios.get(pokemon.url);
                    const dreamWorldImage =
                        pokemonDetails.data.sprites.other.dream_world
                            .front_default != null
                            ? pokemonDetails.data.sprites.other.dream_world
                                  .front_default
                            : pokemonDetails.data.sprites.other.home
                                  .front_default != null
                            ? pokemonDetails.data.sprites.other.home
                                  .front_default
                            : pokemonDetails.data.sprites.front_default != null
                            ? pokemonDetails.data.sprites.front_default
                            : DefaultImage;
                    return {
                        id: `#${pokemonDetails.data.id
                            .toString()
                            .padStart(3, "0")}`,
                        name: pokemonDetails.data.name,
                        image: dreamWorldImage,
                        types: pokemonDetails.data.types,
                        firsttype: pokemonDetails.data.types[0].type.name,
                        hp: pokemonDetails.data.stats[0].base_stat,
                        attack: pokemonDetails.data.stats[1].base_stat,
                        defense: pokemonDetails.data.stats[2].base_stat,
                        specialattack: pokemonDetails.data.stats[3].base_stat,
                        specialdefense: pokemonDetails.data.stats[4].base_stat,
                        speed: pokemonDetails.data.stats[5].base_stat,
                        abilities: pokemonDetails.data.abilities
                            .map((ability) => ability.ability.name)
                            .join(", "),
                    };
                });
                Promise.all(newPokemonData).then((newPokemonDataArr) => {
                    setPokemonData((prevPokemonData) => [
                        ...prevPokemonData,
                        ...newPokemonDataArr,
                    ]);
                    setHasMore(res.data.results.length > 0);
                    setLoading(false);
                });
            })
            .catch(() => {
                setError(true);
            });
    }, [pageNumber]);

    return { loading, error, pokemonData, hasMore };
}
