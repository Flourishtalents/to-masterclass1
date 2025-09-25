import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockCourses } from '../data/mock-data';
import {
  ArrowLeft, Award, BookOpen, Calendar, CheckCircle, ChevronRight, Clock, Download, Eye, FileText, Globe, Heart,
  Play, Share2, Star, Users, Video, Trophy
} from 'lucide-react';

const CourseDetail = () => {
  const { id } = useParams();
  const course = mockCourses.find(c => c.id === parseInt(id || ''));
  const [activeTab, setActiveTab] = useState('overview');
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Course not found.</p>
      </div>
    );
  }

  const {
    title, instructor, instructorImage, rating, reviewCount, students, duration,
    lessons, language, lastUpdated, level, isBestseller, thumbnail, previewVideo,
    features, learningOutcomes, requirements, longDescription, curriculum, reviews,
    price, originalPrice
  } = course;

  const savings = originalPrice - price;

  const featureIcons = {
      "Video": { icon: Video, color: "text-blue-400" },
      "Download": { icon: Download, color: "text-green-400" },
      "FileText": { icon: FileText, color: "text-purple-400" },
      "Trophy": { icon: Trophy, color: "text-yellow-400" }
  };

  const courseFeatures = [
      { label: "Video lessons", value: `${lessons}`, icon: "Video" },
      { label: "Resources", value: `${features.length}`, icon: "Download" },
      { label: "Articles", value: `${learningOutcomes.length}`, icon: "FileText" },
      { label: "Certificate", value: "Yes", icon: "Trophy" }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb & Back Button */}
        <div className="flex items-center justify-between mb-6">
          <nav className="flex items-center space-x-2 text-gray-400">
            <Link to="/masterclass" className="hover:text-white transition-colors">Masterclass</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{title}</span>
          </nav>
          <Link to="/masterclass" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Masterclasses</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="glass-effect rounded-2xl p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    {isBestseller && (
                      <span className="px-3 py-1 bg-yellow-500 text-black text-sm font-bold rounded-full">Bestseller</span>
                    )}
                    <span className="px-3 py-1 bg-rose-400/20 text-rose-300 text-sm rounded-full">{level}</span>
                  </div>
                  <h1 className="text-3xl font-playfair font-bold text-white mb-4">{title}</h1>
                  <p className="text-gray-300 text-lg mb-6">{course.description}</p>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6">
                    <div className="flex items-center space-x-2">
                      <img src={instructorImage} alt={instructor} className="w-8 h-8 rounded-full" />
                      <span className="text-white font-medium">{instructor}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="text-white font-bold">{rating}</span>
                      <span className="text-gray-400">({reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Users className="w-5 h-5" />
                      <span>{students} students</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-300">
                    <div className="flex items-center space-x-2"><Clock className="w-4 h-4" /><span>{duration}</span></div>
                    <div className="flex items-center space-x-2"><BookOpen className="w-4 h-4" /><span>{lessons} lessons</span></div>
                    <div className="flex items-center space-x-2"><Globe className="w-4 h-4" /><span>{language}</span></div>
                    <div className="flex items-center space-x-2"><Calendar className="w-4 h-4" /><span>Last updated {lastUpdated}</span></div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 ml-6">
                  <button onClick={() => setIsWishlisted(!isWishlisted)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                    <Heart className={`w-6 h-6 transition-all ${isWishlisted ? 'text-rose-500 fill-current' : 'text-white'}`} />
                  </button>
                  <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                    <Share2 className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Course Preview Video */}
            <div className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden mb-8 group">
                <img src={thumbnail} alt="Course Thumbnail" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <button className="p-4 bg-white/20 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm">
                        <Play className="w-10 h-10 text-white fill-white" />
                    </button>
                </div>
                <span className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 text-white text-sm rounded">Preview this course</span>
            </div>

            {/* Course Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {courseFeatures.map(feature => {
                    const IconComponent = featureIcons[feature.icon as keyof typeof featureIcons].icon;
                    const color = featureIcons[feature.icon as keyof typeof featureIcons].color;
                    return (
                        <div key={feature.label} className="text-center p-4 bg-white/5 rounded-lg">
                            <IconComponent className={`w-6 h-6 mx-auto mb-2 ${color}`} />
                            <p className="text-white font-medium text-sm">{feature.value}</p>
                            <p className="text-gray-400 text-xs">{feature.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Tabbed Navigation */}
            <div className="glass-effect rounded-2xl overflow-hidden">
              <div className="flex border-b border-white/10">
                {['overview', 'curriculum', 'instructor', 'reviews'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 font-medium transition-all capitalize ${
                      activeTab === tab
                        ? 'text-rose-400 border-b-2 border-rose-400 bg-white/5'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-8">
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">About This Course</h3>
                      <p className="text-gray-300 whitespace-pre-line">{longDescription}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">What You'll Learn</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {learningOutcomes.map((outcome, i) => (
                          <div key={i} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <span className="text-gray-300">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                     <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Features</h3>
                        <div className="flex flex-wrap gap-3">
                            {features.map(f => <div key={f} className="px-4 py-2 bg-purple-400/20 text-purple-300 rounded-lg">{f}</div>)}
                        </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Requirements</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-300">
                        {requirements.map((req, i) => <li key={i}>{req}</li>)}
                      </ul>
                    </div>
                  </div>
                )}
                {activeTab === 'curriculum' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-white">Course Content</h3>
                        <p className="text-gray-400 text-sm">{curriculum.length} modules • {lessons} lessons • {duration} total length</p>
                    </div>
                    <div className="space-y-4">
                        {curriculum.map(module => (
                            <div key={module.id} className="border border-gray-700 rounded-lg overflow-hidden">
                                <div className="w-full flex items-center justify-between p-4 bg-white/5">
                                    <h4 className="font-semibold text-white">{module.title}</h4>
                                    <p className="text-sm text-gray-400">{module.lessons.length} lessons</p>
                                </div>
                                <div className="border-t border-gray-700">
                                    {module.lessons.map(lesson => (
                                        <div key={lesson.id} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-gray-800 last:border-b-0">
                                            <div className="flex items-center space-x-3">
                                                <Play className="w-5 h-5 text-gray-400" />
                                                <span className="text-gray-300">{lesson.title}</span>
                                                {lesson.isPreview && <span className="px-2 py-0.5 bg-blue-400/20 text-blue-300 text-xs rounded-full">Preview</span>}
                                            </div>
                                            <span className="text-sm text-gray-400">{lesson.duration}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                  </div>
                )}
                 {activeTab === 'instructor' && (
                    <div className="space-y-6">
                        <div className="flex items-start space-x-6">
                            <img src={instructorImage} alt={instructor} className="w-24 h-24 rounded-full object-cover" />
                            <div>
                                <h3 className="text-2xl font-bold text-white">{instructor}</h3>
                                <p className="text-gray-400 mb-4">Lead Instructor</p>
                                <p className="text-gray-300">{course.instructorBio}</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'reviews' && (
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-6">Student Reviews</h3>
                        <div className="space-y-6">
                            {reviews.map(review => (
                                <div key={review.id} className="border-b border-gray-700 pb-6 last:border-b-0">
                                    <div className="flex items-start space-x-4">
                                        <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full object-cover" />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold text-white">{review.author}</p>
                                                    <p className="text-sm text-gray-400">{review.date}</p>
                                                </div>
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />)}
                                                </div>
                                            </div>
                                            <p className="text-gray-300 mt-2">{review.comment}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="glass-effect rounded-2xl p-6 sticky top-24">
              <div className="aspect-video bg-gray-800 rounded-lg mb-4 relative overflow-hidden group">
                <img src={thumbnail} alt="Course thumbnail" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-12 h-12 text-white fill-white" />
                </div>
              </div>
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-white">UGX {price.toLocaleString()}</p>
                {originalPrice > price && (
                  <div className="flex items-center justify-center space-x-2">
                    <p className="text-lg text-gray-400 line-through">UGX {originalPrice.toLocaleString()}</p>
                    <p className="text-green-400 font-semibold">Save {Math.round((savings/originalPrice)*100)}%</p>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                 <Link to={`/learn/${course.id}`} className="block w-full text-center px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                    {course.isEnrolled ? 'Continue Learning' : 'Enroll Now'}
                 </Link>
                 <button onClick={() => setIsWishlisted(!isWishlisted)} className="w-full px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors">
                    {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                 </button>
              </div>
              <div className="space-y-3 text-sm text-gray-300 mt-6 pt-6 border-t border-white/10">
                <p className="flex justify-between"><span>Duration</span><span className="font-medium text-white">{duration}</span></p>
                <p className="flex justify-between"><span>Lessons</span><span className="font-medium text-white">{lessons}</span></p>
                <p className="flex justify-between"><span>Skill Level</span><span className="font-medium text-white">{level}</span></p>
                <p className="flex justify-between"><span>Language</span><span className="font-medium text-white">{language}</span></p>
                <p className="flex justify-between"><span>Certificate</span><span className="font-medium text-white">{course.certificate ? 'Yes' : 'No'}</span></p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;