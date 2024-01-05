import React from "react";
import { useState } from "react";
import "./tabelaUserow.css";
//Users
function Usery({
  data,
  name,
  login,
  role,
  position,
  score,
  editId,
  subId,
  handleEdit,
  onCancel,
  onSubmit,
}) {
  const [password, setPassword] = useState(data.value);

  const editFlows = () => {
    var token = null;
    if (typeof window !== "undefined") {
      token = window.localStorage.getItem("token");
    }
    let pass = {
      password: password,
    };
    onSubmit(token, subId, pass);
    console.log(token, subId, pass);
  };
  return (
    <>
      <tr>
        <td id="null">{position}</td>
        <td id="pierwsza">{name}</td>
        <td>{login}</td>
        <td>{role}</td>
        <td>{score}</td>
        <td>
          {editId === subId ? (
            <>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-secondary mx-2" onClick={editFlows}>
                zmień
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={(e) => onCancel(e)}
              >
                cofnij
              </button>
            </>
          ) : (
            <button
              className="btn btn-secondary mx-2"
              onClick={(e) => handleEdit(e, subId)}
            >
              zmień
            </button>
          )}
        </td>
      </tr>
    </>
  );
}

export default Usery;
