document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");

    usernameError.textContent = "";
    passwordError.textContent = "";

    if (username === "") {
      usernameError.textContent = "Please enter your username.";
      return;
    }

    if (password === "") {
      passwordError.textContent = "Please enter your password.";
      return;
    }
    const raw = JSON.stringify({
      "username": username,
      "password": password
    });
    console.log(raw);
    postData(postapiUrl, raw).then((data) => {
      console.log(data);
       window.location.replace("index.html");
    });
    window.location.href = "index.html";
  });
  const postapiUrl = "http://localhost:3000/api/user/login";
  function postData(url, data) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
// document.getElementById("resetButton").addEventListener("click", function () {
//   document.getElementById("username").value = "";
//   document.getElementById("password").value = "";

//   document.getElementById("usernameError").textContent = "";
//   document.getElementById("passwordError").textContent = "";
// });



// login animation
const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

