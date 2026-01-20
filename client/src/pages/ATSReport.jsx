import React from 'react';
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const ATSReport = () => {
  const stored = typeof window !== 'undefined' ? localStorage.getItem('atsReport') : null;
  const parsed = stored ? JSON.parse(stored) : null;
  const report = parsed || {
    score: 0,
    fileName: "No file",
    details: {
      wordCount: 0,
      bullets: 0,
      sections: { contact: false, skills: false, experience: false, education: false, projects: false, summary: false },
      issues: ["No ATS report available. Upload your resume to see results."]
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 border-green-200 bg-green-50';
    if (score >= 60) return 'text-yellow-600 border-yellow-200 bg-yellow-50';
    return 'text-red-600 border-red-200 bg-red-50';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">ATS Analysis Report</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Score Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Overall Score</h2>
              <div className={`relative w-40 h-40 mx-auto rounded-full flex items-center justify-center border-8 ${getScoreColor(report.score).split(' ')[1]} ${getScoreColor(report.score).split(' ')[2]}`}>
                <div className="text-center">
                  <span className={`text-4xl font-bold ${getScoreColor(report.score).split(' ')[0]}`}>
                    {report.score}
                  </span>
                  <span className="block text-sm text-gray-500">/ 100</span>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                File: <strong className="text-gray-900">{report.fileName}</strong>
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  <div className="text-gray-500">Words</div>
                  <div className="font-semibold text-gray-900">{report.details?.wordCount ?? 0}</div>
                </div>
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  <div className="text-gray-500">Bullets</div>
                  <div className="font-semibold text-gray-900">{report.details?.bullets ?? 0}</div>
                </div>
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  <div className="text-gray-500">Sections</div>
                  <div className="font-semibold text-gray-900">
                    {Object.values(report.details?.sections || {}).filter(Boolean).length}/6
                  </div>
                </div>
              </div>
              <button className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Download className="w-4 h-4" /> Download Report
              </button>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section Analysis */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Section Analysis</h3>
              <div className="space-y-4">
                {Object.entries(report.details?.sections || {}).map(([name, present]) => (
                  <div key={name} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    {present ? <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" /> : <XCircle className="w-5 h-5 text-red-500 mt-0.5" />}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{name}</h4>
                      <p className="text-sm text-gray-600">
                        {present ? 'Detected' : 'Not detected'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Issues */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Issues & Recommendations</h3>
              {(report.details?.issues || []).length === 0 ? (
                <p className="text-sm text-gray-600">No major issues detected.</p>
              ) : (
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                  {report.details.issues.map((msg, idx) => (
                    <li key={idx}>{msg}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ATSReport;
