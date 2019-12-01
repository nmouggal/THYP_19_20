var vals = {"Pas besoin":1, "Besoin d'approfondissement":5, "Besoin urgent":10, "je ne connais pas du tout":1,"je connais un peu":5,"je vonnais bien":10,"je suis expert(e)":20};

var addYourInfoURL = "https://forms.gle/Wp4Sbf173oUzASU88";

var url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRPYNknmIr5_bU7GfiJtuS_b9fGae7HZwcjAiMoAC24fLzIfxRtXQySMu3E95D3M595D3DYT7NUtvzt/pub?gid=760811187&single=true&output=csv'            
var q = d3.queue()
    .defer(d3.csv, url)
    .awaitAll(function(error, results) {
      if (error) throw error;
      setData(results);
    });

function setData(data)
{
    dataForm = data[0];

    //Load More Data From My Forms
    var url = 'https://docs.google.com/spreadsheets/d/16QtnqGSSKSTvvflBdvcutRTsqxsFfDeve10dh8YoUNM/export?format=csv&id=16QtnqGSSKSTvvflBdvcutRTsqxsFfDeve10dh8YoUNM&gid=844323923'            
    var q = d3.queue()
    .defer(d3.csv, url)
    .awaitAll(function(error, results) {
      if (error) throw error;
      
      dataForm2 = results[0];

      dataForm2.forEach(function(d, j){
        
        var ne1 = d["Numéro d'étudiant"];

        dataForm.forEach(function(dd, jj)
        {
            var ne2 = dd["N° étudiant"];

            if(ne1 === ne2)
            {
                dd.tel = d["Numéro de téléphone"];
                dd.adress = d["Adresse Postale"];
                dd.bio = d["Bio"];
                dd.facebook = d["Facebook"];
                dd.twitter = d["Twitter"];
                dd.linckedin = d["LinckedIn"];
                dd.github = d["Github"];
                dd.Experience1 = d["Experience 1"];
                dd.DateExperience1 = d["Date Experience 1"];
                dd.NomSocieté1 = d["Nom Societé 1"];
                dd.DescriptionExperience1 = d["Description Experience 1"];
                dd.Experience2 = d["Experience 2"];
                dd.DateExperience2 = d["Date Experience 2"];
                dd.NomSocieté2 = d["Nom Societé 2"];
                dd.DescriptionExperience2 = d["Description Experience 2"];
                dd.Experience3 = d["Experience 3"];
                dd.DateExperience3 = d["Date Experience 3"];
                dd.NomSocieté3 = d["Nom Societé 3"];
                dd.DescriptionExperience3 = d["Description Experience 3"];
                dd.Nomdétablissement1 = d["Nom d'établissement 1"];
                dd.DateDiplome1 = d["Date Diplome 1"];
                dd.Intitulédudiplome1 = d["Intitulé du diplome 1"];
                dd.DescriptionDiplome1 = d["Description Diplome 1"];
                dd.Nomdétablissement2 = d["Nom d'établissement 2"];
                dd.DateDiplome2 = d["Date Diplome 2"];
                dd.Intitulédudiplome2 = d["Intitulé du diplome 2"];
                dd.DescriptionDiplome2 = d["Description Diplome 2"];
                dd.Nomdétablissement3 = d["Nom d'établissement 3"];
                dd.DateDiplome3 = d["Date Diplome 3"];
                dd.Intitulédudiplome3 = d["Intitulé du diplome 3"];
                dd.DescriptionDiplome3 = d["Description Diplome 3"];
                dd.Interests = d["Interests"];
            }
        });

      });

    });

    let dataEtu = []; 

    //réorganise les datas
    dataForm.forEach(function(d, j){
        d.reponses = {'besoins':[],'competences':[],'outils':[]};
        for (let i in d) {
            var prop = i.substring(i.indexOf("[")+1,i.indexOf("]")); 
            var v = d[i];
            var n = vals[v];
            if(i.indexOf("besoins")>0){
                d.reponses.besoins.push({'prop':prop,'importance':n,'expression':v,'id':j});
            }
            if(i.indexOf("compétences")>0){
                d.reponses.competences.push({'prop':prop,'importance':n,'expression':v,'id':j});
            }
            if(i.indexOf("outils utilisez")>0){
                d.reponses.outils.push({'prop':prop,'importance':n,'expression':v,'id':j});
            }							
        }
    });	

    //Fill drop down of students, #dropDownStudents
    var dropDown = d3.select("#dropDownStudents")
                    .selectAll("a")
                    .data(dataForm).enter()
                    .append("a")
                    .attr("class", "dropdown-item")
                    .text(function(d, i) 
                    {
                        return d['Votre prénom'] + ' ' + d['Votre nom'].toString().toUpperCase();
                    });

    // Click Event On Element In The DropDown
    d3.select("#dropDownStudents")
      .selectAll("a")
      .on('click', function(e, i)
       {
            //Set title
            d3.select("title").text(e["Votre prénom"] + " " + e["Votre nom"].toString().toUpperCase() + " - CV")

            //Set firstName
            d3.select("#firstName").text(e["Votre prénom"]);

            //Set lastName
            d3.select("#lastName").text(e["Votre nom"]);

            //Set adress
            if(e.adress != null)
                d3.select("#adress").text(e["adress"]);
            else
                d3.select("#adress").html('<a href="'+addYourInfoURL+'" target="_blank">Ajoutez vos informations</a>');

            //Set phone number
            if(e.tel != null)
                d3.select("#phoneNumber").text(e["tel"]);
            else
                d3.select("#phoneNumber").html('<a href="'+addYourInfoURL+'" target="_blank">Ajoutez vos informations</a>');

            //Set mail
            d3.select("#mail").attr("href", 'mailto:' + e["Votre mail"]);
            d3.select("#mail").text(e["Votre mail"]);

            //Set Bio
            if(e.bio != null)
                d3.select("#bio").text(e.bio);
            else
                d3.select("#bio").html('<a href="'+addYourInfoURL+'" target="_blank">Ajoutez vos informations</a>');

            //Set Social Media
            //Set Facebook
            d3.select("#socialMedia").html("");
            if(e.facebook == null && e.twitter == null && e.linckedin == null && e.github == null)
            {
                d3.select("#socialMedia").append("span").html('<a href="'+addYourInfoURL+'" target="_blank">Ajoutez vos informations</a>');
            }
            else
            {
                var level = d3.select("#socialMedia").append("li").attr("class", "list-inline-item")
                                        .append("a").attr("id", "facebook").attr("href", "https://www.facebook.com/" + e.facebook)
                                        .append("span").attr("class", "fa-stack fa-lg");
                level.append("i").attr("class", "fa fa-circle fa-stack-2x");
                level.append("i").attr("class", "fa fa-facebook fa-stack-1x fa-inverse");

                //Set Twitter
                level = d3.select("#socialMedia").append("li").attr("class", "list-inline-item")
                                        .append("a").attr("id", "twitter").attr("href", "https://www.twitter.com/" + e.twitter)
                                        .append("span").attr("class", "fa-stack fa-lg");
                level.append("i").attr("class", "fa fa-circle fa-stack-2x");
                level.append("i").attr("class", "fa fa-twitter fa-stack-1x fa-inverse");

                //Set LinckedIn
                level = d3.select("#socialMedia").append("li").attr("class", "list-inline-item")
                                        .append("a").attr("id", "twitter").attr("href", "https://www.linkedin.com/in/" + e.linckedin)
                                        .append("span").attr("class", "fa-stack fa-lg");
                level.append("i").attr("class", "fa fa-circle fa-stack-2x");
                level.append("i").attr("class", "fa fa-linkedin fa-stack-1x fa-inverse");

                //Set Github
                level = d3.select("#socialMedia").append("li").attr("class", "list-inline-item")
                                        .append("a").attr("id", "twitter").attr("href", "https://www.github.com/" + e.github)
                                        .append("span").attr("class", "fa-stack fa-lg");
                level.append("i").attr("class", "fa fa-circle fa-stack-2x");
                level.append("i").attr("class", "fa fa-github fa-stack-1x fa-inverse");
            }

            //Set Experience
            var experienceElement = d3.select("#experienceTarget").html("");
            if(e.Experience1 == null)
            {
                experienceElement.append("span").html('<a href="'+addYourInfoURL+'" target="_blank">Ajoutez vos informations</a>');
            }
            else
            {
                var divElement = experienceElement.append("div").attr("class", "resume-item d-flex flex-column flex-md-row mb-5");
                var div2Element = divElement.append("div").attr("class", "resume-content mr-auto");
                div2Element.append("h3").attr("class", "mb-0").text(e.Experience1);
                div2Element.append("div").attr("class", "subheading mb-3").text(e.NomSocieté1);
                div2Element.append("p").text(e.DescriptionExperience1);
                divElement.append("div").attr("class", "resume-date text-md-right").append("span").attr("class", "text-primary").text(e.DateExperience1);
            }
            if(e.Experience2 != null)
            {
                var divElement = experienceElement.append("div").attr("class", "resume-item d-flex flex-column flex-md-row mb-5");
                var div2Element = divElement.append("div").attr("class", "resume-content mr-auto");
                div2Element.append("h3").attr("class", "mb-0").text(e.Experience2);
                div2Element.append("div").attr("class", "subheading mb-3").text(e.NomSocieté2);
                div2Element.append("p").text(e.DescriptionExperience2);
                divElement.append("div").attr("class", "resume-date text-md-right").append("span").attr("class", "text-primary").text(e.DateExperience2);
            }
            if(e.Experience3 != null)
            {
                var divElement = experienceElement.append("div").attr("class", "resume-item d-flex flex-column flex-md-row mb-5");
                var div2Element = divElement.append("div").attr("class", "resume-content mr-auto");
                div2Element.append("h3").attr("class", "mb-0").text(e.Experience3);
                div2Element.append("div").attr("class", "subheading mb-3").text(e.NomSocieté3);
                div2Element.append("p").text(e.DescriptionExperience3);
                divElement.append("div").attr("class", "resume-date text-md-right").append("span").attr("class", "text-primary").text(e.DateExperience3);
            }
            
            //Set Education
            var educationElement = d3.select("#educationTarget").html("");
            if(e.Nomdétablissement1 == null)
            {
                educationElement.append("span").html('<a href="'+addYourInfoURL+'" target="_blank">Ajoutez vos informations</a>');
            }
            else
            {
                var divElement = educationElement.append("div").attr("class", "resume-item d-flex flex-column flex-md-row mb-5");
                var div2Element = divElement.append("div").attr("class", "resume-content mr-auto");
                div2Element.append("h3").attr("class", "mb-0").text(e.Nomdétablissement1);
                div2Element.append("div").attr("class", "subheading mb-3").text(e.Intitulédudiplome1);
                div2Element.append("p").text(e.DescriptionDiplome1);
                divElement.append("div").attr("class", "resume-date text-md-right").append("span").attr("class", "text-primary").text(e.DescriptionDiplome1);
            }
            if(e.Nomdétablissement2 != null)
            {
                var divElement = educationElement.append("div").attr("class", "resume-item d-flex flex-column flex-md-row mb-5");
                var div2Element = divElement.append("div").attr("class", "resume-content mr-auto");
                div2Element.append("h3").attr("class", "mb-0").text(e.Nomdétablissement2);
                div2Element.append("div").attr("class", "subheading mb-3").text(e.Intitulédudiplome2);
                div2Element.append("p").text(e.DescriptionDiplome2);
                divElement.append("div").attr("class", "resume-date text-md-right").append("span").attr("class", "text-primary").text(e.DescriptionDiplome2);
            }
            if(e.Nomdétablissement3 != null)
            {
                var divElement = educationElement.append("div").attr("class", "resume-item d-flex flex-column flex-md-row mb-5");
                var div2Element = divElement.append("div").attr("class", "resume-content mr-auto");
                div2Element.append("h3").attr("class", "mb-0").text(e.Nomdétablissement3);
                div2Element.append("div").attr("class", "subheading mb-3").text(e.Intitulédudiplome3);
                div2Element.append("p").text(e.DescriptionDiplome3);
                divElement.append("div").attr("class", "resume-date text-md-right").append("span").attr("class", "text-primary").text(e.DescriptionDiplome3);
            }

            // Set Competances
            //construction du layout pour les graphiques
            var html = '<div class="container"><div class="row">';
            html += '<div id="etudNum_'+i+'_Col1" class="col-sm" style="padding-right:0px;padding-left:0px;"></div>';
            html += '<div id="etudNum_'+i+'_Col2" class="col-sm" style="padding-right:0px;padding-left:0px;"></div>';
            html += '<div id="etudNum_'+i+'_Col3" class="col-sm" style="padding-right:0px;padding-left:0px;"></div>';
            html += '</div></div>';
            var cardBody = d3.select("#competanceTarget").html(html)
            var size = 300;
            drawGraphReponse("#etudNum_"+i+"_Col1", 'Besoins', e.reponses.besoins, size);
            drawGraphReponse("#etudNum_"+i+"_Col2", 'Compétences', e.reponses.competences, size);
            drawGraphReponse("#etudNum_"+i+"_Col3", 'Outils', e.reponses.outils, size);
            
            //Set InterestsTarget
            if(e.Interests == null)
                d3.select("#InterestsTarget").html('<a href="'+addYourInfoURL+'" target="_blank">Ajoutez vos informations</a>');
            else
                d3.select("#InterestsTarget").text(e.Interests);


           //Set Profile Image
           d3.select("#profileImage").attr("src", function() { 
                //merci à https://davidwalsh.name/query-string-javascript
                // https://developers.google.com/web/updates/2016/01/urlsearchparams?hl=en
                let url = new URL(e['Votre photo']);
                let urlParam = new URLSearchParams(url.search);
                let id = urlParam.get('id');
                //merci à https://stackoverflow.com/questions/50664868/get-pictures-from-google-drive-folder-with-javascript-to-my-website
                let urlTof = "https://drive.google.com/uc?id="+id+"&export=download";                        
                return urlTof; 
                });
       });
}

