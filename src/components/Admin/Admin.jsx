import React from "react";
import { Link } from "react-router-dom";

function Admin() {
  return (
    <div className="container">
      <h1 className="text-center">Page not ended</h1>
      <h3 className="text-center">
        {" "}
        Go back to <Link to="/">Main</Link>{" "}
      </h3>
    </div>
  );
}

export default Admin;
