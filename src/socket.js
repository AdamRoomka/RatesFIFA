import io from "socket.io-client";

const storedToken = localStorage.getItem("token");

const socket = io("ws://localhost:8080", {
  transports: ["websocket"],
  upgrade: false,
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("Socket connected");
  if (storedToken) {
    try {
      const decodedToken = JSON.parse(atob(storedToken.split(".")[1]));
      if (decodedToken) {
        socket.emit("userAction", {
          action: "connect",
          userId: decodedToken.user_id,
        });
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
});

window.addEventListener("beforeunload", () => {
  console.log("Socket unload");

  if (storedToken) {
    try {
      const decodedToken = JSON.parse(atob(storedToken.split(".")[1]));

      if (decodedToken) {
        socket.emit("userAction", {
          action: "disconnect",
          userId: decodedToken.user_id,
        });
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
});

const initializeSocket = (setUser, setTeams, onlineUsers) => {
  try {
    if (!socket) {
      console.error("Socket is not available");
      return;
    }

    socket.on("initialUsers", (users) => {
      const updatedUsers = users.map((user) => {
        const isOnline = onlineUsers.some(
          (onlineUser) => onlineUser.userId === user._id
        );
        return { ...user, isOnline };
      });

      setUser(updatedUsers);
    });

    socket.on("initialTeams", (teams) => {
      setTeams(teams);
    });

    return () => {
      socket.off("initialUsers");
      socket.off("initialTeams");
    };
  } catch (error) {
    console.error(error);
  }
};

export { socket, initializeSocket };
