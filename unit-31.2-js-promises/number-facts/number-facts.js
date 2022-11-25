const apiURL = "http://numbersapi.com/"
const getFavoriteBtn = document.getElementById("btn-get-fact")
const btnAddNumner = document.getElementById("add-request-info")
const btnMultipleInfo = document.getElementById("batch-request")
let favoriteNumber = document.getElementById("favorite-number")
let favoriteNumberFact = document.getElementById
("favorite-number-fact")
let form = document.getElementById("form")
let multipleInfo = document.getElementById("multiple-info")
getFavoriteBtn.addEventListener("click", event=>{
    event.preventDefault()
    favoriteNumberFact.innerText = ""
    let facts = axios.get(`${apiURL}${favoriteNumber.value}`)
    facts
    .then(resp=>{
        let div = document.createElement("div")
        div.innerText = resp.data
        favoriteNumberFact.append(div)
        return axios.get(`${apiURL}${favoriteNumber.value}`)
    })
    .then(resp=>{
        let div = document.createElement("div")
        div.innerText = resp.data
        favoriteNumberFact.append(div)
        return axios.get(`${apiURL}${favoriteNumber.value}`)
    })
    .then(resp=>{
        let div = document.createElement("div")
        div.innerText = resp.data
        favoriteNumberFact.append(div)
        return axios.get(`${apiURL}${favoriteNumber.value}`)
    })
    .then(resp=>{
        let div = document.createElement("div")
        div.innerText = resp.data
        favoriteNumberFact.append(div)
        return axios.get(`${apiURL}${favoriteNumber.value}`)
    }) 
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


btnMultipleInfo.addEventListener("click", event=>{
    event.preventDefault()
    multipleInfo.innerText = ""
    let numbersFromForm= document.querySelectorAll(".number")
    let url = apiURL
    for (let number of numbersFromForm){
        url = `${url}${number.value},`
    }
    url = url.substring(0, url.length - 1)
    console.log(url)

    let facts = axios.get(url)
    facts
    .then(res=>{
        let data = res.data

        for (let number of numbersFromForm){
            let div = document.createElement("div")
            div.innerText = data[number.value]
            multipleInfo.append(div)
        }
    })
})

