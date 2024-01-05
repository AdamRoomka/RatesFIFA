const MatchModel = require("../models/matchModel");
const GuessModel = require("../models/guessModel");
const TeamModel = require("../models/teamModel");
const UserModel = require("../models/userModel");

function fetchInitialData(socket) {
  const fetchDataFromModels = async () => {
    try {
      const [matches, guesses, teams, users] = await Promise.all([
        MatchModel.find(),
        GuessModel.find(),
        TeamModel.find(),
        UserModel.find(),
      ]);

      socket.emit("initialMatches", matches);
      socket.emit("initialGuesses", guesses);
      socket.emit("initialTeams", teams);
      socket.emit("initialUsers", users);

      socket.emit(
        "userStatus",
        users.map((user) => ({ _id: user._id, isActive: true }))
      );
    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error.message);
    }
  };

  fetchDataFromModels();
}

function handleConnection(
  socket,
  onlineUsers,
  io,
  registerUser,
  loginUserSocket
) {
  socket.on("userAction", async (data) => {
    const { action, userId } = data;

    if (action === "connect") {
      const existingUserIndex = onlineUsers.findIndex(
        (user) => user.userId === userId
      );
      if (existingUserIndex === -1) {
        onlineUsers.push({ userId, isOnline: true });
      } else {
        onlineUsers[existingUserIndex].isOnline = true;
      }
    } else if (action === "disconnect") {
      const updatedUsers = onlineUsers.map((user) => ({
        ...user,
        isOnline: user.userId === userId ? false : user.isOnline,
      }));

      onlineUsers.length = 0;
      onlineUsers.push(...updatedUsers);
    }

    if (io) {
      io.emit("userAction", { action: "update", onlineUsers });
    } else {
      console.error("io is not defined");
    }
  });

  socket.on("registerUser", async (data) => {
    try {
      await registerUser(data, socket);
    } catch (error) {
      console.error("Błąd podczas rejestracji użytkownika:", error.message);
    }
  });

  socket.on("loginUser", async (data) => {
    try {
      await loginUserSocket(socket, data);
    } catch (error) {
      console.error("Błąd podczas logowania użytkownika:", error.message);
    }
  });
}

module.exports = {
  fetchInitialData,
  handleConnection,
};
