import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Row from "./models/row.js";

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello to memorise api");
});

app.post("/add-row", async (req, res) => {
  const row = req.body;
  const newRow = new Row(row);
  try {
    await newRow.save();
    res.status(201).json(newRow);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

const getMaxHitValue = (array) => {
  const freq = array.reduce((obj, val) => {
    if (obj[val]) {
      obj[val]++;
    } else {
      obj[val] = 1;
    }
    return obj;
  }, {});

  let maxHitValue = null;
  let maxHitCount = 0;

  for (let value in freq) {
    if (freq[value] > maxHitCount) {
      maxHitValue = value;
      maxHitCount = freq[value];
    }
  }

  return maxHitValue;
};

app.get("/last-row", async (req, res) => {
  let column_1 = [];
  let column_2 = [];
  let column_3 = [];
  let column_4 = [];
  let column_5 = [];
  let column_6 = [];

  try {
    const row = await Row.find().sort({ _id: -1 });

    row.forEach((data) => {
      column_1.push(data.column_1);
      column_2.push(data.column_2);
      column_3.push(data.column_3);
      column_4.push(data.column_4);
      column_5.push(data.column_5);
      column_6.push(data.column_6);
    });

    const col_1 = getMaxHitValue(column_1);
    const col_2 = getMaxHitValue(column_2);
    const col_3 = getMaxHitValue(column_3);
    const col_4 = getMaxHitValue(column_4);
    const col_5 = getMaxHitValue(column_5);
    const col_6 = getMaxHitValue(column_5);

    res.status(201).json({
      column_1: col_1,
      column_2: col_2,
      column_3: col_3,
      column_4: col_4,
      column_5: col_5,
      column_6: col_6,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

app.get("/all-rows", async (req, res) => {
  try {
    const row = await Row.find().sort({ _id: -1 });

    res.status(201).json({ data: row });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => {
    console.log(error.message);
  });
