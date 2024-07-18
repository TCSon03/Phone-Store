import React from "react";
import { Link } from "react-router-dom";

const Home = ({ data }) => {
  return (
    <>
      <div className="new-product">
        <h2 className="h1">List of products</h2>
        {/* <p>View all products</p> */}
      </div>
      <div className="product">
        {data.map((product) => (
          <div key={product.id} className="cart">
            <Link to={`/product-detail/${product.id}`}>
              <p>
                <img src={product.thumbnail} alt="" />
              </p>
            </Link>
            <div className="product-title">
              <Link to={`/product-detail/${product.id}`}>
                <h2>{product.title}</h2>
              </Link>
              <p className="product-price">{product.price} $</p>
              {/* <p>{product.description}</p> */}
              <button>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
