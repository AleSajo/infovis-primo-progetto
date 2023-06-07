
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

// set scales for svg
var yScale = d3.scaleLinear().range([0, height - 100]);   // range della visualizzazione, poi dovrei aggiornare il domain quando disegno
var xScale = d3.scaleBand().range([0, width]);  // range della visualizzazione, poi dovrei aggiornare il domain quando disegno
// set scales for flowers
var yScalePetal = d3.scaleSqrt().range([0, 20]);      // da cambiare quasi sicuro
var xScalePetal = d3.scaleSqrt().range([0, 40]);

// update scale domains
function updateYScale(dataset) {
    var maxTotalMW = 0;                 // compute the max domain value
    dataset.forEach(datacase => {
        var currentTotalMW = datacase.idroelettrica + datacase.eolica + datacase.fotovoltaica + datacase.geotermica;
        if (currentTotalMW > maxTotalMW) {
            maxTotalMW = currentTotalMW;
        }
    });
    yScale.domain([30000, maxTotalMW]);     // finally update domain (dominio ristretto per focus su parte alta della visualizzazione)
}

function updatePetalScales(dataset) {
    maxValue = 0;
    dataset.forEach(datacase => {       // trovo il valore più grande in tutto il database
        tempMaxValue = d3.max([datacase.idroelettrica, datacase.eolica, datacase.fotovoltaica, datacase.geotermica])
        if (tempMaxValue > maxValue) {
            maxValue = tempMaxValue;
        }
    })
    yScalePetal.domain([0, maxValue]);
    xScalePetal.domain([0, maxValue]);
    // forse posso aggiungere direttamente qua l'aggiornamento della scala dell'asse x del petalo
}

// Create an SVG container in the document body
var svgContainer = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border-style", "solid")
    .style("background-color", "#e8e8e8")

// ordina il dataset sulla base dell'attributo specificato e disegna di nuovo i fiori
function sortDataset(attributo) {
    d3.json("../data/dataset.json")
        .then(function (data) {
            //leggo il dataset, lo metto in un array di oggetti e lo ordino
            console.log(dataset)    //qua deve essere vuoto
            dataset = data;
            console.log(dataset);   //in-memory dataset

            switch (attributo) {
                case "idroelettrica":
                    dataset.sort((a, b) => a.idroelettrica - b.idroelettrica);
                    break;
                case "eolica":
                    dataset.sort((a, b) => a.eolica - b.eolica);
                    break;
                case "fotovoltaica":
                    dataset.sort((a, b) => a.fotovoltaica - b.fotovoltaica);
                    break;
                case "geotermica":
                    dataset.sort((a, b) => a.geotermica - b.geotermica);
                    break;
            }

            console.log(dataset)    //sorted

            //disegna di nuovo col dataset ordinato
            offset = width / 11;
            dataset.forEach(datacase => {
                drawFlower(datacase, offset)
                offset += width / 11;
            })
        })
        .catch(function (error) {
            console.log(error); // Some error handling here
        })

}

function moveFlowersWithTransition(attributo) {      // manca il parametro attributo per l'ordinamento
    var selection = d3.selectAll("g");
    console.log(selection);
    /*
        Per fare la transition potremmo provare a calcolare i nuovi offset per ciascun elemento
        quindi copio qua sotto il codice del sortDataset per modificarlo, e comunque la fase di
        ordinamento c'è per forza.
        Poi dovrei provare a fare la transition sugli elementi già esistenti, per cui prendendo
        ciascun flower2008, flower2009 etc... dovrei mettergli transition con il cambio della
        coordinata x. 
    */
    d3.json("../data/dataset.json")
        .then(function (data) {
            //leggo il dataset, lo metto in un array di oggetti e lo ordino
            console.log(dataset)    //qua deve essere vuoto
            dataset = data;
            console.log(dataset);   //in-memory dataset

            switch (attributo) {
                case "idroelettrica":
                    dataset.sort((a, b) => a.idroelettrica - b.idroelettrica);
                    break;
                case "eolica":
                    dataset.sort((a, b) => a.eolica - b.eolica);
                    break;
                case "fotovoltaica":
                    dataset.sort((a, b) => a.fotovoltaica - b.fotovoltaica);
                    break;
                case "geotermica":
                    dataset.sort((a, b) => a.geotermica - b.geotermica);
                    break;
            }

            console.log(dataset)    //sorted

            // qui anziché disegnare il nuovo dataset dovrei calcolare l'offset di ciascun elemento <g>
            // ed applicarlo con una transition su ciascun elemento
            offset = width / 11;
            dataset.forEach(datacase => {
                var totalMW = datacase.idroelettrica + datacase.eolica + datacase.fotovoltaica + datacase.geotermica;
                var flowerHeight = height - yScale(totalMW);

                // qua dentro dovrei spostare l'attributo cx per ogni petalo del fiore
                d3.select("body").select("svg").select(".flower"+datacase.anno).select(".ellipseBlu")
                    .transition().duration(300)
                    .attr("cx",offset - xScalePetal(datacase.idroelettrica))
                    .attr("transform", "rotate(45 " + offset + " " + (flowerHeight) + ")")
                
                d3.select("body").select("svg").select(".flower"+datacase.anno).select(".ellipseVerde")
                    .transition().duration(300)
                    .attr("cx",offset - xScalePetal(datacase.eolica))
                    .attr("transform", "rotate(135 " + offset + " " + (flowerHeight) + ")")
                
                d3.select("body").select("svg").select(".flower"+datacase.anno).select(".ellipseGialla")
                    .transition().duration(300)
                    .attr("cx",offset - xScalePetal(datacase.fotovoltaica))
                    .attr("transform", "rotate(225 " + offset + " " + (flowerHeight) + ")") 
                    
                d3.select("body").select("svg").select(".flower"+datacase.anno).select(".ellipseRossa")
                    .transition().duration(300)
                    .attr("cx",offset - xScalePetal(datacase.geotermica))
                    .attr("transform", "rotate(315 " + offset + " " + (flowerHeight) + ")")

                // qui transition del totalMW
                d3.select("body").select("svg").select(".flower"+datacase.anno).select(".totalMW")
                    .transition().duration(300)
                    .attr("x", offset - 35)

                //qui transition dell'anno
                d3.select("body").select("svg").select(".flower"+datacase.anno).select(".yearLabel")
                    .transition().duration(300)
                    .attr("x", offset - 15)
                
                offset += width / 11;
            })
        })
        .catch(function (error) {
            console.log(error); // Some error handling here
        })


}

