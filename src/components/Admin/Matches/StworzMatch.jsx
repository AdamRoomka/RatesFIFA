import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { GrTransaction } from "react-icons/gr";
import { saveMatch } from "../../../api/lib/MatchesAPI";
import "./create.css";

function StworzMatch({
  handlepopupClose,
  setIsOpen,
  isOpen,
  allTeams,
  setRender,
  render,
}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");
  const [id1, setFlag1] = useState("");
  const [id2, setFlag2] = useState("");

  let name1, name2;

  allTeams.map((name) =>
    name._id === id1
      ? (name1 = name.name)
      : "" || name._id === id2
      ? (name2 = name.name)
      : ""
  );

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await saveMatch(data).then(() => {
      Swal.fire({
        title: "Mecz został stworzony!",
        text: `${name1} vs ${name2}`,
        icon: "success",
        confirmButtonText: "Dobrze!",
      });
      setRender(!render);
      setIsOpen(!isOpen);
    });
  };

  return (
    <div className="popupform d-flex flex-column flex-nowrap">
      <div className="formblock p-4">
        <div className="formtitle d-flex flex-row flex-nowrap pb-5 align-items-center p-4">
          <div className="border border-3 border-primary rounded text-center">
            <GrTransaction />
          </div>
          <h4 className="ms-5">Tworzenie meczu:</h4>
          <span onClick={handlepopupClose} className="px-1 text-end text-muted">
            x
          </span>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex flex-column flex-wrap text-center"
        >
          <div className="grid pb-4">
            <select
              {...register("team1")}
              defaultValue=""
              onChange={(e) => setFlag1(e.target.value)}
              id="team1"
              name="team1"
              className="lighter flg1 bg-transparent w-75 mx-1"
            >
              <option value="" disabled>
                --I drużyna--
              </option>
              {allTeams.map((teams) => (
                <option key={teams._id} value={teams._id}>
                  {" "}
                  {teams.name}
                </option>
              ))}
            </select>
            <select
              {...register("team2")}
              defaultValue=""
              onChange={(e) => setFlag2(e.target.value)}
              className="lighter flg2 bg-transparent w-75 mx-1"
            >
              <option className="" value="" disabled>
                --II drużyna--
              </option>
              {allTeams.map((teams) => (
                <option className="" key={teams._id} value={teams._id}>
                  {" "}
                  {teams.name}
                </option>
              ))}
            </select>
          </div>
          <div className="info d-flex flex-row my-4">
            <div className="amountblock d-flex flex-column">
              <label className="text-start">Time</label>
              <input
                {...register("time")}
                type="time"
                onChange={(e) => setTime(e.target.value)}
                className="border"
              />
            </div>
            <div className="dateblock d-flex flex-column">
              <label className="text-start">Data</label>
              <input
                {...register("date")}
                type="date"
                min="2022-01-01"
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                onChange={(e) => setDate(e.target.value)}
                className="border"
              ></input>
            </div>
          </div>
          <label className="text-start">Kategoria</label>
          <select
            {...register("type")}
            defaultValue=""
            onChange={(e) => setCategory(e.target.value)}
            className="border bg-transparent text-muted"
          >
            <option value="" disabled>
              --Wybierz kategorię--
            </option>
            <option value="group_stage">Faza grupowa</option>
            <option value="play-off">Drabinka</option>
          </select>
          <div className="formfooter d-flex flex-row flex-wrap mt-5">
            <div className="me-4">
              <button
                className="w-55 btn text-light"
                type="submit"
                id="btn"
                disabled={!id1 || !id2 || !category || !date || !time}
              >
                Sukurti
              </button>
            </div>
            <div className="me-4">
              <button
                className="w-55 btn text-dark"
                onClick={handlepopupClose}
                type="submit"
              >
                Atšaukti
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StworzMatch;
