let btnDrawCard = document.getElementById("draw-card")
let cardContainer = document.getElementById("card")
let deck = axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")

let API = "https://deckofcardsapi.com/api/"
let deckId = ""
deck.then(resp =>{
    console.log("deck has been shuffled")
    deckId = resp["data"]["deck_id"]
})

function drawCard(deckId) {
    let card = axios.get(`${API}/deck/${deckId}/draw/?count=1`)
    card
    .then(resp=>{
        if (resp.data.cards.length > 0){
            cardContainer.innerText = ""
            let img = document.createElement("img")
            img.src = resp.data.cards[0].image
            cardContainer.append(img)
        }
        else{
            alert("no more cards left")
            btnDrawCard.disabled = true
        }
    })
}

btnDrawCard.addEventListener("click", event=>{
    event.preventDefault()
    drawCard(deckId)
})

