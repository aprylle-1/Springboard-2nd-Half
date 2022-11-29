const express = require('express')
const CalculatorError = require('./errors')
const app = express()

app.use(express.json());


function handleNums(nums_string){
    let nums = []
    for (let num of nums_string){
        if (!parseInt(num)){
            return `${num} is not a number`
        }
        else{
            nums.push(parseInt(num))
        }
    }
    
    return nums
}
app.get('/mean', (req, res, next)=>{
    try{
        if (!req.query.nums){
            throw new CalculatorError("No numbers were given in the query string", 400)
        }
        else if (req.query.nums){
        
            let nums_string = req.query.nums.split(",")
            let resp = handleNums(nums_string)
            
            if (Array.isArray(resp)){
                let sum = 0
                
                for (let num of resp){
                    sum += num
                }
    
                let mean = sum/resp.length
    
                return res.send({operation: "mean", mean: mean})
            }
            else{
                let msg = resp
                throw new CalculatorError(msg, 400)
            }
        }
    }
    catch(error){
        return next(error)
    }
})

app.get('/median', (req, res, next)=>{
    try{
        if (!req.query.nums){
            throw new CalculatorError("No numbers were given in the query string", 400)
        }
        else if (req.query.nums){
        
            let nums_string = req.query.nums.split(",")
            let resp = handleNums(nums_string)
            
            if (Array.isArray(resp)){
                let nums_sorted = resp.sort((a,b)=>{
                    return a - b
                })
                let length = nums_sorted.length
                let middle = Math.floor(length/2)
                let median = 0
                debugger
                if (nums_sorted.length%2 == 0){
                    median = (nums_sorted[middle] + nums_sorted[middle - 1])/2
                }
                else{
                    median = nums_sorted[middle]
                }
                return res.send({operation: "median", median: median})
            }
            else{
                let msg = resp
                throw new CalculatorError(msg, 400)
            }
        }
    }
    catch(error){
        return next(error)
    }
})

app.get('/mode', (req, res, next)=>{
    try{
        if (!req.query.nums){
            throw new CalculatorError("No numbers were given in the query string", 400)
        }
        else if (req.query.nums){
        
            let nums_string = req.query.nums.split(",")
            let resp = handleNums(nums_string)
            
            if (Array.isArray(resp)){
                let nums_sorted = resp.sort((a,b)=>{
                    return a - b
                })
                let dict = {}

                for (let num of nums_sorted){
                    if (dict[num]){
                        dict[num] = dict[num] + 1
                    }
                    else{
                        dict[num] = 1
                    }
                }

            let max_frequency = Math.max(...Object.values(dict))
            let mode = []
            const keys = Object.keys(dict)
            
            for (let key of keys){
                if (dict[key] == max_frequency){
                    mode.push(parseInt(key))
                } 
            }
            return res.send({operation: "mode", mode: mode})
        }
            else{
                let msg = resp
                throw new CalculatorError(msg, 400)
        }
    }
}
    catch(error){
        return next(error)
    }
})

app.use(function(err, req, res, next) {
    let status = err.status || 500;
    let message = err.message;
  
    return res.status(status).json({
      error: {message, status}
    });
  });

app.listen(3000, ()=>{
    console.log('App on port 3000')
})