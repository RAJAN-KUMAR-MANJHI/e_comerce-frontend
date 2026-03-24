

import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

import { HeroCarousel } from "../components/HeroCarousel";
import { TrendingProducts } from "../components/TrendingProducts";
import { Products } from "./products/Products";

export function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const res = await api.get("/api/products");

      setProducts(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <>
      {/* Top Banner */}
      <HeroCarousel />

      {/* Horizontal Products */}
      <TrendingProducts products={products} />

      {/* All Products */}
      <Products />

    </>

  );

}