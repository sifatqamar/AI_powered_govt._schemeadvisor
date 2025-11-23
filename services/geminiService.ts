
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, Scheme } from '../types';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Generic model choice
const MODEL_NAME = 'gemini-2.5-flash';

export const generateSchemes = async (profile: UserProfile): Promise<Scheme[]> => {
  const prompt = `
    Based on the following user profile, suggest 6 highly relevant government schemes (focusing on the user's likely region based on location: ${profile.location}).
    
    User Profile:
    - Age: ${profile.age}
    - Gender: ${profile.gender}
    - Occupation: ${profile.occupation}
    - Income: ${profile.annualIncome}
    - Category: ${profile.category || 'General'}
    - Disability: ${profile.disability}

    Provide schemes that differ in category (Health, Education, Business, etc.) if applicable.
    Calculate a hypothetical "matchScore" (0-100) based on how well they fit the profile.
    Provide a valid-looking official URL (it can be a generic government portal link if specific one isn't known, e.g., https://www.india.gov.in/ or state portal).
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              provider: { type: Type.STRING },
              description: { type: Type.STRING },
              benefits: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              eligibilityCriteria: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              matchScore: { type: Type.INTEGER },
              applicationMethod: { type: Type.STRING, enum: ['Online', 'Offline', 'Hybrid'] },
              category: { type: Type.STRING, enum: ['Education', 'Health', 'Agriculture', 'Business', 'Housing', 'Social Welfare'] },
              officialLink: { type: Type.STRING }
            },
            required: ['id', 'name', 'provider', 'description', 'benefits', 'eligibilityCriteria', 'matchScore', 'applicationMethod', 'category', 'officialLink']
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    return JSON.parse(jsonText) as Scheme[];
  } catch (error) {
    console.error("Error fetching schemes:", error);
    return [];
  }
};

export const getChatResponse = async (history: {role: 'user' | 'model', text: string}[], message: string, context?: string): Promise<string> => {
  try {
    const systemInstruction = `You are SchemeXpert, an intelligent and empathetic government scheme advisor. 
    Your goal is to assist users in finding, understanding, and applying for government benefits, subsidies, and programs.
    Keep your answers concise, encouraging, and easy to understand for a general audience.
    
    ${context ? `Here is the context about the current user you are talking to:\n${context}\nUse this information to personalize your advice.` : ''}
    `;

    const chat = ai.chats.create({
      model: MODEL_NAME,
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      })),
      config: {
        systemInstruction: systemInstruction
      }
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I'm having trouble understanding right now. Please try again.";
  } catch (error) {
    console.error("Chat error", error);
    return "Sorry, I'm currently offline. Please try again later.";
  }
};
