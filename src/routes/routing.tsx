import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListAllUsers from "../pages/listAllUsers";
import AddUser from "../pages/addUser";

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListAllUsers />}></Route>
          <Route path="/addUser" element={<AddUser></AddUser>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routing;
