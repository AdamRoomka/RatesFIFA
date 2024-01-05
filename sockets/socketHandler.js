const authHandlers = require("./authHandlers");
const socketHandlersHelper = require("./socketHandlersHelper");

module.exports = function (io) {
  const onlineUsers = [];

  io.on("connection", async (socket) => {
    socketHandlersHelper.fetchInitialData(socket);

    socketHandlersHelper.handleConnection(
      socket,
      onlineUsers,
      io,
      authHandlers.registerUser,
      authHandlers.loginUserSocket
    );
  });
};
