import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
import Log from "./Log";
import Admin from "./Admin";
import Manager from "./Manager";
import Order from "./Order";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SupplierManager from "./SupplierManager/SupplierManager";
import CreateSupplierPosts from "./SupplierManager/CreateSupplierPosts";
import SupplierList from "./SupplierManager/SupplierList";

import AdminManager from "./AdminManager/AdminManager";
import AddManagers from "./AdminManager/AddManagers";
import ManagerList from "./AdminManager/ManagerList";

import CustomerProfile from "./Customers/CustomerProfile";

import CreateProduct from "./ProductManager/CreateProduct";
import ProductList from "./ProductManager/ProductList";
import UpdateProduct from "./ProductManager/UpdateProduct";

import EmployeeManage from "./EmployeeM/EmployeeManage";
import AddEmployee from "./EmployeeM/AddEmployee";
import Manage from "./EmployeeM/Manage";
import Dashboard from "./EmployeeM/Dashboard";

import AddVehicle from "./DistributeManager/AddVehicle";
import AddDistributer from "./DistributeManager/AddDistributer";
import VehicleList from "./DistributeManager/VehicleList";
import DistributDash from "./DistributeManager/DistributeManager";
import DistributeList from "./DistributeManager/DistributeList";
import OrederDetails from "./OrederDetails";

import DistributereportList from "./DistributeManager/disreport";
import DisOrederDetails from "./DistributeManager/DisOrder";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/Man/create/posts" element={<Posts />} />
        <Route path="/login" element={<Log />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/orders/orderdetail" element={<OrederDetails />} />
        <Route path="/Man" element={<Manager />} />
        <Route path="/CusromerProfile" element={<CustomerProfile />} />
        <Route path="/SupplierManager" element={<SupplierManager />} />
        <Route
          path="/SupplierManager/CreateSupplierPosts"
          element={<CreateSupplierPosts />}
        />
        <Route
          path="/SupplierManager/CreateSupplierPosts/SupplierList"
          element={<SupplierList />}
        />

        <Route path="/AdminManager" element={<AdminManager />} />
        <Route path="/AdminManager/AddManagers" element={<AddManagers />} />
        <Route
          path="/AdminManager/AddManagers/ManagerList"
          element={<ManagerList />}
        />
        <Route path="/DistributeDash" element={<DistributDash />} />
        <Route
          path="/DistributeManager/createdistributer"
          element={<AddDistributer />}
        />
        <Route
          path="/DistributeManager/createvehicle"
          element={<AddVehicle />}
        />
        <Route
          path="/DistributeManager/createdistributer/DistributeList"
          element={<DistributeList />}
        />
        <Route
          path="/DistributeManager/createvehicle/VehicleList"
          element={<VehicleList />}
        />
        <Route
          path="/DistributeManager/DistributeList/disreport"
          element={<DistributereportList />}
        />
        <Route
          path="/DistributeManager/DisOrder"
          element={<DisOrederDetails />}
        />
        
        <Route
          path="/AdminManager/AddManagers/ManagerList"
          element={<ManagerList />}
        />
        <Route
          path="/ProductManager/CreateProduct"
          element={<CreateProduct />}
        ></Route>
        <Route
          path="/ProductManager/ProductList"
          element={<ProductList />}
        ></Route>
        <Route
          path="/ProductManager/ProductList/CreateProduct"
          element={<CreateProduct />}
        ></Route>
        <Route
          path="/ProductManager/UpdateProduct/:id"
          element={<UpdateProduct />}
        ></Route>
        <Route
          path="/AdminManager/AddManagers/ManagerList"
          element={<ManagerList />}
        />

        //Employee
        <Route path="/employeemanager" element={<EmployeeManage />} />
        <Route path="/employeemanager/addemployee" element={<AddEmployee />} />
        <Route
          path="/employeemanager/addemployee/Empmanage"
          element={<Manage />}
        />
        <Route path="/employeemanager/empdashboard" element={<Dashboard />} />
        <Route path="/employeemanager/manageemployee" element={<Manage />} />
       

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
