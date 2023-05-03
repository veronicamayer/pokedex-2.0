import { useState, useEffect } from "react";
import "./FilterButtons.scss";

const FilterButtons = ({
    selectedTypes,
    setSelectedTypes,
    isLightMode,
    allTypeColors,
}) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleTypeClick = (type) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter((t) => t !== type));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    };

    const handleOpenMenu = () => {
        setIsMenuOpen(true);
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <section id="filterButtons" className={isLightMode ? "" : "darkTheme"}>
            {isSmallScreen && !isMenuOpen ? (
                <button onClick={handleOpenMenu} className="toggleButton">
                    <i class="fa-solid fa-bars"></i>
                </button>
            ) : null}
            {isMenuOpen ? (
                <button onClick={handleCloseMenu} className="toggleButton">
                    <i class="fa-solid fa-x"></i>
                </button>
            ) : null}

            {!isSmallScreen || isMenuOpen ? (
                <div className="overlay">
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
                </div>
            ) : null}
        </section>
    );
};

export default FilterButtons;
