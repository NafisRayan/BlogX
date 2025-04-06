import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select } from "../../components/ui/select";
import { blogApi } from "../../services/api";

export const BlogForm = () => {
  const navigate = useNavigate();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [formData, setFormData] = React.useState({
    title: '',
    publicationDate: '',
    category: '',
    subCategory: '',
    summary: '',
    travelTags: '',
    mainContent: ''
  });

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isAutosaved, setIsAutosaved] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  const handleBackToBlogs = () => {
    navigate('/blogs');
  };

  const handlePreview = () => {
    // Store current form data in localStorage for preview page
    localStorage.setItem('blogPreview', JSON.stringify({
      ...formData,
      image: selectedFile ? URL.createObjectURL(selectedFile) : null
    }));
    navigate('/preview');
  };

  const handleAutosave = () => {
    localStorage.setItem('blogDraft', JSON.stringify({
      ...formData,
      lastSaved: new Date().toISOString()
    }));
    setIsAutosaved(true);
    setTimeout(() => setIsAutosaved(false), 2000);
  };

  const handlePublish = async () => {
    if (!selectedFile) {
      setError('Please select a cover image');
      return;
    }

    if (!formData.title || !formData.mainContent || !formData.summary || !formData.category) {
      setError('Please fill in all required fields');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const publishFormData = new FormData();
      publishFormData.append('title', formData.title);
      publishFormData.append('content', formData.mainContent);
      publishFormData.append('summary', formData.summary);
      publishFormData.append('category', formData.category);
      publishFormData.append('author', 'John Doe'); // You might want to make this dynamic
      publishFormData.append('tags', formData.travelTags || '');
      publishFormData.append('image', selectedFile);

      await blogApi.createBlog(publishFormData);
      navigate('/blogs');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to publish blog');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const labelClasses = "text-black text-lg sm:text-xl font-normal flex items-center justify-start"; // Adjusted for alignment
  const inputBaseClasses = "bg-[#d2ecf4] border border-gray-300 w-full text-gray-600 text-base sm:text-lg rounded-lg focus-visible:ring-1 focus-visible:ring-[#003b95] h-11 px-4"; // Adjusted styling
  const selectClasses = "bg-[#d2ecf4] border border-gray-300 text-gray-600 text-base sm:text-lg rounded-lg h-11"; // Adjusted styling

  return (
    <main className="bg-[#e0f7fa] flex flex-col items-center w-full min-h-screen py-8 px-4">
      <div className="w-full max-w-[1000px]"> {/* Adjusted max-width for better centering */}
        <h1 className="text-[32px] font-bold mb-10 text-left"> {/* Adjusted font weight and alignment */}
          Blog Form
        </h1>

        {/* Removed the white background container to match the image's simpler layout */}
        <div className="space-y-6"> {/* Adjusted spacing */}
          {/* Row 1: Author Name (Label Only) */}
          <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-x-8 gap-y-4 items-center"> {/* Custom grid for label alignment */}
             <label className={labelClasses}>Author Name:</label>
             {/* Input removed as per image */}
             <div></div> {/* Placeholder for grid structure */}
          </div>

          {/* Row 2: Blog Title & Publication Date */}
          <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr_max-content_1fr] gap-x-8 gap-y-4 items-center"> {/* Custom grid for label alignment */}
            <label className={labelClasses}>Blog Title :</label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter the title of your blog post"
              className={inputBaseClasses}
            />
            <label className={labelClasses}>Publication Date:</label>
            <Input
              type="text"
              name="publicationDate"
              value={formData.publicationDate}
              onChange={handleInputChange}
              placeholder="DD/MM/YYYY"
              className={inputBaseClasses}
            />
          </div>

          {/* Row 3: Category & Sub-category */}
          <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr_max-content_1fr] gap-x-8 gap-y-4 items-center"> {/* Custom grid for label alignment */}
            <label className={labelClasses}>Category :</label>
            <Select 
              value={formData.category} 
              onValueChange={handleSelectChange('category')} 
              options={[
                { value: 'travel', label: 'Travel' },
                { value: 'tech', label: 'Technology' },
                { value: 'food', label: 'Food' }
              ]}
              className={selectClasses}
            />
            <label className={labelClasses}>Sub-category :</label>
            <Select 
              value={formData.subCategory} 
              onValueChange={handleSelectChange('subCategory')} 
              options={[
                { value: 'hiking', label: 'Hiking' },
                { value: 'webdev', label: 'Web Development' },
                { value: 'recipes', label: 'Recipes' }
              ]}
              className={selectClasses}
            />
          </div>

          {/* Row 4: Summary & Travel tags */}
           <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr_max-content_1fr] gap-x-8 gap-y-4 items-start"> {/* Changed items-center to items-start for textarea */}
            <label className={`${labelClasses} pt-2`}>Summary :</label> {/* Added padding top */}
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              placeholder="Type here"
              className={`${inputBaseClasses} min-h-[100px] p-3 resize-none`}
              rows={4}
            />
            <label className={labelClasses}>Travel tags:</label>
            <Select 
              value={formData.travelTags} 
              onValueChange={handleSelectChange('travelTags')} 
              options={[
                { value: 'alps', label: 'Alps' },
                { value: 'beach', label: 'Beach' },
                { value: 'city', label: 'City Break' }
              ]}
              className={selectClasses}
            />
          </div>

          {/* Row 5: Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-x-8 gap-y-2 items-start"> {/* Custom grid for label alignment */}
            <label className={`${labelClasses} pt-2`}>Main Content</label> {/* Added padding top */}
            <textarea
              name="mainContent"
              value={formData.mainContent}
              onChange={handleInputChange}
              placeholder="Write your blog content here"
              className={`${inputBaseClasses} min-h-[150px] p-3 resize-none w-full`}
              rows={6}
            />
          </div>

          {/* Row 6: Images Upload */}
          <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-x-8 gap-y-2 items-center"> {/* Custom grid for label alignment */}
             <label className={labelClasses}>Images Upload :</label>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setSelectedFile(file);
            }}
            accept="image/*"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#a0cde3] rounded-lg bg-[#d2ecf4] p-6 text-center text-gray-500 cursor-pointer hover:bg-[#c4e5ef] transition-colors w-full h-24 flex items-center justify-center"
          >
            {selectedFile ? selectedFile.name : "Drop files to upload"}
          </div>
          </div>

          {/* Action Buttons */}
