import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users, Ticket, Star, Filter, Search, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Events() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'coming-up', 'workshop', 'competition', 'networking', 'brunch', 'others'];

  const events = [
    {
      id: 1,
      title: 'Digital Marketing Summit 2025',
      category: 'workshop',
      date: '2025-11-15',
      time: '10:00 AM - 6:00 PM EAT',
      location: 'Virtual Event',
      organizer: 'Creative Arts Institute',
      image: 'https://images.pexels.com/photos/8345978/pexels-photo-8345978.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Join industry leaders for a full day of digital marketing insights, strategies, and networking.',
      price: 380000,
      capacity: 500,
      registered: 342,
      rating: 4.8,
      features: ['Live Sessions', 'Networking', 'Certificates', 'Recordings'],
      speakers: ['Sarah Johnson', 'Mike Chen', 'Emma Wilson'],
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Talent Showcase Competition',
      category: 'competition',
      date: '2025-11-20',
      time: '7:00 PM - 10:00 PM EAT',
      location: 'Kampala, Uganda',
      organizer: 'Creative Collective',
      image: 'https://images.pexels.com/photos/4904473/pexels-photo-4904473.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Showcase your talent and compete for amazing prizes. Open to all creative professionals.',
      price: 95000,
      capacity: 200,
      registered: 156,
      rating: 4.9,
      features: ['Live Judging', 'Prizes', 'Networking', 'Media Coverage'],
      speakers: ['Celebrity Judges Panel'],
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Business Networking',
      category: 'networking',
      date: '2025-11-25',
      time: '6:00 PM - 9:00 PM EAT',
      location: 'Kampala, Uganda',
      organizer: 'Business Professionals Alliance',
      image: 'https://images.pexels.com/photos/8345978/pexels-photo-8345978.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Connect with successful creatives and industry icons in a relaxed setting.',
      price: 285000,
      capacity: 100,
      registered: 89,
      rating: 4.7,
      features: ['Networking', 'Panel Discussion', 'Cocktails', 'Business Cards'],
      speakers: ['Dr. Maria Rodriguez', 'Jedi Martinez'],
      status: 'upcoming'
    },
    {
      id: 4,
      title: 'Brand Ambassador Masterclass',
      category: 'masterclass',
      date: '2025-10-28',
      time: '2:00 PM - 5:00 PM EAT',
      location: 'Virtual Event',
      organizer: 'Creative Arts Institute',
      image: 'https://images.pexels.com/photos/6285080/pexels-photo-6285080.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Learn the secrets of successful brand ambassadorship from industry experts.',
      price: 560000,
      capacity: 300,
      registered: 300,
      rating: 4.9,
      features: ['Interactive Sessions', 'Case Studies', 'Q&A', 'Certificate'],
      speakers: ['Ruby Nesda', 'Maya Chen'],
      status: 'past'
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesTab = activeTab === 'all' || event.status === activeTab;
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesCategory && matchesSearch;
  });

  const handleRegister = (eventId: number) => {
    if (!user) {
      alert('Please sign up or sign in to register for events.');
      navigate('/signin');
      return;
    }
    const event = events.find(e => e.id === eventId);
    if (event?.registered >= event?.capacity) {
      alert('Sorry, this event is fully booked!');
      return;
    }
    alert('Registration successful! You will receive a confirmation email shortly.');
  };

  const handleSubmitEvent = () => {
    if (!user) {
      alert('Please sign up or sign in to submit events.');
      navigate('/signin');
      return;
    }
    alert('Event submission feature coming soon! Contact our team for now.');
  };

  const tabs = [
    { id: 'upcoming', label: 'Upcoming Events' },
    { id: 'past', label: 'Past Events' },
    { id: 'all', label: 'All Events' }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-playfair font-bold text-white mb-2">Events</h1>
            <p className="text-gray-300">Discover and join amazing events in your industry</p>
          </div>
          
          <button
            onClick={handleSubmitEvent}
            className="px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all"
          >
            <Plus className="w-4 h-4 mr-2 inline" />
            Submit Event
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 glass-effect p-2 rounded-xl overflow-x-auto whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass-effect rounded-xl border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-gray-800">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredEvents.map((event) => (
            <div key={event.id} className="glass-effect rounded-2xl overflow-hidden hover-lift">
              {/* Event Image */}
              <div className="relative h-48 bg-gray-800">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-rose-500 text-white text-sm font-medium rounded-full">
                    {event.category.toUpperCase()}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-1 bg-black/50 px-2 py-1 rounded">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm">{event.rating}</span>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                    <p className="text-gray-200 text-sm">by {event.organizer}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">UGX --</div>
                    <div className="text-gray-200 text-sm">per ticket</div>
                  </div>
                </div>

                <p className="text-gray-200 text-sm mb-4 line-clamp-2">{event.description}</p>

                {/* Event Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-3 text-gray-200 text-sm">
                    <Calendar className="w-4 h-4 text-rose-400" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-200 text-sm">
                    <Clock className="w-4 h-4 text-rose-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-200 text-sm">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-200 text-sm">
                    <Users className="w-4 h-4 text-rose-400" />
                    <span>{event.registered}/{event.capacity} registered</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {event.features.map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-400/20 text-purple-300 text-xs rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Speakers */}
                <div className="mb-4">
                  <h4 className="text-white text-sm font-medium mb-2">Speakers</h4>
                  <div className="text-gray-300 text-sm">
                    {event.speakers.join(', ')}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Registration</span>
                    <span className="text-gray-300">{Math.round((event.registered / event.capacity) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-rose-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex space-x-3">
                  {event.status === 'upcoming' ? (
                    <>
                      <button
                        onClick={() => handleRegister(event.id)}
                        disabled={event.registered >= event.capacity}
                        className={`flex-1 py-3 font-semibold rounded-xl transition-all ${
                          event.registered >= event.capacity
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-rose-500 to-purple-600 text-white hover:shadow-xl'
                        }`}
                      >
                        {event.registered >= event.capacity ? (
                          <>
                            <Ticket className="w-4 h-4 mr-2 inline" />
                            Sold Out
                          </>
                        ) : (
                          <>
                            <Ticket className="w-4 h-4 mr-2 inline" />
                            Register Now
                          </>
                        )}
                      </button>
                      <button className="px-4 py-3 glass-effect text-gray-300 hover:text-white rounded-xl transition-colors">
                        <Calendar className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button className="flex-1 py-3 bg-gray-600 text-gray-400 font-semibold rounded-xl cursor-not-allowed">
                      Event Ended
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
            <p className="text-gray-400">Try adjusting your search criteria or check back later for new events.</p>
          </div>
        )}
      </div>
    </div>
  );
}
