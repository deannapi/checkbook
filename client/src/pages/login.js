import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/Auth";

export default function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  //   submit form
  const handleSubmitForm = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp"
            autoComplete="on"
            value={formState.email}
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            name="password"
            id="password"
            type="password"
            autoComplete="on"
            onChange={handleChange}
            value={formState.password}
          ></input>
        </div>

        <button type="submit" className="btn">
          Login
        </button>
        {error && <div className="error-text">Uh oh, login failed</div>}
      </form>
    </div>
  );
}
