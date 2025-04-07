import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { BlogsPage } from "./screens/BlogsPage/BlogsPage";
import { BlogForm } from "./screens/BlogForm/BlogForm"; // Changed to named import

const App = () => {
  // Removed currentPage state

  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          {/* Define routes */}
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog-form" element={<BlogForm />} />
          {/* Default route */}
          <Route path="/" element={<BlogsPage />} />
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </StrictMode>
  );
};

createRoot(document.getElementById("app") as HTMLElement).render(<App />);
