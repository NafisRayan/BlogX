import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/ui/button';

export const BlogPostSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full p-6 bg-[#003b95] text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          Share Your Story with the World
        </h2>
        <p className="text-lg mb-6 text-gray-100">
          Join our community of writers and share your unique perspective
        </p>
        <Button
          onClick={() => navigate('/blog-form')}
          className="bg-white text-[#003b95] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg"
        >
          Create a New Blog
        </Button>
      </div>
    </section>
  );
};
