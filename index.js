// Comment - This line is not executed.
// This is my first JavaScript code

function fetchData()
{
    fetch('https://api.data.gov.sg/v1/environment/psi' , {method: 'GET'})
    .then(res => {
        if (res.ok) {
            console.log("Success")
            return res.json()
        }
        else {
            console.log("Not successful")
        }
    })
    .then(data => 
        {   
            var mydate = new Date(data.items[0].update_timestamp);
            var htmlTable = "<table border ='1'><tr><th colspan='7'>Last Updated : " + mydate   + "</th></tr></th><th>Type</th><th>West</th><th>National</th><th>East</th><th>Central</th>"
            + "<th>South</th><th>North</th></tr>";
            for (var key in data.items[0].readings){
                htmlTable = htmlTable + "<tr>";
                htmlTable = htmlTable + "<td>" + key + "</td>";
                htmlTable = htmlTable + "<td>" + data.items[0].readings[key]["west"] + "</td>";
                htmlTable = htmlTable + "<td>" + data.items[0].readings[key]["national"] + "</td>";
                htmlTable = htmlTable + "<td>" + data.items[0].readings[key]["east"] + "</td>";
                htmlTable = htmlTable + "<td>" + data.items[0].readings[key]["central"] + "</td>";
                htmlTable = htmlTable + "<td>" + data.items[0].readings[key]["south"] + "</td>";
                htmlTable = htmlTable + "<td>" + data.items[0].readings[key]["north"] + "</td>";                
                htmlTable = htmlTable + "</tr>";
            }
            htmlTable = htmlTable + "</table>";
            document.querySelector('#carparks').insertAdjacentHTML("afterbegin", htmlTable);
        })
    .catch(error => console.log("Error"));
}




fetchData();