let table = document.getElementById("bigTable");


const url = "https://jp.rapidpg.com.my:10081/open/api/searcheta?stopName=smk%20chung%20ling%20(p)(kampung%20baru)";

function appendToTable(data=[]){

  // row number == number of stops
  for (i=0; i<data.length; i++){
    console.log(data[i].lingNm);
    var row = document.createElement('tr');

    // number of cells == number of datas
    for(const [key, value] of Object.entries(data[i])){
      var cell = document.createElement('td');
      var innerText = document.createTextNode(value);

      cell.appendChild(innerText);
      row.appendChild(cell);

      // console.log(`${key} => ${value}`);
    }
    table.appendChild(row);
  }

  return;
}

fetch(url).then( 
  (response) => {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return;
    }
    response.json().then(data => {
      console.log(data.body);
      appendToTable(data.body);
    });
 }
).catch((err) => {
    console.error('Fetch Error :-S', err);
});

/////::::::::::SAMPLE JSON:::::::::://///
// {
//   "status": "SUCCESS",
//   "statusCode": "OK",
//   "message": "Nearest Stops",
//   "body": [
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
//       "etaList": null
//     },
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
//       "etaList": null
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
//       "etaList": null
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
//       "etaList": null
//     }
//   ]
// }