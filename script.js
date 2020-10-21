let tableBody = document.getElementById("tableBody");

let busUrl = "https://jp.rapidpg.com.my:10081/open/api/searcheta?stopName=smk%20chung%20ling%20(p)(kampung%20baru)";

const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Pulau%20Pinang%2CMY&appid=1fc0a08ee4a7bf87ab0b7a9a786efa83&units=metric";

var kawaii = ["ヾ(≧▽≦*)o", "q(≧▽≦q)", "(≧∇≦)ﾉ", "○( ＾皿＾)っ", "(❁´◡`❁)`", "(≧∀≦)ゞ", "O(∩_∩)O"];
document.getElementById("location").placeholder = kawaii[Math.floor((Math.random() * kawaii.length))];

function startTime() {
  var today = new Date();
  var h = checkTime(today.getHours());
  var m = checkTime(today.getMinutes());
  var s = checkTime(today.getSeconds());
  document.getElementById('time').innerHTML =
  h + ":" + m + ":" + s;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  return i<10 ? "0"+i : i;
}

function appendToTable(data=[]){
  //clear table first
  tableBody.innerHTML = "";

  // row number == number of buses
  for (i=0; i<data.length; i++){
    var route = data[i];

    var row = document.createElement('tr');

    var routeNumCell = document.createElement('td');
    var routeNumText = document.createTextNode(route.routeNm);

    var lingNumCell = document.createElement('td');
    var lingNumText = document.createTextNode(route.lingNm);

    var cells = [routeNumCell, lingNumCell];
    var texts = [routeNumText, lingNumText];

    let etaList = route.etaList;    
    for(h=0; h<2; h++){
      if(etaList == null || etaList[h] == undefined){
        var etaCell = document.createElement('td');
        var etaText = document.createTextNode("whoops too bad!");
        cells.push(etaCell);
        texts.push(etaText);
      } else{
        var etaCell = document.createElement('td');
        var etaText = document.createTextNode(`${etaList[h].eta} mins`);
        cells.push(etaCell);
        texts.push(etaText);
      }
    }

    for(k=0; k<cells.length; k++){
      cells[k].appendChild(texts[k]);
      row.appendChild(cells[k]);
    }

    tableBody.appendChild(row);
  }
  return;
}

function updateWeather(data=[]){
  let weatherIcon = document.getElementById("weatherIcon");
  let weatherText = document.getElementById("weatherText");

  weatherIcon.src = `https://openweathermap.org/img/w/${data[0].icon}.png`;
  weatherText.innerHTML = data[0].description;
}

function updateTempHum(data={}){
  let tempHum = document.getElementById("tempHum");
  tempHum.innerHTML = `${data.temp}°C ${data.humidity}%`;
}

function getData(){
  fetch(busUrl).then( 
    (response) => {
      if (response.status !== 200) {
        console.error(`whoops bus fetch (Status Code: ${response.status})`);
        return;
      }
      response.json().then(data => {
        // console.log(data.body);
        appendToTable(data.body);
      });
    }
  ).then(
    fetch(weatherUrl).then(
      (response) => { 
        if (response.status !== 200) {
          console.error(`whoops weather fetch (Status Code: ${response.status})`);
          return;
        }
        response.json().then(data => {
          //data.main and data.weather
          updateWeather(data.weather);
          updateTempHum(data.main)
        });
      }
    )    
  ).catch(err => {
      console.error(`Fetch Error :-S ${err}`);
  });

}

getData();
window.setInterval(()=>{
  getData();
}, 60*1000);

document.getElementById("submit").addEventListener("click", () => {
  var stop = document.getElementById("location").value;
  busUrl = `https://jp.rapidpg.com.my:10081/open/api/searcheta?stopName=${encodeURIComponent(stop)}`;
  getData();
});




function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  
  inp.addEventListener("input", function(e) {
    var a, b, i, val = this.value;
    closeAllLists();
    if (!val) { return false;}
    currentFocus = -1;
    
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");

    /*append div:*/
    this.parentNode.appendChild(a);

    for (i = 0; i < arr.length; i++) {
      /*create a DIV element for each thing*/
      b = document.createElement("DIV");
      b.innerHTML += arr[i];
      /*insert a input field with the current array item's value:*/
      b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
      b.classList.add("stop");
      /* when someone clicks on the item value*/
      b.addEventListener("click", function(e) {
        /*insert the value for the autocomplete text field:*/
        inp.value = this.getElementsByTagName("input")[0].value;
        closeAllLists();
      });
      a.appendChild(b);
    }   
  });

  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/* 
  TODO: add map (Google map embed)
  TODO: deploy
  
*/

