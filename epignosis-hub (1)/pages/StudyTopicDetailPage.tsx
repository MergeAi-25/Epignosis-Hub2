
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { StudyTopic, StudyTopicSection } from '../types';
import { getStudyTopic } from '../services/dataService';
import LoadingSpinner from '../components/LoadingSpinner';
import { ROUTES } from '../constants';
// fix: Correctly import ArrowLeftIcon (assuming it's added to icons.tsx)
import { AcademicCapIcon, ArrowLeftIcon } from '../components/icons';

const SectionContent: React.FC<{ section: StudyTopicSection }> = ({ section }) => (
  <div className="mb-8 p-6 bg-sky-50 rounded-lg shadow">
    <h3 className="text-xl font-semibold text-ep-primary mb-3">{section.title}</h3>
    <div 
      className="prose max-w-none text-slate-700 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: section.content }}
    />
  </div>
);

const StudyTopicDetailPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [topic, setTopic] = useState<StudyTopic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!topicId) {
      setError('Study topic ID is missing.');
      setIsLoading(false);
      return;
    }
    const fetchTopic = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedTopic = await getStudyTopic(topicId);
        if (fetchedTopic) {
          setTopic(fetchedTopic);
        } else {
          setError('Study topic not found.');
        }
      } catch (err) {
        setError('Failed to load study topic. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopic();
  }, [topicId]);

  if (isLoading) {
    return <LoadingSpinner message="Loading study topic..." />;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  if (!topic) {
    return <div className="text-center text-slate-500 py-8">Study topic not found.</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl animate-fadeIn">
      <Link to={ROUTES.STUDY_TOPICS} className="inline-flex items-center text-ep-primary hover:text-sky-700 mb-6 group">
        <ArrowLeftIcon className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
        Back to Study Topics
      </Link>

      <article className="bg-white p-6 sm:p-8 rounded-lg shadow-xl">
        <img src={topic.imageUrl} alt={topic.title} className="w-full h-64 sm:h-80 object-cover rounded-md mb-6"/>
        <div className="flex items-center text-ep-primary mb-2">
          <AcademicCapIcon className="w-8 h-8 mr-3" />
          <h1 className="text-3xl sm:text-4xl font-bold text-ep-dark-text">{topic.title}</h1>
        </div>
        <p className="text-lg text-slate-600 mb-8">{topic.description}</p>
        
        <div>
          {topic.contentSections.map(section => (
            <SectionContent key={section.id} section={section} />
          ))}
        </div>

        {/* Future: Add reflection questions or related resources here */}
        <div className="mt-10 pt-6 border-t border-slate-200">
          <h3 className="text-xl font-semibold text-ep-dark-text mb-4">Further Reflection</h3>
          <p className="text-slate-500">Consider journaling your thoughts on this topic or discussing it with a study group.</p>
        </div>
      </article>
    </div>
  );
};

export default StudyTopicDetailPage;
