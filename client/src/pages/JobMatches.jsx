import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, ArrowLeft, Search, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

const JobMatches = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const fetchJobs = async (query = 'Software Engineer', loc = '') => {
    setLoading(true);
    try {
      const response = await API.get('/jobs/search', {
        params: { query, location: loc }
      });
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
        fetchJobs(searchTerm, location);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <header className="bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-white">Job Matches</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Job title, keywords, or company" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition-all outline-none"
            />
          </div>
          <div className="relative md:col-span-1">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Location (e.g. Remote)" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition-all outline-none"
            />
          </div>
          <button 
            onClick={() => fetchJobs(searchTerm, location)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-500/20"
          >
            Find Jobs
          </button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6 shadow-sm animate-pulse border border-white/10">
                <div className="h-6 bg-white/10 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-white/10 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-white/10 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                    <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No jobs found. Try adjusting your search.</p>
                </div>
            ) : (
                jobs.map((job, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6 shadow-lg border border-white/10 hover:border-blue-500/30 transition-all hover:bg-white/10">
                    <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-white">{job.title}</h2>
                                <p className="text-gray-400 font-medium mt-1">{job.company}</p>
                            </div>
                            {job.logo && (
                                <img src={job.logo} alt={job.company} className="w-12 h-12 rounded object-cover bg-white p-1" />
                            )}
                        </div>
                        
                        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-blue-400" />
                            {job.location}
                        </div>
                        {job.salary && (
                            <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4 text-green-400" />
                                {job.salary}
                            </div>
                        )}
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-purple-400" />
                            {job.posted}
                        </div>
                        {job.source && (
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-white/10 rounded text-xs text-gray-300">
                                {job.source}
                            </div>
                        )}
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 min-w-[120px]">
                        <div className="flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-sm font-bold">
                        {job.matchScore}% Match
                        </div>
                        <a 
                            href={job.applyLink || job.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                        >
                        Apply Now <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                    </div>
                </div>
                ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default JobMatches;