function drawGraphReponse(idE, titre, data, size){
	/*à voir si dimple marche mieux
    var svg = dimple.newSvg("#"+idE, 200, 200);
    var myChart = new dimple.chart(svg, data);
    myChart.setBounds(6, 6, 184, 184)
    myChart.addMeasureAxis("p", "val");
    var outerRing = myChart.addSeries("besoins", dimple.plot.pie);
    var innerRing = myChart.addSeries("compétences", dimple.plot.pie);
    var centerRing = myChart.addSeries("outils", dimple.plot.pie);
    // Negatives are calculated from outside edge, positives from center
    outerRing.innerRadius = "-10px";
    innerRing.outerRadius = "-20px";
    innerRing.innerRadius = "-30px";
    centerRing.outerRadius = "-40px";
    centerRing.innerRadius = "-50px";
    //myChart.addLegend(500, 20, 90, 300, "left");
    myChart.draw();
    */
    //
	var donut = donutChart()
	    .width(size)
	    .height(size)
	    .cornerRadius(3) // sets how rounded the corners are on each slice
	    .padAngle(0.015) // effectively dictates the gap between slices
	    .variable('importance')
	    .category('prop')
	    .title(titre);
    d3.select(idE)
        .datum(data) // bind data to the div
        .call(donut); // draw chart in div
}

