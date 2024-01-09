import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import SharedLayout from "./Pages/SharedLayout";
import Projects from "./Pages/Projects";
import Error from "./Pages/Error";
import { useEffect, useState } from "react";
import DashBoard from "./Pages/DashBoard";
import DashboardLayout from "./Pages/DashboardLayout";
import Category from "./Pages/Category";
import Language from "./Pages/Language";
import Login from "./Pages/Login";
import Register from "./Pages/Register";



function App() {
  const [scroll, setScroll] = useState(false);


  const scrollMeasure = () => {
    if (window.pageYOffset > 300) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollMeasure);

    return () => {
      window.removeEventListener("scroll", scrollMeasure);
    };
  }, []);

  // console.log(process.env.REACT_APP_SERVER);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout scroll={scroll} />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<DashBoard />} />
            <Route path="category" element={<Category />} />
            <Route path="language" element={<Language />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
