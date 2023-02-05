import { useState, useRef, useEffect } from "react"
import axios from "axios"
function Cards () {
    const refDeckId = useRef()
    const [card, setCard] = useState(null)
    const [count, setCount] = useState(null)
    const [drawing, setDrawing] = useState(false)
    const timerId = useRef()
    useEffect(() => {
        async function shuffleDeck() {
            const res = await axios.get("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            refDeckId.current = res.data["deck_id"]
        }
        shuffleDeck()
    },[])

    useEffect(() =>{
        async function drawCard () {
            try{    
    
                        const res = await axios.get(`https://www.deckofcardsapi.com/api/deck/${refDeckId.current}/draw/?count=1`)
                        if (res.data.success === false) {
                            alert(res.data.error)
                            setDrawing(false)
                            clearInterval(timerId.current)
                        }
                        else{
                            setCard(res.data.cards[0])
                            setCount(res.data.remaining)
                        }
            }
            catch (e){
                    console.log(e)
            }
        }

        if (drawing) {
            timerId.current = setInterval( async () =>{
                drawCard()
            }, 1000)
        }
    }, [drawing])
        

    function startDraw () {
        setDrawing(true)
    }

    function stopDraw () {
        setDrawing(false)
        clearInterval(timerId.current)
    }
    return (
        <div>
            <div><button onClick={startDraw}>Draw Card</button><button onClick={stopDraw}>Stop Drawing</button></div>
            <div>Count : {count}</div>
            <div>{card && <img src={card.image} alt={card.code}/>}</div>
        </div>
    )
}

export default Cards;