/////::::::::::SAMPLE JSON:::::::::://///
// {
//   "status": "SUCCESS",
//   "statusCode": "OK",
//   "message": "Nearest Stops",
//   "body": [
//     {
//       "routeId": "30000024",
//       "routeNm": "502",
//       "lingId": "1000000484",
//       "lingNm": "JETI - BLK.PULAU",
//       "dirCd": "1",
//       "stopId": 12000066,
//       "stopNm": "SMK Chung Ling (P)(Kampung baru)",
//       "stopSeq": 22,
//       "stopCode": "I0Q0066",
//       "etaList": [
//         {
//           "stopId": 12000066,
//           "vehicleId": "PLA2935",
//           "routeId": "30000024",
//           "lineId": "1000000484",
//           "vehicleLat": "5.416342",
//           "vehicleLon": "100.330791",
//           "eta": 23
//         }
//       ]
//     },
//     {
//       "routeId": "30000016",
//       "routeNm": "306",
//       "lingId": "1000000623",
//       "lingNm": "HOSPITAL- AIRPORT",
//       "dirCd": "0",
//       "stopId": 12000066,
//       "stopNm": "SMK Chung Ling (P)(Kampung baru)",
//       "stopSeq": 5,
//       "stopCode": "I0Q0066",
//       "etaList": []
//     },
//     {
//       "routeId": "30000074",
//       "routeNm": "CT1A",
//       "lingId": "1000000379",
//       "lingNm": "CAT AIR ITAM A",
//       "dirCd": "0",
//       "stopId": 12000066,
//       "stopNm": "SMK Chung Ling (P)(Kampung baru)",
//       "stopSeq": 27,
//       "stopCode": "I0Q0066",
//       "etaList": []
//     },
//     {
//       "routeId": "30000007",
//       "routeNm": "203",
//       "lingId": "1000000427",
//       "lingNm": "JETI - AIR ITAM",
//       "dirCd": "0",
//       "stopId": 12000066,
//       "stopNm": "SMK Chung Ling (P)(Kampung baru)",
//       "stopSeq": 21,
//       "stopCode": "I0Q0066",
//       "etaList": []
//     }
//   ]
// }

// from 
//https://jp.rapidpg.com.my:10081/open/api/gtfs-search-pois?query=gurn

