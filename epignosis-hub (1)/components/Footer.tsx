
import React from 'react';
import { APP_NAME } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-ep-blue text-white shadow-inner">
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        <p className="text-xs mt-1">Empowering believers with the precise knowledge of Christ.</p>
      </div>
    </footer>
  );
};

export default Footer;
