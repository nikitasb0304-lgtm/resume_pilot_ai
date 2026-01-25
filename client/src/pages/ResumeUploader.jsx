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
    <div className="min-h-screen bg-[#0f172a] text-white">
       <header className="bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-white">Upload Resume</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white/5 rounded-xl shadow-xl border border-white/10 p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 border border-blue-500/30">
              <Upload className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Upload your Resume</h2>
            <p className="mt-2 text-gray-400">Upload your PDF or DOCX resume to get an instant ATS analysis.</p>
          </div>

          <div className="border-2 border-dashed border-white/20 rounded-xl p-10 text-center hover:border-blue-500/50 hover:bg-white/5 transition-all cursor-pointer relative group">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
              accept=".pdf,.docx,.doc"
            />
            {file ? (
              <div className="flex flex-col items-center">
                <FileText className="w-12 h-12 text-blue-400 mb-2" />
                <span className="text-lg font-medium text-white">{file.name}</span>
                <span className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            ) : (
              <div className="flex flex-col items-center group-hover:scale-105 transition-transform">
                <p className="text-gray-300 mb-2 font-medium">Drag and drop your file here, or click to browse</p>
                <span className="text-xs text-gray-500">Supported formats: PDF, DOCX (Max 5MB)</span>
              </div>
            )}
          </div>

          {uploadStatus === 'success' && (
            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-green-400">Upload Successful!</h3>
                <p className="text-sm text-green-300/80 mt-1">
                  Your resume has been analyzed. 
                  <Link to="/ats-report" className="underline ml-1 font-medium hover:text-green-200">View ATS Report</Link>
                </p>
              </div>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-red-400">Upload Failed</h3>
                <p className="text-sm text-red-300/80 mt-1">Please try again later.</p>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className={`px-8 py-3 rounded-lg text-white font-medium transition-all ${
                !file || isUploading 
                  ? 'bg-white/10 text-gray-500 cursor-not-allowed border border-white/5' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105'
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
