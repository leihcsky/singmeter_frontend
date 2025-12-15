/**
 * Song Key Database
 * Contains popular songs with their original keys and vocal ranges
 * This database can be expanded over time
 */

export const songKeysDatabase = [
  // Pop Songs
  { title: 'Someone Like You', artist: 'Adele', key: 'A Major', originalKey: 'A', vocalRange: 'C3-F5', genre: 'Pop/Soul' },
  { title: 'Hello', artist: 'Adele', key: 'F Major', originalKey: 'F', vocalRange: 'C3-F5', genre: 'Pop/Soul' },
  { title: 'Rolling in the Deep', artist: 'Adele', key: 'C Minor', originalKey: 'Cm', vocalRange: 'C3-F5', genre: 'Pop/Soul' },
  { title: 'Set Fire to the Rain', artist: 'Adele', key: 'D Minor', originalKey: 'Dm', vocalRange: 'C3-F5', genre: 'Pop/Soul' },
  
  { title: 'Chandelier', artist: 'Sia', key: 'B Minor', originalKey: 'Bm', vocalRange: 'C4-C6', genre: 'Pop' },
  { title: 'Titanium', artist: 'Sia', key: 'D Minor', originalKey: 'Dm', vocalRange: 'C4-C6', genre: 'Pop' },
  { title: 'Elastic Heart', artist: 'Sia', key: 'C Minor', originalKey: 'Cm', vocalRange: 'C4-C6', genre: 'Pop' },
  
  { title: 'I Will Always Love You', artist: 'Whitney Houston', key: 'A Major', originalKey: 'A', vocalRange: 'A2-C6', genre: 'R&B' },
  { title: 'Greatest Love of All', artist: 'Whitney Houston', key: 'E Major', originalKey: 'E', vocalRange: 'A2-C6', genre: 'R&B' },
  { title: 'I Have Nothing', artist: 'Whitney Houston', key: 'D Major', originalKey: 'D', vocalRange: 'A2-C6', genre: 'R&B' },
  
  { title: 'Halo', artist: 'Beyoncé', key: 'E Major', originalKey: 'E', vocalRange: 'A2-E6', genre: 'R&B' },
  { title: 'Listen', artist: 'Beyoncé', key: 'A Major', originalKey: 'A', vocalRange: 'A2-E6', genre: 'R&B' },
  { title: 'Love on Top', artist: 'Beyoncé', key: 'C Major', originalKey: 'C', vocalRange: 'A2-E6', genre: 'R&B' },
  
  { title: 'Shallow', artist: 'Lady Gaga', key: 'G Major', originalKey: 'G', vocalRange: 'F3-G6', genre: 'Pop' },
  { title: 'Bad Romance', artist: 'Lady Gaga', key: 'A Minor', originalKey: 'Am', vocalRange: 'F3-G6', genre: 'Pop' },
  { title: 'Poker Face', artist: 'Lady Gaga', key: 'A Minor', originalKey: 'Am', vocalRange: 'F3-G6', genre: 'Pop' },
  
  { title: '7 Rings', artist: 'Ariana Grande', key: 'A Minor', originalKey: 'Am', vocalRange: 'D3-E7', genre: 'Pop' },
  { title: 'Thank U, Next', artist: 'Ariana Grande', key: 'F Major', originalKey: 'F', vocalRange: 'D3-E7', genre: 'Pop' },
  { title: 'Into You', artist: 'Ariana Grande', key: 'B Minor', originalKey: 'Bm', vocalRange: 'D3-E7', genre: 'Pop' },
  
  { title: 'All of Me', artist: 'John Legend', key: 'A Major', originalKey: 'A', vocalRange: 'A2-A4', genre: 'R&B' },
  { title: 'Ordinary People', artist: 'John Legend', key: 'C Major', originalKey: 'C', vocalRange: 'A2-A4', genre: 'R&B' },
  
  { title: 'Thinking Out Loud', artist: 'Ed Sheeran', key: 'D Major', originalKey: 'D', vocalRange: 'A2-A4', genre: 'Pop' },
  { title: 'Perfect', artist: 'Ed Sheeran', key: 'G Major', originalKey: 'G', vocalRange: 'A2-A4', genre: 'Pop' },
  { title: 'Shape of You', artist: 'Ed Sheeran', key: 'C# Minor', originalKey: 'C#m', vocalRange: 'A2-A4', genre: 'Pop' },
  
  { title: 'Uptown Funk', artist: 'Bruno Mars', key: 'D Minor', originalKey: 'Dm', vocalRange: 'A2-D6', genre: 'Pop' },
  { title: 'Just the Way You Are', artist: 'Bruno Mars', key: 'D Major', originalKey: 'D', vocalRange: 'A2-D6', genre: 'Pop' },
  { title: 'Grenade', artist: 'Bruno Mars', key: 'D Minor', originalKey: 'Dm', vocalRange: 'A2-D6', genre: 'Pop' },
  
  // Rock Songs
  { title: "Don't Stop Believin'", artist: 'Journey', key: 'E Major', originalKey: 'E', vocalRange: 'C3-C5', genre: 'Rock' },
  { title: 'Livin\' on a Prayer', artist: 'Bon Jovi', key: 'B Major', originalKey: 'B', vocalRange: 'C3-C5', genre: 'Rock' },
  { title: 'Bohemian Rhapsody', artist: 'Queen', key: 'B Major', originalKey: 'B', vocalRange: 'F2-F6', genre: 'Rock' },
  { title: 'We Will Rock You', artist: 'Queen', key: 'A Major', originalKey: 'A', vocalRange: 'F2-F6', genre: 'Rock' },
  { title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', key: 'D Major', originalKey: 'D', vocalRange: 'C3-C5', genre: 'Rock' },
  
  // Country Songs
  { title: 'Jolene', artist: 'Dolly Parton', key: 'C Major', originalKey: 'C', vocalRange: 'F3-F5', genre: 'Country' },
  { title: 'I Will Always Love You', artist: 'Dolly Parton', key: 'A Major', originalKey: 'A', vocalRange: 'F3-F5', genre: 'Country' },
  { title: 'Ring of Fire', artist: 'Johnny Cash', key: 'C Major', originalKey: 'C', vocalRange: 'E2-E4', genre: 'Country' },
  { title: 'Folsom Prison Blues', artist: 'Johnny Cash', key: 'E Major', originalKey: 'E', vocalRange: 'E2-E4', genre: 'Country' },
  
  // Jazz Standards
  { title: 'Fly Me to the Moon', artist: 'Frank Sinatra', key: 'C Major', originalKey: 'C', vocalRange: 'A2-A4', genre: 'Jazz' },
  { title: 'My Way', artist: 'Frank Sinatra', key: 'C Major', originalKey: 'C', vocalRange: 'A2-A4', genre: 'Jazz' },
  { title: 'New York, New York', artist: 'Frank Sinatra', key: 'C Major', originalKey: 'C', vocalRange: 'A2-A4', genre: 'Jazz' },
  { title: 'Summertime', artist: 'Ella Fitzgerald', key: 'A Minor', originalKey: 'Am', vocalRange: 'F3-F5', genre: 'Jazz' },
  { title: 'At Last', artist: 'Etta James', key: 'C Major', originalKey: 'C', vocalRange: 'F3-F5', genre: 'Jazz' },
  
  // Musical Theater
  { title: 'Defying Gravity', artist: 'Wicked', key: 'A Major', originalKey: 'A', vocalRange: 'C4-C6', genre: 'Musical Theater' },
  { title: 'Memory', artist: 'Cats', key: 'E Major', originalKey: 'E', vocalRange: 'A3-A5', genre: 'Musical Theater' },
  { title: 'On My Own', artist: 'Les Misérables', key: 'C Major', originalKey: 'C', vocalRange: 'A3-A5', genre: 'Musical Theater' },
  
  // More Pop Hits
  { title: 'Stay', artist: 'Rihanna', key: 'A Minor', originalKey: 'Am', vocalRange: 'A3-A5', genre: 'Pop' },
  { title: 'Diamonds', artist: 'Rihanna', key: 'B Minor', originalKey: 'Bm', vocalRange: 'A3-A5', genre: 'Pop' },
  { title: 'We Found Love', artist: 'Rihanna', key: 'A Minor', originalKey: 'Am', vocalRange: 'A3-A5', genre: 'Pop' },
  
  { title: 'Firework', artist: 'Katy Perry', key: 'C Major', originalKey: 'C', vocalRange: 'A3-A5', genre: 'Pop' },
  { title: 'Roar', artist: 'Katy Perry', key: 'C Major', originalKey: 'C', vocalRange: 'A3-A5', genre: 'Pop' },
  { title: 'Dark Horse', artist: 'Katy Perry', key: 'A Minor', originalKey: 'Am', vocalRange: 'A3-A5', genre: 'Pop' },
  
  { title: 'Blinding Lights', artist: 'The Weeknd', key: 'D Minor', originalKey: 'Dm', vocalRange: 'C3-C5', genre: 'Pop' },
  { title: 'Can\'t Feel My Face', artist: 'The Weeknd', key: 'A Minor', originalKey: 'Am', vocalRange: 'C3-C5', genre: 'Pop' },
  
  { title: 'Watermelon Sugar', artist: 'Harry Styles', key: 'A Major', originalKey: 'A', vocalRange: 'C3-C5', genre: 'Pop' },
  { title: 'As It Was', artist: 'Harry Styles', key: 'A Major', originalKey: 'A', vocalRange: 'C3-C5', genre: 'Pop' },
  
  { title: 'Levitating', artist: 'Dua Lipa', key: 'B Minor', originalKey: 'Bm', vocalRange: 'A3-A5', genre: 'Pop' },
  { title: 'Don\'t Start Now', artist: 'Dua Lipa', key: 'A Minor', originalKey: 'Am', vocalRange: 'A3-A5', genre: 'Pop' },
  
  { title: 'Good 4 U', artist: 'Olivia Rodrigo', key: 'A Minor', originalKey: 'Am', vocalRange: 'A3-A5', genre: 'Pop' },
  { title: 'Drivers License', artist: 'Olivia Rodrigo', key: 'B Major', originalKey: 'B', vocalRange: 'A3-A5', genre: 'Pop' },
  
  { title: 'Flowers', artist: 'Miley Cyrus', key: 'A Major', originalKey: 'A', vocalRange: 'C4-C6', genre: 'Pop' },
  { title: 'Wrecking Ball', artist: 'Miley Cyrus', key: 'A Minor', originalKey: 'Am', vocalRange: 'C4-C6', genre: 'Pop' },
  
  { title: 'Anti-Hero', artist: 'Taylor Swift', key: 'E Major', originalKey: 'E', vocalRange: 'A3-A5', genre: 'Pop' },
  { title: 'Shake It Off', artist: 'Taylor Swift', key: 'C Major', originalKey: 'C', vocalRange: 'A3-A5', genre: 'Pop' },
  { title: 'Love Story', artist: 'Taylor Swift', key: 'D Major', originalKey: 'D', vocalRange: 'A3-A5', genre: 'Pop' },
];

/**
 * Key conversion helper
 * Converts between major and relative minor keys
 */
export const keyConversions = {
  // Major to relative minor
  'C': 'Am', 'C#': 'A#m', 'D': 'Bm', 'D#': 'Cm', 'E': 'C#m', 'F': 'Dm',
  'F#': 'D#m', 'G': 'Em', 'G#': 'Fm', 'A': 'F#m', 'A#': 'Gm', 'B': 'G#m',
  // Minor to relative major
  'Am': 'C', 'A#m': 'C#', 'Bm': 'D', 'Cm': 'D#', 'C#m': 'E', 'Dm': 'F',
  'D#m': 'F#', 'Em': 'G', 'Fm': 'G#', 'F#m': 'A', 'Gm': 'A#', 'G#m': 'B',
};

/**
 * Get semitone difference between keys
 */
export const getSemitoneDifference = (key1, key2) => {
  const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const key1Base = key1.replace('m', '').replace(' Major', '').replace(' Minor', '');
  const key2Base = key2.replace('m', '').replace(' Major', '').replace(' Minor', '');
  
  const index1 = keys.indexOf(key1Base);
  const index2 = keys.indexOf(key2Base);
  
  if (index1 === -1 || index2 === -1) return 0;
  
  return (index2 - index1 + 12) % 12;
};

/**
 * Transpose key by semitones
 */
export const transposeKey = (originalKey, semitones) => {
  const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const isMinor = originalKey.includes('m') || originalKey.includes('Minor');
  const keyBase = originalKey.replace('m', '').replace(' Major', '').replace(' Minor', '');
  const currentIndex = keys.indexOf(keyBase);
  
  if (currentIndex === -1) return originalKey;
  
  const newIndex = (currentIndex + semitones + 12) % 12;
  const newKey = keys[newIndex];
  
  return isMinor ? `${newKey}m` : newKey;
};

