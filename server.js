// const myenv = require("dotenv").config();
const axios = require("axios");
const config = require("config");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi); //returns a function accepts the Joi class
const mongoose = require("mongoose");
// const product = require("./routes/shopAPIs/customer/product");
const user = require("./routes/shopAPIs/customer/user");
const creator = require("./routes/shopAPIs/seller/creator");
const media = require("./routes/shopAPIs/media/media");
const daily_co = require("./routes/shopAPIs/daily_co/rooms");
const rooms = require("./routes/shopAPIs/rooms/rooms");
const llaves = require("./routes/llaves/llaves");
const path = require("path");
const express = require("express");
const socketio = require("socket.io");
const ioUser = require("./helperFunstions/ioUser");

// const enforce = require("express-sslify");
// const authRoute = require("./routes/auths/auth");
const app = express();

// app.use(enforce.HTTPS({ trustProtoHeader: true }));
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
// const graphqlHTTP = require("express-graphql");
// const GraphSchema = require("./graphQLSchema/graphQLSchema");
const passport = require("passport");
// const passportSetup = require("./configureauth/passport-setup");

// if (!config.get("jwtPrivateKey")) {
//   console.error("FATAL ERROR: jwt private key undefined");
//   process.exit(1);
// }

mongoose
  .connect(
    "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log("Connected to MongoDB..."));
//   .catch(err => console.error("Could not connect to MongoDB..."));

// mongoose
//   .connect(
//     "mongodb+srv://jjhok:jjhok@mydb-9j7ob.mongodb.net/test?authSource=admin&replicaSet=mydb-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true
//     }
//   )
//   .then(() => console.log("Connected to MongoDB..."))
//   .catch(err => console.error("Could not connect to MongoDB..."));

// mongoose
//   .connect(config.get("DATABASEURL"), {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
//   })
//   .then(() => console.log("Connected to MongoDB..."))
//   .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());
// app.use("/api/product", product);
// app.use("/api/images", images);
app.use("/api/user", user);
app.use("/api/creator", creator);
app.use("/api/media", media);
app.use("/api/daily_co", daily_co);
app.use("/api/chatRooms", rooms);

// app.use("/api/feedback", feedback);
// app.use("/api/admin", receipt);
app.use("/api/llaves", llaves);
app.use(passport.initialize());
// app.use("/auth", authRoute);

// app.use(
//   "/graphapi",
//   graphqlHTTP({
//     schema: GraphSchema,
//     graphiql: true
//   })
// );

//serve server in production

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 3001;

const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

const io = socketio(server);
ioUser(io);

// io.on("connection", socket => {
//   console.log("new user");
//   socket.emit("welcome", "welcome to the chat service");

//   socket.on("connect", () => {
//     console.log("reached");
//     socket.broadcast.emit("serverMessage", "a new user connected");
//   });

//   // socket.emit("connectionMade", "connection made");
//   // console.log(socket.id, ":user joined");

//   socket.on("joinRoom", async ({ roomName }) => {
//     // try {
//     //   const resp = axios.post("/api/chatRooms/joinRoom", {
//     //     data: { roomName }
//     //   });
//     //   if (resp.data) {
//     //   socket.join(roomName);
//     //   console.log(roomName);
//     //   socket.emit("roomJoined");
//     //   }
//     // } catch (err) {
//     //   console.log(err.message);
//     // }
//     socket.join(roomName);
//     console.log(roomName);
//     socket.emit("roomJoined", "a user joined");
//   });

//   socket.on("sendMessageToRoom", async ({ roomName, data, user }) => {
//     // try {
//     //   const resp = await axios.post("/api/chatRooms/saveMessageToRoom", {
//     //     data: { roomName: room, data, user }
//     //   });
//     //   if (resp.data) {
//     //   console.log(`message: ${data}, Room:${roomName}, from: ${user}`);
//     //   socket.to(roomName).emit("messagesent", data);
//     //   }
//     // } catch (err) {
//     //   console.log(err.message);
//     // }
//     console.log(`message: ${data}, Room:${roomName}, from: ${user}`);
//     socket.to(roomName).emit("messagesent", data);
//   });

//   socket.on("leaveRoom", ({ roomName, data }) => {
//     socket.to(roomName).emit("userleft", data);
//   });

//   socket.on("isTyping", ({ roomName, data }) => {
//     socket.broadcast.to(roomName).emit("userIsTyping", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("disconnected");
//   });
// });
