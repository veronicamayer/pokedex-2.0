import useGradualLoading from "../../hooks/useGradualLoading";
import { useState, useEffect } from "react";
import "./PokemonList.scss";
import { v4 as uuidv4 } from "uuid";

const PokemonList = ({
    selectedTypes,
    searchTerm,
    setSelectedPokemon,
    isLightMode,
    className,
}) => {
    const [filteredPokemonData, setFilteredPokemonData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const { pokemonData, hasMore, loading } = useGradualLoading(pageNumber);

    useEffect(() => {
        if (!loading && hasMore) {
            setPageNumber((prevPageNumber) => prevPageNumber + 50);
        }
    }, [loading, hasMore, setPageNumber]);

    useEffect(() => {
        const filteredData = pokemonData
            .filter((pokemon) => {
                if (selectedTypes.length === 0) {
                    return true;
                } else {
                    return pokemon.types
                        .map((type) => type.type.name)
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
        <section
            id="pokemonList"
            className={`${className} ${isLightMode ? "" : "darkTheme"}`}
        >
            {" "}
            {filteredPokemonData.length === 0 ? (
                <p id="error">No Pokemon found!</p>
            ) : (
                filteredPokemonData.map((pokemon, index) => {
                    if (filteredPokemonData.length === index + 1) {
                        return (
                            <button
                                key={uuidv4()}
                                onClick={() => setSelectedPokemon(pokemon.name)}
                            >
                                <article>
                                    <div>
                                        <img
                                            src={pokemon.image}
                                            alt={pokemon.name}
                                        />
                                    </div>
                                    <div>
                                        <h2>{pokemon.name}</h2>
                                        <p>{pokemon.id}</p>
                                    </div>
                                </article>
                            </button>
                        );
                    } else {
                        return (
                            <button
                                key={uuidv4()}
                                onClick={() => setSelectedPokemon(pokemon)}
                            >
                                <article>
                                    <div>
                                        <img
                                            src={pokemon.image}
                                            alt={pokemon.name}
                                        />
                                    </div>
                                    <div>
                                        <h2>{pokemon.name}</h2>
                                        <p>{pokemon.id}</p>
                                    </div>
                                </article>
                            </button>
                        );
                    }
                })
            )}
        </section>
    );
};

export default PokemonList;
