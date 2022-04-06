import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import url from "../../../config";
import validator from "validator";

function UpdateProduct(props) {
  const { id } = useParams();
  const navigate= useNavigate()
  const idUser = localStorage.getItem("idUser");
  const nameProduct = sessionStorage.getItem('nameProduct')
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

  const getOneProduct = () => {
    axios.get(`${url}/api/product/${id}/${idUser}`).then((res) => {
      setFormProduct({
        name: res.data[0].name,
        price: res.data[0].price,
        quantity: res.data[0].quantity,
      });
    });
  };
  const arr_prod = []
  for( var i = 0; i < all_names_products.length; i++){ 
    if ( all_names_products[i] !== nameProduct) { 

        arr_prod.push( all_names_products[i])
    }

}
  useEffect(() => {
    getOneProduct();
  }, []);

  const onFileChange = (fileChangeEvent) => {
    const img = fileChangeEvent.target.files[0];
    setFormProduct({
      ...formProduct,
      image: img,
    });
  };
  const updateProduct = (ev) => {
    ev.preventDefault();
    let formData = new FormData();
    formData.append("id_User", idUser);
    formData.append("name", formProduct.name);
    formData.append("productImage", formProduct.image);
    formData.append("quantity", formProduct.quantity);
    formData.append("price", formProduct.price);

    axios
      .put(`${url}/api/product/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
     
        alert("Le produit est modifier");
        navigate(`/product/${idUser}`)
      });
  };

  const is_empty_name = validator.isEmpty(formProduct.name);
  const is_empty_quantity = validator.isEmpty(formProduct.quantity);
  const is_empty_price = validator.isEmpty(formProduct.price);
  const show_button =
    is_empty_name ||
    is_empty_quantity ||
    is_empty_price ||
    arr_prod.includes(formProduct.name) ||
    typeof formProduct.image === "undefined" ? (
      <button disabled className="btn btn-primary mt-3">
        Modifier
      </button>
    ) : (
      <button type="submit" className="btn btn-primary mt-3">
        Modifier
      </button>
    );
  return (
    <form onSubmit={updateProduct}>
      <div class="form-group">
        <label for="exampleInputEmail1">Nom de produit</label>
        <input
          type="text"
          onChange={handleChange}
          class="form-control"
          name="name"
          value={formProduct.name}
        />
      </div>
      {is_empty_name ? (
        <div className="text-danger mt-2">Nom de produit est obligatoir</div>
      ) : (
        <></>
      )}
      {arr_prod.includes(formProduct.name) ? (
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
          value={formProduct.quantity}
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
          value={formProduct.price}
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
      {formProduct.image === undefined ? (
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

export default UpdateProduct;
