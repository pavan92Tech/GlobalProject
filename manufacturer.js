function openPopupManufacturer() {
    document.getElementById("popupForm2").style.display = "block";
  }
  
  function closePopupManufacturer() {
    document.getElementById("popupForm2").style.display = "none";
  }

  function submitFormManufacturer() {
    var manufacturernamedetail = document.getElementById("manufacturernamedetail").value;
    var contractStartDate = document.getElementById("contractStartDate").value;
    var contractEndDate = document.getElementById("contractEndDate").value;
    var address = document.getElementById("address").value;
    var phone = document.getElementById("phone").value;
    var manufacturerId = document.getElementById("manufacturerId").value;
    
    // Create a new row
    var newRow = document.createElement("tr");
  
    // Add data to the row
    newRow.innerHTML =
      "<td>" +
      manufacturernamedetail +
      "</td><td>" +
      contractStartDate +
      "</td><td>" +
      contractEndDate +
      "</td><td>" +
      address +
      "</td><td>" +
      phone +
      "</td><td>" +
      manufacturerId +
      "</td>";
  
    // Append the row to the table body
    document.getElementById("tableBody2").appendChild(newRow);
  
    // Clear input fields
    document.getElementById("manufacturernamedetail").value = "";
    document.getElementById("contractStartDate").value = "";
    document.getElementById("contractEndDate").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("manufacturerId").value = "";
      
    // Close the popup
    closePopupManufacturer();
    const postDataExample = { key: "value" };
    postData(postapiUrl, postDataExample).then((data) => {
      console.log(data);
      // Do something with the response data
    });
  }
  
  