function drawFlower(datacase, offset) {

    var petalWidth = 14;
    var totalMW = datacase.idroelettrica + datacase.eolica + datacase.fotovoltaica + datacase.geotermica;
    var flowerHeight = height - yScale(totalMW);    //altezza del singolo fiore dal basso

    svgContainer.append("g")
        .attr("class", "flower" + datacase.anno)

    // petalo idroelettrica: blu
    svgContainer.selectAll(".flower" + datacase.anno)
        .append("ellipse")
        .attr("class", "ellipseBlu")
        .attr("cx", offset - xScalePetal(datacase.idroelettrica))
        .attr("cy", flowerHeight)
        //.attr("rx", datacase.idroelettrica / 1200)
        .attr("rx", xScalePetal(datacase.idroelettrica))
        //.attr("ry", petalWidth*(datacase.idroelettrica / 30000))
        .attr("ry", yScalePetal(datacase.idroelettrica))
        .attr("transform", "rotate(45 " + offset + " " + (flowerHeight) + ")")
        .style("fill", "#3e59f0")
        .style("stroke", "black")
        .on("click", function () {
            console.log("Hai cliccato un'ellisse blu")
            // QUI MOMENTANEAMENTE TOGLIAMO IL SORTING VECCHIO
            //svgContainer.selectAll("*").remove();
            //sortDataset("idroelettrica");

            // QUI INSERIAMO IL METODO NUOVO PER TESTARE LA TRANSITION
            moveFlowersWithTransition("idroelettrica");
        })

    // petalo eolica: verde
    svgContainer.selectAll(".flower" + datacase.anno)
        .append("ellipse")
        .attr("class", "ellipseVerde")
        .attr("cx", offset - xScalePetal(datacase.eolica))
        .attr("cy", flowerHeight)
        //.attr("rx", datacase.eolica / 1000)
        .attr("rx", xScalePetal(datacase.eolica))
        //.attr("ry", petalWidth*(datacase.eolica / 15000))
        .attr("ry", yScalePetal(datacase.eolica))
        .attr("transform", "rotate(135 " + offset + " " + (flowerHeight) + ")")
        .style("fill", "green")
        .style("stroke", "black")
        .on("click", function () {
            console.log("Hai cliccato un'ellisse verde");
            moveFlowersWithTransition("eolica");
        })

    // petalo fotovoltaica: giallo
    svgContainer.selectAll(".flower" + datacase.anno)
        .append("ellipse")
        .attr("class", "ellipseGialla")
        .attr("cx", offset - xScalePetal(datacase.fotovoltaica))
        .attr("cy", flowerHeight)
        //.attr("rx", datacase.fotovoltaica / 1000)
        .attr("rx", xScalePetal(datacase.fotovoltaica))
        //.attr("ry", petalWidth*(datacase.fotovoltaica / 30000))
        .attr("ry", yScalePetal(datacase.fotovoltaica))
        .attr("transform", "rotate(225 " + offset + " " + (flowerHeight) + ")")
        .style("fill", "#e8be4a")
        .style("stroke", "black")
        .on("click", function () {
            console.log("Hai cliccato un'ellisse gialla");
            moveFlowersWithTransition("fotovoltaica");
        })

    // petalo geotermica: rosso
    svgContainer.selectAll(".flower" + datacase.anno)
        .append("ellipse")
        .attr("class", "ellipseRossa")
        .attr("cx", offset - xScalePetal(datacase.geotermica))
        .attr("cy", flowerHeight)
        //.attr("rx", datacase.geotermica / 1000)
        .attr("rx", xScalePetal(datacase.geotermica))
        //.attr("ry", petalWidth*(datacase.geotermica / 15000))
        .attr("ry", yScalePetal(datacase.geotermica))
        .attr("transform", "rotate(315 " + offset + " " + (flowerHeight) + ")")
        .style("fill", "#c93934")
        .style("stroke", "black")
        .on("click", function () {
            console.log("Hai cliccato un'ellisse rossa");
            moveFlowersWithTransition("geotermica");
        })

    // etichetta sul totale dei MW
    svgContainer.selectAll(".flower" + datacase.anno)
        .append("text")
        .attr("class","totalMW")
        .text(totalMW + " MW")
        .attr("x", offset - 35)
        .attr("y", flowerHeight + 70)
        .style("color", "black")

    // etichette dell'asse x
    svgContainer.selectAll(".flower" + datacase.anno)
        .append("text")
        .attr("class","yearLabel")
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
        // aggiorniamo le scale dei petali
        updatePetalScales(data);

        // l'offset è parametrico arbitrario rispetto alla dimensione della finestra
        offset = width / 11;
        data.forEach(datacase => {
            drawFlower(datacase, offset)
            offset += width / 11;
        })


    })
    .catch(function (error) {
        console.log(error); // Some error handling here
    });

