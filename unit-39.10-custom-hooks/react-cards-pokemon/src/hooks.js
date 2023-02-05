import { useState } from "react";
import axios from "axios";
import {v4} from "uuid";
function useFlip () {
    const [isFlipped, setIsFliped] = useState(true)

    function flip () {
        setIsFliped(!isFlipped)
    }

    return [isFlipped, flip]
}

function useAxios (baseUrl) {
    const [list, setList] = useState([])

    async function addList (extension = "") {
        const url = baseUrl + extension
        const response = await axios.get(url);
        setList(list => [...list, {...response.data, id: v4()}])
    }

    return [list, addList]
}

export {useFlip, useAxios}

// const [pokemon, setPokemon] = useState([]);
// const addPokemon = async name => {
//   const response = await axios.get(
//     `https://pokeapi.co/api/v2/pokemon/${name}/`
//   );
//   setPokemon(pokemon => [...pokemon, { ...response.data, id: uuid() }]);
// };