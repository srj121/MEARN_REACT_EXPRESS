import React, { Component } from "react";
import '../css/login.css'
import { Link } from "react-router-dom";

class LoginPage extends Component {
    constructor(props) {
        super(props);

    this.state = {
      username: "",
      password: "",
      error: null,
    };
  }



   handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    console.log("hi ")
    event.preventDefault();
    console.log(this.username)
    console.log(this.password)

    this.setState({
      error: null,
    });

  };

  render() {
    const { username, password, error } = this.state;

    return (
      <div className="loginForm">
        <h2>Login </h2><br></br>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={this.handleInputChange}
        />
        <br></br>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.handleInputChange}
        />

        {error && <div>{error}</div>}
        <br></br>
        <Link to={'/home'}><button type="submit" onClick={this.handleSubmit}>Log In</button></Link>
        <br/><br/>
        <Link to="/signup">Don't have an account? Sign up</Link>
      </div>
    );
  }
}

export default  LoginPage;
