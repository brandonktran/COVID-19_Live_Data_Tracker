function searchData() {
  // fetch('https://coronavirus-19-api.herokuapp.com/all')
  // fetch('https://coronavirus-19-api.herokuapp.com/countries')
  fetch('https://corona.lmao.ninja/countries')
    .then((response) => response.json())
    .then(json => console.log(json))
}


document.getElementById('searchfield').addEventListener('keyup', function () {
  let pattern = new RegExp(this.value, 'i');
  let resultSet = x.filter(item => item.country.match(pattern) && this.value != '').map(item => `${item.country}`).join(', ');
  document.getElementById('searchresult').innerHTML = resultSet;
});
