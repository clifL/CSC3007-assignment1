// Comment - This line is not executed.
// This is my first JavaScript code

function fetchData()
{
    fetch('https://api.data.gov.sg/v1/transport/carpark-availability' , {method: 'GET'})
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
            console.log(data.items[0].carpark_data);
            var i;
            var htmlTable = "<table border ='1'><tr><th>No.</th><th>Carpark Number</th><th>Timestamp</th><th>Lot Type</th><th>Total Lots</th><th>Lot Availability</th>"
            + "<th>Utilization</th></tr>";
            for (i = 0; i < data.items[0].carpark_data.length; i++) {
                htmlTable = htmlTable + "<tr>";
                htmlTable = htmlTable + "<td>" + (i+1) + "</td>";
                htmlTable = htmlTable + "<td>" + data.items[0].carpark_data[i].carpark_number + "</td>";
                htmlTable = htmlTable + "<td>" + data.items[0].carpark_data[i].update_datetime + "</td>";
                htmlTable = htmlTable + "<td>" + data.items[0].carpark_data[i].carpark_info[0].lot_type + "</td>";
                if (data.items[0].carpark_data[i].carpark_info[0].total_lots == 0)
                {
                    htmlTable = htmlTable + "<td style='background-color: #FFFF00'>" +  data.items[0].carpark_data[i].carpark_info[0].total_lots + "%</td>";
                }
                else
                {
                    htmlTable = htmlTable + "<td>" + data.items[0].carpark_data[i].carpark_info[0].total_lots + "</td>";
                }
                htmlTable = htmlTable + "<td>" + data.items[0].carpark_data[i].carpark_info[0].lots_available + "</td>";
                var utilization = (((data.items[0].carpark_data[i].carpark_info[0].total_lots - data.items[0].carpark_data[i].carpark_info[0].lots_available) / (data.items[0].carpark_data[i].carpark_info[0].total_lots) * 100)).toFixed(2);
                if (utilization > 80.0)
                {
                    htmlTable = htmlTable + "<td style='background-color: #e5011a; color: #ffffff'>" +  utilization + "%</td>";
                }
                else
                {
                    htmlTable = htmlTable + "<td>" +  utilization + "%</td>";
                }
                
                htmlTable = htmlTable + "</tr>";
            }
            htmlTable = htmlTable + "</table>";
            document.querySelector('#carparks').insertAdjacentHTML("afterbegin", htmlTable);
        })
    .catch(error => console.log("Error"));
}


fetchData();