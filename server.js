const express = require('express') //express framework
const http_request = require('request') //helpful npm module for easy http requests
const PORT = process.env.PORT || 3000 //allow environment variable to possible set PORT
const fs = require("fs")

const app = express()
let food2fork_API_KEY = '8a61168c3cf28f86a1c717d12ed619f5'

let defaultForm = `<div class='container'><div class='wrapper'>Enter Ingredient: </div><input type='text' name='ingredient' id='iInput'/><button id='submit' style='margin-bottom: 50px;'>Submit</button></div></div>`
app.use(express.static(__dirname + '/public'))

app.get("/recipes.html", (request, response) =>{
  console.log("/recipes.html route")
  sendGenericResponse(request, response, ()=>{
    response.end()
  })
})

app.get("/index.html", (request, response)=>{
  console.log("/index.html route")
  sendGenericResponse(request, response, ()=>{
    response.end()
  })
})

app.get("", (request, response)=>{
  console.log("blank route")
  sendGenericResponse(request, response, ()=>{
    response.end()
  })
})

app.get("/", (request, response) => {
  console.log("/ route")
  if(request.query.ingredients !== undefined){
    console.log("/ path && Query had ingredients")
    if(!response.headersSent){
      sendGenericResponse(request, response, ()=>{
        sendApiResponse(request, response)   
        response.end()
      })
    }
  }else{
    sendGenericResponse(request, response, ()=>{
      response.end()
    })
  }
})

app.get("/recipes", (request, response) => {
  console.log("/recipes route")
  if(request.query.ingredients !== undefined) {
    if(!response.headersSent){
      console.log("Header Not Sent. Sending...")
      sendGenericResponse(request, response, ()=>{
        console.log("Inside Callback")
        sendApiResponse(request, response, ()=>{
          response.end()
        })
        
      })
    }
  }
  else {
    sendGenericResponse(request, response, ()=>{
      response.end()
    })
  }
})

function sendGenericResponse(request, response, _callBack){
  console.log("Sending Generic Response")
  fs.readFile(__dirname + "/views/index.html", "utf8", function(err, data){
    if(err) response.write({message: err})
    if(!response.headersSent){
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.headersSent = true;
    }
    response.write(data)
    if(_callBack){
      _callBack()
    }
  })
}

function sendApiResponse(request, response, _callBack){
  let ingredients = request.query.ingredients
  console.log("Sending API Response")
  if(ingredients !== undefined) {
    url = `https://food2fork.com/api/search?key=${food2fork_API_KEY}&q=${ingredients}`
    http_request.get(url, (err, res, data) => {
      if(JSON.parse(data).error){
        response.write({message: data.error})
      }
      response.write(convertResponseToHtml(JSON.parse(data)))
      if(_callBack){
        _callBack()
      }
    })
  }
}

//start server
app.listen(PORT, err => {
    if(err) console.log(err)
    else {
      console.log(`Server listening on port: ${PORT}`)
      console.log(`To Test:`)
      console.log("http://localhost:3000/recipes.html")
      console.log(`http://localhost:3000/recipes?ingredient=Basil`)
      console.log(`http://localhost:3000`)
      console.log('http://localhost:3000/')
      console.log('http://localhost:3000/index.html')
    }
  })


function convertResponseToHtml(rObj){
  console.log("Converting Response To HTML")
  let html = `<table><tr>`
  let index = 0
  for(let recipe of rObj.recipes){
    index ++
    if(index % 3 === 0){
      html += 
      `<td class='recipe'><a href='${recipe.f2f_url}' target='_blank'/><div><img src=${recipe.image_url}><h3> ${recipe.title} </h3></div></td></tr><tr>` 
    }
    else{
      html += 
      `<td class='recipe'><a href='${recipe.f2f_url}' target='_blank'/><div><img src=${recipe.image_url}><h3> ${recipe.title} </h3></div></td>`            
      }
    }
  html += `</table>`
  
  return html
}