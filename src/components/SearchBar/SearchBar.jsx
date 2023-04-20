import "./SearchBar.scss";

const SearchBar = ({ searchTerm, setSearchTerm, isLightMode }) => {
    return (
        <section id="searchBar" className={isLightMode ? "" : "darkTheme"}>
            <input
                type="text"
                name="searchBar"
                id="searchBar"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                }}
                placeholder="Search Names"
            />
        </section>
    );
};

export default SearchBar;
