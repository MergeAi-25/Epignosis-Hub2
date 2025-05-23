
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { StudyTopic } from '../types';
import { getStudyTopics } from '../services/dataService';
import LoadingSpinner from '../components/LoadingSpinner';
import { AcademicCapIcon, ArrowRightIcon } from '../components/icons';
import { ROUTES } from '../constants';

const StudyTopicCard: React.FC<{ topic: StudyTopic }> = ({ topic }) => (
  <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
    <img src={topic.imageUrl} alt={topic.title} className="w-full h-48 object-cover"/>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-semibold text-ep-dark-text mb-2 group-hover:text-ep-primary transition-colors">{topic.title}</h3>
      <p className="text-sm text-slate-600 mb-4 flex-grow">{topic.description}</p>
      <Link to={`${ROUTES.STUDY_TOPICS}/${topic.id}`} className="mt-auto inline-flex items-center text-ep-primary hover:text-sky-700 font-medium group">
        Explore Topic
        <ArrowRightIcon className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  </article>
);

const StudyTopicsPage: React.FC = () => {
  const [studyTopics, setStudyTopics] = useState<StudyTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const topics = await getStudyTopics();
        setStudyTopics(topics);
      } catch (err) {
        setError('Failed to load study topics. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopics();
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Loading study topics..." />;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 animate-fadeIn">
      <div className="flex items-center mb-8">
        <AcademicCapIcon className="w-10 h-10 text-ep-primary mr-3" />
        <h1 className="text-3xl md:text-4xl font-bold text-ep-dark-text">Bible Study Topics</h1>
      </div>
      <p className="text-lg text-slate-600 mb-10">
        Engage with in-depth studies on key biblical themes, books, and doctrines to enrich your understanding of God's Word.
      </p>
      
      {studyTopics.length === 0 ? (
        <p className="text-center text-slate-500">No study topics available at the moment. Check back soon!</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studyTopics.map(topic => (
            <StudyTopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyTopicsPage;
