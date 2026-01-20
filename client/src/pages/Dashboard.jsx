import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FileText, 
  Upload, 
  Briefcase, 
  Award, 
  MessageSquare, 
  LogOut, 
  User,
  Settings,
  ChevronRight
} from 'lucide-react';

const Dashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = [
    {
      title: 'Resume Builder',
      description: 'Create a professional resume with AI assistance.',
      icon: <FileText className="w-8 h-8 text-blue-500" />,
      link: '/resume-builder',
      color: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Upload Resume',
      description: 'Upload your existing resume for analysis.',
      icon: <Upload className="w-8 h-8 text-green-500" />,
      link: '/resume-upload',
      color: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Job Matches',
      description: 'Find jobs matching your skills and experience.',
      icon: <Briefcase className="w-8 h-8 text-purple-500" />,
      link: '/job-matches',
      color: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      title: 'ATS Report',
      description: 'Check your resume score and get improvement tips.',
      icon: <Award className="w-8 h-8 text-orange-500" />,
      link: '/ats-report',
      color: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      title: 'AI Career Coach',
      description: 'Chat with AI to get career advice.',
      icon: <MessageSquare className="w-8 h-8 text-indigo-500" />,
      link: '/ai-coach',
      color: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      title: 'My Profile',
      description: 'Manage your account settings and preferences.',
      icon: <User className="w-8 h-8 text-gray-500" />,
      link: '/profile',
      color: 'bg-gray-50',
      borderColor: 'border-gray-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ResumePilot AI
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:block">
                Welcome, {user?.name || user?.email || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 transition"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your career tools and track your progress.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`block p-6 rounded-xl border ${item.borderColor} ${item.color} hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  {item.icon}
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-2 text-gray-600">
                {item.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Recent Activity Section (Placeholder) */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-center text-gray-500 py-8">
              <p>No recent activity found. Start by creating a resume!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
