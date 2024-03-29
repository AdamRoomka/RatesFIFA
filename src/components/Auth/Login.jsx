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
    formState: { errors },
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
        <div className="text-danger fw-light m-2">
          {errors.login && <p>{errors.login.message}</p>}
        </div>
        <input
          className="home-input"
          type="password"
          name="password"
          placeholder="Hasło"
          {...register("password", {
            required: "Hasło obowiązkowe",
          })}
        />
        <div className="text-danger fw-light m-2">
          {errors.password && <p>{errors.password.message}</p>}
        </div>
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