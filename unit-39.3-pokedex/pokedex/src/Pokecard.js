import './Pokecard.css';
const Pokecard = ({pokemon}) => {
    const {id, name, type, base_experience} = pokemon;
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    return (
        <div className = "Pokecard">
            <h4 className="Pokecard-name">{name}</h4>
            <div className = "Pokecard-imgHolder">
                <img className="Pokecard-img" alt="" src={img}/>
            </div>
            <div className="Pokecard-type">
                Type: {type}
            </div>
            <div className="Pokecard-exp">
                Base exp: {base_experience}
            </div>
        </div>
    )
}

export default Pokecard;