import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlogsPage } from "./screens/BlogsPage/BlogsPage";
import BlogForm from "./screens/BlogForm/BlogForm";

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
      </BrowserRouter>
    </StrictMode>
  );
};

createRoot(document.getElementById("app") as HTMLElement).render(<App />);
