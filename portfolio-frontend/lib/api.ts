const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchProjects() {
  try {
    const response = await fetch(`${API_URL}/api/projects/`, {
      cache: 'no-store', // Always fetch fresh data
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function fetchFeaturedProjects() {
  try {
    const response = await fetch(`${API_URL}/api/projects/featured/`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch featured projects');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}

export async function fetchProjectsByCategory(category: string) {
  try {
    const response = await fetch(`${API_URL}/api/projects/by_category/?category=${category}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects by category');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching projects by category:', error);
    return [];
  }
}

export function getImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath) {
    return '/placeholder-project.svg'; // Fallback image
  }
  
  // If it's already a full URL, return it
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Otherwise, construct the full URL
  return `${API_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
}
