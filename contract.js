function openPopup() {
  document.getElementById("popupForm").style.display = "block";
}

function closePopup() {
  document.getElementById("popupForm").style.display = "none";
}

function submitForm() {
  var contractname = document.getElementById("contractname").value;
  var contractid = document.getElementById("contractid").value;
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;
  var coveredamount = document.getElementById("coveredamount").value;
  var manufacturername = document.getElementById("manufacturername").value;
  var country = document.getElementById("country").value;
  var state = document.getElementById("state").value;
  // Create a new row
  var newRow = document.createElement("tr");

  // Add data to the row
  newRow.innerHTML =
    "<td>" +
    contractname +
    "</td><td>" +
    contractid +
    "</td><td>" +
    startdate +
    "</td><td>" +
    enddate +
    "</td><td>" +
    coveredamount +
    "</td><td>" +
    manufacturername +
    "</td><td>" +
    country +
    "</td><td>" +
       state +
    "</td>";

  // Append the row to the table body
  document.getElementById("tableBody").appendChild(newRow);

  // Clear input fields
  document.getElementById("contractname").value = "";
  document.getElementById("contractid").value = "";
  document.getElementById("startdate").value = "";
  document.getElementById("enddate").value = "";
  document.getElementById("coveredamount").value = "";
  document.getElementById("manufacturername").value = "";
  document.getElementById("country").value = "";
  document.getElementById("state").value = "";


  // Close the popup
  closePopup();
  const postDataExample = JSON.stringify({
    "manufacturerId": "660cf83703ff2cbe7a5eb81e",
    "manufacturerName": "Nicip",
    "contractName": "C001",
    "contractId": "C001",
    "startDate": "2024-04-03",
    "endDate": "2024-06-03",
    "coveredAmount": 20000,
    "country": "India",
    "state": "Karnataka",
    "isRebatebaleCovered": true,
    "isInsulinCovered": true,
    "sameShipping": true,
    "saveInfo": true
  });
  
  postData(postapiUrl, postDataExample).then((data) => {
    console.log(data);
  });
}

function fetchData(url) {
  return fetch(url,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer AUTH_TOKEN"
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

const getapiUrl = "http://localhost:3000/api/contract";
const postapiUrl = "http://localhost:3000/api/contract";
//Make a GET request
fetchData(getapiUrl).then((data) => {
  console.log(data)
});
function postData(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer AUTH_TOKEN"
    },

    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('POST request successful:', data);
      return data;
    })
    .catch(error => {
      console.error('There was a problem with the POST request:', error);
    });
}