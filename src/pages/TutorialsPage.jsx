/**
 * Tutorials Page - Learning center for vocal training
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const TutorialsPage = () => {
  useEffect(() => {
    document.title = 'Vocal Training Tutorials - Step-by-Step Guides | SingMeter';

    const setMetaTag = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
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

    setMetaTag(
      'description',
      'Learn vocal techniques with our comprehensive step-by-step tutorials. From beginner basics to advanced vocal training, master your singing skills with expert guidance.'
    );
    setMetaTag(
      'keywords',
      'vocal training tutorials, singing lessons, vocal technique guides, learn to sing, vocal exercises, singing tutorials, voice training'
    );
    setLinkTag('canonical', 'https://www.singmeter.com/tutorials');

    return () => {
      document.title = 'SingMeter';
    };
  }, []);

  const beginnerTutorials = [
    {
      id: 'breathing-basics',
      title: 'Breathing Basics for Singers',
      description: 'Master the foundation of good singing with proper breathing techniques. Learn diaphragmatic breathing, breath support, and how to control your airflow.',
      detailedDescription: 'Proper breathing is the cornerstone of excellent singing. This comprehensive tutorial teaches you diaphragmatic breathing, the technique used by professional singers to support their voice. You\'ll learn how to engage your diaphragm, control your breath flow, and maintain steady airflow while singing. The tutorial includes step-by-step exercises, common mistakes to avoid, and practical tips for developing breath support. Understanding these fundamentals will dramatically improve your vocal power, control, and endurance. Perfect for absolute beginners who want to build a solid technical foundation.',
      duration: '15 min',
      level: 'Beginner',
      prerequisites: [],
      nextSteps: ['posture-for-singing', 'vocal-warm-up-basics'],
      link: '/blog/breathing-and-posture-for-singers'
    },
    {
      id: 'posture-for-singing',
      title: 'Proper Posture for Singing',
      description: 'Discover how correct posture affects your voice quality. Learn the optimal body alignment for maximum vocal power and control.',
      detailedDescription: 'Your body posture directly impacts your vocal quality, power, and range. This tutorial covers the optimal alignment for singing, including head position, shoulder placement, spine alignment, and foot positioning. You\'ll learn how proper posture opens your airways, allows for better breath support, and prevents vocal strain. The guide includes exercises to improve your posture, common posture mistakes that limit your voice, and how to maintain good alignment while performing. This fundamental skill works in combination with breathing techniques to create the foundation for all vocal development.',
      duration: '10 min',
      level: 'Beginner',
      prerequisites: ['breathing-basics'],
      nextSteps: ['vocal-warm-up-basics', 'finding-your-range'],
      link: '/blog/breathing-and-posture-for-singers'
    },
    {
      id: 'vocal-warm-up-basics',
      title: 'Essential Vocal Warm-Up Routine',
      description: 'Start your singing practice right with a complete warm-up routine. Includes lip trills, humming exercises, and scale practice.',
      detailedDescription: 'A proper warm-up routine is essential for protecting your voice and preparing it for practice or performance. This tutorial provides a complete 20-minute warm-up sequence that includes lip trills, humming exercises, gentle scales, and range-expanding exercises. You\'ll learn why warming up is crucial, how to gradually increase vocal intensity, and which exercises are best for different voice types. The routine is designed to improve flexibility, prevent injury, and enhance your vocal performance. Follow this routine before every practice session to maintain vocal health and improve your singing over time.',
      duration: '20 min',
      level: 'Beginner',
      prerequisites: ['breathing-basics', 'posture-for-singing'],
      nextSteps: ['finding-your-range', 'pitch-accuracy-basics'],
      link: '/blog/high-notes-warmup-routine'
    },
    {
      id: 'finding-your-range',
      title: 'How to Find Your Vocal Range',
      description: 'Step-by-step guide to discovering your lowest and highest notes. Learn to use our vocal range test tool effectively.',
      detailedDescription: 'Understanding your vocal range is crucial for selecting appropriate songs and identifying your voice type. This tutorial guides you through using our free vocal range test tool to accurately determine your lowest and highest singable notes. You\'ll learn proper testing techniques, how to distinguish between your comfortable range and extended range, and how to interpret your results. The tutorial also explains the difference between vocal range and voice type, helping you understand where your voice fits in the musical spectrum. Knowing your range helps you choose songs in the right key and track your progress as you expand your capabilities.',
      duration: '12 min',
      level: 'Beginner',
      prerequisites: ['vocal-warm-up-basics'],
      nextSteps: ['voice-types-explained', 'pitch-accuracy-basics'],
      link: '/vocal-range-test'
    },
    {
      id: 'pitch-accuracy-basics',
      title: 'Improving Pitch Accuracy: Beginner Guide',
      description: 'Learn the fundamentals of singing in tune. Practice exercises using our pitch detector tool to develop better pitch control.',
      detailedDescription: 'Singing in tune is one of the most important skills for any vocalist. This comprehensive beginner\'s guide teaches you the fundamentals of pitch accuracy, including how to hear and match pitches, common pitch problems (singing flat or sharp), and practical exercises to improve your intonation. You\'ll learn how to use our real-time pitch detector tool to get instant feedback on your accuracy, practice matching single notes, and develop the muscle memory needed for consistent pitch. The tutorial includes ear training exercises, breath support techniques that affect pitch, and step-by-step practice routines. Perfect for beginners who struggle with staying in tune or want to develop better pitch awareness.',
      duration: '18 min',
      level: 'Beginner',
      prerequisites: ['vocal-warm-up-basics'],
      nextSteps: ['voice-types-explained', 'ear-training'],
      link: '/blog/improve-singing-pitch'
    },
    {
      id: 'voice-types-explained',
      title: 'Understanding Voice Types',
      description: 'Learn about different voice classifications (Soprano, Alto, Tenor, Bass) and how to identify your own voice type.',
      detailedDescription: 'Voice classification helps you understand your vocal characteristics and choose appropriate repertoire. This tutorial explains the six main voice types (Soprano, Mezzo-Soprano, Alto, Tenor, Baritone, and Bass), including their typical ranges, timbre characteristics, and common repertoire. You\'ll learn how voice type differs from vocal range, what factors determine your classification, and how to identify your own voice type using our vocal range test. The guide also covers tessitura (comfortable range) and how it relates to voice type. Understanding your voice type helps you select songs that showcase your strengths and work within your natural capabilities.',
      duration: '14 min',
      level: 'Beginner',
      prerequisites: ['finding-your-range'],
      nextSteps: ['song-selection', 'expanding-vocal-range'],
      link: '/blog/how-to-find-your-voice-type'
    }
  ];

  const intermediateTutorials = [
    {
      id: 'expanding-vocal-range',
      title: 'Expanding Your Vocal Range Safely',
      description: 'Advanced techniques to extend your range without straining. Learn proper technique for reaching higher and lower notes.',
      detailedDescription: 'Expanding your vocal range requires patience, proper technique, and understanding of vocal registers. This intermediate tutorial teaches you safe methods to extend both your upper and lower range without causing strain or damage. You\'ll learn about vocal registers (chest, head, and mixed voice), how to access notes beyond your current range, and exercises specifically designed to expand your capabilities. The guide emphasizes safety first, teaching you to recognize signs of strain and how to avoid common mistakes that can damage your voice. Includes progressive exercises, warm-up routines for range expansion, and techniques for maintaining your new range once achieved.',
      duration: '25 min',
      level: 'Intermediate',
      prerequisites: ['voice-types-explained', 'vocal-warm-up-basics'],
      nextSteps: ['head-voice-technique', 'belt-technique'],
      link: '/blog/singing-high-notes-techniques'
    },
    {
      id: 'vibrato-development',
      title: 'Developing Vibrato',
      description: 'Master the art of vibrato - learn how to develop and control this essential vocal technique for more expressive singing.',
      detailedDescription: 'Vibrato is the natural, pulsating variation in pitch that adds warmth and expressiveness to your voice. This tutorial teaches you how to develop and control vibrato, including exercises to find your natural vibrato, techniques for controlling its speed and width, and how to use it expressively in different musical styles. You\'ll learn the difference between natural and forced vibrato, common mistakes that create artificial-sounding vibrato, and exercises to develop this skill gradually. The guide also covers when to use vibrato and when to sing straight tone, helping you make artistic choices that enhance your performance.',
      duration: '22 min',
      level: 'Intermediate',
      prerequisites: ['pitch-accuracy-basics', 'expanding-vocal-range'],
      nextSteps: ['head-voice-technique', 'mixed-voice-mastery'],
      link: '/blog/singing-high-notes-techniques'
    },
    {
      id: 'head-voice-technique',
      title: 'Mastering Head Voice',
      description: 'Learn to access and strengthen your head voice. Techniques for smooth transitions between chest and head voice.',
      detailedDescription: 'Head voice is the lighter, higher register that many singers struggle to access. This comprehensive tutorial teaches you how to find, strengthen, and control your head voice. You\'ll learn the physical sensations of head voice, exercises to develop it, and techniques for smooth transitions between chest and head voice (the "passaggio" or break). The guide covers common problems like breathy head voice, difficulty accessing head voice, and how to blend registers for a unified sound. Includes specific exercises for different voice types, troubleshooting tips, and how to use head voice expressively in your singing. Essential for singers who want to expand their upper range and achieve a balanced vocal sound.',
      duration: '20 min',
      level: 'Intermediate',
      prerequisites: ['expanding-vocal-range', 'vocal-warm-up-basics'],
      nextSteps: ['mixed-voice-mastery', 'belt-technique'],
      link: '/blog/mixed-voice-vs-head-voice'
    },
    {
      id: 'belt-technique',
      title: 'Belt Technique for High Notes',
      description: 'Learn to belt high notes safely and powerfully. Proper technique to avoid vocal strain while maintaining power.',
      detailedDescription: 'Belting is a powerful singing technique that allows you to sing high notes with intensity and volume, commonly used in musical theater and contemporary styles. This tutorial teaches you how to belt safely without straining your voice. You\'ll learn the difference between healthy belting and unhealthy shouting, proper breath support for belting, resonance techniques that amplify your sound, and how to avoid common injuries. The guide includes exercises to develop your belt range, techniques for transitioning into and out of belt, and how to maintain vocal health while belting. Essential for singers who want to perform contemporary musical theater, pop, or rock styles that require powerful high notes.',
      duration: '28 min',
      level: 'Intermediate',
      prerequisites: ['head-voice-technique'],
      nextSteps: ['mixed-voice-mastery', 'vocal-runs'],
      link: '/blog/belt-high-notes-safely'
    },
    {
      id: 'song-selection',
      title: 'Choosing Songs for Your Voice',
      description: 'How to select songs that showcase your voice type and range. Tips for finding the perfect key and arrangement.',
      detailedDescription: 'Selecting the right songs is crucial for showcasing your voice and building confidence. This tutorial teaches you how to choose songs that match your voice type, range, and skill level. You\'ll learn how to analyze a song\'s vocal requirements, determine the right key for your voice, and identify songs that highlight your strengths. The guide covers repertoire selection for different voice types, how to adapt songs to fit your range, and tips for finding songs that challenge you appropriately. Includes resources for discovering new repertoire, understanding song structure, and making artistic choices that showcase your unique voice. Perfect for singers preparing for auditions or performances.',
      duration: '15 min',
      level: 'Intermediate',
      prerequisites: ['voice-types-explained', 'finding-your-range'],
      nextSteps: ['performance-technique', 'recording-vocals'],
      link: '/blog/songs-for-your-voice-type'
    },
    {
      id: 'ear-training',
      title: 'Ear Training for Singers',
      description: 'Develop your musical ear to improve pitch accuracy and harmony singing. Exercises for interval recognition and pitch matching.',
      detailedDescription: 'A well-trained ear is essential for accurate pitch, harmony singing, and musical expression. This comprehensive tutorial teaches you ear training techniques specifically designed for singers. You\'ll learn interval recognition (the distance between notes), how to match pitches accurately, relative pitch development, and exercises for improving your musical memory. The guide includes practical exercises you can do daily, how to use our pitch detector tool for ear training, and techniques for hearing and singing harmonies. Perfect for singers who struggle with pitch accuracy or want to improve their ability to sing in harmony with others. The skills you develop here will enhance all aspects of your singing.',
      duration: '30 min',
      level: 'Intermediate',
      prerequisites: ['pitch-accuracy-basics'],
      nextSteps: ['vocal-runs', 'performance-technique'],
      link: '/blog/ear-training-for-singers'
    },
    {
      id: 'vocal-health',
      title: 'Vocal Health and Maintenance',
      description: 'Essential practices to keep your voice healthy. Learn about hydration, rest, and warning signs of vocal problems.',
      detailedDescription: 'Maintaining vocal health is essential for long-term singing success. This tutorial covers everything you need to know about caring for your voice, including proper hydration, vocal rest, warm-up and cool-down routines, and lifestyle factors that affect your voice. You\'ll learn warning signs of vocal problems, when to seek professional help, how to recover from vocal fatigue, and preventive practices to avoid injury. The guide includes dietary recommendations, environmental factors to consider, and how to balance practice with rest. Essential for all singers, especially those who sing regularly or professionally. Understanding vocal health helps you maintain your voice throughout your singing career.',
      duration: '18 min',
      level: 'Intermediate',
      prerequisites: ['vocal-warm-up-basics'],
      nextSteps: ['belt-technique', 'performance-technique'],
      link: '/blog/belt-high-notes-safely'
    }
  ];

  const advancedTutorials = [
    {
      id: 'mixed-voice-mastery',
      title: 'Mastering Mixed Voice',
      description: 'Advanced techniques for blending chest and head voice seamlessly. Achieve a unified vocal sound across your entire range.',
      detailedDescription: 'Mixed voice is the advanced technique of blending chest and head voice to create a seamless, unified sound across your entire range. This comprehensive tutorial teaches you how to master this challenging skill, including exercises to develop mixed voice, techniques for smooth register transitions, and how to maintain consistent tone quality throughout your range. You\'ll learn about the different types of mix (light mix, heavy mix), how to adjust your mix for different styles, and troubleshooting common problems. The guide includes advanced exercises, practice routines, and techniques used by professional singers. Essential for advanced singers who want to eliminate register breaks and achieve a professional, unified vocal sound.',
      duration: '35 min',
      level: 'Advanced',
      prerequisites: ['head-voice-technique', 'belt-technique'],
      nextSteps: ['vocal-runs', 'performance-technique'],
      link: '/blog/mixed-voice-vs-head-voice'
    },
    {
      id: 'vocal-runs',
      title: 'Vocal Runs and Riffs',
      description: 'Learn to execute fast vocal runs and riffs with precision. Exercises for agility and accuracy in melismatic passages.',
      detailedDescription: 'Vocal runs and riffs are fast, intricate melodic passages that showcase vocal agility and precision. This advanced tutorial teaches you how to execute these challenging techniques with accuracy and musicality. You\'ll learn exercises to develop vocal agility, techniques for maintaining pitch accuracy in fast passages, and how to practice runs and riffs gradually. The guide covers different types of runs (scalar, arpeggiated, chromatic), how to build speed safely, and how to add runs and riffs expressively to songs. Includes practice routines, common mistakes to avoid, and how to develop the muscle memory needed for consistent execution. Perfect for advanced singers who want to add impressive vocal embellishments to their performances.',
      duration: '40 min',
      level: 'Advanced',
      prerequisites: ['ear-training', 'mixed-voice-mastery'],
      nextSteps: ['performance-technique', 'recording-vocals'],
      link: '/blog/singing-high-notes-techniques'
    },
    {
      id: 'performance-technique',
      title: 'Performance Technique and Stage Presence',
      description: 'Beyond vocal technique - learn how to connect with your audience, manage performance anxiety, and deliver compelling performances.',
      detailedDescription: 'Great singing technique is only half the equation - connecting with your audience and delivering compelling performances requires additional skills. This tutorial covers performance technique, including stage presence, audience connection, managing performance anxiety, and delivering emotionally engaging performances. You\'ll learn how to use body language, facial expressions, and movement to enhance your performance, techniques for managing nerves, and how to recover from mistakes gracefully. The guide includes rehearsal strategies, mental preparation techniques, and how to adapt your performance for different venues and audiences. Essential for singers who want to move beyond technical proficiency to create memorable, moving performances.',
      duration: '32 min',
      level: 'Advanced',
      prerequisites: ['song-selection', 'ear-training'],
      nextSteps: ['recording-vocals'],
      link: '/blog/songs-for-your-voice-type'
    },
    {
      id: 'recording-vocals',
      title: 'Recording Your Voice Professionally',
      description: 'Tips for getting the best vocal recordings at home. Microphone techniques, room setup, and post-production basics.',
      detailedDescription: 'Recording your voice professionally requires different techniques than live performance. This tutorial teaches you how to get studio-quality vocal recordings at home, including microphone selection and placement, room acoustics and treatment, recording techniques, and basic post-production. You\'ll learn how to position yourself relative to the microphone, techniques for consistent recording levels, how to use our pitch detector tool to check your recordings, and basic editing concepts. The guide covers equipment recommendations for different budgets, how to create a home recording space, and common recording mistakes to avoid. Perfect for singers who want to create demos, record covers, or produce their own music.',
      duration: '28 min',
      level: 'Advanced',
      prerequisites: ['performance-technique', 'pitch-accuracy-basics'],
      nextSteps: [],
      link: '/blog/use-pitch-detector-for-training'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li className="text-gray-900 font-medium">Tutorials</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Vocal Training Tutorials
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Master your singing skills with our comprehensive step-by-step guides. From beginner basics to advanced techniques, we've got you covered.
          </p>
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6 max-w-3xl mx-auto text-left rounded-r-lg">
            <p className="text-sm text-gray-700">
              <strong>📚 Learning Path:</strong> Our tutorials are organized by skill level to help you progress systematically. Each tutorial includes detailed guides, practical exercises, and links to our interactive tools. Start with beginner tutorials to build a strong foundation, then advance to intermediate and advanced techniques as you improve.
            </p>
          </div>
          
          {/* Quick Start Guide */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 sm:p-8 mb-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="text-3xl mr-3">🚀</span>
              Quick Start Guide
            </h2>
            <p className="text-gray-700 mb-6">
              Not sure where to begin? Follow this recommended learning path based on your experience level:
            </p>
            
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                  <span className="text-xl mr-2">🌱</span>
                  Complete Beginner (Never sung before)
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm ml-6">
                  <li>Start with <strong>Breathing Basics for Singers</strong> - Learn the foundation</li>
                  <li>Then <strong>Proper Posture for Singing</strong> - Set up your body correctly</li>
                  <li>Practice <strong>Essential Vocal Warm-Up Routine</strong> - Protect your voice</li>
                  <li>Take <strong>How to Find Your Vocal Range</strong> - Discover your voice</li>
                  <li>Work on <strong>Improving Pitch Accuracy</strong> - Learn to sing in tune</li>
                </ol>
              </div>
              
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                  <span className="text-xl mr-2">🎵</span>
                  Some Experience (Can sing basic songs)
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm ml-6">
                  <li>Review <strong>Essential Vocal Warm-Up Routine</strong> - Ensure proper warm-up</li>
                  <li>Take <strong>How to Find Your Vocal Range</strong> - Confirm your range</li>
                  <li>Focus on <strong>Improving Pitch Accuracy</strong> - Refine your intonation</li>
                  <li>Learn <strong>Understanding Voice Types</strong> - Know your classification</li>
                  <li>Progress to <strong>Expanding Your Vocal Range</strong> - Extend your capabilities</li>
                </ol>
              </div>
              
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                  <span className="text-xl mr-2">⭐</span>
                  Experienced Singer (Regular performer)
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm ml-6">
                  <li>Master <strong>Head Voice Technique</strong> - Develop upper register</li>
                  <li>Learn <strong>Belt Technique for High Notes</strong> - Add power safely</li>
                  <li>Study <strong>Mastering Mixed Voice</strong> - Eliminate register breaks</li>
                  <li>Practice <strong>Vocal Runs and Riffs</strong> - Add vocal agility</li>
                  <li>Refine <strong>Performance Technique</strong> - Connect with audiences</li>
                </ol>
              </div>
            </div>
          </div>
          
          {/* Learning Path Diagram */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 mb-8 max-w-4xl mx-auto shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-3xl mr-3">🗺️</span>
              Learning Path Map
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              This visual guide shows how tutorials connect and build upon each other. Follow the arrows to see the recommended progression.
            </p>
            
            <div className="space-y-6">
              {/* Beginner Path */}
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-bold text-gray-900 mb-3 text-green-700">🌱 Beginner Foundation</h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">1.</span>
                    <span>Breathing Basics</span>
                    <span className="text-gray-400">→</span>
                    <span>Posture</span>
                    <span className="text-gray-400">→</span>
                    <span>Warm-Up</span>
                  </div>
                  <div className="flex items-center space-x-2 ml-6">
                    <span className="text-gray-400">↓</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">2.</span>
                    <span>Find Your Range</span>
                    <span className="text-gray-400">→</span>
                    <span>Voice Types</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">3.</span>
                    <span>Pitch Accuracy</span>
                    <span className="text-gray-400">→</span>
                    <span>Ear Training</span>
                  </div>
                </div>
              </div>
              
              {/* Intermediate Path */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-gray-900 mb-3 text-blue-700">📈 Intermediate Development</h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">4.</span>
                    <span>Expand Range</span>
                    <span className="text-gray-400">→</span>
                    <span>Head Voice</span>
                    <span className="text-gray-400">→</span>
                    <span>Mixed Voice</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">5.</span>
                    <span>Belt Technique</span>
                    <span className="text-gray-400">→</span>
                    <span>Vocal Health</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">6.</span>
                    <span>Song Selection</span>
                    <span className="text-gray-400">→</span>
                    <span>Performance</span>
                  </div>
                </div>
              </div>
              
              {/* Advanced Path */}
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-bold text-gray-900 mb-3 text-purple-700">⭐ Advanced Mastery</h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">7.</span>
                    <span>Mixed Voice Mastery</span>
                    <span className="text-gray-400">→</span>
                    <span>Vocal Runs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">8.</span>
                    <span>Performance Technique</span>
                    <span className="text-gray-400">→</span>
                    <span>Recording Vocals</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>💡 Tip:</strong> While tutorials build on each other, you can also jump to specific topics that interest you. Each tutorial includes prerequisites and next steps to help you navigate your learning journey.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📚</span>
              <span>17+ Tutorials</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⏱️</span>
              <span>10-40 min each</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎯</span>
              <span>All Skill Levels</span>
            </div>
          </div>
        </div>

        {/* Beginner Tutorials */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Beginner Tutorials</h2>
              <p className="text-gray-600">Start your singing journey with these foundational lessons</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beginnerTutorials.map((tutorial) => (
              <Link
                key={tutorial.id}
                to={tutorial.link}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    {tutorial.level}
                  </span>
                  <span className="text-sm text-gray-500">{tutorial.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition">
                  {tutorial.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {tutorial.description}
                </p>
                {tutorial.detailedDescription && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-4">
                      {tutorial.detailedDescription}
                    </p>
                  </div>
                )}
                {(tutorial.prerequisites && tutorial.prerequisites.length > 0) && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Prerequisites:</p>
                    <div className="flex flex-wrap gap-1">
                      {tutorial.prerequisites.map((prereq, idx) => {
                        const prereqTutorial = [...beginnerTutorials, ...intermediateTutorials, ...advancedTutorials].find(t => t.id === prereq);
                        return prereqTutorial ? (
                          <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                            {prereqTutorial.title}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
                <div className="flex items-center text-indigo-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  Start Tutorial
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Intermediate Tutorials */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Intermediate Tutorials</h2>
              <p className="text-gray-600">Build on your foundation with these intermediate techniques</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {intermediateTutorials.map((tutorial) => (
              <Link
                key={tutorial.id}
                to={tutorial.link}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                    {tutorial.level}
                  </span>
                  <span className="text-sm text-gray-500">{tutorial.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition">
                  {tutorial.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {tutorial.description}
                </p>
                {tutorial.detailedDescription && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-4">
                      {tutorial.detailedDescription}
                    </p>
                  </div>
                )}
                {(tutorial.prerequisites && tutorial.prerequisites.length > 0) && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Prerequisites:</p>
                    <div className="flex flex-wrap gap-1">
                      {tutorial.prerequisites.map((prereq, idx) => {
                        const prereqTutorial = [...beginnerTutorials, ...intermediateTutorials, ...advancedTutorials].find(t => t.id === prereq);
                        return prereqTutorial ? (
                          <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                            {prereqTutorial.title}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
                <div className="flex items-center text-indigo-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  Start Tutorial
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Advanced Tutorials */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Advanced Tutorials</h2>
              <p className="text-gray-600">Master advanced techniques for professional-level singing</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedTutorials.map((tutorial) => (
              <Link
                key={tutorial.id}
                to={tutorial.link}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                    {tutorial.level}
                  </span>
                  <span className="text-sm text-gray-500">{tutorial.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition">
                  {tutorial.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {tutorial.description}
                </p>
                {tutorial.detailedDescription && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-4">
                      {tutorial.detailedDescription}
                    </p>
                  </div>
                )}
                {(tutorial.prerequisites && tutorial.prerequisites.length > 0) && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Prerequisites:</p>
                    <div className="flex flex-wrap gap-1">
                      {tutorial.prerequisites.map((prereq, idx) => {
                        const prereqTutorial = [...beginnerTutorials, ...intermediateTutorials, ...advancedTutorials].find(t => t.id === prereq);
                        return prereqTutorial ? (
                          <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                            {prereqTutorial.title}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
                <div className="flex items-center text-indigo-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  Start Tutorial
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-center text-white mb-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-indigo-100 mb-6 text-lg max-w-2xl mx-auto">
            Use our free tools to practice what you learn. Test your vocal range, improve your pitch accuracy, and track your progress.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/vocal-range-test"
              className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition"
            >
              Test Your Vocal Range
            </Link>
            <Link
              to="/pitch-detector"
              className="inline-flex items-center px-6 py-3 bg-indigo-700 text-white font-bold rounded-lg hover:bg-indigo-800 transition"
            >
              Try Pitch Detector
            </Link>
          </div>
        </section>

        {/* Related Resources */}
        <section className="bg-white rounded-2xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/blog"
              className="group p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition"
            >
              <div className="text-3xl mb-2">📝</div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-indigo-600">Blog Articles</h3>
              <p className="text-sm text-gray-600">Read in-depth articles on vocal techniques and training</p>
            </Link>
            <Link
              to="/resources"
              className="group p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition"
            >
              <div className="text-3xl mb-2">📦</div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600">Resources</h3>
              <p className="text-sm text-gray-600">Discover tools, books, and apps to enhance your training</p>
            </Link>
            <Link
              to="/glossary"
              className="group p-4 bg-pink-50 rounded-xl hover:bg-pink-100 transition"
            >
              <div className="text-3xl mb-2">📖</div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-pink-600">Glossary</h3>
              <p className="text-sm text-gray-600">Learn vocal terminology and concepts</p>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2026 SingMeter. All rights reserved.</p>
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
  );
};

export default TutorialsPage;
