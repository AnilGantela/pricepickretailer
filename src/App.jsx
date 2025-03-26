import { Routes, Route, Navigate } from "react-router-dom";
import { Component } from "react";
import Addproduct from "./assets/Components/Addproduct";
import Products from "./assets/Components/Products";
import Login from "./assets/Components/Login";
import Home from "./assets/Components/Home";
import Services from "./assets/Components/Services";
import ProtectedRoute from "./assets/Components/ProtectedRoute"; // Import the protected route
import PageNotFound from "./assets/Components/PageNotFound";

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/add-product" element={<Addproduct />} />
          <Route path="/products" element={<Products />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
  }
}

export default App;
