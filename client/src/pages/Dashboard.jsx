import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
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
      icon: <FileText className="w-6 h-6 text-blue-400" />,
      link: '/resume-builder',
      color: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-500/20'
    },
    {
      title: 'Upload Resume',
      description: 'Upload your existing resume for analysis.',
      icon: <Upload className="w-6 h-6 text-emerald-400" />,
      link: '/resume-upload',
      color: 'from-emerald-500/20 to-green-500/20',
      border: 'border-emerald-500/20'
    },
    {
      title: 'Job Matches',
      description: 'Find jobs matching your skills and experience.',
      icon: <Briefcase className="w-6 h-6 text-purple-400" />,
      link: '/job-matches',
      color: 'from-purple-500/20 to-pink-500/20',
      border: 'border-purple-500/20'
    },
    {
      title: 'ATS Report',
      description: 'Check your resume score and get improvement tips.',
      icon: <Award className="w-6 h-6 text-orange-400" />,
      link: '/ats-report',
      color: 'from-orange-500/20 to-red-500/20',
      border: 'border-orange-500/20'
    },
    {
      title: 'AI Career Coach',
      description: 'Chat with AI to get career advice.',
      icon: <MessageSquare className="w-6 h-6 text-indigo-400" />,
      link: '/ai-coach',
      color: 'from-indigo-500/20 to-violet-500/20',
      border: 'border-indigo-500/20'
    },
    {
      title: 'My Profile',
      description: 'Manage your account settings and preferences.',
      icon: <User className="w-6 h-6 text-gray-400" />,
      link: '/profile',
      color: 'from-gray-500/20 to-slate-500/20',
      border: 'border-gray-500/20'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      {/* Top Navigation */}
      <nav className="relative z-50 border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                ResumePilot AI
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400 hidden sm:block">
                Welcome, <span className="text-white font-medium">{user?.name || user?.email || 'User'}</span>
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 border border-white/10 text-sm font-medium rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-2 text-gray-400">Manage your career tools and track your progress.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {menuItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link
                to={item.link}
                className={`group block h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 relative overflow-hidden transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Activity Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <div className="text-center text-gray-500 py-8">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-600" />
              </div>
              <p className="text-lg font-medium text-gray-400">No recent activity</p>
              <p className="text-sm text-gray-600 mt-1">Start by creating a resume or uploading one!</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
