import React, { useState, useRef } from 'react';
import { ArrowLeft, Save, Download, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [showPreview, setShowPreview] = useState(true);
  const previewRef = useRef(null);

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
    console.log('Saving resume...', resumeData);
    alert('Resume saved successfully! (Simulation)');
  };

  const handleDownload = () => {
    const element = previewRef.current;
    const opt = {
      margin:       0.5,
      filename:     'my-resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Resume Builder</h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 lg:hidden"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Section */}
        <div className={`space-y-6 ${showPreview ? 'hidden lg:block' : 'block'}`}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {['personal', 'experience', 'education', 'skills'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-6 py-4 text-sm font-medium capitalize whitespace-nowrap ${
                    activeSection === section
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeSection === 'personal' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={resumeData.personal.fullName}
                        onChange={handlePersonalChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={resumeData.personal.email}
                        onChange={handlePersonalChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="abc@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={resumeData.personal.phone}
                        onChange={handlePersonalChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+91 00000-00000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={resumeData.personal.address}
                        onChange={handlePersonalChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Address"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
                      <textarea
                        name="summary"
                        value={resumeData.personal.summary}
                        onChange={handlePersonalChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Briefly describe your professional background..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'experience' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
                    <button
                      onClick={addExperience}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Plus className="w-4 h-4" /> Add Position
                    </button>
                  </div>
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4 relative group">
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            placeholder="Company"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            placeholder="Start Date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            placeholder="End Date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            placeholder="Job Description"
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'education' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Education</h3>
                    <button
                      onClick={addEducation}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Plus className="w-4 h-4" /> Add Education
                    </button>
                  </div>
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4 relative group">
                      <button
                        onClick={() => removeEducation(edu.id)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            placeholder="Degree"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={edu.school}
                            onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                            placeholder="School/University"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={edu.year}
                            onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                            placeholder="Graduation Year"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'skills' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                    <textarea
                      value={resumeData.skills.join(', ')}
                      onChange={handleSkillChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="JavaScript, React, Node.js, Team Leadership..."
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {resumeData.skills.map((skill, index) => (
                      skill && (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className={`bg-gray-800 p-4 rounded-xl shadow-lg overflow-hidden flex justify-center items-start ${!showPreview ? 'hidden lg:flex' : 'flex'}`}>
          <div 
            ref={previewRef}
            className="w-full max-w-[210mm] min-h-[297mm] p-[10mm] shadow-2xl"
            style={{ 
              fontSize: '11pt', 
              lineHeight: '1.5', 
              fontFamily: 'Times New Roman, serif',
              backgroundColor: '#ffffff',
              color: '#333333',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
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
        </div>
      </main>
    </div>
  );
};

export default ResumeBuilder;
