import React, { useState } from "react";
import "./FilterButtons.scss";

const FilterButtons = ({
    selectedTypes,
    setSelectedTypes,
    isLightMode,
    allTypeColors,
}) => {
    const handleTypeClick = (type) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter((t) => t !== type));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    };

    return (
        <section id="filterButtons" className={isLightMode ? "" : "darkTheme"}>
            {Object.entries(allTypeColors).map(([type, color]) => (
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
