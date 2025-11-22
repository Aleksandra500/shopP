import { MdAdd } from "react-icons/md";
import { GrCubes } from "react-icons/gr";
import { FiActivity } from "react-icons/fi";
import { SiManageiq } from "react-icons/si";
import { useState } from "react";
import AllProduct from "../../pages/AllProduct";
import AddProductsPage from '../../pages/AddProductsPage';
import ManageProductsComponent from '../adminComponents/ManageProductsComponent';
import StatisticComponent from "./StatisticComponent";

function AdminNavComponent() {
  const [activeTab, setActiveTab] = useState("statistic");

  const renderComponent = () => {
    switch (activeTab) {
      case "allProducts":
        return <AllProduct />;
      case "addProduct":
        return <AddProductsPage />;
      case "manageProducts":
        return <ManageProductsComponent />;
      default:
        return <StatisticComponent />;
    }
  };

  return (
    <div>
      <div className="bg-orange-400 lg:h-[100px] h-full flex items-center flex-col lg:flex-row">
        <div className="container mx-auto flex items-center justify-between lg:flex-row flex-col gap-[10px] py-[10px]">
          <div className="flex items-center justify-center space-x-3 cursor-pointer" onClick={() => setActiveTab("allProducts")}>
            <GrCubes size={28} color="pink" />
            <span className="text-xl text-white">All Products</span>
          </div>
          <div className="flex items-center justify-center space-x-3 cursor-pointer" onClick={() => setActiveTab("statistic")}>
            <FiActivity size={28} color="pink" />
            <span className="text-xl text-white">Statistic</span>
          </div>
          <div className="flex items-center justify-center space-x-3 cursor-pointer" onClick={() => setActiveTab("addProduct")}>
            <MdAdd size={28} color="pink" />
            <span className="text-xl text-white">Add Product</span>
          </div>
          <div className="flex items-center justify-center space-x-3 cursor-pointer" onClick={() => setActiveTab("manageProducts")}>
            <SiManageiq size={28} color="pink" />
            <span className="text-xl text-white">Manage Products</span>
          </div>
        </div>
      </div>
      <div>{renderComponent()}</div>
    </div>
  );
}

export default AdminNavComponent;
