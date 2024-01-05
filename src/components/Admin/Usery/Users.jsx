import React, { useState } from "react";
import ErrorPage from "../../ErrorPages/ErrorPage";
import { updatePassword } from "../../../api/lib/UsersApi";
import Usery from "./TabelaUserow/Usery";

function Users({ setRender, users, role }) {
  const [editId, setEditId] = useState([]);
  let position = 1;

  //---OpenEditForm---//
  const handleEdit = (e, subId) => {
    e.preventDefault();
    setEditId(subId);
  };

  //---HandleEdit---//
  const submitEdit = async (id, subId, data) => {
    await updatePassword(id, subId, data);
    setRender((prevState) => !prevState);
    setEditId();
  };

  //---CancelEdit---//
  function cancelEdit() {
    setEditId("");
  }
  return role !== "admin" ? (
    <>
      <ErrorPage />
    </>
  ) : (
    <>
      <table id="customers" className="w-100">
        <tr>
          <th id="null"></th>
          <th>Członkowie</th>
          <th>Login</th>
          <th>Role</th>
          <th>Punkty</th>
          <th>Zmień hasło</th>
        </tr>
        {users.map((user) => (
          <Usery
            key={user._id}
            data={user}
            subId={user._id}
            name={user.name}
            login={user.login}
            role={user.role}
            score={user.score}
            position={position++}
            editId={editId}
            handleEdit={handleEdit}
            onSubmit={submitEdit}
            onCancel={cancelEdit}
          />
        ))}
      </table>
    </>
  );
}

export default Users;
