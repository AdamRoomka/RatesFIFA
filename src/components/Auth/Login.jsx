import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Link, Navigate } from "react-router-dom";
import { socket } from "../../socket";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    socket.emit("loginUser", data);
  };

  useEffect(() => {
    const handleLoginResponse = (response) => {
      if (response.success) {
        swal({
          text: "Udało się zalogować!",
          icon: "success",
          button: "Dalej",
          timer: 5000,
        });
        window.localStorage.setItem("token", response.token);
        window.location.assign("/");
      } else {
        swal({
          text: "Dane kontaktowe są niepoprawne, spróbuj jeszcze raz!",
          icon: "error",
          button: "Dobrze",
          timer: 2000,
        });
      }
    };

    socket.on("loginResponse", handleLoginResponse);

    return () => {
      socket.off("loginResponse", handleLoginResponse);
    };
  }, [socket]);

  if (window.localStorage.getItem("token") !== null) {
    return <Navigate to="/" />;
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
              message: "Nie więcej niż 30 znaków",
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
            required: "Hasło jest obowiązkowe",
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
        <Link to="/register" className="ms-4">
          Zarejestruj się
        </Link>
      </fieldset>
    </form>
  );
}

export default Login;