<div className="flex flex-col items-center gap-4 pt-8">
  <div className="flex flex-wrap justify-center gap-4">
    <Button
      onClick={handlePreview}
      className="bg-[#C4E0EE] text-[#000000] text-lg sm:text-xl px-10 py-2 rounded-full hover:bg-[#c4e5ef] transition-colors min-w-[150px] border border-gray-300"
    >
      Preview
    </Button>
    <Button
      onClick={handleAutosave}
      className="bg-[#C4E0EE] text-[#000000] text-lg sm:text-xl px-10 py-2 rounded-full hover:bg-[#c4e5ef] transition-colors min-w-[150px] border border-gray-300"
    >
      {isAutosaved ? "Saved!" : "Autosave"}
    </Button>
  </div>

          {error && (
            <div className="text-red-500 text-center mb-4">
              {error}
            </div>
          )}
          
          <Button
            onClick={handlePublish}
            disabled={isLoading}
            className="w-full max-w-md bg-[#d2ecf4] text-[#000000] text-lg sm:text-xl py-2 rounded-full hover:bg-[#c4e5ef] transition-colors border border-gray-300 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Publishing...' : 'Publish'}
          </Button>
</div>

          {/* Back to Blogs button */}
          <div className="text-center pt-4"> {/* Added padding top */}
            <Button
              onClick={handleBackToBlogs}
              className="bg-[#003b95] text-white rounded-lg px-6 py-2.5 text-lg sm:text-xl w-full sm:w-auto hover:bg-[#002d73] transition-colors" // Applied new styles and added hover
            >
              Back to Blogs
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};
