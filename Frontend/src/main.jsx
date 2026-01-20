import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import ViewProject from "./subComponect/ViewProject.jsx";

createRoot(document.getElementById("root")).render(
  <div className="min-h-screen bg-black text-white overflow-y-auto">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/view/:id" element={<ViewProject/>}/>
      </Routes>
    </BrowserRouter>
  </div>,
);
