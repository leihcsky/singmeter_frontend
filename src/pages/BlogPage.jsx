/**
 * Blog Page - Educational Articles
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

// Blog Articles Data
export const blogArticles = [
  {
    id: 'how-to-test-vocal-range',
    slug: 'how-to-test-vocal-range',
    title: 'How to Test Your Vocal Range: A Complete Guide',
    category: 'Guides',
    readTime: '5 min read',
    date: '2025-01-31',
    excerpt: 'Learn the professional methods to accurately test and measure your singing range. Discover online tools, piano methods, and tips for accurate results.',
    content: `
      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">Understanding Vocal Range</h2>
      <p class="text-gray-600 mb-4 leading-relaxed">
        Your <strong>vocal range</strong> is the span between the lowest and highest notes you can comfortably sing. 
        It's one of the most important characteristics of your voice and helps determine your voice type classification 
        (Bass, Baritone, Tenor, Alto, Mezzo-Soprano, or Soprano).
      </p>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Test Your Vocal Range?</h2>
      <p class="text-gray-600 mb-4 leading-relaxed">
        Testing your vocal range provides several benefits:
      </p>
      <ul class="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
        <li><strong>Song Selection:</strong> Choose songs that fit your natural range</li>
        <li><strong>Voice Classification:</strong> Identify your voice type for choir or ensemble work</li>
        <li><strong>Progress Tracking:</strong> Monitor improvements in your vocal training</li>
        <li><strong>Vocal Health:</strong> Avoid straining by staying within your comfortable range</li>
        <li><strong>Professional Development:</strong> Essential information for auditions and performances</li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Methods to Test Your Vocal Range</h2>
      
      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Online Vocal Range Test (Recommended)</h3>
      <p class="text-gray-600 mb-4 leading-relaxed">
        Modern online tools like SingMeter use advanced pitch detection technology to accurately measure your vocal range. 
        This method is quick, accurate, and provides instant results. Simply sing into your device's microphone, and the 
        software analyzes your pitch in real-time.
      </p>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Piano or Keyboard Method</h3>
      <p class="text-gray-600 mb-4 leading-relaxed">
        If you have access to a piano or keyboard, you can manually test your range by matching pitches. Start at middle C 
        and sing along with each note, moving up and down the keyboard until you reach your comfortable limits. Record the 
        lowest and highest notes you can sing clearly.
      </p>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Professional Voice Assessment</h3>
      <p class="text-gray-600 mb-4 leading-relaxed">
        A vocal coach or voice teacher can provide the most comprehensive assessment. They'll not only measure your range 
        but also evaluate your vocal quality, technique, and potential for development.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Tips for Accurate Testing</h2>
      <ul class="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
        <li><strong>Warm Up First:</strong> Do gentle vocal exercises before testing</li>
        <li><strong>Quiet Environment:</strong> Test in a quiet room for best results</li>
        <li><strong>Comfortable Volume:</strong> Sing at a moderate, comfortable volume</li>
        <li><strong>Don't Force It:</strong> Stop if you feel strain or discomfort</li>
        <li><strong>Test Multiple Times:</strong> Your range can vary by time of day and vocal condition</li>
        <li><strong>Use Quality Equipment:</strong> A good microphone improves accuracy for online tests</li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Understanding Your Results</h2>
      <p class="text-gray-600 mb-4 leading-relaxed">
        Once you know your range, you can identify your voice type:
      </p>
      <ul class="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
        <li><strong>Bass:</strong> E2 to E4 (lowest male voice)</li>
        <li><strong>Baritone:</strong> A2 to A4 (middle male voice)</li>
        <li><strong>Tenor:</strong> C3 to C5 (highest male voice)</li>
        <li><strong>Alto:</strong> F3 to F5 (lowest female voice)</li>
        <li><strong>Mezzo-Soprano:</strong> A3 to A5 (middle female voice)</li>
        <li><strong>Soprano:</strong> C4 to C6 (highest female voice)</li>
      </ul>

      <div class="bg-indigo-50 border-l-4 border-indigo-400 p-6 mt-8 rounded-r-lg">
        <p class="text-indigo-700 leading-relaxed">
          <strong>Ready to test your vocal range?</strong> Use SingMeter's free online vocal range test to get 
          accurate results in just 3 minutes. No signup required!
        </p>
        <a href="/" class="inline-block mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
          Start Your Test
        </a>
      </div>
    `
  },
  {
    id: 'singing-high-notes-techniques',
    slug: 'singing-high-notes-techniques',
    title: 'How to Sing High Notes: Techniques and Tips',
    category: 'Techniques',
    readTime: '6 min read',
    date: '2025-01-30',
    excerpt: 'Master the art of singing high notes with these proven vocal techniques. Learn about breath support, vocal placement, and exercises to expand your range.',
    content: `
      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">The Challenge of High Notes</h2>
      <p class="text-gray-600 mb-4 leading-relaxed">
        Singing high notes is one of the most challenging aspects of vocal performance. Many singers struggle with 
        reaching their upper range comfortably, often experiencing strain, tension, or a "breaking" voice. However, 
        with proper technique and practice, anyone can improve their ability to sing high notes.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Essential Techniques for High Notes</h2>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Proper Breath Support</h3>
      <p class="text-gray-600 mb-4 leading-relaxed">
        Breath support is the foundation of singing high notes. Use diaphragmatic breathing to provide steady, 
        controlled airflow. Imagine your breath supporting the note from below, rather than pushing from your throat.
      </p>
      <ul class="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
        <li>Breathe deeply into your lower abdomen</li>
        <li>Keep your shoulders relaxed and down</li>
        <li>Maintain consistent air pressure throughout the note</li>
        <li>Avoid "running out of breath" by taking strategic breaths</li>
      </ul>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Vocal Placement and Resonance</h3>
      <p class="text-gray-600 mb-4 leading-relaxed">
        High notes require forward placement and proper resonance. Think of directing the sound toward your "mask" 
        (the area around your nose and cheekbones) rather than pushing from your throat.
      </p>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Reduce Tension</h3>
      <p class="text-gray-600 mb-4 leading-relaxed">
        Tension is the enemy of high notes. Keep your jaw, tongue, and neck relaxed. Many singers unconsciously 
        tense up when attempting high notes, which actually makes them harder to reach.
      </p>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Use Mixed Voice</h3>
      <p class="text-gray-600 mb-4 leading-relaxed">
        Mixed voice (or "mix") blends chest voice and head voice, allowing you to sing high notes with power and 
        control. This technique prevents the "flip" or "break" that occurs when transitioning between registers.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Exercises to Improve High Range</h2>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">Lip Trills</h3>
      <p class="text-gray-600 mb-4 leading-relaxed">
        Blow air through loosely closed lips while singing scales. This exercise reduces tension and helps you 
        find the right amount of air pressure for high notes.
      </p>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">Sirens</h3>
      <p class="text-gray-600 mb-4 leading-relaxed">
        Glide smoothly from your lowest to highest note on a "ng" or "oo" sound. This helps you navigate your 
        entire range without breaks.
      </p>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">Octave Jumps</h3>
      <p class="text-gray-600 mb-4 leading-relaxed">
        Practice jumping between low and high notes on vowel sounds. This builds the muscle memory needed for 
        quick transitions to high notes.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Mistakes to Avoid</h2>
      <ul class="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
        <li><strong>Pushing or Forcing:</strong> Never force high notes - this can damage your voice</li>
        <li><strong>Lifting Your Chin:</strong> Keep your chin level or slightly down</li>
        <li><strong>Closing Your Throat:</strong> Maintain an open throat position</li>
        <li><strong>Insufficient Warm-Up:</strong> Always warm up before attempting high notes</li>
        <li><strong>Ignoring Pain:</strong> Stop immediately if you feel pain or strain</li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Building Your High Range Over Time</h2>
      <p class="text-gray-600 mb-4 leading-relaxed">
        Expanding your high range takes time and consistent practice. Here's how to approach it:
      </p>
      <ul class="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
        <li><strong>Practice Daily:</strong> Even 15-20 minutes of focused practice helps</li>
        <li><strong>Gradual Progression:</strong> Extend your range by a semitone at a time</li>
        <li><strong>Track Your Progress:</strong> Use SingMeter to monitor your range expansion</li>
        <li><strong>Stay Hydrated:</strong> Drink plenty of water to keep vocal cords healthy</li>
        <li><strong>Rest When Needed:</strong> Give your voice time to recover</li>
      </ul>

      <div class="bg-purple-50 border-l-4 border-purple-400 p-6 mt-8 rounded-r-lg">
        <p class="text-purple-700 leading-relaxed">
          <strong>Pro Tip:</strong> Test your vocal range regularly with SingMeter to track your progress as you 
          develop your high note technique. Seeing measurable improvement is a great motivator!
        </p>
        <a href="/" class="inline-block mt-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition">
          Test Your Range
        </a>
      </div>
    `
  },
  {
    id: 'songs-for-your-voice-type',
    slug: 'songs-for-your-voice-type',
    title: 'Best Songs for Your Voice Type',
    category: 'Song Selection',
    readTime: '7 min read',
    date: '2025-01-29',
    excerpt: 'Discover the perfect songs that match your vocal range and voice type. From Bass to Soprano, find repertoire that showcases your voice.',
    content: `
      <h2 class="text-2xl font-bold text-gray-900 mt-6 mb-4">Choosing Songs That Fit Your Voice</h2>
      <p class="text-gray-600 mb-4 leading-relaxed">
        Selecting songs that match your voice type and vocal range is crucial for successful performances and 
        enjoyable singing experiences. Singing songs that are too high or too low can strain your voice and 
        prevent you from showcasing your best qualities.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Songs for Bass Voices (E2-E4)</h2>
      <p class="text-gray-600 mb-4 leading-relaxed">
        Bass voices are the lowest male voices, characterized by rich, deep tones. Great songs for bass singers include:
      </p>
      <ul class="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
        <li><strong>"Old Man River"</strong> - Jerome Kern (from Show Boat)</li>
        <li><strong>"Sixteen Tons"</strong> - Merle Travis</li>
        <li><strong>"Ring of Fire"</strong> - Johnny Cash</li>
        <li><strong>"Can't Help Falling in Love"</strong> - Elvis Presley</li>
        <li><strong>"Unchained Melody"</strong> - The Righteous Brothers</li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Songs for Baritone Voices (A2-A4)</h2>
      <p class="text-gray-600 mb-4 leading-relaxed">
        Baritones have the most common male voice type, with a warm, versatile range:
      </p>
      <ul class="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
        <li><strong>"Fly Me to the Moon"</strong> - Frank Sinatra</li>
        <li><strong>"Hallelujah"</strong> - Leonard Cohen</li>
        <li><strong>"Wonderwall"</strong> - Oasis</li>
        <li><strong>"Let It Be"</strong> - The Beatles</li>
        <li><strong>"Your Song"</strong> - Elton John</li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Songs for Tenor Voices (C3-C5)</h2>
      <p class="text-gray-600 mb-4 leading-relaxed">
        Tenors are the highest male voice type, known for bright, powerful high notes:
      </p>
      <ul class="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
        <li><strong>"Nessun Dorma"</strong> - Giacomo Puccini</li>
        <li><strong>"Don't Stop Believin'"</strong> - Journey</li>
        <li><strong>"Bohemian Rhapsody"</strong> - Queen</li>
        <li><strong>"Livin' on a Prayer"</strong> - Bon Jovi</li>
        <li><strong>"I Want It That Way"</strong> - Backstreet Boys</li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Songs for Alto Voices (F3-F5)</h2>
      <p class="text-gray-600 mb-4 leading-relaxed">
        Altos have the lowest female voice type, with rich, warm tones:
      </p>
      <ul class="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
        <li><strong>"Someone Like You"</strong> - Adele</li>
        <li><strong>"Jolene"</strong> - Dolly Parton</li>
        <li><strong>"Summertime"</strong> - Ella Fitzgerald</li>
        <li><strong>"At Last"</strong> - Etta James</li>
        <li><strong>"Valerie"</strong> - Amy Winehouse</li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Songs for Mezzo-Soprano Voices (A3-A5)</h2>
      <p class="text-gray-600 mb-4 leading-relaxed">
        Mezzo-sopranos have a versatile middle-range female voice:
      </p>
      <ul class="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
        <li><strong>"Rolling in the Deep"</strong> - Adele</li>
        <li><strong>"Respect"</strong> - Aretha Franklin</li>
        <li><strong>"Halo"</strong> - Beyoncé</li>
        <li><strong>"Shallow"</strong> - Lady Gaga</li>
        <li><strong>"Titanium"</strong> - Sia</li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Songs for Soprano Voices (C4-C6)</h2>
      <p class="text-gray-600 mb-4 leading-relaxed">
        Sopranos are the highest female voice type, capable of brilliant high notes:
      </p>
      <ul class="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
        <li><strong>"I Will Always Love You"</strong> - Whitney Houston</li>
        <li><strong>"The Climb"</strong> - Miley Cyrus</li>
        <li><strong>"Chandelier"</strong> - Sia</li>
        <li><strong>"Listen"</strong> - Beyoncé</li>
        <li><strong>"And I Am Telling You"</strong> - Jennifer Hudson</li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Tips for Song Selection</h2>
      <ul class="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
        <li><strong>Know Your Range:</strong> Test your vocal range with SingMeter first</li>
        <li><strong>Consider Tessitura:</strong> Choose songs that sit comfortably in your range</li>
        <li><strong>Match Your Style:</strong> Select genres that suit your voice quality</li>
        <li><strong>Transpose When Needed:</strong> Don't be afraid to change the key</li>
        <li><strong>Practice Gradually:</strong> Start with easier songs and progress to challenging ones</li>
      </ul>

      <div class="bg-pink-50 border-l-4 border-pink-400 p-6 mt-8 rounded-r-lg">
        <p class="text-pink-700 leading-relaxed">
          <strong>Not sure of your voice type?</strong> Take SingMeter's free vocal range test to discover your 
          voice classification and get personalized song recommendations!
        </p>
        <a href="/" class="inline-block mt-4 px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition">
          Discover Your Voice Type
        </a>
      </div>
    `
  }
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Vocal Training <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert tips, techniques, and guides to help you discover and develop your singing voice
          </p>
        </div>

        {/* Blog Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogArticles.map((article) => (
            <Link
              key={article.id}
              to={`/blog/${article.slug}`}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500">{article.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform">
                  <span>Read More</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Discover Your Vocal Range?
          </h2>
          <p className="text-indigo-100 text-lg mb-6 max-w-2xl mx-auto">
            Use SingMeter's free online vocal range test to discover your voice type and singing capabilities in just 3 minutes.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition"
          >
            Start Your Free Test
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">© 2025 SingMeter. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
              <span>•</span>
              <Link to="/blog" className="hover:text-indigo-600 transition">Blog</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;

