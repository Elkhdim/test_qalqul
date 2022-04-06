import React from "react";
import { connect } from "react-redux";

function Profil(props) {
  //console.log(Props)
  const { user } = props;
  return (
    <div className="container d-flex justify-content-center">
      <div className="card-body">
        <h5 className="card-title">Votre profil</h5>
        <p className="card-title">Votre nom: {user.name}</p>
        <p className="card-title">Votre email: {user.email} </p>
        <p className="card-title">Votre password: {user.password}</p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps)(Profil);
