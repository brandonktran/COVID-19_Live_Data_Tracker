function search_country() {
  let input = document.getElementById('searchbar').value
  input = input.toLowerCase();
  let x = document.getElementsByClassName('data');

  for (i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display = "none";
    }
    else {
      x[i].style.display = "list-item";
    }
  }
}

document.getElementById('getData').addEventListener('click', getData);

function getData() {
  fetch('https://corona.lmao.ninja/all')
    .then((response) => response.json())
    .then((data) => {
      // console.log(data['cases'])
      let output = '<h3> Total Cases: ' + JSON.stringify(data['cases']) + '</h3>';
      output += ' <h3> Total Deaths: ' + JSON.stringify(data['deaths']) + '</h3>';
      output += ' <h3> Total Recovered: ' + JSON.stringify(data['recovered']) + '</h3>';
      document.getElementById('main').innerHTML = output;
    });


  fetch('https://corona.lmao.ninja/countries')
    .then((response) => response.json())
    .then((countries) => {
      let output = '';
      output += '<ul>';
      countries.forEach(function (country) {
        output += `
              <li class = "data">
                <b>${country.country}</b>
                  <ul>
                    <li>Number of Cases: ${country.cases}</li>
                    <li>Cases Today: ${country.todayCases}</li>
                    <li class= "deaths">Total Deaths: ${country.deaths}</li>
                    <li class = "deaths">Deaths Today: ${country.todayDeaths}</li>
                    <li class= "deaths">Critical: ${country.critical}</li>
                    <li>Recovered: ${country.recovered}</li>
                    <li>Active: ${country.active}</li>
                  </ul>
              </li>
      `;
      });
      output += '</ul>';
      document.getElementById('response').innerHTML = output;
    });

}

getData();
