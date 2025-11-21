/**
 * Extract service name from URL
 */
export const getServiceName = (url: string): string => {
  if (!url) return '';
  
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    const hostname = urlObj.hostname.toLowerCase();
    
    if (hostname.includes('linkedin.com')) return 'LinkedIn';
    if (hostname.includes('github.com')) return 'GitHub';
    if (hostname.includes('twitter.com') || hostname.includes('x.com')) return 'Twitter';
    if (hostname.includes('stackoverflow.com')) return 'StackOverflow';
    if (hostname.includes('behance.net')) return 'Behance';
    if (hostname.includes('dribbble.com')) return 'Dribbble';
    if (hostname.includes('medium.com')) return 'Medium';
    
    // Default: return the hostname without www
    return hostname.replace('www.', '').split('.')[0].charAt(0).toUpperCase() + hostname.replace('www.', '').split('.')[0].slice(1);
  } catch {
    // If URL parsing fails, return a cleaned version
    return url.replace(/^https?:\/\//, '').replace('www.', '').split('/')[0].split('.')[0];
  }
};

/**
 * Format URL to be clickable
 */
export const formatUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
};

/**
 * Safely get value or return empty string
 */
export const safeValue = (value: string | undefined | null): string => {
  if (!value || value === 'undefined' || value === 'null') return '';
  return value;
};

/**
 * Format date string to readable format
 */
export const formatDate = (dateString: string): string => {
  if (!dateString || dateString === 'undefined' || dateString.trim() === '') return '';
  
  // Handle different date formats
  const dateParts = dateString.split('-');
  if (dateParts.length < 2) return dateString; // Return as-is if not in expected format
  
  const year = dateParts[0];
  const month = dateParts[1];
  
  if (!year || !month) return '';
  
  const monthIndex = parseInt(month) - 1;
  if (isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) {
    // If month is invalid, just return the year
    return year || '';
  }
  
  const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  return `${monthNames[monthIndex].toUpperCase()} ${year}`;
};

