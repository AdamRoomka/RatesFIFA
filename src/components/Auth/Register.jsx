import React from "react";
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
    formState: { errors },
  } = useForm();

    if (window.localStorage.getItem("token") !== null) {
      window.location.assign("/");
    }

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
        <input
          type="text"
          name="name"
          placeholder="Imię i nazwisko"
          {...register("name", {
            required: "Musisz uzupełnić imię i nazwisko",
            minLength: 3,
            pattern: /^[[^A-Za-ząąćčęęėįłńóśšųūžźżĄĄČĆĘĘĖĮŁŃÓŠŚŲŪŽŹŻ ]*$/i,
          })}
        />
        <div className="text-danger fw-light m-2">
          {errors.name && <p>{errors.name.type === "pattern" && "Nie mogą być dodatkowe znaki"}</p>}
          {errors.name && <p>{errors.name.type === "required" && "Nie wpisałeś imię i nazwisko"}</p>}
          {errors.name && <p>{errors.name.type === "minLength" && "Muszą być co najmniej 3 symbole"}</p>}
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          {...register("email", {
            required: true,
          })}
        />
        <div className="text-danger fw-light m-2">
          {errors.email && <p>{errors.email.type === "required" && "Nie wpisałeś email"}</p>}
        </div>
        <input
          type="text"
          name="login"
          placeholder="Login"
          {...register("login", {
            required: true,
            minLength: 2,
            pattern: /^[[^A-Za-ząąćčęęėįłńóśšųūžźżĄĄČĆĘĘĖĮŁŃÓŠŚŲŪŽŹŻ]*$/i,
          })}
        />
        <div className="text-danger fw-light m-2">
          {errors.login && <p>{errors.login.type === "pattern" && "Nie mogą być dodatkowe znaki"}</p>}
          {errors.login && <p>{errors.login.type === "required" && "Nie wpisałeś login"}</p>}
          {errors.login && <p>{errors.login.type === "minLength" && "Muszą być co najmniej 2 symbole"}</p>}
        </div>
        <input
          type="password"
          name="pass"
          placeholder="Hasło"
          {...register("password", {
            required: true,
            minLength: 5
          })}
        />
        <div className="text-danger fw-light m-2">
          {errors.password && <p>{errors.password.type === "required" && "Hasło obowiązkowe"}</p>}
          {errors.password && <p>{errors.password.type === "minLength" && "Hasło musi zawierać co najmniej 5 symbol"}</p>}
        </div>
        <input
          type="password"
          name="cpass"
          placeholder="Potwierdź hasło"
          {...register("passwordRepeat", {
            required: true,
            validate: { passwordMatch: (value) => value === password },
          })}
        />
        <div className="text-danger fw-light m-2">
          {errors.passwordRepeat && <p>{errors.passwordRepeat.type === "required" && "Hasło obowiązkowe"}</p>}
          {errors.passwordRepeat && <p>{errors.passwordRepeat.type === "passwordMatch" && "Hasło musi być dopasowane"}</p>}
        </div>
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
