import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Clock, Users, Award, Star, BookOpen, Filter, Search, CheckCircle, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Masterclass() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMentorshipModal, setShowMentorshipModal] = useState(false);
  const [mentorshipRequestSent, setMentorshipRequestSent] = useState(false);

  const categories = [
    'all',
    'digital-marketing',
    'brand-ambassador-roles',
    'media-communications',
    'modelling',
    'acting',
    'literary-culture',
    'film-&-video-production',
    'audio-production',
    'music',
    'dance',
    'event-management',
    'marketing-&-advertising',
    'AI-research-&-innovation',
    'business-development',
    'professional-development',
    'personal-development'
  ];

  const masterclasses = [
    {
      id: 1,
      title: 'Digital Marketing Mastery',
      instructor: 'Sarah Johnson',
      category: 'digital-marketing',
      duration: '8 weeks',
      lessons: 24,
      students: 1250,
      rating: 4.9,
      price: 750000,
      level: 'Beginner to Advanced',
      thumbnail: 'https://images.pexels.com/photos/6285080/pexels-photo-6285080.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Master the art of digital marketing with hands-on projects and real-world case studies.',
      features: ['Live Sessions', 'Projects', 'Certification'],
      isEnrolled: false,
      progress: 0
    },
    {
      id: 2,
      title: 'Brand Ambassador Certification',
      instructor: 'Emma Wilson',
      category: 'brand-ambassador',
      duration: '6 weeks',
      lessons: 18,
      students: 890,
      rating: 4.8,
      price: 560000,
      level: 'Intermediate',
      thumbnail: 'https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Learn how to become a successful brand ambassador and build lasting partnerships.',
      features: ['Industry Connections', 'Portfolio Building', 'Certification'],
      isEnrolled: true,
      progress: 65
    },
    {
      id: 3,
      title: 'Media & Communications Excellence',
      instructor: 'Dr. Maria Rodriguez',
      category: 'media-communications',
      duration: '10 weeks',
      lessons: 30,
      students: 650,
      rating: 4.9,
      price: 940000,
      level: 'Advanced',
      thumbnail: 'https://images.pexels.com/photos/14587370/pexels-photo-14587370.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Comprehensive media training covering PR, communications strategy, and crisis management.',
      features: ['Media Kit Creation', 'PR Strategy', 'Crisis Management', 'Networking'],
      isEnrolled: false,
      progress: 0
    },
    {
      id: 5,
      title: 'The Art of Modelling',
      instructor: 'Alex Chen',
      category: 'modelling',
      duration: '8 weeks',
      lessons: 20,
      students: 350,
      rating: 4.8,
      price: 820000,
      level: 'Beginner',
      thumbnail: 'https://images.pexels.com/photos/6311651/pexels-photo-6311651.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Master the runway, posing techniques, and the business of modeling.',
      features: ['Posing Techniques', 'Runway Walk', 'Portfolio Development'],
      isEnrolled: false,
      progress: 0
    },
    {
      id: 4,
      title: 'Acting for Screen & Stage',
      instructor: 'Jedi Martinez',
      category: 'acting',
      duration: '12 weeks',
      lessons: 36,
      students: 420,
      rating: 4.7,
      price: 1130000,
      level: 'All Levels',
      thumbnail: 'https://images.pexels.com/photos/7551410/pexels-photo-7551410.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Develop your acting skills with professional techniques and industry insights.',
      features: ['Scene Work', 'Audition Prep', 'Industry Connections', 'Demo Reel'],
      isEnrolled: false,
      progress: 0
    },
    {
        id: 9,
        title: 'Literary Culture',
        instructor: 'Dr. Evelyn Reed',
        category: 'literary-culture',
        duration: '6 weeks',
        lessons: 15,
        students: 250,
        rating: 4.7,
        price: 680000,
        level: 'All Levels',
        thumbnail: 'https://images.pexels.com/photos/8390958/pexels-photo-8390958.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Explore contemporary literature and its impact on modern culture.',
        features: ['Literary Analysis', 'Cultural Studies', 'Creative Writing'],
        isEnrolled: false,
        progress: 0
    },
    {
      id: 6,
      title: 'Film & Video Production',
      instructor: 'David Lee',
      category: 'film-video-production',
      duration: '10 weeks',
      lessons: 25,
      students: 550,
      rating: 4.9,
      price: 980000,
      level: 'Beginner to Intermediate',
      thumbnail: 'https://images.pexels.com/photos/7413890/pexels-photo-7413890.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Learn the fundamentals of filmmaking, from pre-production to post-production.',
      features: ['Cinematography', 'Editing', 'Sound Design', 'Directing'],
      isEnrolled: false,
      progress: 0
    },
    {
      id: 7,
      title: 'Audio Production',
      instructor: 'Jasmine Carter',
      category: 'audio-production',
      duration: '8 weeks',
      lessons: 20,
      students: 400,
      rating: 4.8,
      price: 720000,
      level: 'All Levels',
      thumbnail: 'https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Master audio recording, editing, and mixing for music, podcasts, and video.',
      features: ['DAW Basics', 'Mixing Techniques', 'Mastering', 'Sound Engineering'],
      isEnrolled: false,
      progress: 0
    },
    {
      id: 8,
      title: 'Music Theory & Composition',
      instructor: 'Dr. Michael Chen',
      category: 'music',
      duration: '12 weeks',
      lessons: 30,
      students: 300,
      rating: 4.9,
      price: 1200000,
      level: 'Intermediate to Advanced',
      thumbnail: 'https://images.pexels.com/photos/586415/pexels-photo-586415.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Deepen your understanding of music theory and learn advanced composition techniques.',
      features: ['Harmony', 'Counterpoint', 'Orchestration', 'Songwriting'],
      isEnrolled: false,
      progress: 0
    }
  ].sort((a, b) => {
    const aIndex = categories.indexOf(a.category);
    const bIndex = categories.indexOf(b.category);
    return aIndex - bIndex;
  })

  const workshops = [
    {
      id: 1,
      title: 'Social Media Strategy Workshop',
      date: 'November 15, 2025',
      time: '2:00 PM EAT',
      duration: '3 hours',
      instructor: 'Alex Chen',
      spots: 25,
      price: 185000,
      category: 'digital-marketing'
    },
    {
      id: 2,
      title: 'Personal Branding Intensive',
      date: 'November 20, 2025',
      time: '10:00 AM EAT',
      duration: '4 hours',
      instructor: 'Maya Patel',
      spots: 15,
      price: 300000,
      category: 'professional-development'
    }
  ];

  const filteredMasterclasses = masterclasses.filter(course => {
    const matchesCategory = activeFilter === 'all' || course.category === activeFilter;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEnroll = (courseId: number) => {
    if (!user) {
      alert('Please sign up or sign in to enroll.');
      navigate('/signin');
      return;
    }
    if (user.tier === 'free') {
      alert('Upgrade to Premium to access masterclasses!');
      return;
    }
    alert('Enrollment successful! Welcome to the masterclass.');
  };

  const handleMentorshipRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call
    // For now, we'll just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMentorshipRequestSent(true);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-bold text-white mb-2">Masterclass</h1>
          <p className="text-gray-300">Learn from industry experts and advance your career</p>
        </div>


        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search masterclasses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass-effect rounded-xl border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-gray-800">
                  {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Masterclasses Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-white mb-6">Featured Masterclasses</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {filteredMasterclasses.map((course) => (
                <div key={course.id} className="glass-effect rounded-2xl overflow-hidden hover-lift">
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gray-800">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    
                    {course.isEnrolled && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                        ENROLLED
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-rose-400/20 text-rose-300 text-xs rounded-full">
                        {course.level}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-gray-300 text-sm">{course.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                    <p className="text-gray-200 text-sm mb-3">by {course.instructor}</p>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{course.description}</p>

                    {/* Course Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-200 mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.lessons} lessons</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.features.map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-400/20 text-purple-300 text-xs rounded">
                          {feature}
                        </span>
                      ))}
                      <Link
                        to={`/career-guidance/${course.id}`}
                        className="px-2 py-1 bg-blue-400/20 text-blue-300 text-xs rounded"
                      >
                        Career Guidance
                      </Link>
                    </div>

                    {/* Progress Bar (if enrolled) */}
                    {course.isEnrolled && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Progress</span>
                          <span className="text-gray-300">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-white">UGX --</div>
                      {course.isEnrolled ? (
                        <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          Continue Learning
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEnroll(course.id)}
                          className="px-6 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                        >
                          Enroll Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* My Learning */}
            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-4">My Learning</h3>
              <div className="space-y-3">
                {masterclasses.filter(c => c.isEnrolled).map((course) => (
                  <div key={course.id} className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-lg transition-colors">
                    <img src={course.thumbnail} alt={course.title} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium line-clamp-1">{course.title}</div>
                      <div className="text-gray-200 text-xs">{course.progress}% complete</div>
                    </div>
                  </div>
                ))}
                {masterclasses.filter(c => c.isEnrolled).length === 0 && (
                  <p className="text-gray-200 text-sm">No enrolled courses yet</p>
                )}
              </div>
            </div>

            {/* Mentorship CTA */}
            <div className="glass-effect p-6 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30">
              <div className="flex flex-col items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Mentorship</h3>
                  <p className="text-gray-300">Get personalized guidance from industry professionals.</p>
                </div>
                <button
                  onClick={() => {
                    if (!user) {
                      alert('Please sign up or sign in to request mentorship.');
                      navigate('/signin');
                      return;
                    }
                    setShowMentorshipModal(true);
                    setMentorshipRequestSent(false);
                  }}
                  className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Community Support CTA */}
            <div className="glass-effect p-6 rounded-2xl bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-400/30">
                <div className="flex flex-col items-start justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Community Support</h3>
                    <p className="text-gray-300">Have questions? Get help from our community of creators and experts.</p>
                </div>
                <button
                    className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all"
                >
                    Ask the Community
                </button>
                </div>
            </div>

            {/* Upcoming Workshops */}
            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-4">Upcoming Workshops</h3>
              <div className="space-y-4">
                {workshops.map((workshop) => (
                  <div key={workshop.id} className="border border-gray-700 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">{workshop.title}</h4>
                    <div className="text-gray-200 text-sm space-y-1">
                      <div>{workshop.date} at {workshop.time}</div>
                      <div>{workshop.duration} • {workshop.spots} spots left</div>
                      <div>by {workshop.instructor}</div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-rose-400 font-bold">UGX --</span>
                      <button className="px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white text-sm rounded-lg hover:shadow-lg transition-all">
                        Register
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-4">My Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Award className="w-8 h-8 text-yellow-400" />
                  <div>
                    <div className="text-white font-medium">Brand Ambassador Certified</div>
                    <div className="text-gray-200 text-sm">Completed November 2025</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <div>
                    <div className="text-white font-medium">First Course Completed</div>
                    <div className="text-gray-400 text-sm">Achievement unlocked</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mentorship Modal */}
      {showMentorshipModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-effect p-6 rounded-2xl max-w-md w-full">
              {!mentorshipRequestSent ? (
              <>
                  <h3 className="text-xl font-semibold text-white mb-4">Request Mentorship</h3>
                  <p className="text-gray-300 mb-4">
                  Fill out the form below to request a mentorship session.
                  </p>
                  <form
              onSubmit={handleMentorshipRequest}
                  >
                  <div className="space-y-4">
                      <textarea
                      className="w-full h-24 bg-transparent border border-gray-600 rounded-lg p-3 text-white resize-none focus:border-rose-400 outline-none"
                      placeholder="What do you need help with?"
                      required
                      ></textarea>
                      <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all"
                      >
                      Submit Request
                      </button>
                  </div>
                  </form>
              </>
              ) : (
              <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Request Sent!</h3>
                  <p className="text-gray-300 mb-4">
                  Your mentorship request has been received for review. We will notify you once it's approved.
                  </p>
                  <p className="text-yellow-400 text-sm mb-4">
                  Please note: Mentorship is a premium feature.
                  </p>
                  <div className="flex space-x-3">
                  <button
                      onClick={() => setShowMentorshipModal(false)}
                      className="flex-1 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                      Close
                  </button>
                  <button
                      className="flex-1 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-xl transition-all"
                  >
                      Upgrade to Premium
                  </button>
                  </div>
              </div>
              )}
          </div>
          </div>
      )}
    </div>
  );
}
