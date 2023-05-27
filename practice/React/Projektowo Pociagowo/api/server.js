const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//Conneting to database

mongoose
	.connect("mongodb://127.0.0.1:27017/pociagowo-mern", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to DB"))
	.catch(console.error);

//----------
// Records API

const Record = require("./models/Records");

app.get("/records", async (req, res) => {
	const records = await Record.find();
	const recordsArray = JSON.parse(JSON.stringify(records));

	// console.log(recordsArray)

	let highestDelay = 0;
	let id = 0;

	let date_ob = new Date();
	let nowa = (date_ob.getMonth() + 1).toString();
	let day = date_ob.getDate();
	let month = nowa.length == 1 ? "0" + nowa : nowa;
	let year = date_ob.getFullYear();

	// prints date & time in YYYY-MM-DD format
	let date = year + "-" + month + "-" + day;

	recordsArray.forEach((element) => {
		element.recordDate = element.recordDate.slice(0, 16).replace("T", " ");

		// console.log(date, element.recordDate.slice(0, 10));

		if (element.recordDate.slice(0, 10) == date && element.delay > highestDelay) {
			highestDelay = element.delay;
			id = element._id;
		}
	});

	recordsArray.forEach((element) => {
		if (element._id === id) {
			element.favByAdmin = true;
		}
	});
	// record.favByAdmin = true;
	// record.save();

	res.json(recordsArray);
});

app.post("/record/new", (req, res) => {
	const record = new Record({
		trainNr: req.body.trainNr,
		driver: req.body.driver,
		departureDate: req.body.departureDate,
		arrival: req.body.arrival,
		delay: req.body.delay,
		brand: req.body.brand,
	});

	record.save();

	res.json(record);
});

app.delete("/record/delete/:id", async (req, res) => {
	const result = await Record.findByIdAndDelete(req.params.id);

	res.json(result);
});

app.get("/record/favByAdmin/:id", async (req, res) => {
	const record = await Record.findById(req.params.id);

	record.favByAdmin = !record.favByAdmin;

	record.save();

	res.json(record);
});

app.put("/record/put/:id", async (req, res) => {
	const update = req.body;
	const record = await Record.findByIdAndUpdate(req.params.id, update);

	record.save();

	res.json(record);
});

//----------
//Log in API

const Login = require("./models/LogIns");

app.get("/users", async (req, res) => {
	const logins = await Login.find();
	const loginsArray = JSON.parse(JSON.stringify(logins));

	res.json(loginsArray);
});

app.post("/user/new", async (req, res) => {
	const logins = await Login.find();
	const loginsArray = JSON.parse(JSON.stringify(logins));
	// const recordsArray = logins;

	console.log("Ubisoft to scierwo" + loginsArray);

	let login = new Login({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
	});

	if (loginsArray.length == 1) {
		login = new Login({
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			admin: true,
			headAdmin: true,
		});
	}

	login.save();

	res.json(login);
});

app.delete("/user/delete/:id", async (req, res) => {
	const result = await Login.findByIdAndDelete(req.params.id);

	res.json(result);
});

app.get("/user/admin/:id", async (req, res) => {
	const login = await Login.findById(req.params.id);

	login.admin = !login.admin;

	login.save();

	res.json(login);
});

app.post("/user/find", async (req, res) => {
	const logins = await Login.find({
		username: req.body.username,
		password: req.body.password,
	});
	const loginsArray = JSON.parse(JSON.stringify(logins));

	res.json(loginsArray);
});

app.post("/user/correct", async (req, res) => {
	const logins = await Login.find({
		username: req.body.username,
	});
	const loginsArray = JSON.parse(JSON.stringify(logins));

	res.json(loginsArray);
});
//----------

app.listen(3001, () => console.log("Server started on port 3001"));
