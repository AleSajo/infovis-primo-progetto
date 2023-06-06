
//array di oggetti in cui metterò il dataset
var dataset = [];

// set margins in a constant
const margins = {
    left: 20,
    right: 20,
    top: 20,
    bottom: 20
}

// Set the dimensions of the SVG container
const width = window.innerWidth - margins.left;
const height = window.innerHeight - margins.top;

// set scales
var yScale = d3.scaleLinear().range([0, height-0.2*height]);   // range della visualizzazione, poi dovrei aggiornare il domain quando disegno
var xScale = d3.scaleBand().range([0, width]);  // range della visualizzazione, poi dovrei aggiornare il domain quando disegno



// update scale domains
function updateYScale(dataset) {
    var maxTotalMW = 0;                 // compute the max domain value
    dataset.forEach(datacase => {
        var currentTotalMW = datacase.idroelettrica+datacase.eolica+datacase.fotovoltaica+datacase.geotermica;
        if(currentTotalMW > maxTotalMW) {
            maxTotalMW = currentTotalMW;
        }
    });
    yScale.domain([0, maxTotalMW]);     // finally update domain
}

// Create an SVG container in the document body
var svgContainer = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border-style", "solid")
    .style("background-color","#e8e8e8")

// ordina il dataset sulla base dell'attributo specificato e disegna di nuovo i fiori
function sortDataset(attributo) {
    d3.json("../data/dataset.json")
        .then(function(data) {
            //leggo il dataset, lo metto in un array di oggetti e lo ordino
            console.log(dataset)    //qua deve essere vuoto
            dataset = data;
            console.log(dataset);   //in-memory dataset

            switch(attributo) {
                case "idroelettrica":
                    dataset.sort((a,b) => a.idroelettrica - b.idroelettrica);
                    break;
                case "eolica":
                    dataset.sort((a,b) => a.eolica - b.eolica);
                    break;
                case "fotovoltaica":
                    dataset.sort((a,b) => a.fotovoltaica - b.fotovoltaica);
                    break;
                case "geotermica":
                    dataset.sort((a,b) => a.geotermica - b.geotermica);
                    break;
            }

            console.log(dataset)    //sorted

            //disegna di nuovo col dataset ordinato
            offset = width/11;
            dataset.forEach(datacase => {
                drawFlower(datacase, offset)
                offset += width/11;
            })
        })
        .catch(function(error) {
            console.log(error); // Some error handling here
        })
    
}

function drawFlower(datacase, offset) {
    // ciascun petalo ha una funzione on click, che quando viene lanciata ridisegna il grafico
    // sulla base dell'ordinamento sull'attributo corrispondente al petalo cliccato

    var petalWidth = 14;
    var totalMW = datacase.idroelettrica+datacase.eolica+datacase.fotovoltaica+datacase.geotermica;
    var flowerHeight = height - yScale(totalMW);    //altezza del singolo fiore dal basso

    // TODO: mettere ciascun fiore dentro a un <g>

    // petalo idroelettrica: blu
    svgContainer.append("ellipse")
        .attr("class", "ellipseBlu")
        .attr("cx", offset-(datacase.idroelettrica / 1200))
        .attr("cy", flowerHeight)
        .attr("rx", datacase.idroelettrica / 1200)
        .attr("ry", petalWidth*(datacase.idroelettrica / 30000))
        .attr("transform", "rotate(45 " + offset + " " + (flowerHeight) + ")")
        .style("fill", "#3e59f0")
        .style("stroke", "black")
        .on("click", function() {
            console.log("Hai cliccato un'ellisse blu")
            svgContainer.selectAll("*").remove();
            sortDataset("idroelettrica");
            
            })

    // petalo eolica: verde
    svgContainer.append("ellipse")
        .attr("class", "ellipseVerde")
        .attr("cx", offset-(datacase.eolica / 1000))
        .attr("cy", flowerHeight)
        .attr("rx", datacase.eolica / 1000)
        .attr("ry", petalWidth*(datacase.eolica / 15000))
        .attr("transform", "rotate(135 " + offset + " " + (flowerHeight) + ")")
        .style("fill", "green")
        .style("stroke", "black")
        .on("click", function() {
            console.log("Hai cliccato un'ellisse verde")
            svgContainer.selectAll("*").remove();
            sortDataset("eolica");
        })

    // petalo fotovoltaica: giallo
    svgContainer.append("ellipse")
        .attr("class", "ellipseGialla")
        .attr("cx", offset-(datacase.fotovoltaica / 1000))
        .attr("cy", flowerHeight)
        .attr("rx", datacase.fotovoltaica / 1000)
        .attr("ry", petalWidth*(datacase.fotovoltaica / 30000))
        .attr("transform", "rotate(225 " + offset + " " + (flowerHeight) + ")")
        .style("fill", "#e8be4a")
        .style("stroke", "black")
        .on("click", function() {
            console.log("Hai cliccato un'ellisse gialla")
            svgContainer.selectAll("*").remove();
            sortDataset("fotovoltaica");
        })

    // petalo geotermica: rosso
    svgContainer.append("ellipse")
        .attr("class", "ellipseRossa")
        .attr("cx", offset-(datacase.geotermica / 1000))
        .attr("cy", flowerHeight)
        .attr("rx", datacase.geotermica / 1000)
        .attr("ry", petalWidth*(datacase.geotermica / 15000))
        .attr("transform", "rotate(315 " + offset + " " + (flowerHeight) + ")")
        .style("fill", "#c93934")
        .style("stroke", "black")
        .on("click", function() {
            console.log("Hai cliccato un'ellisse rossa")
            svgContainer.selectAll("*").remove();
            sortDataset("geotermica");
        })

    // etichette dell'asse x
    svgContainer.append("text")
        .text(datacase.anno)
        .attr("x", offset - 15)
        .attr("y", height - 10)
        .style("color", "black")
}

// disegno iniziale
d3.json("../data/dataset.json")
    .then(function (data) {
        // Test su console
        /*
        console.log(data)
        console.log(data[0])
        console.log(data[0]["anno"])
        console.log("Idroelettrica: " + data[0]["idroelettrica"])
        console.log(Object.keys(data[0]))
        propertyValues = Object.keys(data[0])
        console.log(propertyValues)
        propertyValues.forEach(proprertyValue => {
            console.log(proprertyValue)
        });
        */
        // Fine console test

        // aggiorniamo la yScale in base al dataset
        updateYScale(data);

        offset = width/11;
        data.forEach(datacase => {
            drawFlower(datacase, offset)
            offset += width/11;
        })
        

    })
    .catch(function (error) {
        console.log(error); // Some error handling here
    });

