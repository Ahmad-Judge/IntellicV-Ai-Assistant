const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// ✅ Allow CORS from .env URL
app.use(cors({
  origin: process.env.CLIENT_URL , // fallback for dev
  credentials: true
}));

app.use(express.json());

// Routes
const chatRouter = require('./routes/chat.cjs');
const resumeRoutes = require("./routes/resume.routes.cjs");
// const userroutes = require("./routes/user.cjs");
// const paymentroutes = require("./routes/payment.cjs");

app.use(resumeRoutes);
app.use(chatRouter);
// app.use(userroutes);
// app.use(paymentroutes);

// ✅ MongoDB from env
mongoose.connect(process.env.MONGO_URI )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${process.env.SERVER_URL }`);
});
