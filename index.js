const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
<<<<<<< HEAD
const path = require('path');
const users = require("./routes/api/users");
=======
const users = require("./routes/api/users");
const forms = require("./routes/api/forms");
>>>>>>> 4d051423ab27b13bda556ba1e986fb699ea5b524
const admins = require("./routes/api/admins");
const fakeServer = require("./routes/api/fakeServer");
const externalentities = require("./routes/api/externalentities");
const nationalities = require("./routes/api/nationalities");
const governorates = require("./routes/api/governorates");
const dynamicForms = require("./routes/api/dynamicForms");
const userDynamicForms = require("./routes/api/userDynamicForms");
const formTypes = require("./routes/api/formTypes");
<<<<<<< HEAD

=======
>>>>>>> 4d051423ab27b13bda556ba1e986fb699ea5b524
const app = express();

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to mongo
mongoose

  .connect(
    "mongodb+srv://ScrumMaster:26312215@int-elligence-s1doh.mongodb.net/local_library?retryWrites=true"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
{
  useNewUrlParser: true;
}

// Init middleware

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//app.use(express.multipart());
app.use(cors());

app.get("/", (req, res) => {
  res.send(`<h1>Welcome</h1>`);
});

// Direct routes to appropriate files
app.use("/routes/api/users", users);
<<<<<<< HEAD
=======
app.use("/routes/api/forms", forms);
>>>>>>> 4d051423ab27b13bda556ba1e986fb699ea5b524
app.use("/routes/api/admins", admins);
app.use("/routes/api/externalentities", externalentities);
app.use("/routes/api/nationalities", nationalities);
app.use("/routes/api/governorates", governorates);
app.use("/routes/api/dynamicForms", dynamicForms);
app.use("/routes/api/fakeServer", fakeServer);
app.use("/routes/api/userDynamicForms", userDynamicForms);
app.use("/routes/api/formTypes", formTypes);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
<<<<<<< HEAD
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.resolve(__dirname, 'client/build')));
	//
	app.get('*', (req, res) => {
		res.sendfile(path.resolve((__dirname = 'client/build/index.html')));
	});
}
=======

>>>>>>> 4d051423ab27b13bda556ba1e986fb699ea5b524
// Handling 404
app.use((req, res) => {
  res.status(404).send({ err: "We can not find what you are looking for" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));