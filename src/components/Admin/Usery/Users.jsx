import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { getAllUsers, updatePassword } from "../../../api/lib/UsersApi";
import Usery from "./TabelaUserow/Usery";

function Users() {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState([]);
  const [render, setRender] = useState(false);
  let position = 1;

  useEffect(() => {
    var token = null;
    if (typeof window !== "undefined") {
      token = window.localStorage.getItem("token");
    }
    if (window.localStorage.getItem("token") == null) {
      window.location.assign("/Registracja");
    }
    getAllUsers(token).then((res) => {
      const userdata = res.data.data.users;
      console.log(userdata)
      setUser(userdata);
      const role = res.data.data.currentUserRole;
      if(role !== "admin"){
        window.location.assign("/");
      }
    });
    setLoading(false);
  }, [render]);

    //---OpenEditForm---//
    const handleEdit = (e, subId) => {
        e.preventDefault();
        setEditId(subId); //Open edit form on choosen transaction type
    };

    //---HandleEdit---//
    const submitEdit = async (id, subId, data) => {
        await updatePassword(id, subId, data);
        setRender(prevState => !prevState);
        setEditId()
    }

    //---CancelEdit---//
    function cancelEdit() {
        setEditId('');
    }
  return (
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
        {users.map(
          (user) =>
            !loading && (
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
            )
        )}
      </table>
    </>
  );
}

export default Users;
