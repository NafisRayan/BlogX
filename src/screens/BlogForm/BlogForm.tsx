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
    <main className="min-h-screen bg-[#e0f7fa] py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Blog</h1>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#003b95] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Summary</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
              rows={3}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#003b95] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={6}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#003b95] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#003b95] focus:outline-none"
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Travel">Travel</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Food">Food</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#003b95] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#003b95] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Read Time (minutes)</label>
            <input
              type="number"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              required
              min="1"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#003b95] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Cover Image</label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#003b95] focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Creating...' : 'Create Blog'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/')}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};
