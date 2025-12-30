const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./models/studentmodel");

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// ✅ MongoDB connect ONCE
mongoose.connect(process.env.MONGO_DB)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.json({ msg: "API working" });
});

app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post("/students", async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
});

app.put("/students/:id", async (req, res) => {
  const updated = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

app.delete("/students/:id", async (req, res) => {
  const deleted = await Student.findByIdAndDelete(req.params.id);
  res.json(deleted);
});

// ✅ Render needs this
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
