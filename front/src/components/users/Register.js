import React,{useState} from 'react'
import validator from "validator";
import url from "../../config";
import axios from "axios";
import { connect } from 'react-redux';
import {useNavigate} from "react-router-dom"
 function Register(props) {
   const navigate = useNavigate()
  const [formValue, setFormValue] = useState({
    name:"",
    email: "",
    password: "",
  });
  const [errSignUpe,setErrSignUp]=useState(false)
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
      .post(`${url}/api/user/register`, {
        name:formValue.name,
        email: formValue.email,
        password: formValue.password,
      })
      .then((response) => {
        
        props.userLogin(response.data.token, response.data.user);
        alert("L'enregistrement a été realisé avec succées")
        navigate('/')
      })
      .catch((error) => {
        setErrSignUp(true)
      });
  };
  const is_empty_name = validator.isEmpty(formValue.name);
  const is_email = validator.isEmail(formValue.email);
  const is_empty_pass = validator.isEmpty(formValue.password);
  const show_button =
    is_empty_pass || !is_email || is_empty_name ? (
      <button disabled className="btn btn-primary mt-3">
        Submit
      </button>
    ) : (
      <button type="submit" className="btn btn-primary mt-3">
        Submit
      </button>
    );

  
  return (
    <div className="container m-5">
    <form onSubmit={handleSubmit}>
    <div className="form-group mt-3">
        <label for="exampleInputEmail1">Nom</label>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Votre nom"
          onChange={handleChange}
        />
      </div>
      {!is_empty_name ? (
        <></>
      ) : (
        <div className="text-danger mt-2">Nom est obligatoir</div>
      )}
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

    </form>
{
  errSignUpe?<div className="bg-danger text-white border border-danger p-2 pb-3 pt-3 mt-2">Email deja exists</div>:<></>
}
  </div>
  )
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
export default connect(null,mapDispatchToProps)(Register)