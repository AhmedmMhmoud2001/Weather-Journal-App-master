/* Global Variables */
const app__form = document.querySelector('.app__form');
const icons = document.querySelectorAll('.entry__icon');

// Base URL and API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=5beb43e13dc3fa8be428191e6e50a00c';

//Get the date
let d = new Date();
let newDate = d.getMonth() +1+ '.' + d.getDate() + '.' + d.getFullYear();

// when click on generate
const generate = document.getElementById('generate');
generate.addEventListener('click', performAction);

/* Function performAction  */
function performAction(e) {
  e.preventDefault();
  const codeZip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;
  getWeather(baseURL, codeZip, apiKey)
    .then(function (userData) {
      postData('/add', { 
        date: newDate,
        temp: userData.main.temp,
        content 
      })
    }).then(function (newData) {updateUI()})
  form.reset();
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, codeZip, apiKey) => {
  const res = await fetch(baseURL + codeZip + apiKey);
  try {

    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("error 404", error);
  }
}





/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  })

  try {
    const newData = await req.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};






/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()

    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp + 'degrees';
    document.getElementById('content').innerHTML = allData.content;
  }
  catch (error) {
    console.log("error404", error);
  }
};


// const updateUI = async () =>{
//   const request = await fetch('/all');
//   try {
//   // Transform into JSON
//   const allData = await request.json()
//   console.log(allData)
//   // Write updated data to DOM elements
//   document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
//   document.getElementById('content').innerHTML = allData.feel;
//   document.getElementById("date").innerHTML =allData.date;
//   }
//   catch(error) {
//     console.log("error", error);
//     // appropriately handle the error
//   }
//  }