///////auto complete json sample
// [
//   {
//     "createdBy": "genscript",
//     "createdDate": "2019-01-09T18:28:41+08:00",
//     "lastModifiedBy": "genscript",
//     "lastModifiedDate": "2019-01-09T18:46:11+08:00",
//     "id": 1364,
//     "poiName": "Balai Bomba(Gurney)",
//     "nearStop1": "IHI1644",
//     "nearStop2": "IHI1645",
//     "nearStop3": "I0V0105",
//     "nearStop4": null,
//     "poiLat": "5.44088",
//     "poiLon": "100.30719"
//   },
//   {
//     "createdBy": "genscript",
//     "createdDate": "2019-01-09T18:28:41+08:00",
//     "lastModifiedBy": "genscript",
//     "lastModifiedDate": "2019-01-09T18:46:11+08:00",
//     "id": 1780,
//     "poiName": "Balai Bomba(Gurney)",
//     "nearStop1": "IHI1645",
//     "nearStop2": "IHI1644",
//     "nearStop3": "I0V0105",
//     "nearStop4": null,
//     "poiLat": "5.44107",
//     "poiLon": "100.30725"
//   },
//   {
//     "createdBy": "genscript",
//     "createdDate": "2019-01-09T18:28:41+08:00",
//     "lastModifiedBy": "genscript",
//     "lastModifiedDate": "2019-01-09T18:46:11+08:00",
//     "id": 1104,
//     "poiName": "Gurney Hotel",
//     "nearStop1": "ICR0719",
//     "nearStop2": "ICR0718",
//     "nearStop3": "ICR0720",
//     "nearStop4": null,
//     "poiLat": "5.42947",
//     "poiLon": "100.31879"
//   },
//   {
//     "createdBy": "genscript",
//     "createdDate": "2019-01-09T18:28:41+08:00",
//     "lastModifiedBy": "genscript",
//     "lastModifiedDate": "2019-01-09T18:46:11+08:00",
//     "id": 1584,
//     "poiName": "Gurney Paragon",
//     "nearStop1": "ICR0726",
//     "nearStop2": "I002110",
//     "nearStop3": "ICR0724",
//     "nearStop4": null,
//     "poiLat": "5.43463",
//     "poiLon": "100.31057"
//   },
//   {
//     "createdBy": "genscript",
//     "createdDate": "2019-01-09T18:28:41+08:00",
//     "lastModifiedBy": "genscript",
//     "lastModifiedDate": "2019-01-09T18:46:11+08:00",
//     "id": 1850,
//     "poiName": "Gurney Paragon",
//     "nearStop1": "I002110",
//     "nearStop2": "ICR0726",
//     "nearStop3": "ICR0727",
//     "nearStop4": null,
//     "poiLat": "5.43522",
//     "poiLon": "100.30998"
//   },
//   {
//     "createdBy": "genscript",
//     "createdDate": "2019-01-09T18:28:41+08:00",
//     "lastModifiedBy": "operator",
//     "lastModifiedDate": "2019-05-17T10:47:40+08:00",
//     "id": 1107,
//     "poiName": "Gurney Plaza, Jalan Kelawai",
//     "nearStop1": "ICR0727",
//     "nearStop2": "I002110",
//     "nearStop3": "ICR0726",
//     "nearStop4": null,
//     "poiLat": "5.43594",
//     "poiLon": "100.30881"
//   },
//   {
//     "createdBy": "genscript",
//     "createdDate": "2019-01-09T18:28:41+08:00",
//     "lastModifiedBy": "genscript",
//     "lastModifiedDate": "2019-01-09T18:46:11+08:00",
//     "id": 1272,
//     "poiName": "Jalan Bagan Jermal(Gurney)",
//     "nearStop1": "I0V0105",
//     "nearStop2": "IHI1644",
//     "nearStop3": "IHI1645",
//     "nearStop4": null,
//     "poiLat": "5.439603",
//     "poiLon": "100.30738"
//   },
//   {
//     "createdBy": "genscript",
//     "createdDate": "2019-01-09T18:28:41+08:00",
//     "lastModifiedBy": "genscript",
//     "lastModifiedDate": "2019-01-09T18:46:11+08:00",
//     "id": 1859,
//     "poiName": "Persiaran Gurney",
//     "nearStop1": "I0A0001",
//     "nearStop2": "IHI1645",
//     "nearStop3": "IHI1644",
//     "nearStop4": null,
//     "poiLat": "5.44099",
//     "poiLon": "100.30901"
//   },
//   {
//     "createdBy": "operator",
//     "createdDate": "2019-02-14T18:53:28+08:00",
//     "lastModifiedBy": "operator",
//     "lastModifiedDate": "2019-02-14T18:53:28+08:00",
//     "id": 2702,
//     "poiName": "Sunrise Tower Persiaran Gurney",
//     "nearStop1": "I0V0105",
//     "nearStop2": "",
//     "nearStop3": "",
//     "nearStop4": null,
//     "poiLat": "5.439807396131691",
//     "poiLon": "100.30851781368256"
//   }
// ]

//weather example
// { 
//  coord: { lon: 100.26, lat: 5.38 },
//   weather: 
//    [ { id: 501,
//        main: 'Rain',
//        description: 'moderate rain',
//        icon: '10d' } ],
//   base: 'stations',
//   main: 
//    { temp: 25.55,
//      feels_like: 29.56,
//      temp_min: 25,
//      temp_max: 26,
//      pressure: 1009,
//      humidity: 88 },
//   visibility: 8000,
//   wind: { speed: 2.1, deg: 50 },
//   rain: { 1h: 1.33 },
//   clouds: { all: 40 },
//   dt: 1601029775,
//   sys: 
//    { type: 1,
//      id: 9438,
//      country: 'MY',
//      sunrise: 1600988857,
//      sunset: 1601032416 },
//   timezone: 28800,
//   id: 1733047,
//   name: 'Penang',
//   cod: 200 
//  }