import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BlogsPage } from "./screens/BlogsPage/BlogsPage";
import BlogForm from "./screens/BlogForm/BlogForm";

const App = () => {
  const [currentPage, setCurrentPage] = useState("blogs");

  return (
    <StrictMode>
      <div>
        <button onClick={() => setCurrentPage("blogs")}>Blogs</button>
        <button onClick={() => setCurrentPage("blogForm")}>Blog Form</button>
        {currentPage === "blogs" ? <BlogsPage /> : <BlogForm />}
      </div>
    </StrictMode>
  );
};

createRoot(document.getElementById("app") as HTMLElement).render(<App />);
