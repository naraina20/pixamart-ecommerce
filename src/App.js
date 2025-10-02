import axios from "axios";
import "./App.css";
import React, { useState,lazy,Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import webFont from "webfontloader";
import store from "./store";
import ScrollToTop from "./ScrollToTop";
import Loader from "./components/layout/Loader/Loader.jsx";
import { toast, ToastContainer } from 'react-toastify';



// Components
import Navbar from "./components/layout/Navbar/Navbar"
import Footer from "./components/layout/Footer/Footer"
const UserOptions = lazy(() => import("./components/layout/Header/UserOptions"));
const Home = lazy(() => import("./components/Home/Home"));
const ProductDetails = lazy(() => import("./components/product/ProductDetails"));
const Products = lazy(() => import("./components/product/Products"));
const Search = lazy(() => import("./components/search/Search.jsx"));
const LoginSignup = lazy(() => import("./components/User/LoginSignup"));
const Profile = lazy(() => import("./components/User/Profile"));
const ProtectedRoute = lazy(() => import("./components/Route/ProtectedRoute"));
const UpdateProfile = lazy(() => import("./components/User/UpdateProfile"));
const UpdatePassword = lazy(() => import("./components/User/UpdatePassword"));
const ForgotPassword = lazy(() => import("./components/User/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/User/ResetPassword"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const ShippingInfo = lazy(() => import("./components/Cart/ShippingInfo"));
const ConfirmOrder = lazy(() => import("./components/Cart/ConfirmOrder"));
const Payment = lazy(() => import("./components/Cart/Payment"));
const OrderSuccess = lazy(() => import("./components/Cart/OrderSuccess"));
const MyOrders = lazy(() => import("./components/Orders/MyOrders"));
const OrderDetails = lazy(() => import("./components/Orders/OrderDetails"));
const Dashboard = lazy(() => import("./components/Admin/Dashboard"));
const ProductsList = lazy(() => import("./components/Admin/ProductsList"));
const NewProduct = lazy(() => import("./components/Admin/NewProduct"));
const UpdateProduct = lazy(() => import("./components/Admin/UpdateProduct"));
const OrderList = lazy(() => import("./components/Admin/OrderList"));
const ProcessOrder = lazy(() => import("./components/Admin/ProcessOrder"));
const UsersList = lazy(() => import("./components/Admin/UsersList"));
const UpdateUser = lazy(() => import("./components/Admin/UpdateUser"));
const ProductReviews = lazy(() => import("./components/Admin/ProductReviews"));
const Category = lazy(() => import("./components/Admin/Category"));
const Contact = lazy(() => import("./components/layout/Contact/Contact"));
const About = lazy(() => import("./components/layout/About/About"));
const NotFound = lazy(() => import("./components/layout/Not Found/NotFound"));


function App() {
  const { user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/stripeapikey`);

    setStripeApiKey(data.stripeApiKey);
  }
  

  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<Loader />}>
        {<UserOptions user={user} />}

        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute
              exact
              path="/process/payment"
              component={Payment}
            />
          </Elements>
        )}

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/products" component={Products} />
          <Route path="/products/:keyword" component={Products} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/login" component={LoginSignup} />
          <Route exact path="/password/forgot" component={ForgotPassword} />
          <Route exact path="/password/reset/:token" component={ResetPassword} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />

          <ProtectedRoute exact path="/account" component={Profile} />
          <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
          <ProtectedRoute exact path="/shipping" component={ShippingInfo} />
          <ProtectedRoute exact path="/success" component={OrderSuccess} />
          <ProtectedRoute exact path="/orders" component={MyOrders} />
          <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
          <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

          <ProtectedRoute
            exact
            path="/password/update"
            component={UpdatePassword}
          />

          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/dashboard"
            component={Dashboard}
          />
          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/products"
            component={ProductsList}
          />
          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/newproduct"
            component={NewProduct}
          />
          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/category"
            component={Category}
          />

          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/product/:id"
            component={UpdateProduct}
          />
          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/orders"
            component={OrderList}
          />

          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/order/:id"
            component={ProcessOrder}
          />
          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/users"
            component={UsersList}
          />
          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/user/:id"
            component={UpdateUser}
          />
          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/reviews"
            component={ProductReviews}
          />

          <Route
            component={
              window.location.pathname === "/process/payment" ? null : NotFound
            }
          />
        </Switch>
        <Footer />
      </Suspense>
    </Router>
  );
}

export default App;
