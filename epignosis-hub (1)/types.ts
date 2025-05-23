
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export enum QuizLevel {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced"
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  level: QuizLevel;
  questions: QuizQuestion[];
  imageUrl?: string;
}

export interface UserQuizProgress {
  score: number;
  completed: boolean;
  currentQuestionIndex: number;
  answers: { [questionId: string]: string }; // questionId: selectedOptionId
  timestamp?: number; 
}

export interface UserData {
  quizProgress: {
    [quizId: string]: UserQuizProgress;
  };
  // other user specific data can be added here
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string; // ISO string format
  imageUrl: string;
  summary: string;
  content: string; // Full content, can include HTML/Markdown
  tags?: string[];
}

export interface StudyTopic {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  contentSections: StudyTopicSection[];
}

export interface StudyTopicSection {
  id: string;
  title: string;
  content: string; // Can include HTML/Markdown, scripture references
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
  sources?: GroundingChunk[];
}

export interface GroundingChunk {
  web?: {
    // fix: made uri and title optional to match SDK
    uri?: string;
    title?: string;
  };
  retrievedContext?: { // For TOOL_CODE_INTERPRETER, etc.
    uri: string;
    title: string;
  };
}

// fix: Removed ApiKeyManager as API key is now sourced from process.env only
// export interface ApiKeyManager {
//   getApiKey: () => string | null;
//   setApiKey: (key: string) => void;
//   isApiKeySet: () => boolean;
// }
