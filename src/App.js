import Sidebar from "./adminComponents/sidebar/Sidebar";
import Topbar from "./adminComponents/topbar/Topbar";
import "./App.css";
import Home from "./adminPages/home/Home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import UserList from "./adminPages/userList/UserList";
import User from "./adminPages/user/User";
import NewUser from "./adminPages/newUser/NewUser";
import ProductList from "./adminPages/productList/ProductList";
import Product from "./adminPages/product/Product";
import NewProduct from "./adminPages/newProduct/NewProduct";
import Login from "./adminPages/login/Login";
import { useSelector } from "react-redux";
import Analytics from "./adminPages/analytics/Analytics";
import Transactions from "./adminPages/transactions/Transactions";

function App() {

  const admin = useSelector((state) => state.user?.currentUser?.isAdmin);

    // console.log("admin: ", admin);
  
  return (
    <Router>
      <Switch>
        <Route path="/login">
            <Login />
          </Route>

        { admin ?
         ( <>
          <Topbar />
          <div className="container">
            <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
              <Route path="/transactions">
                <Transactions />
              </Route>
              <Route path="/analytics">
                <Analytics />
              </Route>
          </div>
         </> )

         :

         <Redirect to="/login" />
        }
        </Switch>
    </Router>
  );
}

export default App;
