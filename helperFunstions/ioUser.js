const axios = require("axios");

const ioUser = io => {
  io.on("connection", socket => {
    console.log("new user", socket.id);
    socket.emit("welcome", "welcome to the chat service");

    socket.on("connect", dati => {
      io.emit("serverMessage", "a new user connected with name :", dati);
    });

    // socket.emit("connectionMade", "connection made");
    // console.log(socket.id, ":user joined");

    socket.on("joinRoom", async ({ room, user }) => {
      // const roomPart = room.split("-");

      // try {
      //   const resp = axios.post("/api/chatRooms/joinRoom", {
      //     data: { roomName }
      //   });
      //   if (resp.data) {
      //   socket.join(roomName);
      //   console.log(roomName);
      //   socket.emit("roomJoined");
      //   }
      // } catch (err) {
      //   console.log(err.message);
      // }
      socket.join(room);
      console.log(`joined ${room} room`);
      socket.emit("roomJoined", `joined ${room} room`);
    });

    socket.on("userSendMessageToRoom", async ({ room, data, user }) => {
      console.log(`user sent messagge to "${room}"`);
      // try {
      //   const resp = await axios.post("/api/chatRooms/saveMessageToRoom", {
      //     data: { roomName: room, data, user }
      //   });
      //   if (resp.data) {
      //   console.log(`message: ${data}, Room:${roomName}, from: ${user}`);
      //   socket.to(roomName).emit("messagesent", data);
      //   }
      // } catch (err) {
      //   console.log(err.message);
      // }

      io.to(room).emit("userMessageSent", data);
    });
    socket.on(
      "creatorSendMessageToRoom",
      async ({ room, data, displayName }) => {
        // try {
        //   const resp = await axios.post("/api/chatRooms/saveMessageToRoom", {
        //     data: { roomName: room, data, user }
        //   });
        //   if (resp.data) {
        //   console.log(`message: ${data}, Room:${roomName}, from: ${user}`);
        //   socket.to(roomName).emit("messagesent", data);
        //   }
        // } catch (err) {
        //   console.log(err.message);
        // }
        io.to(room).emit("creatorMessageSent", data);
      }
    );

    socket.on("leaveRoom", ({ roomName, data }) => {
      socket.to(roomName).emit("userleft", data);
    });

    socket.on("isTyping", ({ roomName, data }) => {
      socket.broadcast.to(roomName).emit("userIsTyping", data);
    });

    socket.on("disconnect", () => {
      console.log("disconnect fired");
      // socket.off(() => {
      //   console.log("off trail");
      // });
    });
  });
};

module.exports = ioUser;
