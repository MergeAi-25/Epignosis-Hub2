
import React, { useState, useEffect, useRef, useCallback } from 'react';
// fix: Correct import of GoogleGenAI and Part
import { GoogleGenAI, Part } from '@google/genai'; 
// fix: Use isGeminiInitialized from geminiService, remove resetChat (handled internally)
import { initializeChat, sendMessageStream, isGeminiInitialized } from '../services/geminiService';
// fix: Ensure ChatMessage uses the local GroundingChunk type definition
import type { ChatMessage as Message, GroundingChunk } from '../types';
import { SparklesIcon } from '../components/icons';
import LoadingSpinner from '../components/LoadingSpinner';
// fix: Removed GEMINI_API_KEY_PROMPT_MESSAGE and LOCAL_STORAGE_API_KEY as they are no longer used

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xl px-4 py-3 rounded-lg shadow ${isUser ? 'bg-ep-primary text-white' : 'bg-slate-100 text-slate-800'}`}>
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        {message.timestamp && <p className={`text-xs mt-1 ${isUser ? 'text-sky-200 text-right' : 'text-slate-400 text-left'}`}>{new Date(message.timestamp).toLocaleTimeString()}</p>}
        {message.sender === 'ai' && message.sources && message.sources.length > 0 && (
          <div className="mt-2 pt-2 border-t border-slate-200">
            <p className="text-xs font-semibold mb-1 text-slate-600">Sources:</p>
            <ul className="list-disc list-inside">
              {message.sources.map((source, index) => 
                source.web && ( // Check if web property exists, as it's optional
                <li key={index} className="text-xs text-slate-500">
                  <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="hover:underline text-sky-600">
                    {source.web.title || source.web.uri}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// fix: Removed ApiKeyInputModal as API key is from process.env and not user-configurable

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // fix: Removed showApiKeyModal and apiKeyManager as API key is from process.env

  const initChat = useCallback(async () => {
    // API key is assumed to be set in process.env.
    // Initialization failure will be handled by initializeChat.
    setIsLoading(true);
    setError(null);
    try {
      // fix: Call initializeChat without apiKeyManager
      const success = await initializeChat();
      if (!success) {
        setError("Failed to initialize chat. AI features may be unavailable. Please ensure the application is configured correctly or contact support.");
      } else {
        if (messages.length === 0) {
          setMessages([{ 
            id: Date.now().toString(), 
            sender: 'ai', 
            text: "Hello! I am EpignosAI, your assistant for exploring Christian faith and the Bible. How can I help you today?", 
            timestamp: Date.now() 
          }]);
        }
      }
    } catch (e: any) {
      console.error("Init chat error:", e);
      setError(e.message || "An unexpected error occurred during chat initialization. AI features may be unavailable.");
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Removed apiKeyManager.isApiKeySet from dependencies

  useEffect(() => {
    initChat();
  }, [initChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    // It's assumed API key is configured via process.env.
    // isGeminiInitialized() can check if the client is ready.
    if (!isGeminiInitialized()) { // Or rely on sendMessageStream to throw if not initialized
        setError("AI Chatbot is not available. Please ensure the application is configured correctly or contact support.");
        return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim(),
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // fix: Call sendMessageStream without apiKeyManager
      const streamResponse = await sendMessageStream(userMessage.text, undefined /* imageParts if any */);
      if (!streamResponse) {
          throw new Error("Failed to get response stream.");
      }
      
      let aiResponseText = '';
      const aiMessageId = Date.now().toString() + '-ai';
      
      setMessages(prev => [...prev, { id: aiMessageId, sender: 'ai', text: 'Thinking...', timestamp: Date.now() }]);
      
      let currentSources: GroundingChunk[] | undefined = [];

      if (streamResponse.textStream) {
        for await (const textChunk of streamResponse.textStream) {
          aiResponseText += textChunk;
          setMessages(prev => prev.map(msg => msg.id === aiMessageId ? {...msg, text: aiResponseText + "▋"} : msg));
        }
      }

      if (streamResponse.sourcesStream) {
        for await (const sourcesChunk of streamResponse.sourcesStream) {
            if (sourcesChunk) {
                 // fix: Ensure proper assignment for GroundingChunk[] from types.ts
                 // The types should now be compatible due to changes in types.ts
                 currentSources = [...(currentSources || []), ...sourcesChunk.map(sc => ({ // Explicit mapping if necessary
                    web: sc.web ? { uri: sc.web.uri, title: sc.web.title } : undefined,
                    retrievedContext: sc.retrievedContext ? { uri: sc.retrievedContext.uri, title: sc.retrievedContext.title } : undefined,
                 }))];
            }
        }
      }
      
       setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId ? 
        {...msg, text: aiResponseText, sources: currentSources?.filter(s => s.web && s.web.uri) } : // Ensure web and uri exist for display
        msg
      ));

    } catch (e: any) {
      console.error("Send message error:", e);
      const errorMessage = e.message || "An error occurred while communicating with the AI.";
      setError(errorMessage);
      setMessages(prev => [...prev, { id: Date.now().toString() + '-error', sender: 'ai', text: `Error: ${errorMessage}`, timestamp: Date.now() }]);
      // Do not prompt for API key, error message in geminiService updated
    } finally {
      setIsLoading(false);
    }
  };
  
  // fix: Removed handleApiKeyModalClose as modal is removed

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl flex flex-col h-[calc(100vh-10rem)] animate-fadeIn">
      <div className="flex items-center mb-6">
        <SparklesIcon className="w-10 h-10 text-ep-primary mr-3" />
        <h1 className="text-3xl font-bold text-ep-dark-text">EpignosAI Chatbot</h1>
      </div>
       {/* fix: Removed API key prompt UI */}
      {error && <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-md text-sm text-red-700">{error}</div>}
      
      <div className="flex-grow overflow-y-auto bg-white p-4 rounded-lg shadow-inner mb-4 border border-slate-200">
        {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        {isLoading && messages[messages.length-1]?.sender === 'user' && (
          <div className="flex justify-start mb-4">
            <div className="max-w-xs px-4 py-3 rounded-lg shadow bg-slate-100 text-slate-800">
              <LoadingSpinner size="sm" message="EpignosAI is thinking..." />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-auto bg-white p-4 rounded-lg shadow-md border border-slate-200">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
            // fix: Input placeholder and disabled state simplified
            placeholder={"Ask about faith, Bible, Jesus..."}
            className="flex-grow p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-ep-primary focus:border-transparent outline-none transition-shadow"
            disabled={isLoading || !isGeminiInitialized()} // Disable if AI not ready
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim() || !isGeminiInitialized()} // Disable if AI not ready or no input
            className="bg-ep-primary text-white p-3 rounded-lg hover:bg-sky-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center"
            style={{ minWidth: '80px' }} 
          >
            {isLoading ? <LoadingSpinner size="sm" /> : 'Send'}
          </button>
        </div>
      </div>
      {/* fix: Removed ApiKeyInputModal call */}
    </div>
  );
};

export default ChatbotPage;
