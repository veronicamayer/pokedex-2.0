import "./Details.scss";

const Details = ({ pokemon, isLightMode, allTypeColors }) => {
    if (!pokemon) {
        return null;
    }

    return (
        <section
            id="details"
            className={
                isLightMode
                    ? `detailsPage detailsPage--${pokemon.firsttype}`
                    : `detailsPage detailsPage--${pokemon.firsttype} darkTheme`
            }
        >
            <article className="imgContainer">
                <img src={pokemon.image} alt={pokemon.name} />
                <div id="allTypes">
                    {pokemon.types.map((type, index) => (
                        <p
                            key={index}
                            className="types"
                            style={{
                                backgroundColor: allTypeColors[type.type.name],
                            }}
                        >
                            {type.type.name}
                        </p>
                    ))}
                </div>
            </article>
            <article className="info">
                <h1>
                    {pokemon.id} {pokemon.name}
                </h1>
                <div>
                    <span>
                        <h2>hp:</h2>
                        <p>{pokemon.hp}</p>
                    </span>
                    <span>
                        <h2>attack:</h2>
                        <p>{pokemon.attack}</p>
                    </span>
                    <span>
                        <h2>defense:</h2>
                        <p>{pokemon.defense}</p>
                    </span>
                    <span>
                        <h2>special-attack:</h2>
                        <p>{pokemon.specialattack}</p>
                    </span>
                    <span>
                        <h2>special-defense:</h2>
                        <p>{pokemon.specialdefense}</p>
                    </span>
                    <span>
                        <h2>speed:</h2>
                        <p>{pokemon.speed}</p>
                    </span>
                </div>
                <h2 className="abilities">Abilities:</h2>
                <p>{pokemon.abilities}</p>
            </article>
        </section>
    );
};

export default Details;
