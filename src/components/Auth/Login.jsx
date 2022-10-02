import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { doLogin } from "../../api/lib/UsersApi";
import { Link, Navigate } from "react-router-dom";
import swal from "sweetalert";
import "../css/auth.css";

function Login() {
  useEffect(() => {
    if (window.localStorage.getItem("token") !== null) {
      Navigate("/");
    }
  }, []);

  const [render, setRender] = useState(false);

  const {
    register,
    handleSubmit,
  } = useForm();

  function onSubmit(data) {
    doLogin(data)
      .then((res) => {
        swal({
          text: "Udało się zalogować!",
          icon: "success",
          button: "Dalej",
          timer: 5000,
        });
        if (res.status === 200) {
          setTimeout(() => {
            window.localStorage.setItem("token", res.data.token);
            window.location.assign("/");
            setRender(render);
          }, 1000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        swal({
          text: "Dane kontaktowe są niepoprawne, spróbuj jeszcze raz!",
          icon: "error",
          button: "Dobrze",
          timer: 2000,
        });
      });
  }

  return (
    <form id="msform" onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <h2 className="fs-title">Zaloguj się</h2>
        <br />
        <input
          type="text"
          className="home-input"
          id="email-login"
          placeholder="Login"
          {...register("login", {
            required: "Login jest obowiązkowy",
            maxLength: {
              value: 30,
              message: "Nie więcej niż 50 symbolów",
            },
          })}
        />
        {/* <div className="error text-danger fw-light m-2">
          {errors.login?.message}
        </div> */}
        <input
          className="home-input"
          type="password"
          name="password"
          placeholder="Hasło"
          {...register("password", {
            required: "Hasło obowiązkowe",
            minLength: {
              value: 7,
              message: "Hasło musi zawierać co najmniej 7 symbol",
            },
            maxLength: {
              value: 50,
              message: "Nie więcej niż 50 symbolów",
            },
          })}
        />
        {/* <div className="error text-danger fw-light m-2">
          {errors.password?.message}
        </div> */}
        <button
          type="submit"
          name="next"
          className="next action-button"
          value="Next"
        >
          Zaloguj się
        </button>
        <Link to="/register" name="next" className="ms-4" value="Next">
          Zarejestruj się
        </Link>
      </fieldset>
    </form>
  );
}

export default Login;