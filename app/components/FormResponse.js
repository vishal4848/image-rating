'use client';

import { useState } from 'react';
import { db } from '../lib/firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function FormResponse({ form, onComplete }) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [responses, setResponses] = useState([]);

  const handleRating = async (rating) => {
    // Create response for current page
    const pageResponse = {
      pageId: currentPageIndex,
      pageTitle: form.pages[currentPageIndex].title,
      rating,
      timestamp: new Date()
    };

    const updatedResponses = [...responses, pageResponse];
    setResponses(updatedResponses);

    // Move to next page or submit
    if (currentPageIndex < form.pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else {
      // Submit all responses
      try {
        await addDoc(collection(db, 'form-responses'), {
          formId: form.id,
          responses: updatedResponses,
          submittedAt: new Date()
        });
        
        onComplete && onComplete();
      } catch (error) {
        console.error('Error submitting form', error);
      }
    }
  };

  const currentPage = form.pages[currentPageIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
          {/* Progress Indicator */}
          <div className="bg-blue-600 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">
                {form.pages[currentPageIndex].title}
              </h2>
              <div className="text-blue-100">
                Page {currentPageIndex + 1} of {form.pages.length}
              </div>
            </div>
            <div className="flex space-x-2">
              {form.pages.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-2 flex-1 rounded ${
                    index <= currentPageIndex 
                      ? 'bg-blue-400' 
                      : 'bg-blue-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Page Content */}
          <div className="p-8">
            <p className="text-gray-600 mb-6 text-center">
              {currentPage.description}
            </p>

            {currentPage.imageUrl && (
              <div className="mb-8 flex justify-center">
                <img 
                  src={currentPage.imageUrl} 
                  alt="Page" 
                  className="max-w-full max-h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            )}

            {/* Rating Buttons */}
            <div className="flex justify-center space-x-6">
              <button 
                onClick={() => handleRating(true)}
                className="bg-green-500 text-white px-10 py-4 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <span>Positive</span>
              </button>
              <button 
                onClick={() => handleRating(false)}
                className="bg-red-500 text-white px-10 py-4 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9.172 16.172a4 4 0 005.656 0m-5.656 0a4 4 0 115.656 0m-5.656 0L3 7.172a4 4 0 010-5.656M21 7.172a4 4 0 010 5.656M16.172 12a4 4 0 00-5.656 0m5.656 0a4 4 0 01-5.656 0" 
                  />
                </svg>
                <span>Negative</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}