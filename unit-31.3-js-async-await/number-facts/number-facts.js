const apiURL = "http://numbersapi.com/"
const getFavoriteBtn = document.getElementById("btn-get-fact")
const btnAddNumner = document.getElementById("add-request-info")
const btnMultipleInfo = document.getElementById("batch-request")
let favoriteNumber = document.getElementById("favorite-number")
let favoriteNumberFact = document.getElementById
("favorite-number-fact")
let form = document.getElementById("form")
let multipleInfo = document.getElementById("multiple-info")

async function getFavoriteNumberFacts(num){
    let fact1Promise = axios.get(`${apiURL}${num}`)
    let fact2Promise = axios.get(`${apiURL}${num}`)
    let fact3Promise = axios.get(`${apiURL}${num}`)
    let fact4Promise = axios.get(`${apiURL}${num}`)

    let fact1 = await fact1Promise
    let fact2 = await fact2Promise
    let fact3 = await fact3Promise
    let fact4 = await fact4Promise

    let facts = [fact1, fact2, fact3, fact4]

    for (let fact of facts){
        let div = document.createElement("div")
        div.innerText = fact.data
        favoriteNumberFact.append(div)
    }
}

getFavoriteBtn.addEventListener("click", event=>{
    event.preventDefault()
    favoriteNumberFact.innerText = ""
    let num = favoriteNumber.value
    getFavoriteNumberFacts(num)
})

btnAddNumner.addEventListener("click", event=>{
    event.preventDefault()
    
    let div = document.createElement("div")

    let label = document.createElement("label")
    label.innerText="Number "
    div.append(label)

    let inpt = document.createElement("input")
    inpt.type = "number"
    inpt.classList.add("number")
    div.append(inpt)

    form.append(div)

})

btnMultipleInfo.addEventListener("click", async event=>{
    event.preventDefault()
    multipleInfo.innerText = ""
    let numbersFromForm= document.querySelectorAll(".number")
    let url = apiURL
    for (let number of numbersFromForm){
        url = `${url}${number.value},`
    }
    url = url.substring(0, url.length - 1)

    let resp = await axios.get(url)
    if (numbersFromForm.length == 1) {
        let div = document.createElement("div")
        div.innerText = resp.data
        multipleInfo.append(div)
    }
    else{
        for (let number of numbersFromForm){
            let div = document.createElement("div")
            div.innerText = resp.data[number.value]
            multipleInfo.append(div)
        }
    }
})

