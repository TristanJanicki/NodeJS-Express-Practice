function getRecipies(){
    console.log("getting recipies")
    let ingredients = document.getElementById("iInput").value
    if(ingredients === ''){
        return alert("Please enter some ingredients")
    }

    let xhr = new XMLHttpRequest()

    let recipeHolder = document.getElementById('recipeHolder')

    xhr.onreadystatechange = () => {
        console.log("ready State")
        if(xhr.readyState === 4 && xhr.status === 200){
            if(xhr.responseText.indexOf("message") === -1){
                checkHeader()

                if(xhr.responseText.indexOf("head") !== -1 && document.getElementsByTagName("head")[0].innerHTML !== ""){
                    // splice out the head from the response
                    recipeHolder.innerHTML = xhr.responseText.substring(xhr.responseText.indexOf("<table>"))
                }else{
                    recipeHolder.innerHTML = xhr.responseText
                }
            }else{
                alert(JSON.parse(xhr.responseText).message)
            }
        }
    }
    xhr.open(`GET`, `/recipes?ingredients=${ingredients}`)
    xhr.send()
}

//Attach Enter-key Handlers

document.getElementById("submit").addEventListener("click", function(event){
    getRecipies()
})

const ENTER=13
document.getElementById("iInput")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === ENTER) {
        document.getElementById("submit").click();
    }
});

function checkHeader(){
    console.log("Checking Header")
    let header = document.getElementsByTagName("head")[0]
    if(header.innerHTML === ""){
        console.log("Header Was Empty")
       header.innerHTML = `<title>2406 A4</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="styles/styles.css"><link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"></link>`
    }else{
        console.log("Header Was Not Empty")
    }
}

document.addEventListener('DOMContentLoaded', function(){
    console.log("DOM CONTENT LOADED")
    checkHeader()
}, false);

