const request = new XMLHttpRequest();

request.onload = function () {
  //this = request object
  //if request is ok...
  if (this.status === 200) {
    try {
      const responseObj = JSON.parse(this.responseText);
      console.log(responseObj[0].day + " " + responseObj[0].amount); //prints mon 17.45
      const mon = responseObj[0].day;
      const tue = responseObj[1].day;
      const wed = responseObj[2].day;
      const thu = responseObj[3].day;
      const fri = responseObj[4].day;
      const sat = responseObj[5].day;
      const sun = responseObj[6].day;

      const monData = responseObj[0].amount;
      const tueData = responseObj[1].amount;
      const wedData = responseObj[2].amount;
      const thuData = responseObj[3].amount;
      const friData = responseObj[4].amount;
      const satData = responseObj[5].amount;
      const sunData = responseObj[6].amount;

      const currentDay = new Date().getDay();
      console.log(currentDay);
      const currentDayColour = "hsl(186, 34%, 60%)";

      // Create an array of colors with default color for other days
      const barColors = [
        "rgba(236,117,93)", // Default color for Sunday
        "rgba(236,117,93)", // Default color for Monday
        "rgba(236,117,93)", // Default color for Tuesday
        "rgba(236,117,93)", // Default color for Wednesday
        "rgba(236,117,93)", // Default color for Thursday
        "rgba(236,117,93)", // Default color for Friday
        "rgba(236,117,93)", // Default color for Saturday
      ];

      barColors[currentDay - 1] = currentDayColour;

      const ctx = document.getElementById("spendingChart");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: [mon, tue, wed, thu, fri, sat, sun],
          datasets: [
            {
              data: [
                monData,
                tueData,
                wedData,
                thuData,
                friData,
                satData,
                sunData,
              ],
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: barColors,
              hoverBackgroundColor: "rgb(255,155,135)",
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              display: false, // Remove the y-axis labels
            },
            x: {
              grid: {
                display: false, // Remove the x-axis grid lines
              },
              ticks: {
                font: {
                  family: "DM Sans", // Set the font family
                  size: 14, // Set the font size
                  weight: "300", // Set the font weight (optional)
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false, // Remove the legend
            },
            title: {
              display: false, // Remove the title
            },
          },
        },
      });
    } catch (e) {
      console.warn("There was an error in the JSON. Could not parse!");
    }
  } else {
    console.warn("Did not reveive 200 OK from response!");
  }
};
request.open("GET", "data.json");
request.send();

// //...do this
// let output = "";
// const responseObj = JSON.parse(this.responseText);
// const players = responseObj.players;
// console.log(players);
// for (let index = 0; index < players.length; index++) {
//   output += "<li>" + players[index] + "</li>";
// }
// document.getElementById("players").innerHTML = output;
