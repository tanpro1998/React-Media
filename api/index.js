const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/Posts");
const conversationRoute = require("./routes/conversation")
const messageRoute = require("./routes/message")

dotenv.config();
// MiddleWare
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("Upload file success!");
  } catch (err) {
    console.log(err);
  }
});
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(helmet());
app.use(morgan("common"));
app.use(express.json());

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  },
  () => {
    console.log("MongoDB connected!!!");
  }
);

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute)
app.use("/api/messages", messageRoute)

app.listen(8000, () => console.log("Backend server is running!!!"));
