const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHander = require("./middleware/error.js");

dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
const authRouter = require("./routes/auth.js");
const mediaRouter = require("./routes/media.js");
const userRouter = require("./routes/user.js");

app.use("/api/auth", authRouter);
app.use("/api/media", mediaRouter);
app.use("/api/users", userRouter);

app.use(errorHander);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>  console.log(`Server running on port ${PORT}`)
);
