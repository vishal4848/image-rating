'use client';

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import FormResponse from '../components/FormResponse';

export default function RespondPage() {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        setLoading(true);
        const formsCollection = collection(db, 'forms');
        const formsSnapshot = await getDocs(formsCollection);
        const formsList = formsSnapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data()
        }));
        setForms(formsList);
      } catch (error) {
        console.error('Error fetching forms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  const handleFormSelect = (form) => {
    setSelectedForm(form);
  };

  const handleBackToForms = () => {
    setSelectedForm(null);
  };

  if (selectedForm) {
    return (
      <FormResponse 
        form={selectedForm} 
        onComplete={handleBackToForms}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-green-600 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
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
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
                  />
                </svg>
                Available Forms
              </h1>
              <p className="text-green-100 mt-2">
                Select a form to provide your feedback
              </p>
            </div>
            <div className="bg-green-500 px-4 py-2 rounded-full">
              <span className="font-semibold">{forms.length} Forms</span>
            </div>
          </div>
        </div>

        {/* Forms Grid */}
        <div className="bg-white shadow-2xl rounded-b-xl p-8">
          {loading ? (
            <div className="flex justify-center items-center space-x-4">
              <div className="animate-spin">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-10 w-10 text-green-600"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                  />
                </svg>
              </div>
              <span className="text-gray-600">Loading forms...</span>
            </div>
          ) : forms.length === 0 ? (
            <div className="text-center py-12">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-20 w-20 mx-auto text-gray-400 mb-4"
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
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                No Forms Available
              </h2>
              <p className="text-gray-500">
                Check back later or contact the administrator
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forms.map((form, index) => (
                <div 
                  key={form.id} 
                  className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all group"
                >
                  {/* Form Card Header */}
                  <div className="bg-green-100 p-4 border-b border-green-200">
                    <h2 className="text-xl font-semibold text-green-800">
                      {form.title}
                    </h2>
                  </div>

                  {/* Form Card Body */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {form.description}
                    </p>

                    <div className="mb-4 flex items-center space-x-3">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 text-green-600"
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                      </svg>
                      <span className="text-gray-600">
                        Created: {new Date(form.createdAt.toDate()).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="mb-4 flex items-center space-x-3">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 text-green-600"
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" 
                        />
                      </svg>
                      <span className="text-gray-600">
                        {form.pages.length} Pages
                      </span>
                    </div>

                    <button 
                      onClick={() => handleFormSelect(form)}
                      className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 group-hover:bg-green-600"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span>Start Responding</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}