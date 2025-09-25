import { Course, Workshop, Achievement } from '../types';
import { Award, CheckCircle, Video, Download, FileText, Trophy, Target } from 'lucide-react';

export const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Dr. Evelyn Reed Teaches Scientific Communication',
    instructor: 'Dr. Evelyn Reed',
    instructorImage: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    instructorBio: 'Dr. Evelyn Reed, a Nobel laureate in Physiology, is renowned for her ability to distill complex scientific concepts into compelling narratives. Her work has been published in leading journals, and she has advised governments on science policy.',
    category: 'professional-development',
    duration: '2h 45m',
    lessons: 18,
    students: 15230,
    rating: 4.9,
    reviewCount: 3120,
    price: 900000,
    originalPrice: 1200000,
    level: 'All Levels',
    thumbnail: 'https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    previewVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Learn to communicate complex scientific ideas with clarity, impact, and influence.',
    longDescription: 'In a world driven by data and discovery, the ability to communicate scientific findings is more critical than ever. Dr. Evelyn Reed teaches you how to craft compelling presentations, write impactful papers, and engage any audience, from fellow scientists to the general public. Learn her framework for storytelling, data visualization, and ethical communication.',
    features: ['Peer-Reviewed Assignments', 'Grant Proposal Writing', 'Public Speaking', 'Data Visualization'],
    learningOutcomes: [
      'Structure a compelling scientific narrative.',
      'Design clear and impactful data visualizations.',
      'Master the art of the scientific presentation.',
      'Write and edit research papers for top-tier journals.',
      'Navigate the peer-review process effectively.',
      'Communicate with media and the public confidently.'
    ],
    requirements: [
      'A passion for science and discovery.',
      'Basic understanding of research principles.',
      'No advanced degree required.'
    ],
    isEnrolled: true,
    progress: 75,
    isBestseller: true,
    isNew: false,
    isBookmarked: true,
    language: 'English',
    lastUpdated: 'October 2025',
    certificate: true,
    curriculum: [
        {
            id: 1, title: 'The Foundation of Scientific Storytelling', lessons: [
                { id: 1, title: 'Meet Your Instructor', duration: '03:15', isCompleted: true, isPreview: true, type: 'video' },
                { id: 2, title: 'Why Scientific Communication Matters', duration: '12:30', isCompleted: true, isPreview: false, type: 'video' },
                { id: 3, title: 'The Audience and the Narrative', duration: '18:50', isCompleted: true, isPreview: false, type: 'video' },
            ]
        },
        {
            id: 2, title: 'Writing with Clarity and Impact', lessons: [
                { id: 4, title: 'Structuring Your Manuscript', duration: '22:10', isCompleted: true, isPreview: false, type: 'video' },
                { id: 5, title: 'The Art of the Abstract', duration: '15:00', isCompleted: true, isPreview: false, type: 'video' },
                { id: 6, title: 'Editing: From Jargon to Journalism', duration: '25:45', isCompleted: false, isPreview: false, type: 'video' },
            ]
        },
        {
            id: 3, title: 'Visualizing Your Data', lessons: [
                { id: 7, title: 'Principles of Effective Data Visualization', duration: '20:00', isCompleted: false, isPreview: false, type: 'video' },
                { id: 8, title: 'Choosing the Right Chart', duration: '18:20', isCompleted: false, isPreview: false, type: 'video' },
                { id: 9, title: 'Module 3 Quiz', duration: '10:00', isCompleted: false, isPreview: false, type: 'quiz' },
            ]
        },
    ],
    reviews: [
        { id: 1, author: 'Dr. Kenji Tanaka', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', rating: 5, date: 'Oct 15, 2025', comment: 'Game-changing insights. This course is a must for any researcher.' },
        { id: 2, author: 'Maria Garcia', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', rating: 5, date: 'Oct 12, 2025', comment: 'Dr. Reed explains complex ideas with such grace. I feel much more confident in my writing.' },
    ],
  },
  {
    id: 2,
    title: 'Javier "El Maestro" Torres Teaches Culinary Arts',
    instructor: 'Javier Torres',
    instructorImage: 'https://images.pexels.com/photos/598917/pexels-photo-598917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    instructorBio: 'Javier "El Maestro" Torres, a Michelin-starred chef, is a pioneer of modern Latin cuisine. His restaurants have been awarded three Michelin stars, and he is a celebrated author and television personality.',
    category: 'personal-development',
    duration: '4h 15m',
    lessons: 22,
    students: 25890,
    rating: 4.9,
    reviewCount: 4500,
    price: 900000,
    originalPrice: 900000,
    level: 'Beginner',
    thumbnail: 'https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    previewVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Master foundational cooking techniques and learn to create extraordinary dishes from simple ingredients.',
    longDescription: 'Cooking is a language of love, and Chef Javier Torres teaches you to speak it fluently. In his first-ever online class, "El Maestro" demystifies the techniques that have earned him three Michelin stars. Learn everything from essential knife skills and sauce making to the art of plating. This is more than a cooking class; it’s a philosophy of food.',
    features: ['Knife Skills', 'Sauce Making', 'Plating', 'Ingredient Sourcing'],
    learningOutcomes: [
        'Master essential knife skills for speed and precision.',
        'Create foundational French and Latin sauces from scratch.',
        'Understand the principles of flavor balancing.',
        'Learn professional plating techniques to elevate any dish.',
        'Develop an intuition for seasoning and ingredient pairing.'
    ],
    requirements: [
        'A kitchen and a love for food.',
        'Basic cooking utensils.',
    ],
    isEnrolled: false,
    progress: 0,
    isBestseller: true,
    isNew: false,
    isBookmarked: false,
    language: 'English',
    lastUpdated: 'September 2025',
    certificate: true,
    curriculum: [],
    reviews: [],
  },
  {
    id: 3,
    title: 'Elena Petrova Teaches Strategic Negotiation',
    instructor: 'Elena Petrova',
    instructorImage: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    instructorBio: 'Elena Petrova is a former FBI hostage negotiator and CEO of a top consulting firm. She has successfully negotiated multi-billion dollar deals and resolved high-stakes international conflicts.',
    category: 'business-development',
    duration: '2h 10m',
    lessons: 15,
    students: 18400,
    rating: 4.8,
    reviewCount: 2800,
    price: 900000,
    originalPrice: 900000,
    level: 'Intermediate',
    thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    previewVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Learn the art of negotiation from a world-class expert and get more of what you want in life.',
    longDescription: 'Negotiation is part of our daily lives, from the boardroom to the dinner table. Elena Petrova teaches you her battle-tested strategies for high-stakes negotiation. Learn how to read body language, deploy tactical empathy, and master the art of persuasion. This class will change the way you communicate.',
    features: ['Live Mock Negotiations', 'Tactical Empathy', 'Body Language', 'Conflict Resolution'],
    learningOutcomes: [
        'Master the principles of tactical empathy.',
        'Learn to read and influence your counterpart.',
        'Develop strategies for salary and deal negotiations.',
        'Diffuse conflict and build rapport.',
        'Gain confidence in high-pressure situations.'
    ],
    requirements: [
        'A desire to improve your communication skills.',
    ],
    isEnrolled: true,
    progress: 25,
    isBestseller: false,
    isNew: true,
    isBookmarked: true,
    language: 'English',
    lastUpdated: 'November 2025',
    certificate: true,
    curriculum: [],
    reviews: [],
  },
];

export const mockWorkshops: Workshop[] = [
  {
    id: 1,
    title: 'Live Case Study: The Art of the Pitch',
    instructor: 'Elena Petrova',
    date: 'November 15, 2025',
    time: '2:00 PM EAT',
    spotsLeft: 8,
    price: 250000,
    isLive: true,
    thumbnail: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    title: 'Seasonal Cooking: Autumn Harvest',
    instructor: 'Javier "El Maestro" Torres',
    date: 'November 20, 2025',
    time: '10:00 AM EAT',
    spotsLeft: 12,
    price: 350000,
    isLive: false,
    thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
];

export const mockAchievements: Achievement[] = [
    {
        id: 1,
        title: 'Perfect Score',
        description: 'Aced the "Visualizing Your Data" quiz.',
        date: 'Oct 2025',
        icon: CheckCircle,
        color: 'text-green-400'
    },
    {
        id: 2,
        title: 'Power Negotiator',
        description: 'Completed Strategic Negotiation.',
        date: 'Sep 2025',
        icon: Award,
        color: 'text-yellow-400'
    },
    {
        id: 3,
        title: 'Learning Streak: 14 Days',
        description: 'You\'re on a roll!',
        date: 'Active',
        icon: Target,
        color: 'text-rose-400'
    }
];

export const categories = [
    'all', 'digital-marketing', 'brand-ambassador-roles', 'media-communications',
    'modelling', 'acting', 'literary-culture', 'film-&-video-production',
    'audio-production', 'music', 'dance', 'event-management',
    'marketing-&-advertising', 'AI-research-&-innovation', 'business-development',
    'professional-development', 'personal-development'
];