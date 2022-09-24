import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Men from "./Men";
import Women from "./Women";
import Kids from "./Kids";
import Cart from "./Cart";
import PrivateRoutes from "./PrivateRoutes";
import ProductDetails from "./ProductDetails";

function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/men" element={<Men />}></Route>
        <Route path="/women" element={<Women />}></Route>
        <Route path="/kids" element={<Kids />}></Route>
        <Route
          path="/cart"
          element={
            <PrivateRoutes>
              <Cart />
            </PrivateRoutes>
          }
        />
        <Route
          path="/:category/:id"
          element={
            <PrivateRoutes>
              <ProductDetails />
            </PrivateRoutes>
          }
        />
      </Routes>
    </div>
  );
}
export default AllRoutes;
