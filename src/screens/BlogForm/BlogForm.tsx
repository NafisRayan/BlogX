import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { blogApi } from '../../services/api';

export const BlogForm = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: '',
    tags: '',
    author: '',
    readTime: '5' // Added default readTime
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fileInput = fileInputRef.current;

    if (!fileInput?.files?.[0]) {
      setError('Cover image is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('summary', formData.summary);
      submitData.append('content', formData.content);
      submitData.append('category', formData.category);
      submitData.append('tags', formData.tags);
      submitData.append('author', formData.author);
      submitData.append('readTime', formData.readTime);
      submitData.append('coverImage', fileInput.files[0]);

      await blogApi.createBlog(submitData);
      navigate('/');
    } catch (err) {
      console.error('Failed to create blog:', err);
      setError('Failed to create blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-[#e0f7fa] py-8 px-4">
      <div className="max-w-3xl w-full mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-10 text-left">Create New Blog</h1>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="flex flex-col">
            <label className="flex items-center justify-start text-black text-lg font-normal mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="bg-[#d2ecf4] border border-[#d3d3d3] text-[#606060] text-base rounded-lg h-11 px-4 focus:outline-none focus:ring-1 focus:ring-[#003b95]"
            />
          </div>

          <div className="flex flex-col">
            <label className="flex items-center justify-start text-black text-lg font-normal mb-2">Summary</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
              rows={3}
              className="bg-[#d2ecf4] border border-[#d3d3d3] text-[#606060] text-base rounded-lg min-h-[100px] p-4 resize-none focus:outline-none focus:ring-1 focus:ring-[#003b95]"
            />
          </div>

          <div className="flex flex-col">
            <label className="flex items-center justify-start text-black text-lg font-normal mb-2">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={6}
              className="bg-[#d2ecf4] border border-[#d3d3d3] text-[#606060] text-base rounded-lg min-h-[150px] p-4 resize-none focus:outline-none focus:ring-1 focus:ring-[#003b95]"
            />
          </div>

          <div className="flex flex-col">
            <label className="flex items-center justify-start text-black text-lg font-normal mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="bg-[#d2ecf4] border border-[#d3d3d3] text-[#606060] text-base rounded-lg h-11 px-4 focus:outline-none focus:ring-1 focus:ring-[#003b95]"
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Travel">Travel</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Food">Food</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="flex items-center justify-start text-black text-lg font-normal mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="bg-[#d2ecf4] border border-[#d3d3d3] text-[#606060] text-base rounded-lg h-11 px-4 focus:outline-none focus:ring-1 focus:ring-[#003b95]"
            />
          </div>

          <div className="flex flex-col">
            <label className="flex items-center justify-start text-black text-lg font-normal mb-2">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="bg-[#d2ecf4] border border-[#d3d3d3] text-[#606060] text-base rounded-lg h-11 px-4 focus:outline-none focus:ring-1 focus:ring-[#003b95]"
            />
          </div>

          <div className="flex flex-col">
            <label className="flex items-center justify-start text-black text-lg font-normal mb-2">Read Time (minutes)</label>
            <input
              type="number"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              required
              min="1"
              className="bg-[#d2ecf4] border border-[#d3d3d3] text-[#606060] text-base rounded-lg h-11 px-4 focus:outline-none focus:ring-1 focus:ring-[#003b95]"
            />
          </div>

          <div className="flex flex-col">
            <label className="flex items-center justify-start text-black text-lg font-normal mb-2">Cover Image</label>
            <div 
              className="flex items-center justify-center bg-[#d2ecf4] border-2 border-dashed border-[#a0cde3] rounded-lg p-6 text-center text-[#808080] cursor-pointer h-24 hover:bg-[#c4e5ef] transition-colors duration-300"
              onClick={() => fileInputRef.current?.click()}
            >
              <span>Click to upload or drag and drop</span>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                required
                className="hidden"
              />
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-8">
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#003b95] text-white rounded-lg py-2.5 px-6 min-w-[150px] text-center hover:bg-[#002d73]"
            >
              {loading ? 'Creating...' : 'Create Blog'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/')}
              className="bg-[#d2ecf4] text-black text-xl py-2 px-4 rounded-full min-w-[150px] border border-[#d3d3d3] text-center cursor-pointer hover:bg-[#c4e5ef] hover:transition-colors hover:duration-300"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};
