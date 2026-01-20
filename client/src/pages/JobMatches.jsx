import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobMatches = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching matched jobs
    setTimeout(() => {
      setJobs([
        {
          id: 1,
          title: 'Senior Full Stack Developer',
          company: 'Tech Innovators Inc.',
          location: 'Remote',
          salary: '$120k - $150k',
          type: 'Full-time',
          matchScore: 95,
          skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
          posted: '2 days ago'
        },
        {
          id: 2,
          title: 'Frontend Engineer',
          company: 'Creative Solutions',
          location: 'New York, NY',
          salary: '$100k - $130k',
          type: 'Full-time',
          matchScore: 88,
          skills: ['React', 'Tailwind CSS', 'TypeScript'],
          posted: '1 day ago'
        },
        {
          id: 3,
          title: 'Backend Developer',
          company: 'Data Systems Ltd.',
          location: 'Austin, TX',
          salary: '$110k - $140k',
          type: 'Contract',
          matchScore: 82,
          skills: ['Node.js', 'Express', 'PostgreSQL'],
          posted: '3 days ago'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Job Matches</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search jobs by title, skill, or company..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                    <p className="text-gray-600 font-medium mt-1">{job.company}</p>
                    
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.posted}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                      {job.matchScore}% Match
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default JobMatches;
