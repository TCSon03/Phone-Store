import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import instance from "./axios/index";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/admin/Dashboard";
import ProductAdd from "./pages/admin/ProductAdd";
import ProductEdit from "./pages/admin/ProductEdit";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [products, setProducts] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get("/products");
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleSubmit = (data) => {
    (async () => {
      try {
        const res = await instance.post(`/products`, data);
        console.log(res.data);
        setProducts([...products, res.data]);
        if (
          confirm("Them san pham thanh cong!. Ban muon tro lai trang admin? ")
        ) {
          nav("/admin");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };
  const handleSubmitEdit = (data) => {
    (async () => {
      try {
        const res = await instance.patch(`/products/${data.id}`, data);
        // console.log(res.data);
        // setProducts([...products, res.data]);
        const newData = await instance.get(`/products`);
        setProducts(newData.data);
        if (
          confirm("Sua san pham thanh cong!. Ban muon tro lai trang admin? ")
        ) {
          nav("/admin");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };
  const handleRemove = (id) => {
    (async () => {
      try {
        if (confirm("Ban muon xoa?")) {
          //cach 1: tot hon cach 2
          await instance.delete(`/products/${id}`);
          const newData = products.filter((item) => item.id !== id && item);
          setProducts(newData);
          //cach 2:
          // const newData = await instance.get(`/products`);
          // setProducts(newData.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home data={products} />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<PrivateRoute />}>
            <Route
              path="/admin"
              element={
                <Dashboard data={products} removeProduct={handleRemove} />
              }
            />
            <Route
              path="/admin/product-add"
              element={<ProductAdd onAdd={handleSubmit} />}
            />
            <Route
              path="/admin/product-edit/:id"
              element={<ProductEdit onEdit={handleSubmitEdit} />}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
