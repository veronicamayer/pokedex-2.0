import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useState, useEffect, useRef, useCallback } from "react";
import "./PokemonList.scss";
import { v4 as uuidv4 } from "uuid";

const PokemonList = ({
    selectedTypes,
    searchTerm,
    setSelectedPokemonName,
    isLightMode,
}) => {
    const [filteredPokemonData, setFilteredPokemonData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const { pokemonData, hasMore, loading, error } =
        useInfiniteScroll(pageNumber);

    const observer = useRef();
    const lastPokemonRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPageNumber((prevPageNumber) => prevPageNumber + 20);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

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
            {filteredPokemonData.length === 0 ? (
                <p id="error">No Pokemon found!</p>
            ) : (
                filteredPokemonData.map((pokemon, index) => {
                    if (filteredPokemonData.length === index + 1) {
                        return (
                            <button
                                ref={lastPokemonRef}
                                key={uuidv4()}
                                onClick={() =>
                                    setSelectedPokemonName(pokemon.name)
                                }
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
                                onClick={() => setSelectedPokemonName(pokemon)}
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
