import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";

class PrvaPrijava extends React.Component {


  state = {
      email: null,
      password: null,
  }

  /*function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }*/

  render() {
    return (
    <div className="Login">
      <form>
        <FormGroup controlId="email" bsSize="large">
          <label>Email</label>
          <FormControl
            autoFocus
            type="email"
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <label>Password</label>
          <FormControl
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" type="submit">
          Login
        </Button>
      </form>
    </div>
    );
  }
}

export default PrvaPrijava;