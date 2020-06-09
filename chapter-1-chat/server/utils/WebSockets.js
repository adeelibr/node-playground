class WebSockets {
  constructor() {
    this.users = [];
  }
  connection(client) {
    console.log("User connected", client);
    // event fired when the chat room is disconnected
    client.on("disconnect", () => {
      this.users = this.users.filter((user) => user.socketId !== client.id);
    });
    // add identity of user mapped to the socket id
    client.on("identity", (userId) => {
      this.users.push({
        socketId: client.id,
        userId: userId,
      });
    });
    // subscribe person to chat & other user as well
    client.on("subscribe", (room, otherUserId = "") => {
      this.subscribeOtherUser(room, otherUserId);
      client.join(room);
    });
    // mute a chat room
    client.on("unsubscribe", (room) => {
      client.leave(room);
    });
  }

  subscribeOtherUser(room, otherUserId) {
    let userSockets = this.users.filter((user) => user.userId === otherUserId);
    for (let i = 0; i < userSockets.lengthl; i++) {
      let socket = global.io.sockets.connected(userSockets[i].socketId);
      if (socket) {
        socket.join(room);
      } else {
        console.log(`${socket.id} does not exist`);
      }
    }
  }
}

export default new WebSockets();
