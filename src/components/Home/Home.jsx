import React, { Fragment, useEffect } from "react";
import "./Home.css";
import Product from "./ProductCard";
import Metadata from "../layout/Metadata";
import { clearErrors, getProducts } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
// import { useAlert } from "react-alert";

const Home = ({products : propsProducts}) => {
  // const alert = usetoast.error();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const fallbackProducts = propsProducts || [];

  useEffect(() => {
    if (error) {
      toast.error(error || "Something went wrong!")
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="HOME -- Pixa-mart" />
          <div className="banner">
            <p>welcome to Pixa-mart</p>
            <h1>FIND AMAZING RPODUCTS BELOW</h1>

              
            <a href="#container">
              <button>Scroll</button>
            </a>
          </div>

            <h2 className="homeHeading">Featured Products</h2>

            <div className="container" id="container">
              {products && products.length > 0 ?
                products.map((product) => <Product key={product._id} product={product} />) : 
                fallbackProducts.map((product) => <Product key={product._id} product={product} />)}
            </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
