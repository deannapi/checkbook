import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/Auth";

const Login = (props) => {
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
          <label onChange={handleChange}>Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            autoComplete="on"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            id="password"
            type="password"
            autoComplete="on"
            onChange={handleChange}
          />
        </div>

        {error ? (
          <div>
            <p className="error-text">
              The provided credentials are incorrect.
            </p>
          </div>
        ) : null}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
