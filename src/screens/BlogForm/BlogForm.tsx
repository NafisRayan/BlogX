import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import blogService from "../../services/blog-service";
import userService from "../../services/user-service";

interface FormData {
  title: string;
  subtitle: string;
  summary: string;
  content: string;
  category: string;
  subcategories: string[];
  travelTags: string[];
  status: 'draft' | 'published';
}

export const BlogForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    subtitle: '',
    summary: '',
    content: '',
    category: '',
    subcategories: [],
    travelTags: [],
    status: 'draft'
  });
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBackToBlogs = () => {
    navigate('/blogs');
  };

  const handleInputChange = (key: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleImageDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setImages(prev => [...prev, ...droppedFiles]);
  }, []);

  const handleImageSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setImages(prev => [...prev, ...selectedFiles]);
    }
  }, []);

  const handleSubmit = async (status: 'draft' | 'published') => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Get current user (temporary - replace with proper auth)
      const currentUser = await userService.getCurrentUser();
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      const blogData = {
        ...formData,
        status,
        author: currentUser._id
      };

      await blogService.createBlog(blogData, images);
      navigate('/blogs');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelClasses = "text-black text-lg sm:text-xl font-normal flex items-center justify-start";
  const inputBaseClasses = "bg-[#d2ecf4] border border-gray-300 w-full text-gray-600 text-base sm:text-lg rounded-lg focus-visible:ring-1 focus-visible:ring-[#003b95] h-11 px-4";
  const selectClasses = "bg-[#d2ecf4] border border-gray-300 text-gray-600 text-base sm:text-lg rounded-lg h-11";

  return (
    <main className="bg-[#e0f7fa] flex flex-col items-center w-full min-h-screen py-8 px-4">
      <div className="w-full max-w-[1000px]">
        <h1 className="text-[32px] font-bold mb-10 text-left">
          Blog Form
        </h1>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr_max-content_1fr] gap-x-8 gap-y-4 items-center">
            <label className={labelClasses}>Blog Title :</label>
            <Input
              type="text"
              placeholder="Enter the title of your blog post"
              className={inputBaseClasses}
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
            <label className={labelClasses}>Publication Date:</label>
            <Input
              type="date"
              className={inputBaseClasses}
              disabled
              value={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr_max-content_1fr] gap-x-8 gap-y-4 items-center">
            <label className={labelClasses}>Category :</label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger className={selectClasses}>
                <SelectValue placeholder="-Select other options-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="food">Food</SelectItem>
              </SelectContent>
            </Select>
            <label className={labelClasses}>Sub-category :</label>
            <Select value={formData.subcategories[0]} onValueChange={(value) => handleInputChange('subcategories', [value])}>
              <SelectTrigger className={selectClasses}>
                <SelectValue placeholder="-Select multiple options-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hiking">Hiking</SelectItem>
                <SelectItem value="webdev">Web Development</SelectItem>
                <SelectItem value="recipes">Recipes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr_max-content_1fr] gap-x-8 gap-y-4 items-start">
            <label className={`${labelClasses} pt-2`}>Summary :</label>
            <textarea
              placeholder="Type here"
              className={`${inputBaseClasses} min-h-[100px] p-3 resize-none`}
              value={formData.summary}
              onChange={(e) => handleInputChange('summary', e.target.value)}
            />
            <label className={labelClasses}>Travel tags:</label>
            <Select value={formData.travelTags[0]} onValueChange={(value) => handleInputChange('travelTags', [value])}>
              <SelectTrigger className={selectClasses}>
                <SelectValue placeholder="-Select other options-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alps">Alps</SelectItem>
                <SelectItem value="beach">Beach</SelectItem>
                <SelectItem value="city">City Break</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-x-8 gap-y-2 items-start">
            <label className={`${labelClasses} pt-2`}>Main Content</label>
            <textarea
              placeholder="Write your blog content here"
              className={`${inputBaseClasses} min-h-[150px] p-3 resize-none w-full`}
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-x-8 gap-y-2 items-center">
            <label className={labelClasses}>Images Upload :</label>
            <div
              className="border-2 border-dashed border-[#a0cde3] rounded-lg bg-[#d2ecf4] p-6 text-center text-gray-500 cursor-pointer hover:bg-[#c4e5ef] transition-colors w-full h-24 flex items-center justify-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleImageDrop}
              onClick={() => document.getElementById('image-input')?.click()}
            >
              {images.length > 0 ? `${images.length} files selected` : 'Drop files to upload'}
              <input
                id="image-input"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col items-center gap-4 pt-8">
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-[#d2ecf4] text-black text-lg sm:text-xl px-10 py-2 rounded-full hover:bg-[#c4e5ef] transition-colors min-w-[150px] border border-gray-300"
                onClick={() => handleSubmit('draft')}
                disabled={isSubmitting}
              >
                Save Draft
              </Button>
              <Button 
                className="bg-[#d2ecf4] text-black text-lg sm:text-xl px-10 py-2 rounded-full hover:bg-[#c4e5ef] transition-colors min-w-[150px] border border-gray-300"
                onClick={() => {}}
                disabled={isSubmitting}
              >
                Preview
              </Button>
            </div>

            <Button 
              className="w-full max-w-md bg-[#d2ecf4] text-black text-lg sm:text-xl py-2 rounded-full hover:bg-[#c4e5ef] transition-colors border border-gray-300 mt-2"
              onClick={() => handleSubmit('published')}
              disabled={isSubmitting}
            >
              Publish
            </Button>
          </div>

          <div className="text-center pt-4">
            <Button
              onClick={handleBackToBlogs}
              className="bg-[#003b95] text-white rounded-lg px-6 py-2.5 text-lg sm:text-xl w-full sm:w-auto hover:bg-[#002d73] transition-colors"
              disabled={isSubmitting}
            >
              Back to Blogs
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};
