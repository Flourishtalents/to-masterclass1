import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockCourses } from '../data/mock-data';
import {
  ChevronLeft, Menu, Play, Pause, Volume2, VolumeX, Maximize, Settings,
  ArrowLeft, ArrowRight, CheckCircle, XCircle, BookOpen, Edit, Trash2, Clock, MessageCircle
} from 'lucide-react';
import { Lesson, Module } from '../types';

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const CourseLearn = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = mockCourses.find(c => c.id === parseInt(id || ''));

  // Component State
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [sidebarTab, setSidebarTab] = useState('curriculum');

  // Notes State
  const [notes, setNotes] = useState<{ id: number, time: number, content: string }[]>([]);
  const [newNote, setNewNote] = useState("");
  const [editingNote, setEditingNote] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  // Quiz State
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Video Player State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  let controlTimeout: NodeJS.Timeout;

  useEffect(() => {
    if (course && course.curriculum.length > 0 && course.curriculum[0].lessons.length > 0) {
      setCurrentLesson(course.curriculum[0].lessons[0]);
    }
  }, [course]);

  // Video Player Handlers
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
        videoRef.current.currentTime = Number(e.target.value);
        setCurrentTime(Number(e.target.value));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if(videoRef.current) videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if(videoRef.current) videoRef.current.muted = !isMuted;
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if(videoRef.current) videoRef.current.playbackRate = rate;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlTimeout);
    controlTimeout = setTimeout(() => setShowControls(false), 3000);
  };

  // Notes Handlers
  const addNote = () => {
    if (newNote.trim() && videoRef.current) {
      const newNoteObject = {
        id: Date.now(),
        time: videoRef.current.currentTime,
        content: newNote,
      };
      setNotes([...notes, newNoteObject]);
      setNewNote("");
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const startEditNote = (note: { id: number, content: string }) => {
    setEditingNote(note.id);
    setEditContent(note.content);
  };

  const saveNote = (id: number) => {
    setNotes(notes.map(note => note.id === id ? { ...note, content: editContent } : note));
    setEditingNote(null);
    setEditContent("");
  };

  const jumpToTime = (time: number) => {
    if (videoRef.current) {
        videoRef.current.currentTime = time;
    }
  };

  // Quiz Handlers
  const quizQuestions = [
      { id: 1, question: "What does SEO stand for?", options: ["Search Engine Optimization", "Social Engine Optimization"], correctAnswer: 0 },
      { id: 2, question: "Which is an example of an on-page SEO factor?", options: ["Backlinks", "Meta Title"], correctAnswer: 1 }
  ];

  const handleQuizAnswer = (questionId: number, answerIndex: number) => {
    setQuizAnswers(prev => ({...prev, [questionId]: answerIndex}));
  };

  const submitQuiz = () => {
    let score = 0;
    quizQuestions.forEach(q => {
        if(quizAnswers[q.id] === q.correctAnswer) {
            score++;
        }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const retakeQuiz = () => {
      setQuizAnswers({});
      setQuizSubmitted(false);
      setQuizScore(0);
  };

  useEffect(() => {
    setShowQuiz(currentLesson?.type === 'quiz');
    setQuizSubmitted(false);
    setQuizAnswers({});
  }, [currentLesson]);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between z-10">
        <div className="flex items-center space-x-4">
          <Link to={`/course/${id}`} className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Course</span>
          </Link>
          <div className="h-6 w-px bg-gray-600" />
          <h1 className="text-white font-semibold">{course.title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-400">75% Complete</p>
          <div className="w-32 bg-gray-700 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }} />
          </div>
          <button onClick={() => setShowSidebar(!showSidebar)} className="p-2 text-gray-400 hover:text-white transition-colors lg:hidden">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 flex flex-col bg-black">
          {/* Video Player or Quiz */}
          {showQuiz ? (
            <div className="min-h-[60vh] bg-gray-800 p-8 flex-1 flex items-center justify-center">
              <div className="max-w-3xl w-full">
                {!quizSubmitted ? (
                  <>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">Module 2 Quiz</h2>
                      <p className="text-gray-400">Test your knowledge on SEO.</p>
                    </div>
                    <div className="space-y-8">
                      {quizQuestions.map((q, index) => (
                        <div key={q.id} className="glass-effect rounded-xl p-6">
                          <p className="text-lg font-semibold text-white mb-4">{index + 1}. {q.question}</p>
                          <div className="space-y-3">
                            {q.options.map((option, i) => (
                              <label key={i} className="flex items-center space-x-3 cursor-pointer">
                                <input type="radio" name={`q${q.id}`} onChange={() => handleQuizAnswer(q.id, i)} className="w-4 h-4 text-rose-500 bg-gray-700 border-gray-600 focus:ring-rose-500"/>
                                <span className="text-gray-300">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-8">
                      <button onClick={submitQuiz} disabled={Object.keys(quizAnswers).length !== quizQuestions.length} className="px-8 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        Submit Answers
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    {quizScore / quizQuestions.length >= 0.8 ? <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" /> : <XCircle className="w-20 h-20 text-red-400 mx-auto mb-4" />}
                    <h2 className="text-3xl font-bold text-white mb-2">You scored {quizScore} out of {quizQuestions.length}</h2>
                    <p className="text-gray-300 text-lg mb-8">{quizScore / quizQuestions.length >= 0.8 ? "Excellent work! You've mastered the concepts." : "Good effort! Review the lessons and try again."}</p>
                    <div className="flex justify-center space-x-4">
                      <button onClick={retakeQuiz} className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Retake Quiz</button>
                      <button className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">Next Lesson</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 relative bg-black" onMouseMove={handleMouseMove}>
              <video
                ref={videoRef}
                src={course.previewVideo}
                className="w-full h-full object-contain"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              />
              {showControls && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button onClick={togglePlay} className="p-4 bg-white/20 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm">
                      {isPlaying ? <Pause className="w-10 h-10 text-white" /> : <Play className="w-10 h-10 text-white" />}
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="w-full mb-2">
                           <input type="range" min="0" max={duration} value={currentTime} onChange={handleSeek} className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer range-sm"/>
                      </div>
                      <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                              <button onClick={togglePlay}>{isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}</button>
                              <div className="flex items-center space-x-2">
                                  <button onClick={toggleMute}>{isMuted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}</button>
                                  <input type="range" min="0" max="1" step="0.1" value={isMuted ? 0 : volume} onChange={handleVolumeChange} className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer range-sm"/>
                              </div>
                              <p className="text-white text-sm">{formatTime(currentTime)} / {formatTime(duration)}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                              <select value={playbackRate} onChange={(e) => handlePlaybackRateChange(Number(e.target.value))} className="bg-transparent text-white text-sm border-none outline-none">
                                  <option value="0.5">0.5x</option><option value="1">1x</option><option value="1.5">1.5x</option><option value="2">2x</option>
                              </select>
                              <button><Settings className="w-6 h-6 text-white" /></button>
                              <button><Maximize className="w-6 h-6 text-white" /></button>
                          </div>
                      </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Lesson Information Bar */}
          <div className="bg-gray-800 p-6 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white mb-1">{currentLesson?.title}</h2>
                <p className="text-gray-400">Module 1: Introduction</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50" disabled>
                  <ArrowLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Mark as Complete</button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className={`w-80 bg-gray-800 border-l border-gray-700 flex-col ${showSidebar ? 'flex' : 'hidden'} lg:flex`}>
          <div className="flex border-b border-gray-700">
            {['curriculum', 'notes', 'discussion'].map(tab => (
              <button
                key={tab}
                onClick={() => setSidebarTab(tab)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors capitalize ${
                  sidebarTab === tab
                    ? 'text-rose-400 border-b-2 border-rose-400 bg-white/5'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'curriculum' && <BookOpen className="w-4 h-4" />}
                {tab === 'notes' && <Edit className="w-4 h-4" />}
                {tab === 'discussion' && <MessageCircle className="w-4 h-4" />}
                <span>{tab}</span>
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {sidebarTab === 'curriculum' && (
              <div className="space-y-4">
                {course.curriculum.map(module => (
                  <div key={module.id}>
                    <h4 className="font-semibold text-white mb-3">{module.title}</h4>
                    <div className="space-y-2">
                        {module.lessons.map(lesson => (
                            <button key={lesson.id} onClick={() => setCurrentLesson(lesson)} className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${currentLesson?.id === lesson.id ? 'bg-rose-500/20 text-rose-300' : 'hover:bg-white/5'}`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${lesson.isCompleted ? 'bg-green-500 text-white' : 'bg-gray-700'}`}>
                                    {lesson.isCompleted ? <CheckCircle className="w-4 h-4"/> : lesson.id}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{lesson.title}</p>
                                    <p className="text-xs text-gray-400">{lesson.duration}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {sidebarTab === 'notes' && (
              <div className="p-2">
                <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2 text-sm text-gray-300">
                        <Clock className="w-4 h-4"/>
                        <span>Add note at {formatTime(currentTime)}</span>
                    </div>
                    <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Start typing..." className="w-full h-20 bg-gray-700 border border-gray-600 rounded-lg p-3 text-white text-sm resize-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"></textarea>
                    <button onClick={addNote} className="mt-2 w-full py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">Add Note</button>
                </div>
                <div className="space-y-4">
                    {notes.map(note => (
                        <div key={note.id} className="bg-gray-700 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <button onClick={() => jumpToTime(note.time)} className="text-sm text-rose-400 font-semibold hover:underline">
                                    {formatTime(note.time)}
                                </button>
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => startEditNote(note)}><Edit className="w-4 h-4 text-gray-400 hover:text-white"/></button>
                                    <button onClick={() => deleteNote(note.id)}><Trash2 className="w-4 h-4 text-gray-400 hover:text-white"/></button>
                                </div>
                            </div>
                            {editingNote === note.id ? (
                                <div>
                                    <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} className="w-full h-20 bg-gray-600 border border-gray-500 rounded-lg p-2 text-white text-sm"></textarea>
                                    <div className="flex justify-end space-x-2 mt-2">
                                        <button onClick={() => setEditingNote(null)} className="px-2 py-1 text-xs bg-gray-500 rounded">Cancel</button>
                                        <button onClick={() => saveNote(note.id)} className="px-2 py-1 text-xs bg-rose-500 rounded">Save</button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-300">{note.content}</p>
                            )}
                        </div>
                    ))}
                </div>
              </div>
            )}
            {sidebarTab === 'discussion' && (
               <div className="p-4 text-center">
                    <MessageCircle className="w-12 h-12 text-gray-500 mx-auto mb-4"/>
                    <h4 className="text-lg font-semibold text-white">Join the Conversation</h4>
                    <p className="text-gray-400 text-sm mb-4">Share your thoughts, ask questions, and connect with other learners in this course.</p>
                    <button className="w-full py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">
                        Go to Discussion Board
                    </button>
                </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseLearn;