require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./user/users");
const authRoutes = require("./user/auth");
const page = require('./page/pageRouter')
const service = require('./service/serviceRouter')
const appt = require('./appointment/appRouter')
const cpny = require('./Company/companyRouter')
const s_user = require('./s_user/router')
const sdt = require('./Students/router')
const sdtM = require('./StudentMonoSite/router')
const sw = require("./Self_worker/router")
const contact = require("./contact/route")
// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());
app.use('/uploads',express.static('uploads'))

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api',page)
app.use('/api',service)
app.use('/api',appt)
app.use("/api/", cpny)
app.use("/api/", s_user)
app.use("/api/", sdt)
app.use("/api/", sdtM)
app.use("/api/",sw)
app.use("/api/",contact)

app.get("/", (req, res) => {
    res.json("Hi")
})

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
