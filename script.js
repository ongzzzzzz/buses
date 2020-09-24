let tableBody = document.getElementById("tableBody");

const url = "https://jp.rapidpg.com.my:10081/open/api/searcheta?stopName=smk%20chung%20ling%20(p)(kampung%20baru)";

var kawaii = ["ヾ(≧▽≦*)o", "q(≧▽≦q)", "(≧∇≦)ﾉ", "○( ＾皿＾)っ", "(❁´◡`❁)`", "(≧∀≦)ゞ"];
document.getElementById("location").placeholder = kawaii[Math.floor((Math.random() * kawaii.length))];

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = checkTime(today.getMinutes());
  var s = checkTime(today.getSeconds());
  document.getElementById('time').innerHTML =
  h + ":" + m + ":" + s;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
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
    if(etaList == undefined || etaList.length == 0){
      var etaCell = document.createElement('td');
      var etaText = document.createTextNode("whoops too bad!");
      cells.push(etaCell);
      texts.push(etaText);

    } else {

      for(h=0; h<etaList.length; h++){
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

function getData(){
  fetch(url).then( 
    (response) => {
      if (response.status !== 200) {
        console.error(`whoopsie daisie (Status Code: ${response.status})`);
        return;
      }
      response.json().then(data => {
        console.log(data.body);
        appendToTable(data.body);
      });
  }
  ).catch((err) => {
      console.error(`Fetch Error :-S ${err}`);
  });
}

getData();
window.setInterval(()=>{
  getData();
}, 60*1000);

/* 
  TODO: add time 

  TODO: add weather
  TODO: add map (Google map embed)
  TODO: deploy
  TODO: add other destination search
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