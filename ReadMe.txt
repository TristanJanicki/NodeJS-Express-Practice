2406 Assignment 4
(c) Louis D. Nel 2018

Authors:
Nicole Laurin: 101043422
Tristan Janicki: 101080372

Contact:
TristanJanicki@cmail.carleton.ca
nicolejlaurin@cmail.carleton.ca

Program:
Building a node.js application that accesses a public API, and uses the express.js framework.


Purpose:
To build a client-server app that uses the food2fork API for providing recipes
based on ingredients specified by the client.  The server application should make
use of a package.json file to specify all the npm modules. The client should be able
to reach the app through various URL's. Inserting one or more comma delimited ingredients into the text
box should return recipes that include those ingredients.


Node.js version: v10.15.0
OS: Windows version: 10.0.17763

Launching instructions:
npm install express
node server.js


Testing instructions:
  - access directory of project files
  - enter "node server.js" in the terminal
  - enter one of the following websites into an internet browser:
          "http://localhost:3000/recipes.html"
          "http://localhost:3000/recipes"
          "http://localhost:3000/index.html"
          "http://localhost:3000/"
          "http://localhost:3000"
  - type in one or multiple ingredients(comma delimited ingredients) and press
    "enter" or click on the "submit request" button
  - click on any of the pictures to redirect to new page with the chosen recipe

Issues:
