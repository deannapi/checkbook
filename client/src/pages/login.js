import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/Auth";
import 'semantic-ui-css/semantic.min.css'
import { Form, Button } from 'semantic-ui-react';

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
    const handleSubmitForm = async event => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...formState }
            });

            Auth.login(data.login.token)
        } catch (e) {
            console.error(e);
        }
    };

    return (
      <body style={{  }}>
        <Form onSubmit={handleSubmitForm}>
          <Form.Group>
            <Form.Input fluid label="Email" onChange={handleChange} />
            <Form.Input fluid label="Password" type="password" onChange={handleChange} />
            {
              error ? <div>
                <p className="error-text">The provided credentials are incorrect.</p>
              </div> : null
            }
            <Button>Login</Button>
          </Form.Group>
        </Form>
      </body>
    )
};

export default Login;