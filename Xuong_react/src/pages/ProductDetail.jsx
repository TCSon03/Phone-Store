import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`/products/${id}`);
        // console.log(data);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  // console.log(id);
  return (
    <div>
      <h1 className="h1">Product Detail</h1>
      <img src={product.thumbnail} alt="" />
      <p>{product.title}</p>
      <p>{product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetail;
