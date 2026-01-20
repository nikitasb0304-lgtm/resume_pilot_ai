import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: 'New York, USA',
    bio: 'Software Engineer with 5 years of experience in full-stack development.',
    avatar: null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profile });
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (user) {
      const userData = {
        fullName: user.name || 'John Doe',
        email: user.email || 'john.doe@example.com',
        phone: user.phone || '+1 (555) 123-4567',
        address: user.address || 'New York, USA',
        bio: user.bio || 'Software Engineer with 5 years of experience in full-stack development.',
        avatar: null
      };
      setProfile(userData);
      setTempProfile(userData);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfile({ ...tempProfile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setTempProfile({ ...tempProfile, avatar: file });
    }
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
    // Here you would typically send data to backend
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setTempProfile({ ...profile });
    setPreviewUrl(null);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center">
          <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

          <div className="px-8 pb-8">
            {/* Profile Header */}
            <div className="relative flex justify-between items-end -mt-12 mb-8">
              <div className="flex items-end">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
                    {previewUrl || profile.avatar ? (
                      <img 
                        src={previewUrl || (profile.avatar && URL.createObjectURL(profile.avatar))} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                        <User className="w-16 h-16" />
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700 transition-colors shadow-md">
                      <Camera className="w-4 h-4" />
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
                <div className="ml-6 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{profile.fullName}</h1>
                  <p className="text-gray-500 font-medium">Software Engineer</p>
                </div>
              </div>
              
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center font-medium"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* Profile Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="fullName"
                          value={tempProfile.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{profile.fullName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Bio</label>
                      {isEditing ? (
                        <textarea
                          name="bio"
                          value={tempProfile.bio}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                        />
                      ) : (
                        <p className="text-gray-900 text-sm leading-relaxed">{profile.bio}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    Contact Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
                        <Mail className="w-4 h-4 mr-1" /> Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={tempProfile.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{profile.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
                        <Phone className="w-4 h-4 mr-1" /> Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={tempProfile.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{profile.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" /> Location
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={tempProfile.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{profile.address}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
