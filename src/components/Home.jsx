import React, { useState } from "react";

import "./Home/style.css";
import "./Home/createGroupForm.css";

function Home() {
  const [groupName, setGroupName] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "groupName") {
      setGroupName(value);
    } else if (name === "maxPlayers") {
      setMaxPlayers(value);
    }
  };

  const handleCreateButtonClick = () => {
    setShowCreateForm(true);
  };

  const handleCancelButtonClick = () => {
    setShowCreateForm(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add your logic for form submission here
    setShowCreateForm(false);
  };

  const group = (name, players) => {
    // Add your logic for handling group clicks here
  };

  return (
    <div className="home_main">
      <form
        id="create-group-form"
        style={{ display: showCreateForm ? "block" : "none" }}
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="groupName">Group Name:</label>
        <input
          type="text"
          id="groupName"
          name="groupName"
          value={groupName}
          onChange={handleInputChange}
        />

        <label htmlFor="maxPlayers">Max Players:</label>
        <input
          type="number"
          id="maxPlayers"
          name="maxPlayers"
          value={maxPlayers}
          onChange={handleInputChange}
        />

        <div>
          <button
            type="button"
            id="cancelButton"
            onClick={handleCancelButtonClick}
          >
            Cancel
          </button>
          <button type="submit" id="saveButton">
            Save
          </button>
        </div>
      </form>

      <div id="index-pages">
        <div className="main-buttons">
          <a
            href="#"
            id="create-group-button"
            className="create-button"
            onClick={handleCreateButtonClick}
          >
            Create
          </a>
        </div>

        <table id="your-group">
          <thead>
            <tr>
              <th>Your Groups</th>
            </tr>
          </thead>
          <tbody id="your-group-name">
            <tr id="buttonGroup" onClick={() => group("Romaszewscy", 20)}>
              <td>
                <div className="your-group-link">
                  <span className="your-group"></span>
                  <span className="name-group">Romaszewscy</span>
                </div>
                <span className="players-info">18/20</span>
              </td>
            </tr>
            <tr id="buttonGroup" onClick={() => group("Chamomile", 7)}>
              <td>
                <div className="your-group-link">
                  <span className="your-group"></span>
                  <span className="name-group">Chamomile</span>
                </div>
                <span className="players-info">7/7</span>
              </td>
            </tr>
            <tr id="buttonGroup" onClick={() => group("Kamille", 10)}>
              <td>
                <div className="your-group-link">
                  <span className="your-group"></span>
                  <span className="name-group">Kamille</span>
                </div>
                <span className="players-info">5/10</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
