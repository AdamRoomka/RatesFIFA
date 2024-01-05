import React, { useEffect, useState } from "react";
import Tabela from "./Tabela";
import { socket, initializeSocket } from "../../socket";
import "../css/table.css";

function Fifa() {
  const [users, setUsers] = useState([]);
  const [allTeams, setTeams] = useState([]);

  const groups = ["A", "B", "C", "D", "E", "F", "G", "H"];

  useEffect(() => {
    const handleUserAction = (data) => {
      const { action, onlineUsers } = data;
      if (action === "update") {
        setUsers((prevUsers) =>
          prevUsers.map((prevUser) => {
            const updatedUser = onlineUsers.find(
              (user) => user.userId === prevUser._id
            );
            return updatedUser
              ? { ...prevUser, isOnline: updatedUser.isOnline }
              : prevUser;
          })
        );
      }
      initializeSocket(setUsers, setTeams, onlineUsers);
    };

    socket.on("userAction", handleUserAction);

    return () => {
      socket.off("userAction", handleUserAction);
      socket.off("initialUsers");
      socket.off("isActive");
    };
  }, []);

  return (
    <>
      <div>
        <title>Fifa World Cup 2022</title>
        <div className="table-container">
          <table id="tabelaGrup">
            {groups.map((groupName) => (
              <React.Fragment key={groupName}>
                <tbody className="hover">
                  <tr className="border border-dark">
                    <th>Group {groupName}</th>
                    <th>W/D/L</th>
                    <th>Pts.</th>
                  </tr>
                  {allTeams.map(
                    (team) =>
                      team.group === groupName && (
                        <tr key={team.name} className="border border-dark">
                          <>
                            <td className="height">{team.name}</td>
                            <td>{`${team.win}/${team.draw}/${team.lose}`}</td>
                            <td>{team.score}</td>
                          </>
                        </tr>
                      )
                  )}
                </tbody>
              </React.Fragment>
            ))}
          </table>
        </div>
        <div className="user-table-container">
          <table id="customers">
            <tbody>
              <tr>
                <th></th>
                <th id="pierwsza">Członkowie</th>
                <th>Punkty</th>
              </tr>
              {users.map((userData) => (
                <Tabela
                  key={userData._id}
                  name={userData.name}
                  score={userData.score}
                  position={userData.position}
                  isOnline={userData.isOnline}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Fifa;
