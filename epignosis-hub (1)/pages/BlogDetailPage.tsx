
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { BlogPost } from '../types';
import { getBlogPost } from '../services/dataService';
import LoadingSpinner from '../components/LoadingSpinner';
import { ROUTES } from '../constants';
// fix: Correctly import ArrowLeftIcon (assuming it's added to icons.tsx)
import { BookOpenIcon, ArrowLeftIcon } from '../components/icons';

const BlogDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) {
      setError('Blog post ID is missing.');
      setIsLoading(false);
      return;
    }
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedPost = await getBlogPost(postId);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          setError('Blog post not found.');
        }
      } catch (err) {
        setError('Failed to load blog post. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  if (isLoading) {
    return <LoadingSpinner message="Loading post..." />;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  if (!post) {
    return <div className="text-center text-slate-500 py-8">Blog post not found.</div>;
  }

  const postDate = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl animate-fadeIn">
      <Link to={ROUTES.BLOG} className="inline-flex items-center text-ep-primary hover:text-sky-700 mb-6 group">
        <ArrowLeftIcon className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
        Back to Blog
      </Link>

      <article className="bg-white p-6 sm:p-8 rounded-lg shadow-xl">
        <img src={post.imageUrl} alt={post.title} className="w-full h-64 sm:h-80 object-cover rounded-md mb-6"/>
        <div className="flex items-center text-ep-primary mb-2">
          <BookOpenIcon className="w-6 h-6 mr-2" />
          <h1 className="text-3xl sm:text-4xl font-bold text-ep-dark-text">{post.title}</h1>
        </div>
        <p className="text-sm text-slate-500 mb-1">By <span className="font-medium">{post.author}</span></p>
        <p className="text-xs text-slate-400 mb-6">Published on {postDate}</p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="inline-block bg-sky-100 text-ep-primary text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div 
          className="prose prose-lg max-w-none text-slate-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
        {/* Mock Comments Section */}
        <div className="mt-10 pt-6 border-t border-slate-200">
          <h3 className="text-xl font-semibold text-ep-dark-text mb-4">Discussion</h3>
          <p className="text-slate-500">Comments are not enabled for this article yet.</p>
          {/* Future: Add comment form and display logic here */}
        </div>
      </article>
    </div>
  );
};

export default BlogDetailPage;
