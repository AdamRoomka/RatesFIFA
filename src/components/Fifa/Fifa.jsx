import React, { useEffect } from "react";
import LoadingIcons from "react-loading-icons";
import Tabela from "./Tabela";
import "../css/table.css";
import "../css/spinner.css";

function Fifa({ allTeams, user, loading }) {
  // const [isOpen, setIsOpen] = useState(false);
  let position = 1;
  const groups = ["A", "B", "C", "D", "E", "F", "G", "H"];

  useEffect(() => {
    if (window.localStorage.getItem("token") == null) {
      window.location.assign("/register");
    }
  }, []);

  // const toggleAddPopup = () => {
  //   setIsOpen(!isOpen);
  // };
  return (
    <div className="container">
      <title>Fifa World Cup 2022</title>
      <table id="tabelaGrup" className="row mt-2 d-flex justify-content-center">
        {groups.map((groupName) => (
          <React.Fragment key={groupName}>
            <tbody className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 hover justify-content-center mb-1">
              <tr className="border border-dark">
                <th>Group {groupName}</th>
                <th>W/D/L</th>
                <th>Pts.</th>
              </tr>

              {!loading ? (
                allTeams.map((team) =>
                  team.group === groupName ? (
                    <tr className="border border-dark">
                      <>
                        <td className="w-100 height">
                          <img
                            src={`https://countryflagsapi.com/png/${team.code}`}
                            alt={team.code}
                            className="flagSize me-1"
                          />
                          {team.name}
                        </td>
                        <td>{team.win + "/" + team.draw + "/" + team.lose}</td>
                        <td>{team.score}</td>
                      </>
                    </tr>
                  ) : (
                    <></>
                  )
                )
              ) : (
                <tr className="spinner-container">
                  <td className="loading-spinner">Loading..</td>
                </tr>
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
            {user.map((user) =>
              !loading ? (
                <Tabela
                  key={user._id}
                  name={user.name}
                  score={user.score}
                  position={position++}
                />
              ) : (
                <tr>
                  <td colspan="3" className=" text-center bg-grey">
                    <LoadingIcons.Puff stroke="black" />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <footer>
        <div>
          <a
            href="https://fifa-rates-backend.loca.lt/"
            target="_blank"
            className="m-5 text-dark"
          >
            Jeżeli nie działa strona poprawnie, prosze kliknąć tutaj!
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Fifa;
