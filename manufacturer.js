function openPopupManufacturer() {
  document.getElementById("popupForm2").style.display = "block";
}

function closePopupManufacturer() {
  document.getElementById("popupForm2").style.display = "none";
}

const getManufacturerUrl = "http://localhost:3000/api/manufacturer";
const postManufacturerUrl = "http://localhost:3000/api/manufacturer";
getAllManufacturers();

function submitFormManufacturer() {
  var manufacturerName = document.getElementById(
    "manufacturerName"
  ).value;
  var manStartDate = document.getElementById("manStartDate").value;
  var manEndDate = document.getElementById("manEndDate").value;
  var address = document.getElementById("address").value;
  var phone = document.getElementById("phone").value;
  var manufacturerId = document.getElementById("manufacturerId").value;

  function clearManInputs(){
  document.getElementById("manufacturerName").value = "";
  document.getElementById("manStartDate").value = "";
  document.getElementById("manEndDate").value = "";
  document.getElementById("address").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("manufacturerId").value = "";
  document.getElementById("cashless").value = false;
  document.getElementById("reimbursement").value = false;
  }
  const postManData = {
  "name": manufacturerName,
  "startDate": manStartDate,
  "endDate": manEndDate,
  "address": address,
  "phone": phone,
  "regId": manufacturerId,
  "cashless": true,
  "reimbursement": true
 };
  postData(postManufacturerUrl, postManData).then((data) => {
    if (data) {
    clearManInputs();
    closePopupManufacturer();
    getAllManufacturers();
    }
  });
}

function getAllManufacturers(){
  fetchData(getManufacturerUrl).then((data) => {
    data.manufacturers.map((data) => {
      var newRow = document.createElement("tr");
      newRow.innerHTML =
        "<td>" +
        data.name +
        "</td><td>" +
        data.startDate +
        "</td><td>" +
        data.endDate +
        "</td><td>" +
        data.address +
        "</td><td>" +
        data.phone +
        "</td><td>" +
        data.regId +
        "</td>";
      document.getElementById("tableBodyMan").appendChild(newRow);
    });
  })
}