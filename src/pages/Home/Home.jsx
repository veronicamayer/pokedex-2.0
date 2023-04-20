import "./Home.scss";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterButtons from "../../components/FilterButtons/FilterButtons";
import PokemonList from "../../components/PokemonList/PokemonList";
import { useState } from "react";
import Details from "../../components/Details/Details";

const Home = ({ isLightMode }) => {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPokemonName, setSelectedPokemonName] = useState("");

    const handleSearch = (query) => {
        setSearchTerm(query);
    };

    return (
        <section id="home" className={isLightMode ? "" : "darkTheme"}>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} isLightMode={isLightMode} />
            <FilterButtons
                setSelectedTypes={setSelectedTypes}
                selectedTypes={selectedTypes}
                isLightMode={isLightMode}
            />
            <div id="listAndDetails">
                <PokemonList
                    selectedTypes={selectedTypes}
                    searchTerm={searchTerm}
                    setSelectedPokemonName={setSelectedPokemonName}
                    isLightMode={isLightMode}
                />
                <Details name={selectedPokemonName} isLightMode={isLightMode}/>
            </div>
        </section>
    );
};

export default Home;
