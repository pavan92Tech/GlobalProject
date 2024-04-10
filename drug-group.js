function openPopupDrug() {
  document.getElementById("popupForm1").style.display = "block";
}
function closePopupDrug() {
  document.getElementById("popupForm1").style.display = "none";
}
const getManufacturerLisUrl = "http://localhost:3000/api/manufacturer";
const postDrugUrl = "http://localhost:3000/api/drug";
const getDrugUrl = "http://localhost:3000/api/drug";
getAllDrugs();
function submitFormDrug() {
  var manufacturer = document.getElementById("manufacturer").value;
  var drugName = document.getElementById("drugName").value;
  var drugCode = document.getElementById("drugCode").value;
  var drugMfdDate = document.getElementById("drugMfdDate").value;
  var drugExpDate = document.getElementById("drugExpDate").value;
  var drugType = document.getElementById("drugType").value;

  function clearDrugInputs(){
  document.getElementById("manufacturer").value = "";
  document.getElementById("drugName").value = "";
  document.getElementById("drugCode").value = "";
  document.getElementById("drugMfdDate").value = "";
  document.getElementById("drugExpDate").value = "";
  document.getElementById("isdrugregistered").value = "";
  document.getElementById("drugSafe").value =false;
  document.getElementById("drugType").value = false;
  }

  const postDrugData = {
    "manufacturerId": manufacturer,
    "drugName": drugName,
    "drugCode": drugCode,
    "mfdDate": drugMfdDate,
    "expDate": drugExpDate,
    "registered": true,
    "isSafeForUnderAge": true,
    "drugType": drugType
     };

     postData(postDrugUrl, postDrugData).then((data) => {
      if (data) {
        clearDrugInputs();
        closePopupDrug();
      getAllDrugs();
      }
    });
}
function getAllDrugs(){
  fetchData(getDrugUrl).then((data) => {
    data.drugs.map((data) => {
      var newRow = document.createElement("tr");
      newRow.innerHTML =
        "<td>" +
        data.manufacturerId +
        "</td><td>" +
        data.drugName +
        "</td><td>" +
        data.drugCode +
        "</td><td>" +
        data.mfdDate +
        "</td><td>" +
        data.expDate +
        "</td><td>" +
        data.registered +
        "</td><td>" +
        data.isSafeForUnderAge +
        "</td><td>" +
        data.drugType +
        "</td>";
      document.getElementById("tableBodyDrugs").appendChild(newRow);
    });
  })
}



