console.log('Javascript is working');

window.addEventListener('load', displayDriverStandings)

const years = document.getElementById("yearSelect");

const displayYear = async () => {
    try {
        const response = await fetch("https://ergast.com/api/f1/seasons.json");
        const data = await response.json();
        data.MRData.SeasonTable.Seasons.forEach((option) => {
            const newOption = document.createElement("option");
            newOption.value = option.season;
            newOption.text = option.season;
            years.appendChild(newOption);
        });
    } catch (error) {
        console.error("Error:", error);
    }
};

displayYear();

async function displayDriverStandings() {
    document.getElementById("racers").innerHTML = "Loading...";

    let year = document.getElementById('yearSelect').value;
    if (year == '') {
        year = 1950;
    }

    try {
        const response = await fetch(`https://ergast.com/api/f1/${year}/driverStandings.json`);
        const data = await response.json();
        let table = `<tr><th>Name</th><th>Points</th><th>Nationality</th></tr>`;
        data.MRData.StandingsTable.StandingsLists[0].DriverStandings.forEach((driver) => {
            table += `<tr>
          <td>${driver.Driver.givenName} ${driver.Driver.familyName}</td>
          <td>${driver.points}</td>
          <td>${driver.Driver.nationality}</td>
        </tr>`;
        });
        document.getElementById("racers").innerHTML = table;
    } catch (err) {
        console.log('warning', err);
    }
}



years.addEventListener("change", displayDriverStandings);

