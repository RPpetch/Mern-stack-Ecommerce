import Navbar from "./components/layouts/Navbar";
import User from "./components/pages/User";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/pages/auth/login";
import Register from "./components/pages/auth/register";
import HomeAdmin from "./components/pages/admin/Home";
import HomeUser from "./components/pages/user/Home";
import ManageAdmin from "./components/pages/admin/ManageAdmin";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import CreateCategory from "./components/pages/admin/CreateCategory";
import UserNavbar from "./components/layouts/UserNavbar";
import AdminNavbar from "./components/layouts/AdminNavbar";
import "./css/Font.css";
import CreateProduct from "./components/pages/admin/product/CreateProduct";
import UpdateProduct from "./components/pages/admin/product/UpdateProduct";
import Product from "./components/pages/Product";
import Shop from "./components/pages/Shop";
import Cart from "./components/pages/Cart";
import SideDrawer from "./components/drawer/SideDrawer";
import Checkout from "./components/pages/Checkout";
import Wishlist from "./components/pages/user/Wishlist";
import History from "./components/pages/user/History";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <SideDrawer />
        <User />
      </div>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <div>
        <Navbar />
        <SideDrawer />
        <Product />
      </div>
    ),
  },
  {
    path: "user/product/:id",
    element: (
      <UserRoute>
      <UserNavbar />
      <SideDrawer />
      <Product />
    </UserRoute>
    ),
  },
  {
    path: "user/history",
    element: (
      <UserRoute>
      <UserNavbar />
      <SideDrawer />
      <History />
    </UserRoute>
    ),
  },
  {
    path: "/shop",
    element: (
      <div>
        <Navbar />
        <SideDrawer />
        <Shop />
      </div>
    ),
  },
  {
    path: "/cart",
    element: (
      <div>
        <Navbar />
        <SideDrawer />
        <Cart />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Navbar />
        <SideDrawer />
        <Login />
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div>
        <Navbar />
        <SideDrawer />
        <Register />
      </div>
    ),
  },
  {
    path: "/admin/index",
    element: (
      <div>
        <AdminRoute>
          <AdminNavbar />
          <HomeAdmin />
        </AdminRoute>
      </div>
    ),
  },
  {
    path: "/admin/manage-admin",
    element: (
      <div>
        <AdminRoute>
          <AdminNavbar />
          <ManageAdmin />
        </AdminRoute>
      </div>
    ),
  },
  {
    path: "/user/index",
    element: (
      <div>
        <UserRoute>
          <UserNavbar />
          <SideDrawer />
          <HomeUser />
        </UserRoute>
      </div>
    ),
  },
  {
    path: "/user/wishlist",
    element: (
      <div>
        <UserRoute>
          <UserNavbar />
          <SideDrawer />
          <Wishlist />
        </UserRoute>
      </div>
    ),
  },
  {
    path: "/user/shop",
    element: (
      <div>
        <UserRoute>
          <UserNavbar />
          <SideDrawer />
          <Shop />
        </UserRoute>
      </div>
    ),
  },
  {
    path: "/user/cart",
    element: (
      <div>
        <UserRoute>
          <UserNavbar />
          <SideDrawer />
          <Cart />
        </UserRoute>
      </div>
    ),
  },
  {
    path: "/checkout",
    element: (
      <div>
        <UserRoute>
          <UserNavbar />
          <Checkout />
        </UserRoute>
      </div>
    ),
  },
  {
    path: "/admin/create-category",
    element: (
      <div>
        <AdminRoute>
          <AdminNavbar />
          <SideDrawer />
          <CreateCategory />
        </AdminRoute>
      </div>
    ),
  },
  {
    path: "/admin/create-product",
    element: (
      <div>
        <AdminRoute>
          <AdminNavbar />
          <SideDrawer />
          <CreateProduct />
        </AdminRoute>
      </div>
    ),
  },
  {
    path: "/admin/update-product/:id",
    element: (
      <div>
        <AdminRoute>
          <AdminNavbar />
          <SideDrawer />
          <UpdateProduct />
        </AdminRoute>
      </div>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
