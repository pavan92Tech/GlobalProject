const express = require('express');
const connectDb = require("./config/dbConnection");

const app = express(); 
const PORT = 3000; 

var contractRouter = require("./routes/contractRoutes");

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/contract", contractRouter);

app.get('/', (req, res)=>{ 
    res.status(200); 
    res.send("Welcome to Medi-Script Server"); 
}); 


app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
	else
		console.log("Error occurred, server can't start", error); 
	} 
); 
