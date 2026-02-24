import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
<<<<<<< HEAD
          <Route path="/auth" element={<Auth />} />
=======
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
>>>>>>> fc7002a79545c789349be798b2303703e59d3897
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;