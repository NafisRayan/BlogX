import React from 'react';

const BlogForm = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-black text-3xl font-semibold font-['Inter'] text-shadow">
        Blog Form
      </h1>
      <div className="mt-4">
        <label className="text-black text-2xl font-normal font-['Inter']">
          Author Name:
        </label>
        <input
          type="text"
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mt-4">
        <label className="text-black text-2xl font-normal font-['Inter']">
          Blog Title :
        </label>
        <input
          type="text"
          placeholder="Enter the title of your blog post"
          className="border rounded w-full py-2 px-3 text-neutral-400 text-lg font-normal font-['Inter'] leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mt-4">
        <label className="text-black text-2xl font-normal font-['Inter']">
          Category :
        </label>
        <select className="border rounded w-full py-2 px-3 text-neutral-400 text-lg font-normal font-['Inter'] leading-tight focus:outline-none focus:shadow-outline">
          <option>-Select other options-</option>
        </select>
      </div>
      <div className="mt-4">
        <label className="text-black text-2xl font-normal font-['Inter']">
          Sub-category :
        </label>
        <select className="border rounded w-full py-2 px-3 text-neutral-400 text-lg font-normal font-['Inter'] leading-tight focus:outline-none focus:shadow-outline">
          <option>-select multiple options-</option>
        </select>
      </div>
      <div className="mt-4">
        <label className="text-black text-2xl font-normal font-['Inter']">
          Summary :
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="border rounded w-full py-2 px-3 text-neutral-400 text-lg font-normal font-['Inter'] leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mt-4">
        <label className="text-black text-2xl font-normal font-['Inter']">
          Publication Date:
        </label>
        <input
          type="text"
          placeholder="DD/MM/YYYY"
          className="border rounded w-full py-2 px-3 text-neutral-400 text-lg font-normal font-['Inter'] leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mt-4">
        <label className="text-black text-2xl font-normal font-['Inter']">
          Travel tags:
        </label>
        <select className="border rounded w-full py-2 px-3 text-neutral-400 text-lg font-normal font-['Inter'] leading-tight focus:outline-none focus:shadow-outline">
          <option>-Select other options-</option>
        </select>
      </div>
      <div className="mt-4">
        <label className="text-black text-2xl font-normal font-['Inter']">
          Main Content
        </label>
        <textarea
          placeholder="Write your blog content here"
          className="border rounded w-full py-2 px-3 text-neutral-400 text-lg font-normal font-['Inter'] leading-tight focus:outline-none focus:shadow-outline"
          rows={5}
        />
      </div>
      <div className="mt-4">
        <label className="text-black text-2xl font-normal font-['Inter']">
          Images Upload :
        </label>
        <div className="border rounded w-full py-2 px-3 text-neutral-400 text-lg font-normal font-['Inter'] leading-tight focus:outline-none focus:shadow-outline text-center">
          Drop files to upload
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Preview
        </button>
      </div>
      <div className="mt-4 flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Autosave
        </button>
      </div>
      <div className="mt-4 flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Publish
        </button>
      </div>
    </div>
  );
};

export default BlogForm;
