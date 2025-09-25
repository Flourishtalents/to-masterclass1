import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Award, BookOpen, Bookmark, ChevronDown, Clock, Eye, Filter, Grid, List,
  MessageCircle, Play, Search, Star, Target, TrendingUp, Trophy, Users, Video
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { mockCourses, mockWorkshops, mockAchievements, categories } from '../data/mock-data';
import { Course } from '../types';
import CourseCardSkeleton from '../components/masterclass/CourseCardSkeleton';

// Utility to format category names for display
const formatCategoryName = (category: string) => {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// A new Course Card component to be used in the grid
const CourseCard: React.FC<{ course: Course, viewMode: 'grid' | 'list' }> = ({ course, viewMode }) => {
  const [isBookmarked, setIsBookmarked] = useState(course.isBookmarked);
  const { addToast } = useToast();

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    if (newBookmarkState) {
      addToast('Course bookmarked!', 'success');
    } else {
      addToast('Bookmark removed.', 'info');
    }
  };

  const cardClasses = "glass-effect rounded-2xl overflow-hidden hover-lift group transition-all duration-300 flex";
  const viewModeClasses = viewMode === 'grid' ? 'flex-col' : 'flex-col md:flex-row';

  return (
    <div className={`${cardClasses} ${viewModeClasses}`}>
      {/* Thumbnail Section */}
      <div className={`relative bg-gray-800 ${viewMode === 'grid' ? 'aspect-video' : 'md:w-1/3 aspect-video'}`}>
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors" title="Preview">
            <Eye className="w-6 h-6 text-white" />
          </button>
          <Link to={`/learn/${course.id}`} className="p-4 bg-rose-500 rounded-full hover:bg-rose-600 transition-colors" title="Start Learning">
            <Play className="w-6 h-6 text-white fill-white" />
          </Link>
        </div>
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {course.isBestseller && <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded">BESTSELLER</span>}
          {course.isNew && <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">NEW</span>}
          {course.isEnrolled && <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded">ENROLLED</span>}
        </div>
        <button onClick={toggleBookmark} className="absolute top-3 right-3 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors" title="Bookmark">
          <Bookmark className={`w-5 h-5 text-white transition-colors ${isBookmarked ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-rose-400/20 text-rose-300 text-xs rounded-full">{course.level}</span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm font-medium">{course.rating}</span>
            <span className="text-gray-400 text-sm">({course.reviewCount})</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-rose-400 transition-colors flex-grow">
          <Link to={`/course/${course.id}`}>{course.title}</Link>
        </h3>

        <div className="flex items-center space-x-2 mb-3">
          <img src={course.instructorImage} alt={course.instructor} className="w-6 h-6 rounded-full" />
          <span className="text-gray-300 text-sm">by {course.instructor}</span>
        </div>

        {viewMode === 'list' && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{course.description}</p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
          <span className="flex items-center space-x-1"><Clock className="w-4 h-4" /><span>{course.duration}</span></span>
          <span className="flex items-center space-x-1"><BookOpen className="w-4 h-4" /><span>{course.lessons} lessons</span></span>
          <span className="flex items-center space-x-1"><Users className="w-4 h-4" /><span>{course.students}</span></span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {course.features.slice(0, 3).map(f => <span key={f} className="px-2 py-1 bg-purple-400/20 text-purple-300 text-xs rounded">{f}</span>)}
          {course.features.length > 3 && <span className="px-2 py-1 bg-gray-400/20 text-gray-300 text-xs rounded">+{course.features.length - 3} more</span>}
        </div>

        {course.isEnrolled && course.progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1 text-white"><p>Progress</p><p>{course.progress}%</p></div>
            <div className="w-full bg-gray-700 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div></div>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
          <div>
            <p className="text-2xl font-bold text-white">UGX {course.price.toLocaleString()}</p>
            {course.originalPrice > course.price && <p className="text-sm text-gray-400 line-through">UGX {course.originalPrice.toLocaleString()}</p>}
          </div>
          <Link to={course.isEnrolled ? `/learn/${course.id}` : `/course/${course.id}`}>
            <button className={`px-6 py-2 rounded-lg font-semibold transition-all ${course.isEnrolled ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gradient-to-r from-rose-500 to-purple-600 hover:shadow-lg hover:shadow-rose-500/20 text-white'}`}>
              {course.isEnrolled ? 'Continue' : 'Enroll Now'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};


export default function Masterclass() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('Most Popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filters State
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [selectedLevels, setSelectedLevels] = useState<string[]>(['all']);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMentorshipModal, setShowMentorshipModal] = useState(false);
  const [mentorshipRequestSent, setMentorshipRequestSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleMentorshipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(res => setTimeout(res, 1500));
    setIsSubmitting(false);
    setMentorshipRequestSent(true);
    addToast('Mentorship request submitted!', 'success');
  };

  const openMentorshipModal = () => {
    if (!user) {
      navigate('/signin');
      return;
    }
    setMentorshipRequestSent(false);
    setShowMentorshipModal(true);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes('all') || category === 'all'
        ? [category]
        : prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevels(prev =>
      prev.includes('all') || level === 'all'
        ? [level]
        : prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const handleFeatureChange = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  // Filtering and Sorting Logic
  const filteredCourses = useMemo(() => {
    if (isLoading) return [];
    let courses = [...mockCourses];

    // Search
    if (searchQuery) {
      courses = courses.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category Filter
    if (!selectedCategories.includes('all')) {
        courses = courses.filter(c => selectedCategories.includes(c.category));
    }

    // Level Filter
    if (!selectedLevels.includes('all')) {
        courses = courses.filter(c => selectedLevels.includes(c.level));
    }

    // Feature Filter
    if (selectedFeatures.length > 0) {
        courses = courses.filter(c => selectedFeatures.every(sf => c.features.includes(sf)));
    }

    // Sorting
    switch (sortOrder) {
      case 'Newest':
        courses.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      case 'Highest Rated':
        courses.sort((a, b) => b.rating - a.rating);
        break;
      case 'Price: Low to High':
        courses.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        courses.sort((a, b) => b.price - a.price);
        break;
      case 'Most Popular':
      default:
        courses.sort((a, b) => b.students - a.students);
        break;
    }

    return courses;
  }, [searchQuery, sortOrder, selectedCategories, selectedLevels, selectedFeatures]);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 min-h-screen">
      <main className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-playfair font-bold text-white mb-2">Masterclass</h1>
              <p className="text-gray-300">Learn from industry experts and advance your career</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="glass-effect px-4 py-2 rounded-xl flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-white">{user ? user.loyaltyPoints : 0} points</span>
              </div>
              <div className="glass-effect px-4 py-2 rounded-xl flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-400" />
                <span className="text-white">7-day streak</span>
              </div>
            </div>
          </div>

          {/* Search and Controls Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search masterclasses, instructors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 glass-effect rounded-xl border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => setShowFilters(!showFilters)} className="flex items-center space-x-2 px-4 py-3 glass-effect rounded-xl border border-white/20 text-white hover:border-rose-400 transition-all">
                <Filter className="w-5 h-5" />
                <span>Filters</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-gray-900 focus:ring-2 focus:ring-rose-400"
              >
                {['Most Popular', 'Newest', 'Highest Rated', 'Price: Low to High', 'Price: High to Low'].map(o => <option key={o} value={o} className="bg-gray-800">{o}</option>)}
              </select>
              <div className="flex items-center space-x-2 glass-effect rounded-xl p-1">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-rose-500 text-white' : 'text-gray-400 hover:text-white'}`}>
                  <Grid className="w-5 h-5" />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-rose-500 text-white' : 'text-gray-400 hover:text-white'}`}>
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="glass-effect rounded-2xl p-6 mb-8 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-white font-medium mb-3">Category</label>
                  <select onChange={(e) => handleCategoryChange(e.target.value)} value={selectedCategories[0]} className="w-full px-4 py-2 glass-effect rounded-lg border border-white/20 text-white bg-gray-900 focus:ring-2 focus:ring-rose-400">
                    {categories.map(c => <option key={c} value={c} className="bg-gray-800">{formatCategoryName(c)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-white font-medium mb-3">Level</label>
                  <select onChange={(e) => handleLevelChange(e.target.value)} value={selectedLevels[0]} className="w-full px-4 py-2 glass-effect rounded-lg border border-white/20 text-white bg-gray-900 focus:ring-2 focus:ring-rose-400">
                    {['all', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'].map(l => <option key={l} value={l} className="bg-gray-800">{l === 'all' ? 'All' : l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-white font-medium mb-3">Features</label>
                  <div className="flex flex-wrap gap-2">
                    {['Live Sessions', 'Projects', 'Certification', 'Industry Connections', 'Portfolio Building'].map(f => (
                      <button key={f} onClick={() => handleFeatureChange(f)} className={`px-3 py-1 rounded-full text-sm transition-all ${selectedFeatures.includes(f) ? 'bg-rose-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white">
                  {filteredCourses.length} Masterclasses
                </h2>
                <p className="text-gray-400 text-sm">
                  Showing {filteredCourses.length} of {mockCourses.length} courses
                </p>
              </div>
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                {isLoading
                  ? Array.from({ length: 4 }).map((_, i) => <CourseCardSkeleton key={i} viewMode={viewMode} />)
                  : filteredCourses.length > 0
                    ? filteredCourses.map(course => <CourseCard key={course.id} course={course} viewMode={viewMode} />)
                    : (
                      <div className="lg:col-span-2 text-center py-16">
                        <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white">No Masterclasses Found</h3>
                        <p className="text-gray-400 mt-2">Try adjusting your search or filter criteria.</p>
                        <button onClick={() => { setSearchQuery(''); setSelectedCategories(['all']); setSelectedLevels(['all']); setSelectedFeatures([]); }} className="mt-4 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">
                          Clear Filters
                        </button>
                      </div>
                    )
                }
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 lg:col-span-1">
              {user && (
                <div className="glass-effect p-6 rounded-2xl">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center"><TrendingUp className="w-6 h-6 mr-2 text-green-400" />My Learning</h3>
                  <div className="space-y-4">
                    {mockCourses.filter(c => c.isEnrolled).slice(0, 3).map(course => (
                      <Link to={`/learn/${course.id}`} key={course.id} className="flex items-center space-x-3 p-3 -m-3 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                        <img src={course.thumbnail} alt={course.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="text-white font-medium line-clamp-1">{course.title}</p>
                          <p className="text-xs text-gray-400">{course.progress}% complete</p>
                          <div className="w-full bg-gray-700 rounded-full h-1 mt-1"><div className="bg-green-500 h-1 rounded-full" style={{ width: `${course.progress}%` }}></div></div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
               <div className="glass-effect p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center"><Video className="w-6 h-6 mr-2 text-rose-400" />Live Workshops</h3>
                <div className="space-y-4">
                  {mockWorkshops.map(ws => (
                    <div key={ws.id} className="border border-gray-700 rounded-lg p-4 hover:border-rose-400 transition-colors">
                      <div className="w-full aspect-video bg-gray-800 rounded-md mb-3" style={{backgroundImage: `url(${ws.thumbnail})`, backgroundSize: 'cover'}}></div>
                      <h4 className="font-semibold text-white mb-2">{ws.title}</h4>
                      {ws.isLive && (
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                          <span className="text-red-400 text-xs font-bold">LIVE NOW</span>
                        </div>
                      )}
                      <p className="text-sm text-gray-300">{ws.date} @ {ws.time}</p>
                      <div className="flex justify-between items-center mt-3">
                        <p className="text-sm text-gray-300">{ws.spotsLeft > 0 ? `${ws.spotsLeft} spots left` : 'Full'}</p>
                        <button className="px-3 py-1 bg-rose-500 text-white text-sm rounded-md hover:bg-rose-600 transition-colors">Register</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-effect p-6 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                <Award className="w-8 h-8 text-purple-300 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Mentorship Program</h3>
                <p className="text-gray-300 text-sm mb-4">Get 1-on-1 guidance from industry veterans.</p>
                <button onClick={openMentorshipModal} className="w-full py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">Apply for Mentorship</button>
              </div>

              <div className="glass-effect p-6 rounded-2xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30">
                <MessageCircle className="w-8 h-8 text-blue-300 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Join the Community</h3>
                <p className="text-gray-300 text-sm mb-4">Connect with peers, share your work, and get feedback.</p>
                <button className="w-full py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">Join Community</button>
              </div>

              {user && (
                <div className="glass-effect p-6 rounded-2xl">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center"><Trophy className="w-6 h-6 mr-2 text-yellow-400" />Achievements</h3>
                  <div className="space-y-4">
                    {mockAchievements.map(ach => (
                       <div key={ach.id} className="flex items-center space-x-4 p-3 -m-3 bg-white/5 rounded-lg">
                         <ach.icon className={`w-8 h-8 ${ach.color}`} />
                         <div>
                           <p className="font-semibold text-white">{ach.title}</p>
                           <p className="text-sm text-gray-400">{ach.description}</p>
                         </div>
                       </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>

      {/* Mentorship Modal */}
      {showMentorshipModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
          <div className="glass-effect p-8 rounded-2xl max-w-md w-full border border-white/20 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
            <button onClick={() => setShowMentorshipModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">&times;</button>
            {!mentorshipRequestSent ? (
              <form onSubmit={handleMentorshipSubmit}>
                <h3 className="text-2xl font-bold text-white mb-2">Request Mentorship</h3>
                <p className="text-gray-300 mb-6">Let us know what you're looking for.</p>
                <div className="space-y-4">
                  <select className="w-full px-4 py-2 glass-effect rounded-lg border border-white/20 text-white bg-gray-900 focus:ring-2 focus:ring-rose-400">
                    <option className="bg-gray-800">Career Advice</option>
                    <option className="bg-gray-800">Portfolio Review</option>
                    <option className="bg-gray-800">Technical Skills</option>
                    <option className="bg-gray-800">Business Strategy</option>
                  </select>
                  <textarea
                    className="w-full h-32 bg-transparent border border-gray-600 rounded-lg p-3 text-white resize-none focus:border-rose-400 outline-none"
                    placeholder="Tell us more about your goals..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            ) : (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Request Sent!</h3>
                <p className="text-gray-300 mb-6">We've received your request and will get back to you within 48 hours. Please note that mentorship is a premium feature.</p>
                <button onClick={() => setShowMentorshipModal(false)} className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">
                  Got it
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}