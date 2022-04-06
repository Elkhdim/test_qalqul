import React, { useState } from "react";
import axios from "axios";
import url from "../../../config";
import validator from "validator";
import {useNavigate} from 'react-router-dom'
function AddNewProduct(props) {
    const navigate = useNavigate()
  const id_User = localStorage.getItem("idUser");
  const all_names_products = JSON.parse(localStorage.getItem("names"));

  const [formProduct, setFormProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    image: null,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormProduct((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const onFileChange = (fileChangeEvent) => {
    const img = fileChangeEvent.target.files[0];
    setFormProduct({
      ...formProduct,
      image: img,
    });
  };

  const addProduct = async (ev) => {
    ev.preventDefault();

    let formData = new FormData();

    formData.append("id_User", id_User);
    formData.append("name", formProduct.name);
    formData.append("productImage", formProduct.image);
    formData.append("quantity", formProduct.quantity);
    formData.append("price", formProduct.price);
    axios
      .post(`${url}/api/product/add/${id_User}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("Le produit a été ajouter");
        navigate(`/product/${id_User}`)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const is_empty_name = validator.isEmpty(formProduct.name);
  const is_empty_quantity = validator.isEmpty(formProduct.quantity);
  const is_empty_price = validator.isEmpty(formProduct.price);

  const show_button =
    is_empty_name ||
    is_empty_quantity ||
    is_empty_price ||
    formProduct.image === null ||
    all_names_products.includes(formProduct.name) ? (
      <button disabled className="btn btn-primary mt-3">
        Ajouter
      </button>
    ) : (
      <button type="submit" className="btn btn-primary mt-3">
        Ajouter
      </button>
    );

  return (
    <form onSubmit={addProduct}>
      <div class="form-group">
        <label for="exampleInputEmail1">Nom de produit</label>
        <input
          type="text"
          onChange={handleChange}
          class="form-control"
          name="name"
        />
      </div>
      {is_empty_name ? (
        <div className="text-danger mt-2">Nom de produit est obligatoir</div>
      ) : (
        <></>
      )}
      {all_names_products.includes(formProduct.name) ? (
        <div className="text-danger mt-2">Ce nom deja exists</div>
      ) : (
        <></>
      )}
      <div class="form-group">
        <label for="exampleInputPassword1">Quantité</label>
        <input
          type="text"
          onChange={handleChange}
          name="quantity"
          class="form-control"
        />
      </div>
      {is_empty_quantity ? (
        <div className="text-danger mt-2">
          La quantité de produit est obligatoir
        </div>
      ) : (
        <></>
      )}
      <div class="form-group">
        <label for="exampleInputPassword1">Prix</label>
        <input
          type="text"
          onChange={handleChange}
          name="price"
          class="form-control"
        />
      </div>
      {is_empty_price ? (
        <div className="text-danger mt-2">Prix de produit est obligatoir</div>
      ) : (
        <></>
      )}
      <div class="form-group m-1">
        <label for="formFile" class="form-label">
          Image
        </label>
        <input
          class="form-control"
          onChange={onFileChange}
          name="file"
          type="file"
          id="formFile"
        ></input>
      </div>
      {formProduct.image === null ? (
        <div className="text-danger mt-2">
          L'image de produit est obligatoir
        </div>
      ) : (
        <></>
      )}
      {show_button}
    </form>
  );
}

export default AddNewProduct;
