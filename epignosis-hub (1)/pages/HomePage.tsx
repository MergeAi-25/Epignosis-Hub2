import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES, APP_NAME, APP_TAGLINE } from '../constants';
import { BookOpenIcon, QuestionMarkCircleIcon, AcademicCapIcon, SparklesIcon, ArrowRightIcon } from '../components/icons';
import { useUser } from '../contexts/UserContext';

const FeatureCard: React.FC<{ title: string; description: string; linkTo: string; icon: React.ReactNode; linkText: string }> = ({ title, description, linkTo, icon, linkText }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
    <div className="flex-shrink-0 text-ep-primary mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-ep-dark-text mb-2">{title}</h3>
    <p className="text-slate-600 text-sm mb-4 flex-grow">{description}</p>
    <Link to={linkTo} className="inline-flex items-center text-ep-primary hover:text-sky-700 font-medium group">
      {linkText}
      <ArrowRightIcon className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
    </Link>
  </div>
);

const HomePage: React.FC = () => {
  const { currentUser, login } = useUser();

  const handleGuestLogin = () => {
    if (!currentUser) {
      login('Guest User', 'guest@epignosis.hub');
    }
  };

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ep-blue to-sky-600 text-white py-20 px-6 rounded-lg shadow-2xl mb-12">
        <div className="container mx-auto text-center">
          {/* Updated Hero Icon/Logo */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-20 w-20 mx-auto mb-6 text-ep-gold">
             <path d="M12.5 2.5C12.5 2.22386 12.2761 2 12 2C11.7239 2 11.5 2.22386 11.5 2.5V9H4.13266C3.65393 9 3.34558 9.47383 3.53027 9.92403C4.58027 12.4045 7.50436 14 11.5 14V21.5C11.5 21.7761 11.7239 22 12 22C12.2761 22 12.5 21.7761 12.5 21.5V14C16.4956 14 19.4197 12.4045 20.4697 9.92403C20.6544 9.47383 20.3461 9 19.8673 9H12.5V2.5Z"/>
          </svg>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif tracking-tight">{APP_NAME}</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">{APP_TAGLINE}</p>
          {!currentUser && (
            <button 
              onClick={handleGuestLogin}
              className="bg-ep-gold hover:bg-amber-400 text-ep-blue font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg"
            >
              Explore as Guest
            </button>
          )}
          {currentUser && (
             <Link 
              to={ROUTES.PROFILE}
              className="bg-ep-gold hover:bg-amber-400 text-ep-blue font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg"
            >
              Go to Your Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* Introduction Section */}
      <section className="mb-16">
        <div className="container mx-auto text-center bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-ep-dark-text mb-4">Welcome to Your Spiritual Growth Hub</h2>
          <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Epignosis (<em>ἐπίγνωσις</em>) is the Greek word for precise, full, and thorough knowledge. Here at {APP_NAME}, we are dedicated to empowering Evangelical Christian believers with this deeper, transformative understanding of Christ Jesus and His Word. Engage with our resources to enrich your faith and walk more confidently in His truth.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-ep-dark-text text-center mb-10">Discover Our Resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            title="Insightful Blog"
            description="Read articles on theology, discipleship, and Christian living to deepen your understanding."
            linkTo={ROUTES.BLOG}
            icon={<BookOpenIcon className="w-10 h-10" />}
            linkText="Explore Blog"
          />
          <FeatureCard 
            title="Interactive Quizzes"
            description="Test and expand your biblical knowledge with quizzescatering to various levels."
            linkTo={ROUTES.QUIZZES}
            icon={<QuestionMarkCircleIcon className="w-10 h-10" />}
            linkText="Take a Quiz"
          />
          <FeatureCard 
            title="Bible Study Topics"
            description="Engage with structured study materials on key biblical themes and books."
            linkTo={ROUTES.STUDY_TOPICS}
            icon={<AcademicCapIcon className="w-10 h-10" />}
            linkText="Start Studying"
          />
          <FeatureCard 
            title="AI-Powered Chatbot"
            description="Ask questions and get biblically-grounded answers from our AI assistant, EpignosAI."
            linkTo={ROUTES.CHATBOT}
            icon={<SparklesIcon className="w-10 h-10" />}
            linkText="Chat with AI"
          />
        </div>
      </section>

      {/* Call to Action (Optional) */}
      {currentUser && (
        <section className="text-center py-12 bg-sky-50 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-ep-dark-text mb-3">Ready to dive deeper, {currentUser.name}?</h2>
          <p className="text-slate-600 mb-6">Continue your journey of knowledge and faith.</p>
          <Link to={ROUTES.QUIZZES} className="bg-ep-primary hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg shadow hover:shadow-md transition-all duration-300 mr-4">
            Challenge Yourself with a Quiz
          </Link>
          <Link to={ROUTES.STUDY_TOPICS} className="bg-ep-secondary hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:shadow-md transition-all duration-300">
            Explore Study Topics
          </Link>
        </section>
      )}
    </div>
  );
};

export default HomePage;