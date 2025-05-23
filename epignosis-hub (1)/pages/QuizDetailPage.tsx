
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import type { Quiz, QuizQuestion, UserQuizProgress } from '../types';
import { getQuiz, updateUserQuizProgress, getUserQuizProgress } from '../services/dataService';
import LoadingSpinner from '../components/LoadingSpinner';
import { ROUTES } from '../constants';
import { useUser } from '../contexts/UserContext';
// fix: Correctly import ArrowLeftIcon (assuming it's added to icons.tsx)
import { CheckCircleIcon, XCircleIcon, LightBulbIcon, ArrowLeftIcon, ArrowRightIcon } from '../components/icons';

const QuizDetailPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useUser();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Store all answers to allow review
  const [userAnswers, setUserAnswers] = useState<{[questionId: string]: string}>({});


  const loadQuizAndProgress = useCallback(async () => {
    if (!quizId || !currentUser) {
      setError("Quiz ID or user information is missing.");
      setIsLoading(false);
      if (!currentUser) navigate(ROUTES.HOME); // Redirect if not logged in
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const fetchedQuiz = await getQuiz(quizId);
      if (fetchedQuiz) {
        setQuiz(fetchedQuiz);
        const progress = getUserQuizProgress(currentUser.id, quizId);
        if (progress) {
          if(progress.completed){
            setQuizCompleted(true);
            setScore(progress.score);
            setUserAnswers(progress.answers || {});
            // If completed, show results, or first question for review
            setCurrentQuestionIndex(0); 
          } else {
            setCurrentQuestionIndex(progress.currentQuestionIndex || 0);
            setScore(progress.score || 0);
            setUserAnswers(progress.answers || {});
          }
        }
      } else {
        setError('Quiz not found.');
      }
    } catch (err) {
      setError('Failed to load quiz. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId, currentUser, navigate]);


  useEffect(() => {
    loadQuizAndProgress();
  }, [loadQuizAndProgress]);


  const saveProgress = useCallback(() => {
    if (!quizId || !currentUser || !quiz) return;
    const progressData: Partial<UserQuizProgress> = {
      score,
      currentQuestionIndex,
      completed: currentQuestionIndex === quiz.questions.length,
      answers: userAnswers
    };
    updateUserQuizProgress(currentUser.id, quizId, progressData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, quizId, score, currentQuestionIndex, quiz, userAnswers]);


  useEffect(() => {
    if (quiz && !quizCompleted) { // Only save if quiz is active
      saveProgress();
    }
  }, [score, currentQuestionIndex, userAnswers, quiz, saveProgress, quizCompleted]);


  const handleOptionSelect = (optionId: string) => {
    if (isAnswered && !quizCompleted) return; // Don't allow changing answer after submission unless for review
    setSelectedOptionId(optionId);
    if (quizCompleted) { // If reviewing, just set for display
        setShowExplanation(true);
    }
  };

  const handleSubmitAnswer = () => {
    if (!quiz || !selectedOptionId) return;

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isCorrect = selectedOptionId === currentQuestion.correctOptionId;

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestion.id]: selectedOptionId
    }));

    setIsAnswered(true);
    setShowExplanation(true);

    if (currentQuestionIndex === quiz.questions.length - 1) {
      setQuizCompleted(true);
      // Final save on completion
      updateUserQuizProgress(currentUser!.id, quizId!, {
        score: isCorrect ? score + 1 : score, // update score based on last answer
        currentQuestionIndex: quiz.questions.length,
        completed: true,
        answers: {...userAnswers, [currentQuestion.id]: selectedOptionId}
      });
    }
  };

  const handleNextQuestion = () => {
    if (!quiz || currentQuestionIndex >= quiz.questions.length - 1) return;
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setShowExplanation(false);
  };
  
  const handlePrevQuestion = () => { // For review mode
    if (currentQuestionIndex <= 0) return;
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    setShowExplanation(true); // Keep explanation visible during review
    // selectedOptionId will be set by useEffect or handleOptionSelect based on userAnswers
  };


  useEffect(() => {
    // When in review mode and navigating questions, set the selected option
    if (quizCompleted && quiz && userAnswers[quiz.questions[currentQuestionIndex]?.id]) {
      setSelectedOptionId(userAnswers[quiz.questions[currentQuestionIndex].id]);
    }
  }, [currentQuestionIndex, quizCompleted, userAnswers, quiz]);


  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setShowExplanation(false);
    setQuizCompleted(false);
    setUserAnswers({});
    if(currentUser && quizId) {
        updateUserQuizProgress(currentUser.id, quizId, { score: 0, currentQuestionIndex: 0, completed: false, answers: {} });
    }
  };

  if (isLoading) return <LoadingSpinner message="Loading quiz..." />;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!quiz) return <div className="text-center text-slate-500 py-8">Quiz data not available.</div>;

  const currentQuestion: QuizQuestion | undefined = quiz.questions[currentQuestionIndex];

  if (!currentQuestion && !quizCompleted) {
     // This case should ideally be handled by quizCompleted or loading state
    return <div className="text-center text-slate-500 py-8">End of quiz questions, but not marked completed.</div>;
  }

  const progressPercentage = quizCompleted ? 100 : (currentQuestionIndex / quiz.questions.length) * 100;

  if (quizCompleted && currentQuestion) { // Quiz is completed, showing summary or review
    return (
      <div className="container mx-auto py-8 px-4 max-w-2xl animate-fadeIn">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-ep-dark-text mb-4 text-center">Quiz Completed: {quiz.title}</h2>
          <div className="text-center text-lg text-slate-700 mb-6">
            Your final score: <span className="font-bold text-ep-primary">{score}</span> out of <span className="font-bold">{quiz.questions.length}</span>
          </div>
          <div className="mb-6">
            <div className="w-full bg-slate-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(score/quiz.questions.length)*100}%` }}></div>
            </div>
            <p className="text-center text-sm text-slate-500 mt-1">You answered {score} correctly!</p>
          </div>
          
          {/* Review section */}
           <div className="border-t pt-4 mt-4">
              <h3 className="text-xl font-semibold text-ep-dark-text mb-3">Review Your Answers:</h3>
              <p className="text-sm text-slate-600 mb-1">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
              <h4 className="text-lg font-medium text-slate-800 mb-4">{currentQuestion.text}</h4>
              <div className="space-y-3 mb-4">
                {currentQuestion.options.map(option => {
                  const isUserSelected = userAnswers[currentQuestion.id] === option.id;
                  const isCorrect = option.id === currentQuestion.correctOptionId;
                  let bgColor = 'bg-slate-50 hover:bg-slate-100';
                  if (isUserSelected && isCorrect) bgColor = 'bg-green-100 border-green-500';
                  else if (isUserSelected && !isCorrect) bgColor = 'bg-red-100 border-red-500';
                  else if (isCorrect) bgColor = 'bg-green-50 border-green-300'; // Highlight correct if not selected by user

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)} // Allow clicking to see explanation
                      className={`w-full text-left p-3 rounded-md border transition-colors ${bgColor} ${ isUserSelected ? 'ring-2 ring-ep-primary' : ''}`}
                    >
                      {option.text}
                      {isUserSelected && isCorrect && <CheckCircleIcon className="w-5 h-5 inline-block ml-2 text-green-600" />}
                      {isUserSelected && !isCorrect && <XCircleIcon className="w-5 h-5 inline-block ml-2 text-red-600" />}
                      {!isUserSelected && isCorrect && <CheckCircleIcon className="w-5 h-5 inline-block ml-2 text-green-400" />}
                    </button>
                  );
                })}
              </div>
               {showExplanation && (
                <div className="mt-4 p-3 bg-sky-50 border border-sky-200 rounded-md">
                  <p className="text-sm font-semibold text-sky-700 mb-1">Explanation:</p>
                  <p className="text-sm text-slate-600">{currentQuestion.explanation}</p>
                </div>
              )}
              <div className="flex justify-between mt-6">
                <button 
                    onClick={handlePrevQuestion} 
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 disabled:opacity-50"
                >
                    Previous
                </button>
                {currentQuestionIndex < quiz.questions.length - 1 ? (
                     <button 
                        onClick={handleNextQuestion}
                        className="px-4 py-2 bg-ep-primary text-white rounded-md hover:bg-sky-700"
                    >
                        Next
                    </button>
                ) : (
                     <span className="px-4 py-2 text-slate-500">End of Review</span>
                )}
              </div>
           </div>


          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleRetakeQuiz}
              className="bg-ep-secondary hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Retake Quiz
            </button>
            <Link
              to={ROUTES.QUIZZES}
              className="bg-slate-500 hover:bg-slate-600 text-white text-center font-medium py-2 px-4 rounded-md transition-colors"
            >
              Back to Quizzes
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (!currentQuestion) { // Should not happen if quizCompleted is false and quiz is loaded
    return <div className="text-center text-slate-500 py-8">Error: Current question not found.</div>;
  }


  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl animate-fadeIn">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-ep-dark-text">{quiz.title}</h2>
          <span className="text-sm text-slate-500">Score: {score}</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5 mb-6">
          <div className="bg-ep-primary h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
        </div>

        <p className="text-sm text-slate-600 mb-1">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
        <h3 className="text-xl font-medium text-slate-800 mb-6">{currentQuestion.text}</h3>

        <div className="space-y-3">
          {currentQuestion.options.map(option => {
            let buttonClass = "bg-slate-50 hover:bg-slate-100 text-slate-800";
            let icon = null;

            if (isAnswered) {
              if (option.id === currentQuestion.correctOptionId) {
                buttonClass = "bg-green-100 border-green-500 text-green-700";
                icon = <CheckCircleIcon className="w-5 h-5 inline-block ml-2" />;
              } else if (option.id === selectedOptionId) { // Incorrectly selected
                buttonClass = "bg-red-100 border-red-500 text-red-700";
                icon = <XCircleIcon className="w-5 h-5 inline-block ml-2" />;
              } else { // Not selected, not correct
                 buttonClass = "bg-slate-50 text-slate-700 opacity-70";
              }
            } else if (option.id === selectedOptionId) {
               buttonClass = "bg-sky-100 border-ep-primary ring-2 ring-ep-primary text-ep-primary";
            }


            return (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                disabled={isAnswered}
                className={`w-full text-left p-3 rounded-md border transition-colors flex justify-between items-center ${buttonClass} disabled:cursor-not-allowed`}
              >
                <span>{option.text}</span>
                {icon}
              </button>
            );
          })}
        </div>

        {isAnswered && showExplanation && (
          <div className="mt-6 p-4 bg-sky-50 border border-sky-200 rounded-md animate-fadeIn">
            <div className="flex items-center text-sky-700 mb-2">
              <LightBulbIcon className="w-5 h-5 mr-2" />
              <p className="text-sm font-semibold">Explanation:</p>
            </div>
            <p className="text-sm text-slate-600">{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="mt-8 flex justify-between items-center">
          <Link to={ROUTES.QUIZZES} className="inline-flex items-center text-sm text-slate-600 hover:text-ep-primary group">
            <ArrowLeftIcon className="w-4 h-4 mr-1 transform group-hover:-translate-x-0.5 transition-transform" />
            Exit Quiz
          </Link>
          {!isAnswered ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedOptionId}
              className="bg-ep-primary hover:bg-sky-700 text-white font-medium py-2 px-6 rounded-md transition-colors disabled:bg-slate-300"
            >
              Submit
            </button>
          ) : (
            currentQuestionIndex < quiz.questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="bg-ep-secondary hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-md transition-colors inline-flex items-center"
              >
                Next Question <ArrowRightIcon className="w-4 h-4 ml-2"/>
              </button>
            ) : (
              <button
                onClick={() => { /* This button now mainly signals completion, actual logic in handleSubmit */ }}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
              >
                Show Results
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizDetailPage;
