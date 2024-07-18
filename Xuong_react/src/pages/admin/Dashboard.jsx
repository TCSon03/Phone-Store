import React from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ data, removeProduct }) => {
  return (
    <div>
      <h1 className="h1">Hello Admin</h1>
      <Link to="/admin/product-add" className="btn btn-primary">
        Add New Product
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>PRICE</th>
            <th>DESCRIPTION</th>
            <th>THUMBNAIL</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td> {item.description || "Dang cap nhat"}</td>
              <td>
                {item.thumbnail ? (
                  <img src={item.thumbnail} alt="" />
                ) : (
                  "Dang cap nhat"
                )}
              </td>
              <td>
                <Link
                  to={`/admin/product-edit/${item.id}`}
                  className="btn btn-danger"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-warning"
                  onClick={() => removeProduct(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
