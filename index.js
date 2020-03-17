function searchData() {
  // fetch('https://coronavirus-19-api.herokuapp.com/all')
  fetch('https://coronavirus-19-api.herokuapp.com/countries')
    .then((response) => response.json())
    .then(json => console.log(json))
}

// const x=searchData();

document.getElementById('searchfield').addEventListener('keyup', function () {
  let pattern = new RegExp(this.value, 'i');
  let resultSet = x.filter(item => item.country.match(pattern) && this.value != '').map(item => `${item.country}`).join(', ');
  document.getElementById('searchresult').innerHTML = resultSet;
});
