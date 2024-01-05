import React from "react";
import LoandigPage from "./Stawki/LoandigPage";
import ErrorPage from "../ErrorPages/ErrorPage";
import Tabela from "./Tabela";
import "../css/table.css";
import "../css/spinner.css";

function Fifa({ allTeams, loading, user, token }) {
  let position = 1;
  const groups = ["A", "B", "C", "D", "E", "F", "G", "H"];
  if (!token) {
    window.location.assign("/register");
  }

  return loading ? (
    <>
      <LoandigPage />
    </>
  ) : !token ? (
    <>
      <ErrorPage />
    </>
  ) : (
    <>
      <div className="container">
        <title>Fifa World Cup 2022</title>
        <table
          id="tabelaGrup"
          className="row mt-2 d-flex justify-content-center"
        >
          {groups.map((groupName) => (
            <React.Fragment key={groupName}>
              <tbody className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 hover justify-content-center mb-1">
                <tr className="border border-dark">
                  <th>Group {groupName}</th>
                  <th>W/D/L</th>
                  <th>Pts.</th>
                </tr>
                {allTeams.map((team) =>
                  team.group === groupName ? (
                    <tr key={team.name} className="border border-dark">
                      <>
                        <td className="w-100 height">{team.name}</td>
                        <td>{team.win + "/" + team.draw + "/" + team.lose}</td>
                        <td>{team.score}</td>
                      </>
                    </tr>
                  ) : null
                )}
              </tbody>
            </React.Fragment>
          ))}
        </table>
        <div className="d-flex justify-content-center">
          <table id="customers">
            <tbody>
              <tr>
                <th></th>
                <th id="pierwsza">Członkowie</th>
                <th>Punkty</th>
              </tr>
              {user.map((userData) => (
                <Tabela
                  key={userData._id}
                  name={userData.name}
                  score={userData.score}
                  position={position++}
                />
              ))}
            </tbody>
          </table>
        </div>
        <footer>
          <div>
            <a
              href="https://fifa-rates-backend.loca.lt/"
              rel="noopener noreferrer"
              target="_blank"
              className="m-5 text-dark"
            >
              Jeżeli nie działa strona poprawnie, prosze kliknąć tutaj!
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Fifa;
