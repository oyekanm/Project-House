import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import SharedLayout from "./Pages/SharedLayout";
import Projects from "./Pages/Projects";
import Error from "./Pages/Error";
import { useEffect, useState } from "react";

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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout scroll={scroll} />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
