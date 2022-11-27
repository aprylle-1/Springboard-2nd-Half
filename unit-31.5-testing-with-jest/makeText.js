/** Command-line tool to generate Markov text. */

const { default: axios } = require('axios')
const fs = require('fs')
const process = require('process')
const markov = require('./markov')

const command = process.argv[2]

function generateFromFile(){
    let path = process.argv[3]
    fs.readFile(path, "utf8", (err, data)=>{
        if (err) {
            console.log(`Error: cannot read file ${path}:\n${err}`)
            process.kill(1)
        }
        let text = new markov.MarkovMachine(data)
        text.makeChains()
        console.log(`...generated text from file ${path}`)
        console.log(text.makeText())
    })
}

async function generateFromUrl(){
    let url = process.argv[3]
    try{
        let resp = await axios.get(url)
        let text = new markov.MarkovMachine(resp.data)
        text.makeChains()
        console.log(`...generated text from url ${url}`)
        console.log(text.makeText())
    }
    catch(err){
        console.log(`Error: could not get information from ${url}:\n${err}`)
    }
}

if (command == 'file'){
    generateFromFile()
}

else if (command == 'url'){
    generateFromUrl()
}

else{
    console.log("Unknown command. Try again")
}