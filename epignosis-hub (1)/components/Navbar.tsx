import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES, APP_NAME } from '../constants';
import { useUser } from '../contexts/UserContext';
import { HomeIcon, BookOpenIcon, QuestionMarkCircleIcon, ChatBubbleLeftEllipsisIcon, UserCircleIcon, Cog6ToothIcon, Bars3Icon, XMarkIcon, AcademicCapIcon, SparklesIcon } from './icons';

const NavLink: React.FC<{ to: string; children: React.ReactNode; icon?: React.ReactNode; onClick?: () => void }> = ({ to, children, icon, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center px-3 py-2 text-slate-700 hover:bg-sky-100 hover:text-ep-primary rounded-md text-sm font-medium transition-colors"
  >
    {icon && <span className="mr-2">{icon}</span>}
    {children}
  </Link>
);

const Navbar: React.FC = () => {
  const { currentUser, logout, login } = useUser();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    navigate(ROUTES.HOME);
  };

  const handleMockLogin = () => {
    // Simple mock login for demonstration
    login('Christian User', 'user@epignosis.hub');
    setProfileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { path: ROUTES.HOME, label: 'Home', icon: <HomeIcon className="w-5 h-5" /> },
    { path: ROUTES.BLOG, label: 'Blog', icon: <BookOpenIcon className="w-5 h-5" /> },
    { path: ROUTES.QUIZZES, label: 'Quizzes', icon: <QuestionMarkCircleIcon className="w-5 h-5" /> },
    { path: ROUTES.STUDY_TOPICS, label: 'Study Topics', icon: <AcademicCapIcon className="w-5 h-5" /> },
    { path: ROUTES.CHATBOT, label: 'AI Chatbot', icon: <SparklesIcon className="w-5 h-5" /> },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to={ROUTES.HOME} className="flex-shrink-0 flex items-center text-ep-blue hover:opacity-80 transition-opacity">
              {/* Updated App Icon/Logo */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 mr-2 text-ep-primary">
                <path d="M12.5 2.5C12.5 2.22386 12.2761 2 12 2C11.7239 2 11.5 2.22386 11.5 2.5V9H4.13266C3.65393 9 3.34558 9.47383 3.53027 9.92403C4.58027 12.4045 7.50436 14 11.5 14V21.5C11.5 21.7761 11.7239 22 12 22C12.2761 22 12.5 21.7761 12.5 21.5V14C16.4956 14 19.4197 12.4045 20.4697 9.92403C20.6544 9.47383 20.3461 9 19.8673 9H12.5V2.5Z"/>
              </svg>
              <span className="font-bold text-xl tracking-tight">{APP_NAME}</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map(item => (
                <NavLink key={item.path} to={item.path} icon={item.icon}>{item.label}</NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block relative ml-4" ref={profileMenuRef}>
              {currentUser ? (
                <div>
                  <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ep-primary p-1 hover:bg-slate-100">
                    <span className="sr-only">Open user menu</span>
                    <UserCircleIcon className="h-8 w-8 text-slate-600" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleMockLogin}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ep-primary hover:bg-sky-700 transition-colors"
                >
                  Login
                </button>
              )}
              {profileMenuOpen && currentUser && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-2 text-sm text-slate-700 border-b">
                    Signed in as <span className="font-medium">{currentUser.name}</span>
                  </div>
                  <Link to={ROUTES.PROFILE} onClick={() => setProfileMenuOpen(false)} className="flex items-center w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                    <UserCircleIcon className="w-5 h-5 mr-2" /> Profile
                  </Link>
                  <Link to={ROUTES.PROFILE + "?tab=settings"} onClick={() => setProfileMenuOpen(false)} className="flex items-center w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                     <Cog6ToothIcon className="w-5 h-5 mr-2" /> Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
            <div className="md:hidden ml-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-ep-primary hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ep-primary"
                aria-controls="mobile-menu"
                aria-expanded={mobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? <XMarkIcon className="block h-6 w-6" /> : <Bars3Icon className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 z-40" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg border-t border-slate-200">
            {navItems.map(item => (
              <NavLink key={item.path} to={item.path} icon={item.icon} onClick={() => setMobileMenuOpen(false)}>{item.label}</NavLink>
            ))}
            <div className="border-t border-slate-200 pt-4 mt-2">
              {currentUser ? (
                <>
                  <div className="flex items-center px-3 mb-2">
                    <UserCircleIcon className="h-8 w-8 text-slate-600 mr-2" />
                    <div>
                      <div className="text-base font-medium text-slate-800">{currentUser.name}</div>
                      <div className="text-sm font-medium text-slate-500">{currentUser.email}</div>
                    </div>
                  </div>
                  <NavLink to={ROUTES.PROFILE} icon={<UserCircleIcon className="w-5 h-5" />} onClick={() => setMobileMenuOpen(false)}>Profile</NavLink>
                  <NavLink to={ROUTES.PROFILE + "?tab=settings"} icon={<Cog6ToothIcon className="w-5 h-5" />} onClick={() => setMobileMenuOpen(false)}>Settings</NavLink>
                  <button
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="flex items-center w-full text-left px-3 py-2 text-slate-700 hover:bg-sky-100 hover:text-ep-primary rounded-md text-sm font-medium transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => { handleMockLogin(); setMobileMenuOpen(false); }}
                  className="w-full px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ep-primary hover:bg-sky-700 transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;