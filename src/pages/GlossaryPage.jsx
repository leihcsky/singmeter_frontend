/**
 * Glossary Page - Vocal terminology dictionary
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const GlossaryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    document.title = 'Vocal Glossary - Singing Terms & Definitions | SingMeter';

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
      'Comprehensive glossary of vocal and singing terminology. Learn the definitions of vocal range, tessitura, falsetto, vibrato, and other important singing terms.'
    );
    setMetaTag(
      'keywords',
      'vocal glossary, singing terms, vocal terminology, singing dictionary, voice types, vocal range glossary, singing definitions'
    );
    setLinkTag('canonical', 'https://www.singmeter.com/glossary');

    return () => {
      document.title = 'SingMeter';
    };
  }, []);

  const terms = [
    {
      term: 'Vocal Range',
      category: 'Range & Voice Types',
      definition: 'Vocal range refers to the span of notes that a singer can produce, from their lowest comfortable note to their highest comfortable note. It is typically measured in octaves or semitones and is one of the primary factors used to classify voice types. Your vocal range includes all the notes you can sing clearly and consistently, not just the extreme notes you might be able to hit occasionally. Understanding your vocal range helps you choose appropriate songs, avoid vocal strain, and communicate effectively with vocal coaches or choir directors.',
      example: 'A tenor might have a vocal range from C3 to C5, spanning two octaves.'
    },
    {
      term: 'Tessitura',
      category: 'Range & Voice Types',
      definition: 'Tessitura refers to the range of notes where a singer is most comfortable and where their voice sounds best. Unlike vocal range, which measures the absolute lowest and highest notes, tessitura describes the "sweet spot" where a singer can perform for extended periods without strain. A song\'s tessitura is the range where most of its notes lie. Understanding your tessitura is crucial for choosing songs that showcase your voice effectively and allow you to sing comfortably throughout the entire piece.',
      example: 'A soprano might have a range from C4 to C6, but her tessitura (comfortable zone) might be E4 to A5.'
    },
    {
      term: 'Voice Type',
      category: 'Range & Voice Types',
      definition: 'Voice type is a classification system used to categorize singers based on their vocal range, tessitura, and vocal quality. The main classifications are Soprano, Mezzo-Soprano, Alto (for female voices), and Tenor, Baritone, Bass (for male voices). Voice type helps singers choose appropriate repertoire, find their place in choirs, and understand their vocal capabilities. However, it\'s important to remember that voice type is a guideline, not a limitation, and many singers can sing outside their typical classification with proper training.',
      example: 'A singer with a range from F3 to F5 and a warm, rich tone might be classified as an Alto.'
    },
    {
      term: 'Falsetto',
      category: 'Vocal Techniques',
      definition: 'Falsetto is a vocal register characterized by a breathy, light quality that is typically higher than a singer\'s normal speaking or singing voice. In falsetto, the vocal cords vibrate in a different way than in chest voice, producing a thinner, more airy sound. Falsetto is commonly used by male singers to reach notes above their chest voice range, but it can also be used as a stylistic choice. It\'s important to distinguish falsetto from head voice, as they are different vocal mechanisms, though they can sound similar.',
      example: 'A baritone might use falsetto to sing notes above C5 that are difficult to reach in chest voice.'
    },
    {
      term: 'Head Voice',
      category: 'Vocal Techniques',
      definition: 'Head voice is a vocal register that feels like the sound is resonating in the head rather than the chest. It is produced when the vocal cords vibrate in a specific way that creates a lighter, more focused tone than chest voice but with more connection and power than falsetto. Head voice is an essential part of a singer\'s upper range and is crucial for singing high notes with control and beauty. Developing head voice allows singers to access their full range smoothly and avoid strain when singing in higher registers.',
      example: 'When singing a high note like C5, many singers transition from chest voice to head voice to maintain control and avoid strain.'
    },
    {
      term: 'Chest Voice',
      category: 'Vocal Techniques',
      definition: 'Chest voice is the lower register of the voice, characterized by a rich, full, and powerful sound that resonates in the chest. It is the natural speaking voice register and is typically used for lower and middle-range notes. Chest voice feels grounded and connected, with vibrations felt in the chest area. Most singers use chest voice for the majority of their range, transitioning to head voice or mixed voice for higher notes. Proper use of chest voice provides the foundation for a strong, supported vocal sound.',
      example: 'When singing a low note like C3, a singer uses chest voice, which feels powerful and resonant.'
    },
    {
      term: 'Mixed Voice',
      category: 'Vocal Techniques',
      definition: 'Mixed voice, also called middle voice or blended voice, is a vocal technique that combines elements of both chest voice and head voice. It creates a seamless, unified sound across the vocal range, eliminating the "break" or "crack" that can occur when transitioning between registers. Mixed voice is achieved by gradually adjusting the vocal cord vibration and resonance placement, allowing singers to maintain power and connection throughout their range. Mastering mixed voice is essential for professional-level singing and is one of the most important techniques for expanding vocal range.',
      example: 'A singer using mixed voice can sing from C4 to G5 without an audible register break, maintaining consistent tone quality.'
    },
    {
      term: 'Vibrato',
      category: 'Vocal Techniques',
      definition: 'Vibrato is a slight, rapid variation in pitch that adds warmth, expressiveness, and beauty to the voice. It occurs naturally when the voice is well-supported and relaxed, typically at a rate of 5-7 oscillations per second. Vibrato is not the same as tremolo (variation in volume) or wobble (slow, uncontrolled pitch variation). Healthy vibrato develops naturally with proper vocal technique, breath support, and relaxation. It is considered a sign of vocal maturity and is often used as an expressive tool in classical and contemporary singing.',
      example: 'A well-trained singer\'s voice naturally includes vibrato when singing sustained notes, adding richness to the tone.'
    },
    {
      term: 'Pitch',
      category: 'Fundamentals',
      definition: 'Pitch refers to how high or low a musical note sounds, determined by the frequency of sound wave vibrations. Higher frequencies produce higher pitches, while lower frequencies produce lower pitches. Pitch is measured in Hertz (Hz), with A4 (the A above middle C) typically tuned to 440 Hz. Accurate pitch is fundamental to good singing - singers must be able to match the intended pitch of notes in a song. Pitch accuracy can be improved through ear training, vocal technique, and practice with tools like pitch detectors.',
      example: 'Middle C (C4) has a frequency of approximately 261.63 Hz, while the C an octave higher (C5) has a frequency of 523.25 Hz.'
    },
    {
      term: 'Intonation',
      category: 'Fundamentals',
      definition: 'Intonation refers to the accuracy of pitch in singing or playing music. Good intonation means singing in tune - hitting the correct pitch consistently. Poor intonation can mean singing flat (below the target pitch), sharp (above the target pitch), or with inconsistent pitch. Intonation is affected by breath support, vocal technique, ear training, and physical factors like fatigue or illness. Developing good intonation is essential for ensemble singing, harmony work, and professional performance.',
      example: 'A singer with excellent intonation can sing every note of a song exactly in tune, matching the intended pitches precisely.'
    },
    {
      term: 'Flat',
      category: 'Fundamentals',
      definition: 'Singing flat means producing a pitch that is slightly lower than the intended note. This is one of the most common pitch problems singers face. Flat singing can be caused by insufficient breath support, poor posture, vocal fatigue, or lack of ear training. It can also occur when singing notes at the bottom of your range or when transitioning between registers. Correcting flat singing requires developing proper breath support, improving ear training, and maintaining good vocal technique throughout your range.',
      example: 'If the target note is A4 (440 Hz) but you sing at 435 Hz, you are singing flat by approximately 20 cents.'
    },
    {
      term: 'Sharp',
      category: 'Fundamentals',
      definition: 'Singing sharp means producing a pitch that is slightly higher than the intended note. Sharp singing is less common than flat singing but can occur due to tension, over-singing, or pushing too hard. It often happens when singers strain to reach high notes or when they\'re nervous or tense. Sharp singing can also result from improper breath support or trying to sing louder than is comfortable. Correcting sharp singing requires relaxation, proper breath control, and learning to sing with less effort while maintaining pitch accuracy.',
      example: 'If the target note is A4 (440 Hz) but you sing at 445 Hz, you are singing sharp by approximately 20 cents.'
    },
    {
      term: 'Breath Support',
      category: 'Technique',
      definition: 'Breath support, also called breath control or diaphragmatic breathing, is the foundation of good vocal technique. It involves using the diaphragm and abdominal muscles to control the flow of air from the lungs, providing steady pressure to the vocal cords. Proper breath support allows singers to maintain consistent pitch, control volume, sustain long phrases, and avoid vocal strain. Without adequate breath support, singers may experience pitch problems, vocal fatigue, and difficulty projecting their voice. Breath support is developed through specific exercises and is essential for all levels of singing.',
      example: 'A singer with good breath support can hold a note steadily for 20 seconds without wavering in pitch or volume.'
    },
    {
      term: 'Diaphragm',
      category: 'Anatomy',
      definition: 'The diaphragm is a dome-shaped muscle located at the base of the lungs that plays a crucial role in breathing and vocal production. When you inhale, the diaphragm contracts and flattens, creating space for the lungs to expand. When you exhale, the diaphragm relaxes and returns to its dome shape. For singing, singers learn to control the diaphragm\'s movement to manage breath flow and support. Proper use of the diaphragm allows for controlled, steady exhalation that supports the voice. While you cannot directly control the diaphragm (it\'s an involuntary muscle), you can influence it through proper breathing technique and abdominal muscle engagement.',
      example: 'When taking a deep breath for singing, you should feel your abdomen expand as the diaphragm contracts and moves downward.'
    },
    {
      term: 'Resonance',
      category: 'Technique',
      definition: 'Resonance is the amplification and enrichment of sound that occurs when sound waves vibrate in the vocal tract (throat, mouth, and nasal cavities). Good resonance makes the voice sound fuller, richer, and more powerful without requiring more effort. Singers can adjust resonance by modifying the shape of their vocal tract - opening the throat, positioning the tongue, and adjusting the soft palate. Different resonance placements (chest, head, mask) create different vocal colors and are used for different styles of singing. Developing good resonance is key to producing a professional-sounding voice.',
      example: 'A singer with good resonance can fill a large hall with sound while using minimal physical effort.'
    },
    {
      term: 'Vocal Registers',
      category: 'Vocal Techniques',
      definition: 'Vocal registers are distinct ranges of the voice that are produced by different vocal cord configurations and resonance patterns. The main registers are chest voice (lower, fuller sound), head voice (higher, lighter sound), and falsetto (very high, breathy sound). Some singers also identify a middle or mixed register. Understanding and developing all registers allows singers to access their full range smoothly. The goal is to create a seamless transition between registers, eliminating breaks or cracks in the voice. Register development is a key component of vocal training.',
      example: 'A trained singer can smoothly transition from chest voice (C3-C4) through mixed voice (C4-G4) to head voice (G4-C6) without audible breaks.'
    },
    {
      term: 'Vocal Break',
      category: 'Vocal Techniques',
      definition: 'A vocal break, also called a passaggio or register break, is the point where the voice transitions between registers (typically between chest voice and head voice). An untrained singer may experience a noticeable "crack" or sudden change in tone quality at this transition point. With proper training, singers learn to smooth out this break through techniques like mixed voice, creating a seamless transition. The location of the break varies by voice type and individual singer. Eliminating or minimizing the vocal break is a primary goal of vocal training.',
      example: 'An untrained singer might experience a break around E4, where their voice suddenly shifts from chest to head voice with a noticeable crack.'
    },
    {
      term: 'Passaggio',
      category: 'Vocal Techniques',
      definition: 'Passaggio is the Italian term for the transition area between vocal registers, particularly the transition from chest voice to head voice. There are typically two passaggi: the primo passaggio (first passage) and the secondo passaggio (second passage). The primo passaggio is the lower transition point, and the secondo passaggio is the upper transition point. Learning to navigate the passaggio smoothly is essential for professional singing. This is achieved through proper breath support, vowel modification, and gradual register blending. The passaggio location varies by voice type.',
      example: 'A tenor\'s primo passaggio might be around E4, while a soprano\'s might be around E5.'
    },
    {
      term: 'Belting',
      category: 'Vocal Techniques',
      definition: 'Belting is a vocal technique used primarily in musical theater and contemporary styles where a singer uses a powerful, full-voiced sound in the upper range, typically above the passaggio. Unlike classical singing, which transitions to head voice for high notes, belting maintains chest voice quality into higher registers. When done correctly, belting is safe and powerful, but improper belting can cause vocal damage. Proper belting requires excellent breath support, proper technique, and should never involve strain or pushing. It\'s a specialized technique that requires training to master safely.',
      example: 'In musical theater, a singer might belt a high note like G4 or A4 with full chest voice power instead of transitioning to head voice.'
    },
    {
      term: 'Legato',
      category: 'Musical Terms',
      definition: 'Legato is a musical term meaning "smooth and connected." In singing, legato refers to singing notes in a smooth, flowing manner without breaks between them. This is achieved by maintaining consistent breath flow and smooth transitions between notes. Legato singing is essential for creating beautiful, lyrical phrases and is a fundamental skill in both classical and contemporary singing. It requires good breath control, proper vowel formation, and smooth register transitions. Legato is the opposite of staccato (short, detached notes).',
      example: 'A singer performing a legato phrase would connect each note smoothly, creating a flowing, seamless melody.'
    },
    {
      term: 'Staccato',
      category: 'Musical Terms',
      definition: 'Staccato is a musical term meaning "short and detached." In singing, staccato notes are sung briefly and separated by silence. This technique requires precise breath control and vocal coordination to start and stop notes cleanly. Staccato singing is used for rhythmic effect, articulation, and stylistic expression. It\'s the opposite of legato (smooth and connected). Singers must maintain proper breath support even when singing staccato to ensure each note is clear and well-supported.',
      example: 'In a staccato passage, each note is sung briefly and separated, creating a crisp, rhythmic effect.'
    },
    {
      term: 'Dynamics',
      category: 'Musical Terms',
      definition: 'Dynamics in singing refer to the variation in volume or intensity throughout a performance. Common dynamic markings include piano (soft), forte (loud), crescendo (gradually getting louder), and diminuendo (gradually getting softer). Good dynamic control allows singers to add expression and emotion to their performances. Dynamics are controlled through breath support, vocal technique, and emotional expression. Mastering dynamics is essential for musical interpretation and creating engaging performances.',
      example: 'A singer might start a phrase piano (softly), crescendo to forte (loud) at the climax, then diminuendo back to piano.'
    },
    {
      term: 'Articulation',
      category: 'Technique',
      definition: 'Articulation in singing refers to how clearly and precisely words and sounds are pronounced. Good articulation ensures that lyrics are understandable and that each consonant and vowel is produced clearly. This involves proper tongue placement, lip movement, and jaw position. Articulation must be balanced - too much can sound harsh, while too little can make lyrics unclear. Different styles of music require different levels of articulation. Classical singing typically requires very clear articulation, while some contemporary styles may use more relaxed articulation.',
      example: 'A singer with good articulation ensures that every word in a song is clear and understandable, even in the back row of a theater.'
    },
    {
      term: 'Vowel Modification',
      category: 'Technique',
      definition: 'Vowel modification is a technique where singers slightly alter vowel sounds when singing in different parts of their range to maintain optimal resonance and avoid strain. For example, an "ah" sound might be modified to sound more like "aw" in the upper range. This technique helps singers maintain consistent tone quality and access higher notes more easily. Vowel modification is particularly important when navigating the passaggio and singing in the upper register. It\'s a subtle adjustment that improves vocal efficiency.',
      example: 'When singing a high note, a singer might modify the vowel "ee" to sound slightly more like "ih" to maintain better resonance and avoid strain.'
    },
    {
      term: 'Vocal Fry',
      category: 'Vocal Techniques',
      definition: 'Vocal fry, also called creaky voice or pulse register, is the lowest vocal register, characterized by a creaky, popping sound. It occurs when the vocal cords vibrate very slowly and irregularly. Vocal fry can be used as a stylistic choice in contemporary singing, but excessive use can be harmful to the voice. Some singers use vocal fry to access very low notes, but it should be used sparingly and with proper technique. In speech pathology, vocal fry can indicate vocal problems, but in singing, it\'s sometimes used intentionally for effect.',
      example: 'A singer might use vocal fry at the very bottom of their range to reach extremely low notes, creating a creaky, textured sound.'
    },
    {
      term: 'Whistle Register',
      category: 'Vocal Techniques',
      definition: 'Whistle register, also called flageolet register, is the highest vocal register, producing very high, flute-like sounds. It is most commonly associated with female singers (like Mariah Carey) but can also be developed by some male singers. Whistle register notes are typically above C6 and can extend to C7 or higher. This register requires very specific vocal cord configuration and is difficult to control. While impressive, whistle register is not essential for most singers and should be developed carefully to avoid vocal damage.',
      example: 'A soprano might use whistle register to sing notes above C6, producing a very high, flute-like sound.'
    },
    {
      term: 'Vocal Warm-Up',
      category: 'Practice',
      definition: 'A vocal warm-up is a series of exercises performed before singing to prepare the voice for performance or practice. Warm-ups gradually increase blood flow to the vocal cords, improve flexibility, and prepare the voice for the demands of singing. A good warm-up typically includes breathing exercises, gentle humming, lip trills, scales, and range exercises. Warm-ups should start gently and gradually increase in intensity. Skipping warm-ups can lead to vocal strain and poor performance. Most singers need 10-20 minutes of warm-up before serious singing.',
      example: 'A typical warm-up might start with 5 minutes of breathing exercises, followed by lip trills, then gentle scales, gradually increasing in range and intensity.'
    },
    {
      term: 'Vocal Cool-Down',
      category: 'Practice',
      definition: 'A vocal cool-down is a series of gentle exercises performed after singing to help the voice recover and return to a relaxed state. Cool-downs typically include gentle humming, descending scales, and relaxation exercises. They help reduce vocal tension, prevent vocal fatigue, and maintain vocal health. Cool-downs are especially important after intense practice sessions or performances. Many singers neglect cool-downs, but they are an important part of vocal maintenance and can help prevent vocal problems.',
      example: 'After a performance, a singer might do 5-10 minutes of gentle descending scales and humming to help the voice recover.'
    },
    {
      term: 'Vocal Health',
      category: 'Health',
      definition: 'Vocal health refers to the practices and habits that maintain the voice in optimal condition. This includes proper hydration, adequate rest, avoiding vocal abuse, proper technique, and recognizing warning signs of vocal problems. Good vocal health is essential for singers at all levels. Factors that affect vocal health include hydration, sleep, diet, environment (humidity, air quality), and lifestyle habits (smoking, alcohol). Maintaining vocal health requires ongoing attention and care. Ignoring vocal health can lead to vocal damage and career-ending problems.',
      example: 'A singer maintaining good vocal health drinks plenty of water, gets adequate sleep, warms up before singing, and avoids shouting or speaking over loud noise.'
    },
    {
      term: 'Vocal Strain',
      category: 'Health',
      definition: 'Vocal strain occurs when the voice is used improperly or excessively, leading to discomfort, hoarseness, or vocal fatigue. Symptoms include throat pain, difficulty producing sound, hoarseness, and reduced range. Vocal strain can be caused by poor technique, overuse, singing outside your range, insufficient breath support, or environmental factors. Rest is usually the best treatment for vocal strain, along with addressing the underlying cause. Persistent vocal strain should be evaluated by a medical professional. Prevention through proper technique and vocal care is essential.',
      example: 'A singer who practices for hours without proper technique or rest might experience vocal strain, resulting in a hoarse, tired voice.'
    },
    {
      term: 'Laryngitis',
      category: 'Health',
      definition: 'Laryngitis is inflammation of the larynx (voice box) that causes hoarseness, loss of voice, or difficulty speaking. It can be caused by viral infections, vocal abuse, allergies, or other factors. For singers, laryngitis requires complete vocal rest - no singing, minimal speaking, and avoiding whispering (which can be more damaging than normal speech). Most cases resolve with rest, but persistent laryngitis requires medical attention. Singers should never try to "sing through" laryngitis as this can cause serious vocal damage.',
      example: 'A singer with laryngitis should rest their voice completely, drink plenty of fluids, and avoid singing until the inflammation subsides.'
    },
    {
      term: 'Vocal Nodules',
      category: 'Health',
      definition: 'Vocal nodules, also called singer\'s nodes, are small, benign growths on the vocal cords caused by vocal abuse or misuse. They typically develop from repeated trauma to the vocal cords, such as excessive shouting, poor technique, or singing with strain. Symptoms include hoarseness, breathiness, reduced range, and vocal fatigue. Treatment usually involves vocal rest, voice therapy, and addressing the underlying cause. In severe cases, surgery may be required. Prevention through proper technique and vocal care is crucial. Vocal nodules are a serious condition that requires medical attention.',
      example: 'A singer who consistently sings with poor technique and strain might develop vocal nodules, requiring medical treatment and voice therapy.'
    },
    {
      term: 'Sight Reading',
      category: 'Skills',
      definition: 'Sight reading is the ability to read and sing music notation at first sight without prior preparation. It\'s an essential skill for professional singers, especially in choral, opera, and musical theater settings. Sight reading requires knowledge of music theory, rhythm, pitch recognition, and the ability to quickly process musical information. This skill is developed through practice and training. Good sight readers can quickly understand key signatures, time signatures, rhythms, and melodic patterns. Sight reading is a valuable skill that opens up many performance opportunities.',
      example: 'A professional choir singer with good sight reading skills can learn a new piece of music quickly by reading the sheet music without hearing it first.'
    },
    {
      term: 'Ear Training',
      category: 'Skills',
      definition: 'Ear training is the development of the ability to recognize and reproduce musical elements by ear, including pitch, intervals, chords, and rhythms. For singers, ear training is essential for pitch accuracy, harmony singing, and musical understanding. It involves exercises like interval recognition, pitch matching, and melodic dictation. Good ear training allows singers to sing in tune, harmonize accurately, and learn songs by ear. This skill is developed through consistent practice and can significantly improve overall musical ability.',
      example: 'A singer with good ear training can hear a melody and sing it back accurately, or identify when they\'re singing flat or sharp.'
    },
    {
      term: 'Interval',
      category: 'Music Theory',
      definition: 'An interval is the distance between two musical notes, measured in semitones (half steps) or scale degrees. Common intervals include the octave (8 semitones), perfect fifth (7 semitones), major third (4 semitones), and minor second (1 semitone). Understanding intervals is crucial for ear training, harmony singing, and musical understanding. Singers use interval recognition to learn melodies, sing harmonies, and improve pitch accuracy. Interval training is a fundamental part of vocal education.',
      example: 'The distance from C to G is a perfect fifth, which is 7 semitones. A singer learning to recognize this interval can more easily sing melodies and harmonies.'
    },
    {
      term: 'Key Signature',
      category: 'Music Theory',
      definition: 'A key signature is a set of sharps or flats at the beginning of a musical staff that indicates which key a piece of music is in. Key signatures tell singers which notes are naturally sharp or flat throughout the piece. Understanding key signatures helps singers anticipate pitch changes, understand the harmonic structure of a piece, and sing more accurately. Key signatures are essential for sight reading and musical understanding. Common keys include C major (no sharps or flats), G major (one sharp), and F major (one flat).',
      example: 'A piece in the key of G major has one sharp (F#), so a singer knows that all F notes in that piece should be sung as F#.'
    },
    {
      term: 'Time Signature',
      category: 'Music Theory',
      definition: 'A time signature indicates the meter or rhythm of a piece of music, showing how many beats are in each measure and which note value receives one beat. Common time signatures include 4/4 (four beats per measure, quarter note gets one beat), 3/4 (three beats per measure), and 6/8 (six beats per measure, eighth note gets one beat). Understanding time signatures helps singers maintain proper rhythm, understand musical phrasing, and perform accurately. Time signatures are essential for sight reading and musical interpretation.',
      example: 'A song in 3/4 time has three beats per measure, creating a waltz-like rhythm. A singer must feel and maintain this three-beat pattern throughout the piece.'
    }
  ];

  const categories = ['all', ...new Set(terms.map(term => term.category))];

  const filteredTerms = terms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <li className="text-gray-900 font-medium">Glossary</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Vocal Glossary
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Learn the definitions of vocal and singing terminology. Understand key concepts to improve your vocal knowledge.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center space-x-2">
              <span className="text-2xl">📖</span>
              <span>{terms.length} Terms</span>
            </span>
            <span className="flex items-center space-x-2">
              <span className="text-2xl">📚</span>
              <span>{categories.length - 1} Categories</span>
            </span>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Terms
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for a term..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredTerms.length} of {terms.length} terms
          </div>
        </div>

        {/* Terms List */}
        <div className="space-y-6">
          {filteredTerms.map((term, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{term.term}</h2>
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full">
                    {term.category}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                {term.definition}
              </p>
              {term.example && (
                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
                  <p className="text-sm text-indigo-900">
                    <strong>Example:</strong> {term.example}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-md">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No terms found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* CTA Section */}
        <section className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Apply What You've Learned?</h2>
          <p className="text-indigo-100 mb-6 text-lg max-w-2xl mx-auto">
            Use our free tools to test your vocal range and improve your pitch accuracy. Put your knowledge into practice!
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
      </main>

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
  );
};

export default GlossaryPage;
