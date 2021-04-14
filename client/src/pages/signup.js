import React, { useState } from "react";
import Auth from "../utils/Auth";
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../utils/mutations";

export default function Signup(props) {
  const [formState, setFormState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        username: formState.username,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="signup-form">
      <form onSubmit={handleFormSubmit} >
        <div className="input-group">
          <div className="input-group-prepend">
            <label>First & Last Name</label>
          </div>
          <input
            type="text"
            aria-label="First name"
            className="form-control"
            autoComplete="on"
            onChange={handleChange}
          ></input>
          <input
            type="text"
            aria-label="Last name"
            className="form-control"
            autoComplete="on"
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            autoComplete="on"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input type="text" className="form-control" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            autoComplete="on"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
        {error && <div>Uh oh, sign up failed.</div>}
      </form>
    </div>
  );
}
