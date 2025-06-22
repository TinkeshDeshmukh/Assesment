import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./Components/Hero";
import Register from "./Components/Register";
import Login from "./Components/LogIn";
import Dashboard from "./Components/dashboard";
import GetItems from "./Components/getItems";
import Enquire from "./Components/enquire";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/fetch" element={<GetItems/>}/>
        <Route path="/enquire" element={<Enquire/>}/>




      </Routes>
    </BrowserRouter>
  );
}

export default App;
