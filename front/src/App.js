import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Admin from "./components/admin/Admin";
import { connect } from "react-redux";

import "./App.css";
import { Route, Routes } from "react-router-dom";


function App(props) {
  const { user, token } = props;
user?localStorage.setItem('idUser',user._id):<></>
user?localStorage.setItem('name',user.name):<></>

  console.log(token);
  return <div className="container">
    
    {token ? 
    
    <Admin /> :
     //<Login />
     <Routes>
   
    <Route path="/" exact element={<Login />} />
    <Route path="/login"  element={<Login />} />
      
    <Route path="/register"  element={<Register />} />
    </Routes>
     }
   
    </div>;
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(App);
