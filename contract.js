function openPopup() {
  document.getElementById("popupForm").style.display = "block";
}

function closePopup() {
  document.getElementById("popupForm").style.display = "none";
}

const getapiUrl = "http://localhost:3000/api/contract";
const postapiUrl = "http://localhost:3000/api/contract";
const getManUrl = "http://localhost:3000/api/manufacturer";
const accessToken = sessionStorage.getItem("accessToken");
let manufacturerList = [];
getContractDetails();
getMan();

function submitForm() {
  var contractName = document.getElementById("contractName").value;
  var contractId = document.getElementById("contractId").value;
  var startDate = document.getElementById("startDate").value;
  var endDate = document.getElementById("endDate").value;
  var coveredAmount = document.getElementById("coveredAmount").value;
  var country = document.getElementById("country").value;
  var state = document.getElementById("state").value;

  const manuname = manufacturerList.find(
    (x) => x._id === document.getElementById("manufacturername").value
  );

  function clearInputs(){
  document.getElementById("contractName").value = "";
  document.getElementById("contractId").value = "";
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";
  document.getElementById("coveredAmount").value = "";
  document.getElementById("manufacturername").value = "";
  document.getElementById("country").value = "";
  document.getElementById("state").value = "";
  document.getElementById("sameShipping").value = false;
  document.getElementById("saveInfo").value = false;
  }

  const postDataExample = {
    manufacturerId: document.getElementById("manufacturername").value,
    manufacturerName: manuname.name,
    contractName: contractName,
    contractId: contractId,
    startDate: startDate,
    endDate: endDate,
    coveredAmount: coveredAmount,
    country: country,
    state: state,
    sameShipping: true,
    saveInfo: true,
  };

  postData(postapiUrl, postDataExample).then((data) => {
    
    if (data) {
      clearInputs();
      closePopup();
      getContractDetails();
    }
  });
}

function fetchData(url) {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("GET request successful:", data);
      return data;
    })
    .catch((error) => {
      console.error("There was a problem with the GET request:", error);
    });
}

function getMan() {
  fetchData(getManUrl).then((data) => {
    manufacturerList = data.manufacturers;
    var elm = document.getElementById("manufacturername"),
      df = document.createDocumentFragment();
    for (var i = 0; i < data.manufacturers.length; i++) {
      var option = document.createElement("option");
      option.value = data.manufacturers[i]?._id;
      option.appendChild(document.createTextNode(data.manufacturers[i]?.name));
      df.appendChild(option);
    }
    elm.appendChild(df);
  });
  
}
function getContractDetails() {
  fetchData(getapiUrl).then((data) => {
    data.contracts.map((data) => {
      var newRow = document.createElement("tr");
      newRow.innerHTML =
        "<td>" +
        data.contractName +
        "</td><td>" +
        data.contractId +
        "</td><td>" +
        data.startDate +
        "</td><td>" +
        data.endDate +
        "</td><td>" +
        data.coveredAmount +
        "</td><td>" +
        data.manufacturerName +
        "</td><td>" +
        data.country +
        "</td><td>" +
        data.state +
        "</td>";
      document.getElementById("tableBody").appendChild(newRow);
    });
  });
}

function postData(url, data) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },

    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("POST request successful:", data);
      return data;
    })
    .catch((error) => {
      console.error("There was a problem with the POST request:", error);
    });
}
