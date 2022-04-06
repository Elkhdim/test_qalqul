import React from "react";
import Product from "./Product/GetAllProducts";
import { Link, Routes, Route } from "react-router-dom";
import AddNewProduct from "./Product/AddNewProduct";
import UpdateProduct from "./Product/UpdateProduct";
import Profil from "./Profil";
import {connect} from 'react-redux'
function Admin(props) {
  const name=localStorage.getItem('name')
  const id_User = localStorage.getItem("idUser")
  const _logout= async ()=>{
    await localStorage.removeItem('persist:root')
    const action = { type: "LOGOUT"}
    
     props.dispatch(action)
    // showMessage({
    //   message: "Vous êtes déconnecté.",
    //   type: "info",
    // });
  }
  return (
    <div className="row ">
      <div className="col-sm-3 ">
        <div className="m-4">
          <div class="sidebar-header">
            <h3>Bonjour {name}</h3>
          </div>
          <ul class="list-unstyled mt-1">
           
          <li className="mt-1">
              <Link className="text-decoration-none" to="/profil">Profil</Link>
            </li>
            <li className="mt-1">
              <Link className="text-decoration-none" to={{pathname:`/product/${id_User}`}} >Product</Link>
            </li>
           
            <li className="mt-1">
              <Link className="text-decoration-none" to="/login" onClick={()=>_logout()}>Déconnecté</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-sm-9">
        <Routes>
          <Route path="/profil"  element={<Profil />} />
          <Route path="/product/:id" exact element={<Product />} />

          <Route path="/addNewProduct" element={<AddNewProduct />} />
          <Route path="/updateProduct/:id" element={<UpdateProduct />} />
        </Routes>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}
export default connect(null, mapDispatchToProps)(Admin);
