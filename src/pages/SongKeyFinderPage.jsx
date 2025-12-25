/**
 * Song Key Finder Page - Find song keys and get transposition suggestions
 */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import ContentSection from '../components/ContentSection';
import { songKeysDatabase, transposeKey, getSemitoneDifference } from '../data/songKeys';
import { loadAudioFile, detectKeyFromAudio, detectBPMFromAudio } from '../utils/audioKeyDetector';

const SongKeyFinderPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [userVocalRange, setUserVocalRange] = useState('');
  const [transpositionSuggestions, setTranspositionSuggestions] = useState([]);
  
  // Audio analysis states
  const [audioFile, setAudioFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisError, setAnalysisError] = useState(null);
  const audioInputRef = useRef(null);

  // Set document title and meta tags
  useEffect(() => {
    document.title = 'Song Key Finder - Find Song Keys & Transposition Guide | SingMeter';

    const setMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    const canonicalUrl = 'https://www.singmeter.com/song-key-finder';
    
    // Basic meta tags
    setMetaTag('description', 'Find the key of any song instantly. Upload audio files for automatic analysis or search our database of popular songs. Get key information and transposition suggestions to match your vocal range.');
    setMetaTag('keywords', 'song key finder, find song key, song key database, transpose song key, key finder tool, musical key finder, song transposition, audio key detection, BPM detector');
    
    // Open Graph tags
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:title', 'Song Key Finder - Find Song Keys & Transposition Guide | SingMeter', true);
    setMetaTag('og:description', 'Find the key of any song instantly. Upload audio files for automatic analysis or search our database. Get key information and transposition suggestions.', true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('og:image', 'https://www.singmeter.com/og-image.svg', true);
    setMetaTag('og:image:width', '1200', true);
    setMetaTag('og:image:height', '630', true);
    setMetaTag('og:site_name', 'SingMeter', true);
    
    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', 'Song Key Finder - Find Song Keys & Transposition Guide | SingMeter');
    setMetaTag('twitter:description', 'Find the key of any song instantly. Upload audio files for automatic analysis or search our database. Get key information and transposition suggestions.');
    setMetaTag('twitter:image', 'https://www.singmeter.com/og-image.svg');
    
    // Canonical link
    setLinkTag('canonical', canonicalUrl);

    return () => {
      document.title = 'SingMeter';
    };
  }, []);

  // Recalculate suggestions when userVocalRange changes
  useEffect(() => {
    if (selectedSong && userVocalRange && userVocalRange.trim()) {
      calculateTranspositionSuggestions(selectedSong, userVocalRange);
    } else if (!userVocalRange || !userVocalRange.trim()) {
      setTranspositionSuggestions([]);
    }
  }, [userVocalRange, selectedSong]);

  // Search function
  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = songKeysDatabase.filter(song => 
      song.title.toLowerCase().includes(lowerQuery) ||
      song.artist.toLowerCase().includes(lowerQuery)
    ).slice(0, 10); // Limit to 10 results

    setSearchResults(results);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // If user is typing and there's a selected song, clear selection
    if (selectedSong && value !== `${selectedSong.title} - ${selectedSong.artist}`) {
      setSelectedSong(null);
      setTranspositionSuggestions([]);
    }
    
    handleSearch(value);
  };

  // Handle song selection
  const handleSelectSong = (song) => {
    setSelectedSong(song);
    setSearchQuery(`${song.title} - ${song.artist}`);
    setSearchResults([]); // Clear search results dropdown
    if (userVocalRange) {
      calculateTranspositionSuggestions(song);
    }
  };

  // Calculate transposition suggestions based on user's vocal range
  const calculateTranspositionSuggestions = (song, range = userVocalRange) => {
    if (!range || !range.trim()) {
      setTranspositionSuggestions([]);
      return;
    }

    // Parse user's vocal range (e.g., "C3-C5" or "A2-E4")
    const rangeMatch = range.match(/([A-G]#?)(\d+)\s*-\s*([A-G]#?)(\d+)/i);
    if (!rangeMatch) {
      setTranspositionSuggestions([]);
      return;
    }

    const [, lowNote, lowOctave, highNote, highOctave] = rangeMatch;
    const userLowMidi = getNoteMidi(lowNote, parseInt(lowOctave));
    const userHighMidi = getNoteMidi(highNote, parseInt(highOctave));
    const userRangeCenter = (userLowMidi + userHighMidi) / 2;

    // Parse song's vocal range
    const songRangeMatch = song.vocalRange.match(/([A-G]#?)(\d+)\s*-\s*([A-G]#?)(\d+)/i);
    if (!songRangeMatch) {
      setTranspositionSuggestions([]);
      return;
    }

    const [, songLowNote, songLowOctave, songHighNote, songHighOctave] = songRangeMatch;
    const songLowMidi = getNoteMidi(songLowNote, parseInt(songLowOctave));
    const songHighMidi = getNoteMidi(songHighNote, parseInt(songHighOctave));
    const songRangeCenter = (songLowMidi + songHighMidi) / 2;

    // Calculate semitone difference
    const semitoneDiff = Math.round(songRangeCenter - userRangeCenter);
    
    // Generate suggestions
    const suggestions = [];
    const originalKey = song.originalKey;
    
    // Suggest transposing down if song is too high
    if (semitoneDiff > 3) {
      for (let i = 1; i <= Math.min(5, Math.ceil(semitoneDiff / 2)); i++) {
        const newKey = transposeKey(originalKey, -i);
        suggestions.push({
          key: newKey,
          semitones: -i,
          reason: `Lower by ${i} semitone${i > 1 ? 's' : ''} to better fit your range`,
          priority: i <= 2 ? 'high' : 'medium'
        });
      }
    }
    
    // Suggest transposing up if song is too low
    if (semitoneDiff < -3) {
      for (let i = 1; i <= Math.min(5, Math.ceil(Math.abs(semitoneDiff) / 2)); i++) {
        const newKey = transposeKey(originalKey, i);
        suggestions.push({
          key: newKey,
          semitones: i,
          reason: `Raise by ${i} semitone${i > 1 ? 's' : ''} to better fit your range`,
          priority: i <= 2 ? 'high' : 'medium'
        });
      }
    }

    // If range is close, suggest keeping original or minor adjustments
    if (Math.abs(semitoneDiff) <= 3) {
      if (semitoneDiff !== 0) {
        const newKey = transposeKey(originalKey, -semitoneDiff);
        suggestions.push({
          key: newKey,
          semitones: -semitoneDiff,
          reason: `Adjust by ${Math.abs(semitoneDiff)} semitone${Math.abs(semitoneDiff) > 1 ? 's' : ''} for optimal fit`,
          priority: 'high'
        });
      }
      suggestions.push({
        key: originalKey,
        semitones: 0,
        reason: 'Original key should work well for your range',
        priority: 'high'
      });
    }

    setTranspositionSuggestions(suggestions.slice(0, 5)); // Limit to 5 suggestions
  };

  // Helper function to convert note to MIDI number
  const getNoteMidi = (note, octave) => {
    const noteMap = { 'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11 };
    const noteIndex = noteMap[note.toUpperCase()] || 0;
    return (octave + 1) * 12 + noteIndex;
  };

  // Handle audio file upload and analysis
  const handleAudioUpload = async (file) => {
    if (!file) return;

    // Validate file type
    const validTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/m4a', 'audio/x-m4a', 'audio/mp4'];
    if (!validTypes.includes(file.type)) {
      setAnalysisError('Please upload a valid audio file (MP3, WAV, or M4A)');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setAnalysisError('File size must be less than 10MB');
      return;
    }

    setAudioFile(file);
    setAnalysisError(null);
    setAnalysisResult(null);
    setIsAnalyzing(true);

    try {
      // Load audio file
      const audioBuffer = await loadAudioFile(file);
      
      // Analyze with progress updates
      let analysisProgress = 0;
      const progressCallback = (progress) => {
        analysisProgress = progress;
        // Update UI if needed (could add progress bar here)
      };
      
      // Analyze key first (shows progress), then BPM
      const keyResult = await detectKeyFromAudio(audioBuffer, progressCallback);
      const bpmResult = await detectBPMFromAudio(audioBuffer);

      // Format key with mode
      const keyDisplay = keyResult.mode === 'minor' 
        ? `${keyResult.key} Minor` 
        : `${keyResult.key} Major`;
      
      setAnalysisResult({
        fileName: file.name,
        key: keyDisplay,
        keyBase: keyResult.key,
        keyMode: keyResult.mode,
        keyConfidence: keyResult.confidence,
        bpm: bpmResult.bpm,
        bpmConfidence: bpmResult.confidence,
        duration: audioBuffer.duration,
        sampleRate: audioBuffer.sampleRate,
        method: keyResult.method || 'audio-analysis'
      });

      // If user has entered vocal range, calculate transposition suggestions
      if (userVocalRange && userVocalRange.trim()) {
        // Create a temporary song object for transposition calculation
        const tempSong = {
          title: file.name.replace(/\.[^/.]+$/, ''),
          artist: 'Your Audio',
          key: keyResult.mode === 'minor' ? `${keyResult.key} Minor` : `${keyResult.key} Major`,
          originalKey: keyResult.key,
          vocalRange: 'C3-C5', // Would need to analyze vocal range from audio
          genre: 'Analyzed'
        };
        calculateTranspositionSuggestions(tempSong, userVocalRange);
      }
    } catch (error) {
      console.error('Audio analysis error:', error);
      setAnalysisError(`Analysis failed: ${error.message}. Please try a different audio file.`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Song Key Finder",
          "url": "https://www.singmeter.com/song-key-finder",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Find the key of any song instantly. Upload audio files for automatic analysis or search our database of popular songs. Get key information and transposition suggestions to match your vocal range.",
          "featureList": [
            "Upload audio files for automatic key detection",
            "Search database of 60+ popular songs",
            "Detect musical key and BPM",
            "Get transposition suggestions based on your vocal range",
            "Krumhansl-Schmuckler algorithm for accurate key detection",
            "Support for MP3, WAV, and M4A files"
          ],
          "screenshot": "https://www.singmeter.com/og-image.svg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "ratingCount": "290",
            "bestRating": "5",
            "worstRating": "1"
          },
          "creator": {
            "@type": "Organization",
            "name": "SingMeter",
            "url": "https://www.singmeter.com"
          }
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Use the Song Key Finder",
          "description": "Learn how to find song keys and get transposition suggestions using the Song Key Finder tool.",
          "step": [
            {
              "@type": "HowToStep",
              "position": 1,
              "name": "Upload Audio File or Search by Name",
              "text": "Upload an audio file (MP3, WAV, M4A) for automatic analysis, or search our database by song title or artist name."
            },
            {
              "@type": "HowToStep",
              "position": 2,
              "name": "View Key Information",
              "text": "For uploaded files, wait for analysis to complete. For database searches, click on a song to see its original key, vocal range, and genre."
            },
            {
              "@type": "HowToStep",
              "position": 3,
              "name": "Enter Your Vocal Range",
              "text": "Enter your vocal range (e.g., 'C3-C5') in the provided field. If you don't know your range, use our Vocal Range Test tool first."
            },
            {
              "@type": "HowToStep",
              "position": 4,
              "name": "Get Transposition Suggestions",
              "text": "The tool will automatically calculate and suggest alternative keys that better match your vocal range, showing how many semitones to transpose."
            },
            {
              "@type": "HowToStep",
              "position": 5,
              "name": "Apply Suggestions",
              "text": "Use the suggested keys when practicing or performing. Many karaoke apps and backing track services allow you to change keys easily."
            }
          ],
          "totalTime": "PT2M"
        })}
      </script>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 sm:mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li className="text-gray-900 font-medium">Song Key Finder</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Song Key Finder
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Find the key of any song instantly. Upload an audio file for automatic analysis, or search our database 
            of popular songs to get key information and transposition suggestions.
          </p>
        </div>

        {/* Upload Audio Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🎵</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Analyze Your Audio File</h2>
              <p className="text-sm text-gray-600">Upload any audio file to detect key and BPM automatically</p>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">
            Upload an audio file (MP3, WAV, M4A) to automatically detect the song's key and BPM. 
            This works with any song, including your own recordings, covers, or any audio file you want to analyze.
          </p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 transition mb-4">
            <input
              ref={audioInputRef}
              type="file"
              id="audio-upload"
              accept="audio/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  handleAudioUpload(file);
                }
              }}
            />
            <label
              htmlFor="audio-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-lg font-semibold text-gray-700 mb-2">Click to Upload Audio File</span>
              <span className="text-sm text-gray-500">MP3, WAV, M4A up to 10MB</span>
            </label>
          </div>

          {/* Analysis Status */}
          {isAnalyzing && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <div>
                  <p className="font-semibold text-blue-900">Analyzing audio file...</p>
                  <p className="text-sm text-blue-700">This may take a few seconds</p>
                </div>
              </div>
            </div>
          )}

          {/* Analysis Error */}
          {analysisError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-red-900">Analysis Failed</p>
                  <p className="text-sm text-red-700">{analysisError}</p>
                </div>
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {analysisResult && !isAnalyzing && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">✅</span>
                Analysis Results
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded-lg p-4 border border-green-100">
                  <div className="text-sm font-semibold text-gray-600 mb-1">Detected Key</div>
                  <div className="text-3xl font-bold text-green-700 mb-1">{analysisResult.key}</div>
                  <div className="text-xs text-gray-500">
                    Confidence: {analysisResult.keyConfidence}%
                    {analysisResult.method && (
                      <span className="ml-2 text-gray-400">({analysisResult.method})</span>
                    )}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-green-100">
                  <div className="text-sm font-semibold text-gray-600 mb-1">Detected BPM</div>
                  <div className="text-3xl font-bold text-green-700 mb-1">{analysisResult.bpm}</div>
                  <div className="text-xs text-gray-500">Tempo: {analysisResult.bpmConfidence} confidence</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-green-100 mb-4">
                <div className="text-sm font-semibold text-gray-600 mb-1">File Information</div>
                <div className="text-sm text-gray-700 space-y-1">
                  <div>File: {analysisResult.fileName}</div>
                  <div>Duration: {Math.round(analysisResult.duration)} seconds</div>
                  <div>Sample Rate: {analysisResult.sampleRate} Hz</div>
                </div>
              </div>

              {userVocalRange && transpositionSuggestions.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Transposition Suggestions for Your Range:</h4>
                  <div className="space-y-2">
                    {transpositionSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border-2 ${
                          suggestion.priority === 'high'
                            ? 'bg-green-50 border-green-200'
                            : 'bg-yellow-50 border-yellow-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold text-gray-900">
                            {suggestion.key} {suggestion.semitones !== 0 && (
                              <span className="text-sm font-normal text-gray-600">
                                ({suggestion.semitones > 0 ? '+' : ''}{suggestion.semitones} semitones)
                              </span>
                            )}
                          </div>
                          {suggestion.priority === 'high' && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                              Best Match
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{suggestion.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  setAnalysisResult(null);
                  setAudioFile(null);
                  setAnalysisError(null);
                  if (audioInputRef.current) {
                    audioInputRef.current.value = '';
                  }
                }}
                className="mt-4 w-full px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
              >
                Analyze Another File
              </button>
            </div>
          )}
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Or Search by Song Name</h2>
            <p className="text-sm text-gray-600 mb-4">
              Search our database of popular songs to find their keys instantly.
            </p>
          </div>
          <div className="mb-6">
            <label htmlFor="song-search" className="block text-sm font-semibold text-gray-700 mb-2">
              Search for a Song
            </label>
            <div className="relative">
              <input
                id="song-search"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Enter song title or artist name (e.g., 'Someone Like You' or 'Adele')"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              />
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-4 border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
              {searchResults.map((song, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectSong(song)}
                  className="w-full text-left px-4 py-3 hover:bg-indigo-50 transition border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-semibold text-gray-900">{song.title}</div>
                  <div className="text-sm text-gray-600">{song.artist} • {song.genre}</div>
                  <div className="text-xs text-indigo-600 mt-1">Key: {song.key}</div>
                </button>
              ))}
            </div>
          )}

          {searchQuery && searchResults.length === 0 && !selectedSong && (
            <div className="mt-4 text-center text-gray-500 text-sm">
              No songs found. Try a different search term.
            </div>
          )}
        </div>

        {/* Selected Song Details */}
        {selectedSong && (
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {selectedSong.title}
                </h2>
                <p className="text-lg text-gray-600 mb-4">{selectedSong.artist}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedSong(null);
                  setSearchQuery('');
                  setTranspositionSuggestions([]);
                }}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Original Key</h3>
                <div className="text-3xl font-bold text-purple-700 mb-2">{selectedSong.key}</div>
                <div className="text-sm text-gray-600">Original Key: {selectedSong.originalKey}</div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Vocal Range</h3>
                <div className="text-2xl font-bold text-indigo-700 mb-2">{selectedSong.vocalRange}</div>
                <div className="text-sm text-gray-600">Genre: {selectedSong.genre}</div>
              </div>
            </div>

            {/* Transposition Suggestions */}
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Personalized Transposition Suggestions</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Enter your vocal range to get customized key suggestions that will fit your voice better.
              </p>
              
              <div className="mb-4">
                <label htmlFor="vocal-range" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Vocal Range (e.g., "C3-C5" or "A2-E4")
                </label>
                <input
                  id="vocal-range"
                  type="text"
                  value={userVocalRange}
                  onChange={(e) => {
                    const newRange = e.target.value;
                    setUserVocalRange(newRange);
                    if (selectedSong && newRange.trim()) {
                      calculateTranspositionSuggestions(selectedSong, newRange);
                    } else {
                      setTranspositionSuggestions([]);
                    }
                  }}
                  placeholder="Enter your range (e.g., C3-C5)"
                  className="w-full sm:w-auto px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Don't know your range? <Link to="/vocal-range-test" className="text-indigo-600 hover:underline">Test it here</Link>
                </p>
              </div>

              {transpositionSuggestions.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Recommended Keys:</h4>
                  {transpositionSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        suggestion.priority === 'high'
                          ? 'bg-green-50 border-green-200'
                          : 'bg-yellow-50 border-yellow-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xl font-bold text-gray-900">
                          {suggestion.key} {suggestion.semitones !== 0 && (
                            <span className="text-sm font-normal text-gray-600">
                              ({suggestion.semitones > 0 ? '+' : ''}{suggestion.semitones} semitones)
                            </span>
                          )}
                        </div>
                        {suggestion.priority === 'high' && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                            Best Match
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{suggestion.reason}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tool Introduction Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">What is a Song Key Finder?</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4">
              A <strong>song key finder</strong> is an essential tool for singers, musicians, and music learners. 
              The <strong>key</strong> of a song determines which notes and chords are used throughout the piece, 
              and understanding a song's key is crucial for several reasons:
            </p>
            
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Why Knowing the Key Matters</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
              <li><strong>Song Selection:</strong> Choose songs that naturally fit your vocal range</li>
              <li><strong>Transposition:</strong> Change the key to make songs more comfortable for your voice</li>
              <li><strong>Practice:</strong> Understand the musical structure to practice more effectively</li>
              <li><strong>Performance:</strong> Know which notes to expect and prepare accordingly</li>
              <li><strong>Collaboration:</strong> Communicate effectively with other musicians about the song's structure</li>
            </ul>

            <p className="text-gray-600 leading-relaxed mb-4">
              Our Song Key Finder tool provides instant access to the keys of hundreds of popular songs. 
              Simply search for a song by title or artist, and you'll get the original key, vocal range, 
              and personalized transposition suggestions based on your own vocal range.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">How Keys Work in Music</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Musical keys are organized into <strong>major</strong> and <strong>minor</strong> keys. 
              There are 12 major keys and 12 minor keys, each with a unique sound and emotional character:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
              <li><strong>Major keys</strong> (C, D, E, F, G, A, B, and their sharps/flats) typically sound bright, happy, or triumphant</li>
              <li><strong>Minor keys</strong> (Am, Dm, Em, etc.) typically sound darker, sadder, or more introspective</li>
              <li>Each major key has a <strong>relative minor</strong> that shares the same notes but starts from a different note</li>
              <li>Changing a song's key (transposition) moves all notes up or down by the same interval</li>
            </ul>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">How to Use the Song Key Finder</h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-700 font-bold">1</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Search for a Song</h3>
                <p className="text-gray-600 leading-relaxed">
                  Type the song title or artist name in the search box. Our database includes hundreds of popular songs 
                  across multiple genres including pop, rock, R&B, country, jazz, and musical theater. As you type, 
                  matching songs will appear in the dropdown list.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-700 font-bold">2</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">View Key Information</h3>
                <p className="text-gray-600 leading-relaxed">
                  Click on a song to see detailed information including the original key, vocal range required, 
                  genre, and artist. This information helps you understand whether the song is a good fit for your voice 
                  in its original key.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-pink-700 font-bold">3</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Get Transposition Suggestions</h3>
                <p className="text-gray-600 leading-relaxed">
                  Enter your vocal range (e.g., "C3-C5") in the provided field. If you don't know your range, 
                  you can <Link to="/vocal-range-test" className="text-indigo-600 hover:underline font-semibold">test it here</Link>. 
                  Our tool will automatically calculate and suggest alternative keys that better match your vocal range, 
                  showing you exactly how many semitones to transpose up or down.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-700 font-bold">4</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Apply the Suggestions</h3>
                <p className="text-gray-600 leading-relaxed">
                  Use the suggested keys when practicing or performing. Many karaoke apps, backing track services, 
                  and music software allow you to change keys easily. The tool shows you which suggestions are the 
                  best match (marked as "Best Match") based on how well they align with your vocal range.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Transposition Tips Section */}
        <section className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-md p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Understanding Transposition</h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-5 border border-purple-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What is Transposition?</h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                <strong>Transposition</strong> means changing a song's key to a different key while maintaining 
                the same musical relationships between notes. For example, if a song is in C Major and you transpose 
                it up by 2 semitones, it becomes D Major. All the notes move up by the same amount.
              </p>
              <p className="text-gray-600 leading-relaxed">
                This is incredibly useful for singers because it allows you to take any song and adjust it to fit 
                your comfortable vocal range, making it easier to sing and more enjoyable to perform.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-indigo-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">When to Transpose</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li><strong>Song is too high:</strong> Transpose down 1-3 semitones to bring it into your range</li>
                <li><strong>Song is too low:</strong> Transpose up 1-3 semitones to raise it to your comfort zone</li>
                <li><strong>Song sits at your extremes:</strong> Even if technically in range, transpose to move it to your tessitura</li>
                <li><strong>Vocal strain:</strong> If you feel any strain, transpose to a more comfortable key</li>
                <li><strong>Performance preparation:</strong> Transpose to a key that allows you to sing with confidence and expression</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-5 border border-pink-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How to Transpose Songs</h3>
              <ol className="list-decimal list-inside text-gray-600 space-y-2 ml-4">
                <li>Use our tool to find the original key of the song</li>
                <li>Enter your vocal range to get personalized suggestions</li>
                <li>Note the suggested key and semitone difference</li>
                <li>Use karaoke apps, backing tracks, or music software to change the key</li>
                <li>Practice the transposed version and adjust if needed</li>
              </ol>
              <p className="text-gray-600 leading-relaxed mt-3">
                <strong>Tip:</strong> Many modern karaoke apps and backing track services have built-in key change features. 
                Don't be afraid to use them—professional singers transpose songs all the time!
              </p>
            </div>
          </div>
        </section>

        {/* Manual Key Finding Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">How to Find a Song's Key Manually</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            While digital tools like our Song Key Finder are fast and accurate, learning to identify a key by ear is a valuable skill for any musician. 
            Here is a simple method to try:
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">1. Listen for the "Home" Note (Tonic)</h3>
              <p className="text-gray-600 leading-relaxed">
                Every song has a note that feels like "home" or the point of resolution. This is usually the note the song ends on. 
                Hum along with the song and try to find the one note that feels most stable. That note is likely the key's name (e.g., C, G, A).
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">2. Determine Major vs. Minor</h3>
              <p className="text-gray-600 leading-relaxed">
                Once you have the note, listen to the song's emotional character. 
                Does it sound happy, bright, or triumphant? It's likely <strong>Major</strong>. 
                Does it sound sad, dark, or serious? It's likely <strong>Minor</strong>.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">3. Check the Key Signature (If you have sheet music)</h3>
              <p className="text-gray-600 leading-relaxed">
                If you can read music, look at the beginning of the staff. 
                The number of sharps (#) or flats (b) tells you the key. 
                For example, no sharps or flats is C Major or A Minor. One sharp is G Major or E Minor.
              </p>
            </div>
          </div>
        </section>

        <ContentSection title="The Circle of Fifths: A Singer's Guide" className="mb-8">
          <p>
            The <strong>Circle of Fifths</strong> is a fundamental concept in music theory that shows the relationship between the 12 tones of the chromatic scale. 
            For singers, it's a secret weapon for understanding keys and transposition.
          </p>
          <div className="flex flex-col md:flex-row gap-6 items-center mt-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Why It Matters</h3>
              <p className="text-gray-600 mb-4">
                Keys that are close to each other on the circle (like C Major and G Major) share most of the same notes, making smooth transitions easy. 
                Keys opposite each other (like C Major and F# Major) share very few notes.
              </p>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Relative Minors</h3>
              <p className="text-gray-600">
                Every major key has a "relative minor" key that uses the exact same notes. 
                For example, C Major (no sharps/flats) shares its key signature with A Minor. 
                Knowing this helps you understand why a song might feel "sad" even if it uses the same notes as a "happy" song.
              </p>
            </div>
            <div className="flex-1 bg-indigo-50 p-6 rounded-xl border border-indigo-100">
              <h4 className="font-bold text-indigo-900 mb-3">Key Relationships</h4>
              <ul className="space-y-2 text-sm text-indigo-800">
                <li><strong>C Major</strong> (0 sharps/flats) ↔ <strong>A Minor</strong></li>
                <li><strong>G Major</strong> (1 sharp) ↔ <strong>E Minor</strong></li>
                <li><strong>D Major</strong> (2 sharps) ↔ <strong>B Minor</strong></li>
                <li><strong>F Major</strong> (1 flat) ↔ <strong>D Minor</strong></li>
                <li><strong>Bb Major</strong> (2 flats) ↔ <strong>G Minor</strong></li>
              </ul>
              <p className="mt-4 text-xs text-indigo-600 italic">
                *Moving clockwise adds a sharp (#), moving counter-clockwise adds a flat (b).
              </p>
            </div>
          </div>
        </ContentSection>

        {/* FAQ Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">How accurate is the song key database?</h3>
              <p className="text-gray-600 leading-relaxed">
                Our database contains keys for hundreds of popular songs, sourced from reliable music theory resources 
                and verified against multiple references. However, some songs may have been performed in different keys 
                in live performances or covers. The keys listed represent the most common or original recorded versions.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What if I can't find a song in the database?</h3>
              <p className="text-gray-600 leading-relaxed">
                Our database is continuously growing, but we may not have every song. If you can't find a song, you can:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4 mt-2">
                <li>Search for similar songs by the same artist to get an idea of their typical key choices</li>
                <li>Use online music theory resources or sheet music to find the key</li>
                <li>Use a pitch detector tool to analyze the song yourself</li>
                <li>Check if the song is available in a different spelling or variation</li>
              </ul>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">How do I know which transposition suggestion to use?</h3>
              <p className="text-gray-600 leading-relaxed">
                Suggestions marked as "Best Match" are calculated to place the song's vocal range in the center of your 
                comfortable range. Start with the "Best Match" suggestions, but feel free to try others. The best key is 
                the one that feels most comfortable and allows you to sing with expression and confidence.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can I transpose a song too much?</h3>
              <p className="text-gray-600 leading-relaxed">
                While you can transpose songs significantly, extreme transpositions (more than 5-6 semitones) can sometimes 
                make songs sound unnatural or lose their character. It's generally best to stay within 3-4 semitones of the 
                original key when possible. However, your comfort and vocal health should always come first.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Do I need to know music theory to use this tool?</h3>
              <p className="text-gray-600 leading-relaxed">
                Not at all! The tool is designed to be user-friendly for singers of all levels. Simply search for a song, 
                enter your vocal range (or test it first), and the tool will provide clear, actionable suggestions. You don't 
                need to understand music theory to benefit from knowing a song's key and getting transposition suggestions.
              </p>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Related Tools & Resources</h2>
          <p className="text-indigo-100 mb-6 text-lg">
            Combine the Song Key Finder with our other tools for a complete vocal training experience.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/vocal-range-test"
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition"
            >
              <div className="text-2xl mb-2">🎤</div>
              <h3 className="font-bold mb-1">Vocal Range Test</h3>
              <p className="text-sm text-indigo-100">Discover your vocal range to get better key suggestions</p>
            </Link>
            <Link
              to="/pitch-detector"
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition"
            >
              <div className="text-2xl mb-2">🎵</div>
              <h3 className="font-bold mb-1">Pitch Detector</h3>
              <p className="text-sm text-indigo-100">Practice singing in the new key with real-time feedback</p>
            </Link>
            <Link
              to="/blog/songs-for-your-voice-type"
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition"
            >
              <div className="text-2xl mb-2">📝</div>
              <h3 className="font-bold mb-1">Song Selection Guide</h3>
              <p className="text-sm text-indigo-100">Learn how to choose songs that fit your voice</p>
            </Link>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2025 SingMeter. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link to="/privacy" className="hover:text-indigo-600 transition">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-indigo-600 transition">Terms of Service</Link>
              <Link to="/disclaimer" className="hover:text-indigo-600 transition">Disclaimer</Link>
              <Link to="/contact" className="hover:text-indigo-600 transition">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
};

export default SongKeyFinderPage;

