const express = require('express')
const app = express()
const HTTP_PORT = 3000

const server = app.listen(HTTP_PORT, () => {
    console.log('App lstening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

app.get('/app/', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK'
    res.writeHead(res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
});

app.get('/app/flips/:number', (req, res) => {
    const number = req.params.number || 1

    const flips = new Array()
    for (var i = 0; i < number; i++) {
        flips.push(coinFlip())
    }
    
    //if (flips.length == 1) console.log(`{ ${flips.pop()}: 1 }`)
    res.json({raw: flips, summary:countFlips(flips)})
});

app.get('/app/flip/', (req, res) => {
    res.json({ flip: coinFlip() })
});

app.get('/app/flip/call/:guess', (req, res) => {
    const call = req.params.guess
    if (call == "heads" || call == "tails") {
        res.json({call: flipACoin(call)})
    }else {
        res.status(500).json({ error: 'no input. \n Usage: node guess-flip --call=[heads|tails]' })
    }
});

app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});


function coinFlip() {
    return Math.random() > 0.5 ? ("heads") : ("tails")
  }

function coinFlips(flips) {
const results = new Array()
for (var i = 0; i < flips; i++) {
    results.push(coinFlip())
}
return results
}

function countFlips(array) {
  const nums = {
    heads: 0,
    tails: 0
  }
  for (var result in array) {
    array[result]== "heads" ? nums.heads += 1 : nums.tails += 1
  }
  return nums
}

function flipACoin(call) {
  const flip_result = coinFlip()
  const results = {
    call: call,
    flip: flip_result,
    result: call == flip_result ? "win" : "lose"
  }
  return results
}
  