//merci à https://bl.ocks.org/mbhall88/b2504f8f3e384de4ff2b9dfa60f325e2
function donutChart() {
    var width,
        height,
        margin = {top: 0, right: 0, bottom: 10, left: 0},
        colour = d3.scaleOrdinal(d3.schemeCategory20c), // colour scheme
        variable, // value in data that will dictate proportions on chart
        category, // compare data by
        padAngle, // effectively dictates the gap between slices
        floatFormat = d3.format('.4r'),
        cornerRadius, // sets how rounded the corners are on each slice
        percentFormat = d3.format(',.2%'),
        title;

    function chart(selection){
        selection.each(function(data) {
            // generate chart

            // ===========================================================================================
            // Set up constructors for making donut. See https://github.com/d3/d3-shape/blob/master/README.md
            var radius = Math.min(width, height) / 2;

            // creates a new pie generator
            var pie = d3.pie()
                .value(function(d) { return floatFormat(d[variable]); })
                .sort(null);

            // contructs and arc generator. This will be used for the donut. The difference between outer and inner
            // radius will dictate the thickness of the donut
            var arc = d3.arc()
                .outerRadius(radius * 0.8)
                .innerRadius(radius * 0.6)
                .cornerRadius(cornerRadius)
                .padAngle(padAngle);

            // this arc is used for aligning the text labels
            var outerArc = d3.arc()
                .outerRadius(radius * 0.9)
                .innerRadius(radius * 0.9);
            // ===========================================================================================

            // ===========================================================================================
            // append the svg object to the selection
            var wSvg = width + margin.left + margin.right, hSvg = height + margin.top + margin.bottom; 
            var svg = selection.append('svg')
                .attr('width', wSvg)
                .attr('height', hSvg)
              .append('g')
                .attr('transform', 'translate(' + wSvg / 2 + ',' + hSvg / 2 + ')');            	
            // ===========================================================================================
            // g elements to keep elements within svg modular
            svg.append('g').attr('class', 'slices');
            svg.append('g').attr('class', 'labelName');
            svg.append('g').attr('class', 'lines');
            // ===========================================================================================

            // ===========================================================================================
            // add and colour the donut slices
            var path = svg.select('.slices')
                .datum(data).selectAll('path')
                .data(pie)
              .enter().append('path')
                .attr('fill', function(d) { return colour(d.data[category]); })
                .attr('d', arc);
            // ===========================================================================================

            // ===========================================================================================
            /* add text labels
            var label = svg.select('.labelName').selectAll('text')
                .data(pie)
              .enter().append('text')
                .attr('dy', '.35em')
                .html(function(d) {
                    // add "key: value" for given category. Number inside tspan is bolded in stylesheet.
                    return d.data[category] + ': <tspan>' + percentFormat(d.data[variable]) + '</tspan>';
                })
                .attr('transform', function(d) {

                    // effectively computes the centre of the slice.
                    // see https://github.com/d3/d3-shape/blob/master/README.md#arc_centroid
                    var pos = outerArc.centroid(d);

                    // changes the point to be on left or right depending on where label is.
                    pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                    return 'translate(' + pos + ')';
                })
                .style('text-anchor', function(d) {
                    // if slice centre is on the left, anchor text to start, otherwise anchor to end
                    return (midAngle(d)) < Math.PI ? 'start' : 'end';
                });
            */
            // ===========================================================================================

            /* ===========================================================================================
            // add lines connecting labels to slice. A polyline creates straight lines connecting several points
            var polyline = svg.select('.lines')
                .selectAll('polyline')
                .data(pie)
              .enter().append('polyline')
                .attr('points', function(d) {

                    // see label transform function for explanations of these three lines.
                    var pos = outerArc.centroid(d);
                    pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                    return [arc.centroid(d), outerArc.centroid(d), pos]
                });
            */
            // ===========================================================================================

            // ===========================================================================================

            //ajoute le titre
            svg.append('text')
                .html(title)            
                .attr('text-anchor', 'middle')
                .attr('y', hSvg/2);            	


            // ===========================================================================================
            // add tooltip to mouse events on slices and labels
            d3.selectAll('.labelName text, .slices path').call(toolTip);
            // ===========================================================================================

            // ===========================================================================================
            // Functions

            // calculates the angle for the middle of a slice
            function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; }

            // function that creates and adds the tool tip to a selected element
            function toolTip(selection) {

                // add tooltip (svg circle element) when mouse enters label or slice
                selection.on('mouseenter', function (data) {
                	
                		//rend l'image trnasparente
                		//d3.select('#imgCard'+data.data.id).style('opacity', 0.35);
                		//affiche le texte
                		d3.select("#messageHover").text(data.data.prop + " : " + data.data.expression);               		

                    /*
                		svg.append('text')
                        .attr('class', 'toolCircle')
                        .attr('dy', -15) // hard-coded. can adjust this to adjust text vertical alignment in tooltip
                        .html(toolTipHTML(data)) // add text to the circle.
                        .style('font-size', '.9em')
                        .style('text-anchor', 'middle'); // centres text in tooltip

                    svg.append('circle')
                        .attr('class', 'toolCircle')
                        .attr('r', radius * 0.55) // radius of tooltip circle
                        .style('fill', colour(data.data[category])) // colour based on category mouse is over
                        .style('fill-opacity', 0.35);
					*/
                });

                // remove the tooltip when mouse leaves the slice/label
                selection.on('mouseout', function (data) {
                    d3.select("#messageHover").text("");                  		                    
                });
            }

            // function to create the HTML string for the tool tip. Loops through each key in data object
            // and returns the html string key: value
            function toolTipHTML(data) {

            		var tip = '<h6 class="card-title">'+data.data.prop+'</h6>'
            		tip += '<p class="card-text">'+data.data.expression+'</p>';
                /*
            		var tip = '',
                    i   = 0;

                for (var key in data.data) {

                    // if value is a number, format it as a percentage
                    var value = (!isNaN(parseFloat(data.data[key]))) ? percentFormat(data.data[key]) : data.data[key];

                    // leave off 'dy' attr for first tspan so the 'dy' attr on text element works. The 'dy' attr on
                    // tspan effectively imitates a line break.
                    if (i === 0) tip += '<tspan x="0">' + key + ': ' + value + '</tspan>';
                    else tip += '<tspan x="0" dy="1.2em">' + key + ': ' + value + '</tspan>';
                    i++;
                }
				*/
                return tip;
            }
            // ===========================================================================================

        });
    }

    // getter and setter functions. See Mike Bostocks post "Towards Reusable Charts" for a tutorial on how this works.
    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    chart.margin = function(value) {
        if (!arguments.length) return margin;
        margin = value;
        return chart;
    };

    chart.radius = function(value) {
        if (!arguments.length) return radius;
        radius = value;
        return chart;
    };

    chart.padAngle = function(value) {
        if (!arguments.length) return padAngle;
        padAngle = value;
        return chart;
    };

    chart.cornerRadius = function(value) {
        if (!arguments.length) return cornerRadius;
        cornerRadius = value;
        return chart;
    };

    chart.colour = function(value) {
        if (!arguments.length) return colour;
        colour = value;
        return chart;
    };

    chart.variable = function(value) {
        if (!arguments.length) return variable;
        variable = value;
        return chart;
    };

    chart.category = function(value) {
        if (!arguments.length) return category;
        category = value;
        return chart;
    };

    chart.title = function(value) {
        if (!arguments.length) return title;
        title = value;
        return chart;
    };
    
    return chart;
}