// JavaScript code
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


// function createNode(element) {
//   return document.createElement(element);
// }

// function append(parent, el) {
//   return parent.appendChild(el);
// }

// const ul = document.getElementById('countriesData');
// const url = 'https://corona.lmao.ninja/countries';

// function getData() {
//   fetch(url)
//     .then((resp) => resp.json())
//     .then(function (countries) {
//       return countries.forEach(function(country) {
//         let li = createNode('li');
//         li.innerHTML = ${country.country};
//         //   img = createNode('img'),
//         //   span = createNode('span');
//         // img.src = data.picture.medium;
//         // span.innerHTML = `${data.name.first} ${data.name.last}`;
//         // append(li, img);
//         // append(li, span);
//         append(ul, li);
//       })
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }






        //   fetch('https://corona.lmao.ninja/all')
        //     .then((response) => response.json())
        //     .then(function (data) {
        //       return console.log(data);
        //     });
        // }

        // let x= getData();
        // let y=x.cases;
        // let outputMain = document.createElement('h3');
        // let MainText = document.createTextNode(toString(y));     // Create a text node
        // outputMain.appendChild(MainText);
        // document.getElementById('main').innerHTML = outputMain.innerHTML;
