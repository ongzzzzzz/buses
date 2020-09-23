let table = document.getElementById("bigTable");


const url = "https://jp.rapidpg.com.my:10081/open/api/searcheta?stopName=smk%20chung%20ling%20(p)(kampung%20baru)";

function appendToTable(data=[]){

  // row number == number of buses
  for (i=0; i<data.length; i++){
    var route = data[i];
    
    route.etaList.forEach(bus => {
      console.log(bus);
    });

    var row = document.createElement('tr');

    var routeNumCell = document.createElement('td');
    var routeNumText = document.createTextNode(route.routeNm);

    var lingNumCell = document.createElement('td');
    var lingNumText = document.createTextNode(route.lingNm);

    var cells = [routeNumCell, lingNumCell];
    var texts = [routeNumText, lingNumText];


    let etaList = route.etaList;    

    if(etaList === undefined || etaList.length == 0){
      var etaCell = document.createElement('td');
      var etaText = document.createTextNode("whoops wait yixia");

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

    console.log(cells);
    console.log(texts);

    for(k=0; k<cells.length; k++){
      cells[k].appendChild(texts[k]);
      row.appendChild(cells[k]);
    }


    // var importantStuff = ["routeNm", "lingNm", "etaList"];

    // var row = document.createElement('tr');

    // for(j=0; j<importantStuff.length; j++){
    //   var cell = document.createElement('td');
    //   var dataValue = data[i][importantStuff[j]];

    //   //if it is the etaList,
    //   if(Array.isArray(dataValue)){
        

    //   } else{
    //     var text = document.createTextNode(dataValue);
    //   }

    //   cell.appendChild(text);
    //   row.appendChild(cell);
    // }




    // number of cells == number of datas
    // for(const [key, value] of Object.entries(data[i])){
    //   var cell = document.createElement('td');
    //   var innerText;

    //   if(Array.isArray(value)){
    //     if(value === undefined || value.length == 0){
    //       innerText = document.createTextNode("whoops");
    //     } else{
    //       innerText = document.createTextNode(value[0].eta);
    //     }
    //   } else {
    //     innerText = document.createTextNode(value);
    //   }

    //   cell.appendChild(innerText);
    //   row.appendChild(cell);

    //   // console.log(`${key} => ${value}`);
    // }

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
