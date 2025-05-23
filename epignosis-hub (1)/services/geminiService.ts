
import { GoogleGenAI, GenerateContentResponse, Chat, Content, Part, GroundingChunk, FinishReason } from "@google/genai";
import { GEMINI_CHAT_MODEL } from '../constants';
// Removed ApiKeyManager import

let ai: GoogleGenAI | null = null;
let chatInstance: Chat | null = null;

const SYSTEM_INSTRUCTION = "You are EpignosAI, a helpful AI assistant for Epignosis Hub. Your purpose is to assist users in deepening their knowledge of Christ Jesus and understanding the Bible from an Evangelical Christian perspective. Provide clear, biblically-grounded, and encouraging responses. Be respectful, patient, and focus on providing knowledge and understanding. If asked about topics outside of Christianity or the Bible, gently steer the conversation back to your core purpose or state that it's outside your scope of expertise. When appropriate, you can cite Bible verses to support your answers. You can also ask clarifying questions to better understand the user's query.";

// fix: Use process.env.API_KEY directly and remove apiKeyManager
const initializeAiClient = (): boolean => {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable is not set. AI features will not be available.");
    ai = null;
    return false;
  }
  if (!ai) {
    try {
      // fix: Ensure apiKey is passed as a named parameter {apiKey: ...}
      ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      return true;
    } catch (error) {
      console.error("Failed to initialize GoogleGenAI:", error);
      ai = null; 
      return false;
    }
  }
  return true; // Already initialized
};

// fix: Removed apiKeyManager parameter
export const initializeChat = async (): Promise<boolean> => {
  if (!initializeAiClient() || !ai) {
    chatInstance = null;
    return false;
  }
  try {
    chatInstance = ai.chats.create({
      model: GEMINI_CHAT_MODEL,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        // Add other configs like temperature if needed
        // temperature: 0.7 
      },
      // history: [] // Optionally load chat history
    });
    return true;
  } catch (error) {
    console.error("Error creating chat session:", error);
    chatInstance = null;
    return false;
  }
};

export const resetChat = () => {
  chatInstance = null; // This will force reinitialization on next message
}

interface SendMessageStreamResponse {
  textStream: AsyncGenerator<string>;
  sourcesStream?: AsyncGenerator<GroundingChunk[] | undefined>; // For grounding data
}

export const sendMessageStream = async (
  message: string,
  // fix: Removed apiKeyManager parameter
  imageParts?: Part[]
): Promise<SendMessageStreamResponse | null> => {
  if (!chatInstance) {
    // fix: Call initializeChat without apiKeyManager
    const initialized = await initializeChat();
    if (!initialized || !chatInstance) {
      throw new Error("Chat not initialized. AI service might be unavailable or misconfigured.");
    }
  }

  try {
    // const contents: Content[] = []; // Not needed if message is Part[]
    const currentMessageParts: Part[] = [];

    if (imageParts && imageParts.length > 0) {
      currentMessageParts.push(...imageParts);
    }
    currentMessageParts.push({ text: message });
    
    // contents.push({ role: "user", parts: currentMessageParts }); // This was for GenerateContentParameters { contents: ... } structure

    // fix: Change call to use { message: Part[] } structure, aligning with chat examples
    // The `message` property in `sendMessageStream` can accept `Part[]` for multi-part messages.
    const streamResult = await chatInstance.sendMessageStream({ message: currentMessageParts });
    
    async function* generateTextStream() {
      for await (const chunk of streamResult) {
        // fix: Removed invalid check for chunk.candidates?.[0]?.finishReason === "ERROR"
        // The FinishReason enum does not contain "ERROR". Outer try/catch handles general errors.
        if (!chunk.text && chunk.candidates?.[0]?.finishReason === FinishReason.SAFETY) { // fix: Use FinishReason.SAFETY
            console.warn("Content blocked due to safety reasons:", chunk);
            yield "[Content blocked due to safety policy. Please rephrase your query or try a different topic.]";
            return;
        }
        yield chunk.text;
      }
    }

    async function* generateSourcesStream() {
        for await (const chunk of streamResult) {
            yield chunk.candidates?.[0]?.groundingMetadata?.groundingChunks;
        }
    }

    return { 
        textStream: generateTextStream(),
        sourcesStream: generateSourcesStream() 
    };

  } catch (error) {
    console.error('Error sending message to Gemini:', error);
    // fix: Update error message, remove apiKeyManager.setApiKey("")
    if (error instanceof Error && (error.message.includes("API_KEY") || error.message.includes(" μπορούσε να επικυρωθεί") || error.message.includes("authentication"))) {
        // Do not clear API key as it's from env.
        // The user cannot change it.
        throw new Error("There was an issue with the AI service configuration. Please contact support.");
    }
    resetChat(); 
    throw error; 
  }
};

// Simple text generation (non-chat)
// fix: Removed apiKeyManager parameter
export const generateText = async (prompt: string): Promise<string> => {
  // fix: Call initializeAiClient without apiKeyManager
  if (!initializeAiClient() || !ai) {
    throw new Error("AI client not initialized. AI service might be unavailable or misconfigured.");
  }
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_CHAT_MODEL, 
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful assistant for Epignosis Hub." 
      }
    });
    return response.text;
  } catch (error) {
    console.error('Error generating text with Gemini:', error);
    // fix: Update error message, remove apiKeyManager.setApiKey("")
    if (error instanceof Error && (error.message.includes("API_KEY") || error.message.includes(" μπορούσε να επικυρωθεί") || error.message.includes("authentication"))) {
        throw new Error("There was an issue with the AI service configuration. Please contact support.");
    }
    throw error;
  }
};

// fix: isGeminiConfigured checks if the AI client could be initialized (implicitly checks process.env.API_KEY)
// This function's utility is reduced as the app must assume the key is set.
// It can indicate if initialization was successful.
export const isGeminiInitialized = (): boolean => {
  // Attempt to initialize if not already, and return success state
  if (!ai) {
    return initializeAiClient();
  }
  return true; // Was already initialized successfully
};
