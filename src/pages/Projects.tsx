import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Clock, DollarSign, Star, Users, User, Eye, Briefcase, Building } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Projects() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'talents' | 'teams' | 'agencies' | 'projects'>(user?.role === 'creator' ? 'projects' : 'talents');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');

  const categories = [
    'all', 'acting', 'modeling', 'digital-marketing', 'event-management', 
    'brand-ambassador', 'content-creation', 'photography', 'design', 'writing', 'film-video-production'
  ];

  const budgetRanges = [
    'all', 'under-500', '500-1000', '1000-5000', '5000-plus'
  ];

  const projects = [
    {
      id: 1,
      title: 'Brand Ambassador for Tech Startup',
      company: 'Innovate Inc.',
      location: 'Remote',
      budget: 'UGX 1,500,000',
      description: 'Looking for an energetic brand ambassador to represent our new app. Must have strong social media presence.',
      skills: ['Social Media Marketing', 'Brand Representation', 'Content Creation'],
      type: 'gig'
    },
    {
      id: 2,
      title: 'Lead Actor for Short Film',
      company: 'Starlight Pictures',
      location: 'Kampala, Uganda',
      budget: 'UGX 2,000,000',
      description: 'Seeking a lead actor for a drama short film. Acting experience required.',
      skills: ['Acting', 'Drama', 'Improvisation'],
      type: 'casting'
    }
  ];

  const talents = [
    {
      id: 1,
      name: 'Emma Wilson',
      title: 'Digital Marketing Specialist',
      category: 'digital-marketing',
      location: 'Kampala, Uganda',
      rating: 4.9,
      reviews: 127,
      hourlyRate: 320000,
      avatar: 'https://images.pexels.com/photos/31422830/pexels-photo-31422830.png?auto=compress&cs=tinysrgb&w=150',
      skills: ['Social Media Marketing', 'SEO', 'Content Strategy', 'Analytics'],
      completedProjects: 45,
      responseTime: '2 hours',
      description: 'Experienced digital marketer with 5+ years helping brands grow their online presence.',
      certifications: ['Google Ads Certified', 'Facebook Blueprint', 'FlourishTalents Digital Marketing'],
      portfolio: {
        projects: 12,
        totalViews: 15420
      }
    },
    {
      id: 2,
      name: 'Ruby Nesda',
      title: 'Professional Model & Actress',
      category: 'modeling',
      location: 'Entebbe, Uganda',
      rating: 4.8,
      reviews: 89,
      hourlyRate: 570000,
      avatar: 'https://images.pexels.com/photos/6311651/pexels-photo-6311651.jpeg?auto=compress&cs=tinysrgb&w=400',
      skills: ['Fashion Modeling', 'Commercial Acting', 'Brand Representation', 'Social Media'],
      completedProjects: 32,
      responseTime: '1 hour',
      description: 'Professional model and actress with experience in fashion, commercial, and brand campaigns.',
      certifications: ['SAG-AFTRA Member', 'Professional Model Certification'],
      portfolio: {
        projects: 28,
        totalViews: 32100
      }
    },
    {
      id: 3,
      name: 'Maya Chen',
      title: 'Event Management Expert',
      category: 'event-management',
      location: 'Jinja, Uganda',
      rating: 5.0,
      reviews: 156,
      hourlyRate: 360000,
      avatar: 'https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg?auto=compress&cs=tinysrgb&w=150',
      skills: ['Corporate Events', 'Wedding Planning', 'Vendor Management', 'Budget Planning'],
      completedProjects: 78,
      responseTime: '30 minutes',
      description: 'Award-winning event planner specializing in corporate and luxury events.',
      certifications: ['Certified Meeting Professional', 'Event Planning Certification'],
      portfolio: {
        projects: 45,
        totalViews: 28900
      }
    }
  ];

  const teams = [
    {
      id: 1,
      name: 'Creative Collective Agency',
      type: 'Full-Service Creative Agency',
      category: 'design',
      location: 'Kampala, Uganda',
      rating: 4.9,
      reviews: 234,
      teamSize: 12,
      startingRate: 450000,
      logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150',
      services: ['Brand Design', 'Web Development', 'Marketing Strategy', 'Content Creation'],
      completedProjects: 189,
      responseTime: '4 hours',
      description: 'Award-winning creative agency specializing in brand identity and digital experiences.',
      specialties: ['Tech Startups', 'E-commerce', 'Healthcare', 'Finance']
    },
    {
      id: 2,
      name: 'Elite Marketing Solutions',
      type: 'Digital Marketing Agency',
      category: 'digital-marketing',
      location: 'Mbarara, Uganda',
      rating: 4.8,
      reviews: 178,
      teamSize: 8,
      startingRate: 360000,
      logo: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=150',
      services: ['PPC Management', 'SEO', 'Social Media', 'Email Marketing'],
      completedProjects: 156,
      responseTime: '2 hours',
      description: 'Results-driven marketing agency with proven track record of ROI growth.',
      specialties: ['SaaS', 'E-commerce', 'Local Business', 'B2B']
    }
  ];

  const teamsData = [
    {
      id: 1,
      name: 'Film Crew Kampala',
      type: 'Production Team',
      category: 'film-video-production',
      location: 'Kampala, Uganda',
      rating: 4.7,
      reviews: 98,
      teamSize: 6,
      startingRate: 280000,
      logo: 'https://images.pexels.com/photos/269140/pexels-photo-269140.jpeg?auto=compress&cs=tinysrgb&w=150',
      services: ['Cinematography', 'Lighting', 'Sound'],
      completedProjects: 72,
      responseTime: '3 hours',
      description: 'Experienced film crew available for short and feature productions.',
      specialties: ['Short Films', 'Commercials', 'Music Videos']
    },
    {
      id: 2,
      name: 'Event Crew Uganda',
      type: 'Event Production Team',
      category: 'event-management',
      location: 'Kampala, Uganda',
      rating: 4.8,
      reviews: 120,
      teamSize: 10,
      startingRate: 320000,
      logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=150',
      services: ['Stage Setup', 'Sound', 'Lighting', 'Coordination'],
      completedProjects: 150,
      responseTime: '2 hours',
      description: 'Full-service event crew for conferences, concerts and launches.',
      specialties: ['Corporate', 'Concerts', 'Launches']
    }
  ];

  const filteredTalents = talents.filter(talent => {
    const matchesCategory = selectedCategory === 'all' || talent.category === selectedCategory;
    const matchesSearch = talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         talent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         talent.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesBudget = selectedBudget === 'all' || 
      (selectedBudget === 'under-500' && talent.hourlyRate < 190000) ||
      (selectedBudget === '500-1000' && talent.hourlyRate >= 190000 && talent.hourlyRate < 380000) ||
      (selectedBudget === '1000-5000' && talent.hourlyRate >= 380000 && talent.hourlyRate < 760000) ||
      (selectedBudget === '5000-plus' && talent.hourlyRate >= 760000);
    
    return matchesCategory && matchesSearch && matchesBudget;
  });

  const filteredTeams = teamsData.filter(team => {
    const matchesCategory = selectedCategory === 'all' || team.category === selectedCategory;
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         team.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         team.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const renderedGroups = (viewMode === 'agencies' ? teams : teamsData).filter(team => {
    const matchesCategory = selectedCategory === 'all' || team.category === selectedCategory;
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         team.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         team.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.type === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleApply = (projectId: number) => {
    alert(`Applied to project ${projectId}`);
  };

  const handleHire = (id: number, type: 'talent' | 'team') => {
    if (!user) {
      alert('Please sign up or sign in to proceed.');
      navigate('/signin');
      return;
    }
    if (user.role === 'creator') {
        handleApply(id);
        return;
    }
    if (user.tier === 'free') {
      alert('Upgrade to Premium to hire talents and teams!');
      return;
    }
    alert(`Hiring request sent! The ${type} will be notified and will respond soon.`);
  };

  const handleViewPortfolio = (id: number) => {
    alert('Opening portfolio in new window...');
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-bold text-white mb-2">Projects</h1>
          <p className="text-gray-300">Hire the right Talent for your Project, or Join a Project for your talents</p>
        </div>

        {/* View Toggle and Submit Button */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div className="flex space-x-1 glass-effect p-2 rounded-xl overflow-x-auto whitespace-nowrap">
            {user?.role === 'creator' ? (
              <button
                onClick={() => setViewMode('projects')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  viewMode === 'projects'
                    ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Briefcase className="w-5 h-5" />
                <span>Browse Projects</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => setViewMode('talents')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    viewMode === 'talents'
                      ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>Talent</span>
                </button>
                <button
                  onClick={() => setViewMode('teams')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    viewMode === 'teams'
                      ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span>Teams</span>
                </button>
                <button
                  onClick={() => setViewMode('agencies')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    viewMode === 'agencies'
                      ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Building className="w-5 h-5" />
                  <span>Agency</span>
                </button>
              </>
            )}
          </div>
          <button
            onClick={() => {
              if (!user) {
                alert('Please sign up or sign in to submit a project.');
                navigate('/signin');
                return;
              }
              alert('Project submission feature coming soon!');
            }}
            className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all">
            Submit a Project
          </button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={`Search ${viewMode}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass-effect rounded-xl border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
          >
            {categories.map((category) => (
              <option key={category} value={category} className="bg-gray-800">
                {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>

          {viewMode === 'talents' && (
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
            >
              <option value="all" className="bg-gray-800">All Budgets</option>
              <option value="under-500" className="bg-gray-800">Under UGX --/hr</option>
              <option value="500-1000" className="bg-gray-800">UGX --–UGX --/hr</option>
              <option value="1000-5000" className="bg-gray-800">UGX --–UGX --/hr</option>
              <option value="5000-plus" className="bg-gray-800">UGX --+/hr</option>
            </select>
          )}
        </div>

        {/* Results */}
        <div className="grid lg:grid-cols-3 gap-6">
          {viewMode === 'projects' ? (
            filteredProjects.map((project) => (
              <div key={project.id} className="glass-effect rounded-2xl overflow-hidden hover-lift p-6">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="text-gray-400 text-sm">{project.company}</p>
                <div className="flex items-center space-x-2 mt-2">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    <span className="text-gray-300 text-sm">{project.location}</span>
                </div>
                <p className="text-gray-300 text-sm mt-4 line-clamp-2">{project.description}</p>
                <div className="mt-4">
                    <div className="flex flex-wrap gap-1">
                        {project.skills.map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-rose-400/20 text-rose-300 text-xs rounded">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div className="text-lg font-bold text-white">UGX --</div>
                    <button
                        onClick={() => handleHire(project.id, 'talent')}
                        className="flex-1 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                        Apply Now
                    </button>
                </div>
              </div>
            ))
          ) : viewMode === 'talents' ? (
            filteredTalents.map((talent) => (
              <div key={talent.id} className="glass-effect rounded-2xl overflow-hidden hover-lift">
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={talent.avatar} 
                      alt={talent.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white">{talent.name}</h3>
                      <p className="text-gray-400 text-sm">{talent.title}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm">{talent.rating}</span>
                          <span className="text-gray-400 text-sm">({talent.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="px-6 pb-4">
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{talent.description}</p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{talent.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{talent.responseTime}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Briefcase className="w-4 h-4" />
                      <span>{talent.completedProjects} projects</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <DollarSign className="w-4 h-4" />
                      <span>UGX --/hr</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {talent.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-rose-400/20 text-rose-300 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                      {talent.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded">
                          +{talent.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mb-4">
                    <h4 className="text-white text-sm font-medium mb-2">Certifications</h4>
                    <div className="space-y-1">
                      {talent.certifications.slice(0, 2).map((cert, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full" />
                          <span className="text-gray-300 text-xs">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewPortfolio(talent.id)}
                      className="flex-1 py-2 glass-effect text-gray-300 hover:text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>{user?.role === 'creator' ? 'Send Portfolio' : 'Portfolio'}</span>
                    </button>
                    <button
                      onClick={() => handleHire(talent.id, 'talent')}
                      className="flex-1 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      {user?.role === 'creator' ? 'Apply' : 'Hire Now'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            renderedGroups.map((team) => (
              <div key={team.id} className="glass-effect rounded-2xl overflow-hidden hover-lift">
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white">{team.name}</h3>
                      <p className="text-gray-400 text-sm">{team.type}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm">{team.rating}</span>
                          <span className="text-gray-400 text-sm">({team.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="px-6 pb-4">
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{team.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{team.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{team.responseTime}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{team.teamSize} members</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <DollarSign className="w-4 h-4" />
                      <span>From UGX --/hr</span>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="mb-4">
                    <h4 className="text-white text-sm font-medium mb-2">Services</h4>
                    <div className="flex flex-wrap gap-1">
                      {team.services.slice(0, 3).map((service, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-400/20 text-purple-300 text-xs rounded">
                          {service}
                        </span>
                      ))}
                      {team.services.length > 3 && (
                        <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded">
                          +{team.services.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4">
                    <h4 className="text-white text-sm font-medium mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-1">
                      {team.specialties.map((specialty, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-400/20 text-blue-300 text-xs rounded">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewPortfolio(team.id)}
                      className="flex-1 py-2 glass-effect text-gray-300 hover:text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Work</span>
                    </button>
                    <button
                      onClick={() => handleHire(team.id, 'team')}
                      className="flex-1 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      {user?.role === 'creator' ? 'Apply' : (viewMode === 'agencies' ? 'Hire Agency' : 'Hire Team')}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Empty State */}
        {((viewMode === 'talents' && filteredTalents.length === 0) ||
          (viewMode === 'teams' && filteredTeams.length === 0) ||
          (viewMode === 'agencies' && renderedGroups.length === 0)) && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              {viewMode === 'talents' ? <User className="w-16 h-16 mx-auto mb-4" /> : viewMode === 'teams' ? <Users className="w-16 h-16 mx-auto mb-4" /> : <Building className="w-16 h-16 mx-auto mb-4" />}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No {viewMode} found</h3>
            <p className="text-gray-400">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
