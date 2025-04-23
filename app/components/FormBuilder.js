'use client';

import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function FormBuilder() {
  const [formDetails, setFormDetails] = useState({
    title: '',
    description: ''
  });

  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState({
    title: '',
    description: '',
    imageUrl: ''
  });

  const addPage = async () => {
    if (!currentPage.title || !currentPage.description) {
      alert('Please fill all fields');
      return;
    }

    const newPage = { ...currentPage };

    setPages([...pages, newPage]);
    setCurrentPage({ title: '', description: '', imageUrl: '' });
  };

  const saveForm = async () => {
    if (!formDetails.title || !formDetails.description) {
      alert('Please provide form title and description');
      return;
    }

    if (pages.length === 0) {
      alert('Please add at least one page to the form');
      return;
    }

    try {
      const formRef = await addDoc(collection(db, 'forms'), {
        ...formDetails,
        pages,
        createdAt: new Date()
      });
      alert('Form created successfully!');
      setFormDetails({ title: '', description: '' });
      setPages([]);
    } catch (error) {
      console.error('Error saving form', error);
    }
  };

  const removePage = (indexToRemove) => {
    setPages(pages.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6">
          <h2 className="text-3xl font-bold flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 mr-4"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
              />
            </svg>
            Form Builder
          </h2>
          <p className="text-blue-100 mt-2">
            Create multi-page forms with titles, descriptions, and images
          </p>
        </div>

        {/* Form Details Section */}
        <div className="p-8 border-b">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Form Title
              </label>
              <input 
                type="text"
                placeholder="Enter form title"
                value={formDetails.title}
                onChange={(e) => setFormDetails({...formDetails, title: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Form Description
              </label>
              <textarea 
                placeholder="Describe the purpose of the form"
                value={formDetails.description}
                onChange={(e) => setFormDetails({...formDetails, description: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Page Creation Section */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Title
                  </label>
                  <input 
                    type="text"
                    placeholder="Enter page title"
                    value={currentPage.title}
                    onChange={(e) => setCurrentPage({...currentPage, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Description
                  </label>
                  <textarea 
                    placeholder="Enter page description"
                    value={currentPage.description}
                    onChange={(e) => setCurrentPage({...currentPage, description: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL (Optional)
                  </label>
                  <input 
                    type="text"
                    placeholder="Paste image URL"
                    value={currentPage.imageUrl}
                    onChange={(e) => setCurrentPage({...currentPage, imageUrl: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <button 
                  onClick={addPage}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <span>Add Page</span>
                </button>
              </div>
            </div>

            {/* Preview Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Form Pages Preview
              </h3>
              {pages.length === 0 ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-12 w-12 mx-auto text-gray-400 mb-4"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 6h16M4 10h16M4 14h16M4 18h16" 
                    />
                  </svg>
                  <p className="text-gray-500">
                    Added pages will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {pages.map((page, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-50 border rounded-lg p-4 relative"
                    >
                      <button 
                        onClick={() => removePage(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      </button>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Page {index + 1}: {page.title}
                      </h4>
                      <p className="text-gray-600 mb-2 line-clamp-2">
                        {page.description}
                      </p>
                      {page.imageUrl && (
                        <img 
                          src={page.imageUrl} 
                          alt="Page" 
                          className="w-full h-24 object-cover rounded mt-2"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Save Form Button */}
          {pages.length > 0 && (
            <div className="mt-8 text-center">
              <button 
                onClick={saveForm}
                className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 mx-auto"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <span>Save Entire Form</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}