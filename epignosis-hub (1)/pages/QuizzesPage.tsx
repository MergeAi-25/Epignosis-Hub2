
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Quiz, UserData } from '../types';
import { QuizLevel } from '../types';
import { getQuizzes, getUserDataService } from '../services/dataService';
import LoadingSpinner from '../components/LoadingSpinner';
import { QuestionMarkCircleIcon, ArrowRightIcon, CheckCircleIcon } from '../components/icons';
import { ROUTES } from '../constants';
import { useUser } from '../contexts/UserContext';

interface QuizCardProps {
  quiz: Quiz;
  progress?: { score: number; completed: boolean };
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, progress }) => {
  let levelColor = 'bg-green-100 text-green-700';
  if (quiz.level === QuizLevel.Intermediate) levelColor = 'bg-yellow-100 text-yellow-700';
  if (quiz.level === QuizLevel.Advanced) levelColor = 'bg-red-100 text-red-700';

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {quiz.imageUrl && <img src={quiz.imageUrl} alt={quiz.title} className="w-full h-40 object-cover"/>}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-ep-dark-text group-hover:text-ep-primary transition-colors">{quiz.title}</h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${levelColor}`}>{quiz.level}</span>
        </div>
        <p className="text-sm text-slate-600 mb-3 flex-grow">{quiz.description}</p>
        <p className="text-xs text-slate-500 mb-4">{quiz.questions.length} questions</p>
        {progress && progress.completed && (
          <div className="flex items-center text-green-600 mb-3 text-sm">
            <CheckCircleIcon className="w-5 h-5 mr-1" />
            Completed! Score: {progress.score}/{quiz.questions.length}
          </div>
        )}
        <Link 
          to={`${ROUTES.QUIZZES}/${quiz.id}`} 
          className="mt-auto inline-flex items-center justify-center text-white bg-ep-primary hover:bg-sky-700 font-medium py-2 px-4 rounded-md group transition-colors"
        >
          {progress && progress.completed ? 'Review Quiz' : (progress && progress.score > 0 ? 'Continue Quiz' : 'Start Quiz')}
          <ArrowRightIcon className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

const QuizzesPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchQuizzesAndUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedQuizzes = await getQuizzes();
        setQuizzes(fetchedQuizzes);
        if (currentUser) {
          const data = getUserDataService(currentUser.id);
          setUserData(data);
        }
      } catch (err) {
        setError('Failed to load quizzes. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuizzesAndUserData();
  }, [currentUser]);

  if (isLoading) {
    return <LoadingSpinner message="Loading quizzes..." />;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  const getQuizProgress = (quizId: string) => {
    if (!userData || !userData.quizProgress[quizId]) return undefined;
    const progress = userData.quizProgress[quizId];
    return { score: progress.score, completed: progress.completed };
  }

  const quizzesByLevel: { [key in QuizLevel]: Quiz[] } = {
    [QuizLevel.Beginner]: quizzes.filter(q => q.level === QuizLevel.Beginner),
    [QuizLevel.Intermediate]: quizzes.filter(q => q.level === QuizLevel.Intermediate),
    [QuizLevel.Advanced]: quizzes.filter(q => q.level === QuizLevel.Advanced),
  };


  return (
    <div className="container mx-auto py-8 px-4 animate-fadeIn">
      <div className="flex items-center mb-8">
        <QuestionMarkCircleIcon className="w-10 h-10 text-ep-primary mr-3" />
        <h1 className="text-3xl md:text-4xl font-bold text-ep-dark-text">Bible Quizzes</h1>
      </div>
      <p className="text-lg text-slate-600 mb-10">
        Challenge your knowledge of the Scriptures and deepen your understanding with our interactive quizzes.
      </p>

      {!currentUser && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.332-.216 3.001-1.742 3.001H4.42c-1.526 0-2.492-1.67-1.742-3.001l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1.75-4.5a.75.75 0 00-1.5 0v2.5c0 .414.336.75.75.75h2.5a.75.75 0 000-1.5h-1.75v-1.75z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Please <Link to={ROUTES.HOME} className="font-medium underline hover:text-yellow-600">login or create an account</Link> to save your quiz progress and track your scores.
              </p>
            </div>
          </div>
        </div>
      )}

      {Object.values(QuizLevel).map(level => (
        quizzesByLevel[level].length > 0 && (
          <section key={level} className="mb-12">
            <h2 className="text-2xl font-semibold text-ep-dark-text mb-6 border-b-2 border-ep-primary pb-2">{level} Level</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quizzesByLevel[level].map(quiz => (
                <QuizCard key={quiz.id} quiz={quiz} progress={currentUser ? getQuizProgress(quiz.id) : undefined} />
              ))}
            </div>
          </section>
        )
      ))}
      
      {quizzes.length === 0 && (
        <p className="text-center text-slate-500">No quizzes available at the moment. Please check back soon!</p>
      )}
    </div>
  );
};

export default QuizzesPage;
