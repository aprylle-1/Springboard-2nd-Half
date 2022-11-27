const fs = require('fs')
const process = require('process')
const axios = require('axios')

function cat(path){
    fs.readFile(`./${path}`, 'utf8', (err,data)=>{
        if (err){
            console.log(err)
            process.kill(1)
        }
        console.log(data)
    })
}

async function webCat(url){
    try{
        let resp = await axios.get(url)
        console.log(resp.data)
    }
    catch(err){
        console.log(`Error fetching ${url}:\n${err}`)
        process.exit(1)
    }
}

let start = process.argv[2].substring(0,4)

if (start == "http"){
    webCat(process.argv[2])
}
else{
    cat(process.argv[2])
}
