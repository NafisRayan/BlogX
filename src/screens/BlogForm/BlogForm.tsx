import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { blogApi } from "../../lib/api";
import { toast } from "react-hot-toast";

export const BlogForm = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    authorName: "",
    title: "",
    publicationDate: "",
    category: "",
    subCategory: "",
    summary: "",
    travelTags: [] as string[],
    mainContent: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages(prev => [...prev, ...filesArray]);
      
      // Create preview URLs for the selected images
      const newPreviewUrls = filesArray.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    // Remove the image from the selected images array
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    
    // Remove the preview URL from the array
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(item => formDataToSend.append(key, item));
        } else {
          formDataToSend.append(key, value);
        }
      });

      // Append selected images
      selectedImages.forEach(file => {
        formDataToSend.append('images', file);
      });

      await blogApi.createBlog(formDataToSend);
      toast.success('Blog created successfully!');
      navigate('/blogs');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToBlogs = () => {
    navigate('/blogs');
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Author Name */}
          <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-x-8 gap-y-4 items-center">
            <label className={labelClasses}>Author Name:</label>
            <Input
              type="text"
              name="authorName"
              value={formData.authorName}
              onChange={handleInputChange}
              required
              className={inputBaseClasses}
            />
          </div>

          {/* Blog Title & Publication Date */}
          <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr_max-content_1fr] gap-x-8 gap-y-4 items-center">
            <label className={labelClasses}>Blog Title :</label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter the title of your blog post"
              className={inputBaseClasses}
            />
            <label className={labelClasses}>Publication Date:</label>
            <Input
              type="date"
              name="publicationDate"
              value={formData.publicationDate}
              onChange={handleInputChange}
              required
              className={inputBaseClasses}
            />
          </div>

          {/* Category & Sub-category */}
          <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr_max-content_1fr] gap-x-8 gap-y-4 items-center">
            <label className={labelClasses}>Category :</label>
            <Select onValueChange={(value) => handleSelectChange('category', value)}>
              <SelectTrigger className={selectClasses}>
                <SelectValue placeholder="-Select other options-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="food">Food</SelectItem>
              </SelectContent>
            </Select>
            <label className={labelClasses}>Sub-category :</label>
            <Select onValueChange={(value) => handleSelectChange('subCategory', value)}>
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

          {/* Summary & Travel tags */}
          <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr_max-content_1fr] gap-x-8 gap-y-4 items-start">
            <label className={`${labelClasses} pt-2`}>Summary :</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              required
              placeholder="Type here"
              className={`${inputBaseClasses} min-h-[100px] p-3 resize-none`}
              rows={4}
            />
            <label className={labelClasses}>Travel tags:</label>
            <Select onValueChange={(value) => handleSelectChange('travelTags', value)}>
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

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-x-8 gap-y-2 items-start">
            <label className={`${labelClasses} pt-2`}>Main Content</label>
            <textarea
              name="mainContent"
              value={formData.mainContent}
              onChange={handleInputChange}
              required
              placeholder="Write your blog content here"
              className={`${inputBaseClasses} min-h-[150px] p-3 resize-none w-full`}
              rows={6}
            />
          </div>

          {/* Images Upload */}
          <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-x-8 gap-y-2 items-start">
            <label className={labelClasses}>Images Upload :</label>
            <div className="flex flex-col gap-4">
              <div 
                className="border-2 border-dashed border-[#a0cde3] rounded-lg bg-[#d2ecf4] p-6 text-center text-gray-500 cursor-pointer hover:bg-[#c4e5ef] transition-colors w-full h-24 flex items-center justify-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium">Drop files to upload or click to browse</span>
                  <span className="text-sm mt-1">{selectedImages.length > 0 ? `${selectedImages.length} file(s) selected` : 'No files selected'}</span>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Preview selected images */}
              {previewUrls.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={url} 
                        alt={`Selected image ${index + 1}`} 
                        className="w-full h-24 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <span className="text-xs text-gray-500 mt-1 block truncate">
                        {selectedImages[index]?.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-4 pt-8">
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                type="button"
                className="bg-[#d2ecf4] text-black text-lg sm:text-xl px-10 py-2 rounded-full hover:bg-[#c4e5ef] transition-colors min-w-[150px] border border-gray-300"
              >
                Preview
              </Button>
              <Button 
                type="button"
                className="bg-[#d2ecf4] text-black text-lg sm:text-xl px-10 py-2 rounded-full hover:bg-[#c4e5ef] transition-colors min-w-[150px] border border-gray-300"
              >
                Autosave
              </Button>
            </div>

            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full max-w-md bg-[#d2ecf4] text-black text-lg sm:text-xl py-2 rounded-full hover:bg-[#c4e5ef] transition-colors border border-gray-300 mt-2"
            >
              {isSubmitting ? 'Publishing...' : 'Publish'}
            </Button>
          </div>

          {/* Back to Blogs button */}
          <div className="text-center pt-4">
            <Button
              type="button"
              onClick={handleBackToBlogs}
              className="bg-[#003b95] text-white rounded-lg px-6 py-2.5 text-lg sm:text-xl w-full sm:w-auto hover:bg-[#002d73] transition-colors"
            >
              Back to Blogs
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};
