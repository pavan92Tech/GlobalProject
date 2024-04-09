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
  var drugname = document.getElementById("drugname").value;
  var drugcode = document.getElementById("drugcode").value;
  var drugmfddate = document.getElementById("drugmfddate").value;
  var drugexpdate = document.getElementById("drugexpdate").value;
  var isdrugregistered = document.getElementById("isdrugregistered").value;
  var drugsafe = document.getElementById("drugsafe").value;
  var drugtype = document.getElementById("drugtype").value;
  // Create a new row
  var newRow = document.createElement("tr");

  // Add data to the row
  newRow.innerHTML =
    "<td>" +
    manufacturer +
    "</td><td>" +
    drugname +
    "</td><td>" +
    drugcode +
    "</td><td>" +
    drugmfddate +
    "</td><td>" +
    drugexpdate +
    "</td><td>" +
    isdrugregistered +
    "</td><td>" +
    drugsafe +
    "</td><td>" +
    drugtype +
    "</td>";

  // Append the row to the table body
  document.getElementById("tableBody1").appendChild(newRow);

  // Clear input fields
  document.getElementById("manufacturer").value = "";
  document.getElementById("drugname").value = "";
  document.getElementById("drugcode").value = "";
  document.getElementById("drugmfddate").value = "";
  document.getElementById("drugexpdate").value = "";
  document.getElementById("isdrugregistered").value = "";
  document.getElementById("drugsafe").value = "";
  document.getElementById("drugtype").value = "";

  const postDataExample = { key: "value" };
  postData(postapiUrl, postDataExample).then((data) => {
    // Do something with the response data
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



