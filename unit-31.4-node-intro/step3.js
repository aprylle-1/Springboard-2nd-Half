const fs = require('fs')
const process = require('process')
const axios = require('axios')

let arg = process.argv[2]
let filename = ""

if (arg == '--out'){
    filename == process.argv[3]
}


function cat(path, filename){
    if (filename){
        fs.readFile(`./${path}`, 'utf8', (err,data)=>{
            if (err){
                console.log(`Error reading ${path}:\n${err}`)
                process.kill(1)
            }
            fs.writeFile(`./${filename}`, data, 'utf8', err=>{
                if(err){
                    console.log(`Couldn't write ${filename}:\n ${err}`)
                    process.kill(1)
                }
            })
        })
    }
    else{
        fs.readFile(`./${path}`, 'utf8', (err,data)=>{
            if (err){
                console.log(`Error reading ${path}:\n${err}`)
                process.kill(1)
            }
            console.log(data)
        })
    }
}

async function webCat(url, filename){
    try{
        let resp = await axios.get(url)
        if (filename){
            fs.writeFile(`./${filename}`, resp.data, 'utf8', err=>{
                if(err){
                    console.log(`Couldn't write ${filename}:\n ${err}`)
                    process.kill(1)
                }
            })
        }
        else{
            console.log(resp.data)
        }
    }
    catch(err){
        console.log(`Error fetching ${url}:\n${err}`)
        process.exit(1)
    }
}
if (arg == '--out'){
    let path = process.argv[4]
    let filename = process.argv[3]
    
    let start = path.substring(0,4)

    if (start == "http"){
    webCat(path, filename)
    }
    
    else{
    cat(path, filename)
    }
}
else{
    let start = process.argv[2].substring(0,4)

    if (start == "http"){
    webCat(process.argv[2])
    }
    else{
    cat(process.argv[2])
    }
}