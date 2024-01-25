const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoute");
const noteRouter = require("./routes/noteRoute");

app.use(express.json());

app.use("/user", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
  res.send("Welcome to notes applicaiton API ");
});

mongoose
  .connect(
    "mongodb+srv://admin:Mtch9MWmM3mNFIro@cluster0.a5snalu.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() =>
    app.listen(3000, () => console.log("Server started on post no: 3000"))
  )
  .catch((err) => console.log(err.message));
 