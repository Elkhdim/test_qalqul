import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../../config";
import { Link } from "react-router-dom";

function GetAllProducts() {
  const [allProduct, setAllProduct] = useState([]);

  const id_User = localStorage.getItem("idUser");
  const all_name_products = [];
  const getAllProduct = () => {
    axios.get(`${url}/api/product/${id_User}`).then((res) => {
      setAllProduct(res.data);
    });
  };
  allProduct.map((item,key)=>{
    return all_name_products.push(item.name)
  })
  localStorage.setItem("names", JSON.stringify(all_name_products));
  const deleteProduct = (id) => {
     axios.delete(`${url}/api/product/delete/${id}`).then((res) => {
      alert("le produit été supprimer avec succes");
      getAllProduct()
    });
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  const getNameProduct = (name) =>{
    sessionStorage.setItem("nameProduct",name)
  }
  const viewProduct =
    allProduct.length > 0 && allProduct !== undefined ? (
      allProduct.map((item, index) => {
        return (
          <div className="card h-25 w-25 p-1 m-1" key={index}>
            <div className=" h-10 w-10">
              <img
                src={
                  item.productImage !== undefined
                    ? `${url}/` + item.productImage
                    : "https://www.anonymapparel.com/wp-content/plugins/woocommerce/assets/images/placeholder.png"
                }
                className="img-thumbnail  "
                alt=""
              />
            </div>

            <div className="card-body">
              <h5 className="card-title">Nom: {item.name}</h5>
              <p className="card-text">Prix: {item.price} DH</p>
              <p className="card-text">Quantité: {item.quantity}</p>
            </div>
            <div>
              <button type="button" onClick={()=>deleteProduct(item._id)} className="btn btn-danger m-1">
                Supprimer
              </button>

              <Link
                className="btn btn-light "
                to={{ pathname: `/updateProduct/${item._id}` }}
                onClick={()=>getNameProduct(item.name)}
              >
                Modifier
              </Link>
            </div>
          </div>
        );
      })
    ) : (
      <></>
    );

  return (
    <div>
      <Link
        type="button"
        className="btn btn-success m-2 ms-5"
        to="/addNewProduct"
      >
        Ajouter nouveau produit
      </Link>
      <div className="d-flex flex-wrap justify-content-around">
        {viewProduct}
      </div>
    </div>
  );
}

export default GetAllProducts;
