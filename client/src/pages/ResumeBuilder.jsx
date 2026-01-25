import React, { useState, useRef } from 'react';
import { ArrowLeft, Save, Download, Plus, Trash2, Eye, EyeOff, FileText, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [showPreview, setShowPreview] = useState(true);
  const previewRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);

  const [resumeData, setResumeData] = useState({
    personal: { 
      fullName: '', 
      email: '', 
      phone: '', 
      address: '', 
      summary: '' 
    },
    experience: [
      { id: 1, title: '', company: '', startDate: '', endDate: '', description: '' }
    ],
    education: [
      { id: 1, degree: '', school: '', year: '' }
    ],
    skills: []
  });

  const handlePersonalChange = (e) => {
    setResumeData({
      ...resumeData,
      personal: { ...resumeData.personal, [e.target.name]: e.target.value }
    });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, { id: Date.now(), title: '', company: '', startDate: '', endDate: '', description: '' }]
    });
  };

  const updateExperience = (id, field, value) => {
    const updatedExp = resumeData.experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    setResumeData({ ...resumeData, experience: updatedExp });
  };

  const removeExperience = (id) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, { id: Date.now(), degree: '', school: '', year: '' }]
    });
  };

  const updateEducation = (id, field, value) => {
    const updatedEdu = resumeData.education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setResumeData({ ...resumeData, education: updatedEdu });
  };

  const removeEducation = (id) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    });
  };

  const handleSkillChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setResumeData({ ...resumeData, skills });
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate save
    setTimeout(() => {
      setIsSaving(false);
      // Could show a toast here
    }, 1000);
  };

  const handleDownload = () => {
    const element = previewRef.current;
    const opt = {
      margin:       0.5,
      filename:     `${resumeData.personal.fullName || 'resume'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col selection:bg-blue-500/30">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] opacity-50" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] opacity-50" />
      </div>

      {/* Header */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-600/20 rounded-lg">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Resume Builder
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-all lg:hidden"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="hidden sm:inline">{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-all"
            >
              {isSaving ? <Check className="w-4 h-4 text-green-400" /> : <Save className="w-4 h-4" />}
              {isSaving ? 'Saved' : 'Save'}
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all transform hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`space-y-6 ${showPreview ? 'hidden lg:block' : 'block'}`}
        >
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden flex flex-col h-full">
            <div className="flex border-b border-white/10 overflow-x-auto scrollbar-hide">
              {['personal', 'experience', 'education', 'skills'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-6 py-4 text-sm font-medium capitalize whitespace-nowrap transition-all relative ${
                    activeSection === section
                      ? 'text-blue-400 bg-white/5'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  {section}
                  {activeSection === section && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeSection === 'personal' && (
                  <motion.div 
                    key="personal"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={resumeData.personal.fullName}
                          onChange={handlePersonalChange}
                          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={resumeData.personal.email}
                          onChange={handlePersonalChange}
                          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Phone</label>
                        <input
                          type="text"
                          name="phone"
                          value={resumeData.personal.phone}
                          onChange={handlePersonalChange}
                          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={resumeData.personal.address}
                          onChange={handlePersonalChange}
                          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                          placeholder="City, Country"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Professional Summary</label>
                        <textarea
                          name="summary"
                          value={resumeData.personal.summary}
                          onChange={handlePersonalChange}
                          rows={4}
                          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none"
                          placeholder="Briefly describe your professional background and key achievements..."
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'experience' && (
                  <motion.div 
                    key="experience"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <div className="w-1 h-6 bg-purple-500 rounded-full" />
                        Work Experience
                      </h3>
                      <button
                        onClick={addExperience}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                      >
                        <Plus className="w-4 h-4" /> Add Position
                      </button>
                    </div>
                    {resumeData.experience.map((exp) => (
                      <div key={exp.id} className="p-5 bg-white/5 rounded-xl border border-white/10 space-y-4 relative group hover:border-white/20 transition-all">
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-white/5 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <input
                              type="text"
                              value={exp.title}
                              onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                              placeholder="Job Title"
                              className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                              placeholder="Company Name"
                              className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                              placeholder="Start Date (e.g. Jan 2020)"
                              className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                              placeholder="End Date (e.g. Present)"
                              className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <textarea
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                              placeholder="Describe your responsibilities and achievements..."
                              rows={3}
                              className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeSection === 'education' && (
                  <motion.div 
                    key="education"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <div className="w-1 h-6 bg-green-500 rounded-full" />
                        Education
                      </h3>
                      <button
                        onClick={addEducation}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                      >
                        <Plus className="w-4 h-4" /> Add Education
                      </button>
                    </div>
                    {resumeData.education.map((edu) => (
                      <div key={edu.id} className="p-5 bg-white/5 rounded-xl border border-white/10 space-y-4 relative group hover:border-white/20 transition-all">
                        <button
                          onClick={() => removeEducation(edu.id)}
                          className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-white/5 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                              placeholder="Degree / Major"
                              className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={edu.school}
                              onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                              placeholder="School / University"
                              className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={edu.year}
                              onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                              placeholder="Graduation Year"
                              className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeSection === 'skills' && (
                  <motion.div 
                    key="skills"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <div className="w-1 h-6 bg-yellow-500 rounded-full" />
                      Skills
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1.5">Skills (comma separated)</label>
                      <textarea
                        value={resumeData.skills.join(', ')}
                        onChange={handleSkillChange}
                        rows={4}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none"
                        placeholder="e.g. JavaScript, React, Node.js, Team Leadership..."
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {resumeData.skills.map((skill, index) => (
                        skill && (
                          <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-sm font-medium">
                            {skill}
                          </span>
                        )
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Preview Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`bg-gray-800/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl flex justify-center items-start ${!showPreview ? 'hidden lg:flex' : 'flex'}`}
        >
          <div 
            ref={previewRef}
            className="w-full max-w-[210mm] min-h-[297mm] p-[10mm] shadow-2xl bg-white"
            style={{ 
              fontSize: '11pt', 
              lineHeight: '1.5', 
              fontFamily: 'Times New Roman, serif',
              color: '#333333',
            }}
          >
            {/* Resume Preview Content */}
            <div style={{ borderBottom: '2px solid #1f2937', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <h1 style={{ color: '#111827', fontSize: '1.875rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {resumeData.personal.fullName || 'YOUR NAME'}
              </h1>
              <div style={{ marginTop: '0.5rem', color: '#4b5563', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.875rem' }}>
                {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
                {resumeData.personal.phone && <span>• {resumeData.personal.phone}</span>}
                {resumeData.personal.address && <span>• {resumeData.personal.address}</span>}
              </div>
            </div>

            {resumeData.personal.summary && (
              <div className="mb-6">
                <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', borderBottom: '1px solid #d1d5db', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                  Professional Summary
                </h2>
                <p style={{ color: '#374151', textAlign: 'justify' }}>{resumeData.personal.summary}</p>
              </div>
            )}

            {resumeData.experience.length > 0 && (
              <div className="mb-6">
                <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', borderBottom: '1px solid #d1d5db', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                  Experience
                </h2>
                <div className="space-y-4">
                  {resumeData.experience.map((exp, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-baseline">
                        <h3 style={{ fontWeight: 'bold', color: '#111827' }}>{exp.title}</h3>
                        <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <div style={{ color: '#1f2937', fontWeight: '500', fontStyle: 'italic', marginBottom: '0.25rem' }}>{exp.company}</div>
                      <p style={{ color: '#374151', fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resumeData.education.length > 0 && (
              <div className="mb-6">
                <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', borderBottom: '1px solid #d1d5db', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                  Education
                </h2>
                <div className="space-y-3">
                  {resumeData.education.map((edu, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-baseline">
                        <h3 style={{ fontWeight: 'bold', color: '#111827' }}>{edu.school}</h3>
                        <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>{edu.year}</span>
                      </div>
                      <div style={{ color: '#374151' }}>{edu.degree}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resumeData.skills.length > 0 && resumeData.skills[0] !== "" && (
              <div className="mb-6">
                <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', borderBottom: '1px solid #d1d5db', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                  Skills
                </h2>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {resumeData.skills.map((skill, index) => (
                    skill && (
                      <span key={index} style={{ color: '#374151' }}>• {skill}</span>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ResumeBuilder;