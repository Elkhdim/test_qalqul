import React, { useState } from "react";
import axios from "axios";
import url from "../../config";
import { connect } from "react-redux";
import validator from "validator";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

import Register from "./Register";

function Login(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [errAuth, setEerrAuth] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    axios
      .post(`${url}/api/user/login`, {
        email: formValue.email,
        password: formValue.password,
      })
      .then((response) => {
        props.userLogin(response.data.token, response.data.user);
        setEerrAuth("");
        navigate("/profil");
      })
      .catch((error) => {
          setEerrAuth(true)
      });
  };

  const is_email = validator.isEmail(formValue.email);
  const is_empty_pass = validator.isEmpty(formValue.password);
  const show_button =
    is_empty_pass || !is_email ? (
      <button disabled className="btn btn-primary mt-3">
        Connecter
      </button>
    ) : (
      <button type="submit" className="btn btn-primary mt-3">
        Connecter
      </button>
    );

  return (
    <div className="container m-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-3">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>
        {is_email ? (
          <></>
        ) : (
          <div className="text-danger mt-2">Email est obligatoir</div>
        )}
        <div className="form-group mt-3">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </div>
        {!is_empty_pass ? (
          <></>
        ) : (
          <div className="text-danger mt-2">Mot de passe est obligatoir</div>
        )}
        {show_button}
       {
  errAuth?<div className="bg-danger text-white border border-danger p-2 pb-3 pt-3 mt-2">Email ou mot de pass incorrect</div>:<></>
}
        <div>
          <Link className="text-decoration-none" to="/register">
            Register
          </Link>
        </div>
      </form>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (token, user) => {
      dispatch({
        type: "LOGIN_USER",
        token: token,
        user: user,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
