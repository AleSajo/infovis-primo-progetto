
//array di oggetti in cui metterò il dataset
var dataset = [];

// Set the dimensions of the SVG container
var width = 1200;
var height = 600;

// Create an SVG container in the document body
var svgContainer = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border-style", "solid")
    .style("background-color","#e8e8e8")

function sortDataset() {
    d3.json("../data/dataset.json")
        .then(function(data) {
            //leggo il dataset, lo metto in un array di oggetti e lo ordino
            dataset = data;
            console.log(dataset);
            dataset.sort((a,b) => a.idroelettrica - b.idroelettrica)

            offset = 70;
            dataset.forEach(datacase => {
                drawFlower(datacase, offset)
                offset += 120;
            })
        })
        .catch(function(error) {

        })
}

function drawFlower(datacase, offset) {
    // ciascun petalo ha una funzione on click, che quando viene lanciata ridisegna il grafico
    // sulla base dell'ordinamento sull'attributo corrispondente al petalo cliccato

    var petalWidth = 14;
    var totalMW = datacase.idroelettrica+datacase.eolica+datacase.fotovoltaica+datacase.geotermica;
    var flowerHeight = height - totalMW/200;    //altezza del singolo fiore dal basso

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
            sortDataset();
            
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
        })

    svgContainer.append("text")
        .text(datacase.anno)
        .attr("x", offset - 15)
        .attr("y", height - 10)
        .style("color", "black")

}

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



        offset = 70;
        data.forEach(datacase => {
            drawFlower(datacase, offset)
            offset += 120;
        })

        

    })
    .catch(function (error) {
        console.log(error); // Some error handling here
    });

