export interface Project {
  id?: number;
  title: string;
  slug: string;
  description: string;
  category: 'Systems' | 'Web' | 'Mobile' | 'AI';
  technologies: string | string[]; // Can be string from API or array
  github_url?: string;
  live_url?: string;
  githubUrl?: string; // Keep for backward compatibility
  liveUrl?: string; // Keep for backward compatibility
  image?: string | null;
  featured: boolean;
  status: string;
  impact?: string | null;
  created_at?: string;
}
