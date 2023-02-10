import { v4 } from "uuid";
import { NavLink } from "react-router-dom";
import "./Dog.css"
function Dog ({name, img, age, facts}) {
    const link = `/dogs/${name}`
    console.log(name)
    return (
        <div className="Dog">
            <h2><NavLink to={link.toLowerCase()}>{name}</NavLink></h2>
            <div className="Dog-image"><img src={img} alt={name}/></div>
            <p>Age: {age}</p>
            {facts.map(fact=>{
                return (
                    <p key={v4()} className="Dog-fact">{fact}</p>
                )
            })}
        </div>
    )
}

export default Dog;