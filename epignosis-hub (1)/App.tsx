
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import QuizzesPage from './pages/QuizzesPage';
import QuizDetailPage from './pages/QuizDetailPage';
import StudyTopicsPage from './pages/StudyTopicsPage';
import StudyTopicDetailPage from './pages/StudyTopicDetailPage';
import ChatbotPage from './pages/ChatbotPage';
import ProfilePage from './pages/ProfilePage';
import { ROUTES } from './constants';
import { useUser } from './contexts/UserContext';

// ProtectedRoute component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useUser();
  if (!currentUser) {
    // Redirect them to the home page if not logged in
    // You could also redirect to a login page if you had one
    return <Navigate to={ROUTES.HOME} replace />;
  }
  return <>{children}</>;
};


const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.BLOG} element={<BlogPage />} />
          <Route path={`${ROUTES.BLOG}/:postId`} element={<BlogDetailPage />} />
          <Route path={ROUTES.QUIZZES} element={<QuizzesPage />} />
          <Route path={`${ROUTES.QUIZZES}/:quizId`} element={
            <ProtectedRoute>
              <QuizDetailPage />
            </ProtectedRoute>
          } />
          <Route path={ROUTES.STUDY_TOPICS} element={<StudyTopicsPage />} />
          <Route path={`${ROUTES.STUDY_TOPICS}/:topicId`} element={<StudyTopicDetailPage />} />
          <Route path={ROUTES.CHATBOT} element={
            <ProtectedRoute>
              <ChatbotPage />
            </ProtectedRoute>
          } />
          <Route path={ROUTES.PROFILE} element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
