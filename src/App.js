import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import Order from "./components/Order/Order";
import About from "./components/About/About";
import Inventory from "./components/Inventory/Inventory";

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Shop></Shop>} />
        <Route path="/shop" element={<Shop></Shop>} />
        <Route path="/order" element={<Order></Order>} />
        <Route path="/inventory" element={<Inventory></Inventory>} />
        <Route path="/about" element={<About></About>} />
      </Routes>
    </div>
  );
}

export default App;
