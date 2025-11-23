
export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
  PreferNotToSay = 'Prefer not to say'
}

export enum EmploymentStatus {
  Student = 'Student',
  Unemployed = 'Unemployed',
  Employed = 'Employed',
  SelfEmployed = 'Self-Employed',
  Retired = 'Retired',
  Farmer = 'Farmer'
}

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  location: string; // State or City
  occupation: EmploymentStatus;
  annualIncome: number;
  category?: string; // e.g., General, SC, ST, OBC
  disability: boolean;
}

export interface Scheme {
  id: string;
  name: string;
  provider: string; // "Central Gov", "State Gov", etc.
  description: string;
  benefits: string[];
  eligibilityCriteria: string[];
  matchScore: number; // 0 to 100
  applicationMethod: 'Online' | 'Offline' | 'Hybrid';
  category: 'Education' | 'Health' | 'Agriculture' | 'Business' | 'Housing' | 'Social Welfare';
  officialLink: string; // New field for redirection
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
