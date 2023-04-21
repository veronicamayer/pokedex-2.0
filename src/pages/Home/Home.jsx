import "./Home.scss";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterButtons from "../../components/FilterButtons/FilterButtons";
import PokemonList from "../../components/PokemonList/PokemonList";
import { useState } from "react";
import Details from "../../components/Details/Details";

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

const Home = ({ isLightMode }) => {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPokemonName, setSelectedPokemonName] = useState(null);
    const [allTypeColors, setAllTypeColors] = useState(allTypes);

    return (
        <section id="home" className={isLightMode ? "" : "darkTheme"}>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                isLightMode={isLightMode}
            />
            <FilterButtons
                setSelectedTypes={setSelectedTypes}
                selectedTypes={selectedTypes}
                isLightMode={isLightMode}
                allTypeColors={allTypeColors}
            />
            <div id="listAndDetails">
                <PokemonList
                    selectedTypes={selectedTypes}
                    searchTerm={searchTerm}
                    setSelectedPokemonName={setSelectedPokemonName}
                    isLightMode={isLightMode}
                />
                <Details
                    pokemon={selectedPokemonName}
                    isLightMode={isLightMode}
                    allTypeColors={allTypeColors}
                />
            </div>
        </section>
    );
};

export default Home;
