//*=========================================================
//*                     FLAG-APP
//*=========================================================
body = document.querySelector("body");
const formSelect=document.querySelector(".form-select");
const allCountry =() =>{

  url = `https://restcountries.com/v3.1/all`;
  fetch(url).then(((res) => {

    return res.json();


  })).then(((data =>{
    let listcountry = [];
    data.forEach((item)=> {

      listcountry.push(item.name.common);
     });
     return listcountry.sort();
  }))).then(((data) => {
    data.forEach((item)=> {
      formSelect.innerHTML += `<option value="${item}">${item}</option>`;
    }
  );
}));}


const fetchCountryByName = (name) => {
  // if (name=="Open this select menu") {
  //   renderError();
  //   return "";
  // }
  const url = `https://restcountries.com/v3.1/name/${name}`;
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        renderError(`Something went wrong: ${res.status}`);
        throw new Error();
      }
      return res.json();
    })
    .then((data) => renderCountries(data))
    .catch((err) => console.log(err));
};

const renderError = () => {
  const countryDiv = document.querySelector(".countries");
  countryDiv.style.textAlign="center";
  body.style.background= `url('')`;
  countryDiv.innerHTML = `  
    <h2 >Countries can not fetched</h2>
    <img  src="./img/404.png" alt="" />
  `;
};

const renderCountries = (data) => {
  // console.log(data);
  const countryDiv = document.querySelector(".countries");
  countryDiv.innerHTML="";
  const {
    capital,
    currencies,
    flags: { svg },
    languages,
    name: { common },
    region,
  } = data[0];

  // console.log(Object.values(languages));
  // console.log(Object.values(currencies)[0].name);
  // console.log(Object.values(currencies)[0].symbol);

  countryDiv.innerHTML += `
    <div class="card mx-auto m-3 shadow-lg mt-5" style="width: 18rem;">
      <img src="${svg}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${common}</h5>
        <p class="card-text">${region}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <i class="fas fa-lg fa-landmark"></i> ${capital}
        </li>
        <li class="list-group-item">
          <i class="fas fa-lg fa-comments"></i> ${Object.values(languages)}
        </li>
        <li class="list-group-item">
          <i class="fas fa-lg fa-money-bill-wave"></i>
          ${Object.values(currencies).map((item) => Object.values(item) + " ")}
       </li>
      </ul>
    </div>


  `;
  renderBody(svg);
};

const renderBody = (svg) =>{

  body.style.background= `url('${svg}')`;

}

window.addEventListener("load", allCountry());

formSelect.addEventListener("change",(e)=> {

  console.log( e.target.value);
  fetchCountryByName(e.target.value);

})
