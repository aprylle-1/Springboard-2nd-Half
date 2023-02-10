import Dog from "./Dog"
import { v4 } from "uuid"
function DogsList ({dogs}) {
    return(
    <div>
        <h1>Hello! These are the dogs that we have</h1>
        {dogs.map(dog => {
            return (
                <Dog key={v4()} dogs={dogs} name={dog.name} img={dog.src} facts={dog.facts} age={dog.age}/>
            )
        })}
    </div>)
}

export default DogsList