const express = require("express");
const cors = require("cors");

const { sequelize } = require("./models");
const driver = require("./routes/driver");
const DMTOfficer = require("./routes/DMTOfficer");
const policeOfficer = require("./routes/policeOfficer");
const policeStation = require("./routes/policeStation");
const auth = require("./routes/auth");
const rule = require("./routes/rule");
const panelty = require("./routes/panelty");
const { handleError } = require("./middlewares/error");
const { PORT } = require("./config/settings");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/driver", driver);
app.use("/api/auth", auth);
app.use("/api/dmt-officer", DMTOfficer);
app.use("/api/police-officer", policeOfficer);
app.use("/api/police-station", policeStation);
app.use("/api/rule", rule);
app.use("/api/panelty", panelty);

//handle errors

app.use((error, req, res, next) => {
  handleError({ error, req, res, next });
});

app.listen({ port: PORT }, async () => {
  console.log(`Server up on http://localhost:${PORT}`);
  await sequelize.authenticate();
  console.log("Database Connected!");
});

// app.post("/users", async (req, res) => {
//   const { name, email, role } = req.body;

//   try {
//     const user = await User.create({ name, email, role });

//     return res.json(user);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json(error);
//   }
// });

// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.findAll({ include: "posts" });

//     return res.json(users);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Something went wrong" });
//   }
// });

// app.get("/users/:uuid", async (req, res) => {
//   const uuid = req.params.uuid;
//   try {
//     const user = await User.findOne({
//       where: { uuid },
//       include: "posts",
//     });

//     return res.json(user);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Something went wrong" });
//   }
// });

// app.post("/posts", async (req, res) => {
//   const { userUuid, body } = req.body;

//   try {
//     const user = await User.findOne({ where: { uuid: userUuid } });

//     const post = await Post.create({ body, userId: user.id });

//     return res.json(post);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// });

// app.get("/posts", async (req, res) => {
//   try {
//     const posts = await Post.findAll({ include: ["user"] });

//     return res.json(posts);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// });
