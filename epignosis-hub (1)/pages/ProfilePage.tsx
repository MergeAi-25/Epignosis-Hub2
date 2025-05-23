
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import type { UserData, Quiz, UserQuizProgress } from '../types';
import { getUserDataService, getQuizzes, updateUserQuizProgress } from '../services/dataService'; 
import LoadingSpinner from '../components/LoadingSpinner';
import { UserCircleIcon, Cog6ToothIcon, QuestionMarkCircleIcon, SparklesIcon } from '../components/icons';
// fix: Removed LOCAL_STORAGE_API_KEY, GEMINI_API_KEY_PROMPT_MESSAGE imports
// fix: Add ROUTES import
import { ROUTES } from '../constants';


const ProgressBar: React.FC<{ value: number; max: number; label?: string }> = ({ value, max, label }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="mb-2">
      {label && <p className="text-sm text-slate-600 mb-1">{label} ({value}/{max})</p>}
      <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div 
          className="bg-ep-primary h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};


const ProfilePage: React.FC = () => {
  const { currentUser, logout, login } = useUser(); 
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'dashboard';

  const [userData, setUserData] = useState<UserData | null>(null);
  const [allQuizzes, setAllQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [nameInput, setNameInput] = useState(currentUser?.name || '');
  const [emailInput, setEmailInput] = useState(currentUser?.email || '');
  // fix: Removed geminiApiKey state
  const [settingsMessage, setSettingsMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);


  useEffect(() => {
    if (currentUser) {
      setNameInput(currentUser.name);
      setEmailInput(currentUser.email);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) {
        setIsLoading(false);
        navigate('/'); 
        return;
      }
      try {
        setIsLoading(true);
        setError(null);
        const data = getUserDataService(currentUser.id);
        setUserData(data);
        const quizzes = await getQuizzes();
        setAllQuizzes(quizzes);
      } catch (err) {
        setError("Failed to load profile data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentUser, navigate]);

  const handleTabChange = (tab: 'dashboard' | 'settings') => {
    setSearchParams({ tab });
  };

  const handleSettingsSave = () => {
    if (!currentUser) return;
    
    login(nameInput, emailInput); 
    
    // fix: Removed Gemini API Key saving logic from here
    
    setSettingsMessage({type: 'success', text: 'Settings saved successfully!'});
    setTimeout(() => setSettingsMessage(null), 3000);
  };
  
  const handleResetQuizProgress = (quizId: string) => {
    if (!currentUser || !userData) return;
    
    const updatedProgress = { ...userData.quizProgress };
    if (updatedProgress[quizId]) {
        const initialProgress: UserQuizProgress = {
            score: 0,
            completed: false,
            currentQuestionIndex: 0,
            answers: {}
        };
        updateUserQuizProgress(currentUser.id, quizId, initialProgress);
        
        setUserData(prev => ({
            ...prev!,
            quizProgress: {
                ...prev!.quizProgress,
                [quizId]: initialProgress
            }
        }));
        setSettingsMessage({type: 'success', text: `Progress for quiz ${allQuizzes.find(q=>q.id===quizId)?.title || ''} reset.`});
    } else {
        setSettingsMessage({type: 'error', text: 'Quiz progress not found.'});
    }
    setTimeout(() => setSettingsMessage(null), 3000);
  };


  if (isLoading) return <LoadingSpinner message="Loading profile..." />;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!currentUser) return null; 

  const completedQuizzes = allQuizzes.filter(q => userData?.quizProgress[q.id]?.completed);
  const inProgressQuizzes = allQuizzes.filter(q => 
    userData?.quizProgress[q.id] && 
    !userData.quizProgress[q.id].completed &&
    userData.quizProgress[q.id].currentQuestionIndex > 0
  );


  const DashboardView = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-ep-dark-text mb-4">Your Progress</h2>
        {allQuizzes.length === 0 && <p className="text-slate-500">No quizzes available yet to track progress.</p>}
        
        {completedQuizzes.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-medium text-slate-700 mb-3">Completed Quizzes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedQuizzes.map(quiz => {
              const progress = userData?.quizProgress[quiz.id];
              if (!progress) return null;
              return (
                <div key={quiz.id} className="bg-green-50 p-4 rounded-lg border border-green-200 shadow">
                  <p className="font-semibold text-green-700">{quiz.title}</p>
                  <ProgressBar value={progress.score} max={quiz.questions.length} label={`Score`} />
                   <button 
                        onClick={() => handleResetQuizProgress(quiz.id)}
                        className="text-xs text-red-500 hover:text-red-700 underline mt-1"
                    >
                        Reset Progress
                    </button>
                </div>
              );
            })}
            </div>
          </div>
        )}

        {inProgressQuizzes.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-medium text-slate-700 mb-3">Quizzes In Progress</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inProgressQuizzes.map(quiz => {
              const progress = userData?.quizProgress[quiz.id];
              if (!progress) return null;
              return (
                <div key={quiz.id} className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 shadow">
                  <p className="font-semibold text-yellow-700">{quiz.title}</p>
                  <ProgressBar value={progress.currentQuestionIndex} max={quiz.questions.length} label={`Progress`} />
                  <p className="text-xs text-slate-500">Score so far: {progress.score}</p>
                   <button 
                        onClick={() => handleResetQuizProgress(quiz.id)}
                        className="text-xs text-red-500 hover:text-red-700 underline mt-1"
                    >
                        Reset Progress
                    </button>
                </div>
              );
            })}
            </div>
          </div>
        )}

        {(completedQuizzes.length === 0 && inProgressQuizzes.length === 0 && allQuizzes.length > 0) && (
             // fix: Corrected usage of ROUTES
            <p className="text-slate-500">You haven't started any quizzes yet. <a href={`#${ROUTES.QUIZZES}`} className="text-ep-primary underline">Explore quizzes</a>.</p>
        )}
      </div>
    </div>
  );

  const SettingsView = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-ep-dark-text mb-1">Profile Information</h2>
        <p className="text-sm text-slate-500 mb-4">Update your name and email address.</p>
        <div className="space-y-4 max-w-md">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
            <input type="text" name="name" id="name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-ep-primary focus:border-ep-primary sm:text-sm" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
            <input type="email" name="email" id="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-ep-primary focus:border-ep-primary sm:text-sm" />
          </div>
        </div>
      </div>

      {/* fix: Removed AI Chatbot API Key settings section */}
      
      <div className="border-t pt-6">
        <h2 className="text-2xl font-semibold text-ep-dark-text mb-1">Data Management</h2>
        <p className="text-sm text-slate-500 mb-4">Manage your quiz progress data.</p>
         {allQuizzes.filter(q => userData?.quizProgress[q.id]).length > 0 ? (
            allQuizzes.filter(q => userData?.quizProgress[q.id]).map(quiz => (
                <div key={quiz.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-md mb-2 border">
                    <p className="text-sm text-slate-700">{quiz.title}</p>
                    <button 
                        onClick={() => handleResetQuizProgress(quiz.id)}
                        className="text-xs bg-red-100 text-red-600 hover:bg-red-200 px-2 py-1 rounded-md"
                    >
                        Reset Progress
                    </button>
                </div>
            ))
         ) : (
            <p className="text-sm text-slate-500">No quiz progress to reset.</p>
         )}
      </div>

      {settingsMessage && (
        <div className={`p-3 rounded-md text-sm ${settingsMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {settingsMessage.text}
        </div>
      )}
      <button 
        onClick={handleSettingsSave}
        className="mt-6 px-6 py-2 bg-ep-primary text-white font-medium rounded-md hover:bg-sky-700 transition-colors"
      >
        Save Settings
      </button>
    </div>
  );


  return (
    <div className="container mx-auto py-8 px-4 animate-fadeIn">
      <div className="flex items-center mb-8">
        <UserCircleIcon className="w-12 h-12 text-ep-primary mr-4" />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-ep-dark-text">{currentUser.name}'s Profile</h1>
          <p className="text-slate-600">{currentUser.email}</p>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl">
        <div className="mb-6 border-b border-slate-200">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            <button
              onClick={() => handleTabChange('dashboard')}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard' 
                ? 'border-ep-primary text-ep-primary' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <UserCircleIcon className="w-5 h-5 mr-2 inline-block align-text-bottom" /> Dashboard
            </button>
            <button
              onClick={() => handleTabChange('settings')}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings' 
                ? 'border-ep-primary text-ep-primary' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <Cog6ToothIcon className="w-5 h-5 mr-2 inline-block align-text-bottom" /> Settings
            </button>
          </nav>
        </div>

        {activeTab === 'dashboard' ? <DashboardView /> : <SettingsView />}
        
         <div className="mt-10 pt-6 border-t border-slate-200">
            <button
                // fix: Corrected usage of ROUTES
                onClick={() => { logout(); navigate(ROUTES.HOME); }}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
                Logout
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
