export interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Lesson {
  id: number;
  title: string;
  duration: string; // e.g., "12:35"
  isCompleted: boolean;
  isPreview: boolean;
  type: 'video' | 'quiz' | 'text';
}

export interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  instructor: string;
  instructorImage: string;
  instructorBio: string;
  category: string;
  duration: string; // e.g., "8h 30m"
  lessons: number;
  students: number;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  thumbnail: string;
  previewVideo: string;
  description: string;
  longDescription: string;
  features: string[];
  learningOutcomes: string[];
  requirements: string[];
  isEnrolled: boolean;
  progress: number;
  isBestseller: boolean;
  isNew: boolean;
  isBookmarked: boolean;
  language: string;
  lastUpdated: string;
  certificate: boolean;
  curriculum: Module[];
  reviews: Review[];
}

export interface Workshop {
  id: number;
  title: string;
  instructor: string;
  date: string;
  time: string;
  spotsLeft: number;
  price: number;
  isLive: boolean;
  thumbnail: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  icon: React.ElementType;
  color: string;
}