import React, { useState } from "react";
import "./FilterButtons.scss"; // import the SCSS file

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

const FilterButtons = ({ selectedTypes, setSelectedTypes, isLightMode }) => {
    const handleTypeClick = (type) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter((t) => t !== type));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    };

    return (
        <section id="filterButtons" className={isLightMode ? "" : "darkTheme"}>
            {Object.entries(allTypes).map(([type, color]) => (
                <label
                    key={type}
                    className={`labelButton ${
                        selectedTypes.includes(type) ? "selected" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleTypeClick(type)}
                    htmlFor={type}
                >
                    {type}
                    <input type="checkbox" name={type} />
                </label>
            ))}
        </section>
    );
};

export default FilterButtons;
