import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResumeUploader = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success', 'error'
  const navigate = useNavigate();
  const API_BASE = import.meta.env?.VITE_API_URL || 'http://localhost:5000';

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axios.post(`${API_BASE}/api/ats/analyze`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: false
      });

      localStorage.setItem('atsReport', JSON.stringify(data));
      setUploadStatus('success');
      setIsUploading(false);
      navigate('/ats-report');
    } catch (err) {
      console.error('ATS analyze error', err);
      setUploadStatus('error');
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
       <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Upload Resume</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Upload your Resume</h2>
            <p className="mt-2 text-gray-600">Upload your PDF or DOCX resume to get an instant ATS analysis.</p>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-blue-500 transition-colors cursor-pointer relative">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
              accept=".pdf,.docx,.doc"
            />
            {file ? (
              <div className="flex flex-col items-center">
                <FileText className="w-12 h-12 text-blue-500 mb-2" />
                <span className="text-lg font-medium text-gray-900">{file.name}</span>
                <span className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-gray-500 mb-2">Drag and drop your file here, or click to browse</p>
                <span className="text-xs text-gray-400">Supported formats: PDF, DOCX (Max 5MB)</span>
              </div>
            )}
          </div>

          {uploadStatus === 'success' && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-green-800">Upload Successful!</h3>
                <p className="text-sm text-green-700 mt-1">
                  Your resume has been analyzed. 
                  <Link to="/ats-report" className="underline ml-1 font-medium">View ATS Report</Link>
                </p>
              </div>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Upload Failed</h3>
                <p className="text-sm text-red-700 mt-1">Please try again later.</p>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className={`px-8 py-3 rounded-lg text-white font-medium transition-all ${
                !file || isUploading 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {isUploading ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeUploader;
