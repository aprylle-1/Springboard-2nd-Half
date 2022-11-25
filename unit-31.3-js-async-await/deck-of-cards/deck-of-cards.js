let btnDrawCard = document.getElementById("draw-card")
let cardContainer = document.getElementById("card")
let API = "https://deckofcardsapi.com/api/"

let deckId = ""
async function shuffleCards(){
    let resp = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    deckId = resp["data"]["deck_id"]
}

shuffleCards()

async function drawCard(){
    let resp = await axios.get(`${API}/deck/${deckId}/draw/?count=1`)
    cardContainer.innerText = ""
    if (resp.data.cards.length > 0){
        let img = document.createElement("img")
        img.src = resp.data.cards[0].image
        cardContainer.append(img)
    }
    else{
        alert("no more cards left")
        btnDrawCard.disabled = true
    }
}

btnDrawCard.addEventListener("click", event=>{
    event.preventDefault()
    drawCard(deckId)
})

