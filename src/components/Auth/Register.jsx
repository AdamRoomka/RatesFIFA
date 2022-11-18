import React, { useEffect } from "react";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { createUser } from "../../api/lib/UsersApi";
import { Link } from "react-router-dom";
import "../css/auth.css";

function Register() {
  const {
    watch,
    register,
    handleSubmit,
    reset,
    //formState: { errors },
  } = useForm();

  useEffect(() => {
    if (window.localStorage.getItem("token") !== null) {
      window.location.assign("/");
    }
  }, []);

  function onSubmit(data) {
    createUser(data)
      .then((result) => {
        swal({
          text: "Rejestracja udana, teraz możesz zalogować się",
          icon: "success",
          button: "ok",
          timer: 2000,
        });
        window.location.assign("/Login");
      })
      .catch((error) => {
        swal({
          text: "Taki użytkownik już istnieje",
          icon: "error",
          button: "ok",
          timer: 5000,
        });
      });
    reset();
  }
  let password = watch("password");

  return (
    <form id="msform" onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <h2 className="fs-title">Stwórz swój profil</h2>
        <br />

        {/* <div className="text-danger fw-light m-2">
          {errors.name?.type === "pattern" && "Nie mogą być dodatkowe znaki"}
          {errors.name?.type === "required" && "Nie wpisałeś imię i nazwisko"}
          {errors.name?.type === "minLength" &&
            "Muszą być co najmniej 3 symbole"}
        </div> */}

        <input
          type="text"
          name="name"
          placeholder="Imię i nazwisko"
          {...register("name", {
            required: "Musisz uzupełnić imię i nazwisko",
            minLength: 3,
            pattern: /^[[^A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ ]*$/i,
          })}
        />

        {/* <div className="text-danger fw-light m-2">
          {errors.login?.type === "pattern" && "Nie mogą być dodatkowe znaki"}
          {errors.login?.type === "required" && "Nie wpisaleś login"}
          {errors.login?.type === "minLength" &&
            "Muszą być co najmniej 2 symbole"}
          {errors.login?.type === "maxLength" &&
            "Bez przesady, za długi login wpisałeś, do 30 symbolów"}
        </div> */}

        <input
          type="email"
          name="email"
          placeholder="Email"
          {...register("email", {
            required: true,
          })}
        />

        <input
          type="text"
          name="login"
          placeholder="Login"
          {...register("login", {
            required: true,
            minLength: 2,
            maxLength: 30,
            pattern: /^[[^A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ]*$/i,
          })}
        />

        {/* <div className="text-danger fw-light m-2">
          {errors?.password?.type === "required" && "Hasło obowiązkowe"}
          {errors?.password?.type === "minLength" &&
            "Hasło musi zawierać co najmniej 7 symbol"}
          {errors?.password?.type === "maxLength" &&
            "Nie więcej niż 50 symbolów"}
        </div> */}

        <input
          type="password"
          name="pass"
          placeholder="Hasło"
          {...register("password", {
            required: true,
            minLength: 7,
            maxLength: 50,
          })}
        />

        {/* <div className="text-danger fw-light m-2">
          {errors.passwordRepeat?.type === "required" && "Hasło obowiązkowe"}
          {errors.passwordRepeat?.type === "passwordMatch" &&
            "Hasło musi być dopasowane"}
        </div> */}

        <input
          type="password"
          name="cpass"
          placeholder="Potwierdź hasło"
          {...register("passwordRepeat", {
            required: true,
            validate: { passwordMatch: (value) => value === password },
          })}
        />

        <input
          type="submit"
          name="next"
          className="next action-button"
          value="Potwierdź"
        />
        <Link to="/Login" className="ms-4">
          Zaloguj się
        </Link>
      </fieldset>
    </form>
  );
}

export default Register;
