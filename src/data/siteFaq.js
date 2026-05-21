/**
 * Site-wide FAQ — platform, privacy, and general use.
 * Tool-specific questions live on each tool page only.
 */

export const siteFaqData = [
  {
    category: 'About SingMeter',
    icon: '🎵',
    question: 'Is SingMeter really free?',
    answer: `Yes. All SingMeter tools are **100% free** with no signup, subscription, or premium tier. We keep core vocal tools accessible to everyone. The site may show non-intrusive ads to help cover hosting costs.`,
  },
  {
    category: 'About SingMeter',
    icon: '🎵',
    question: 'What is SingMeter and who is it for?',
    answer: `SingMeter is a **free online singing practice platform** for anyone who wants to understand their voice, check pitch, and practice more effectively — from beginners to hobbyists and choir singers. You get browser-based tools plus guides on our blog, without installing an app.`,
  },
  {
    category: 'About SingMeter',
    icon: '🎵',
    question: 'What tools does SingMeter offer?',
    answer: `We currently offer five free tools:

- **Vocal Range Test** — find your range and voice type
- **Pitch Detector** — real-time pitch feedback while you sing
- **Tone Generator** — reference tones for tuning and ear training
- **Online Metronome** — tempo and rhythm practice
- **Song Key Finder** — song keys and transposition ideas for your range

Each tool has its own help section and FAQ on its page. Visit the homepage or open a tool from the menu.`,
  },
  {
    category: 'About SingMeter',
    icon: '🎵',
    question: 'What makes SingMeter different from other vocal tools?',
    answer: `SingMeter focuses on **privacy, accessibility, and singing-specific practice**:

- **Privacy-first**: microphone tools process audio in your browser; we do not store your voice
- **No account required**: open a tool and start immediately
- **Built for singers**: range test, pitch feedback, and practice path — not generic music utilities only
- **Free core tools**: no paywall on the main features

For how a specific tool works, see that tool's page FAQ.`,
  },
  {
    category: 'About SingMeter',
    icon: '🎵',
    question: 'Will SingMeter add more tools in the future?',
    answer: `We improve existing tools regularly and may add new ones based on user feedback. New releases are announced on the site and blog. If you have an idea, use the Contact page — we read every suggestion.`,
  },
  {
    category: 'Privacy & Security',
    icon: '🔒',
    question: 'Is my voice recorded or stored when I use SingMeter?',
    answer: `**No.** For tools that use your microphone (such as the Vocal Range Test and Pitch Detector), audio is analyzed **locally in your browser** with the Web Audio API. Your voice is not uploaded, recorded, or saved on our servers. When you close the tab, processing stops.`,
  },
  {
    category: 'Privacy & Security',
    icon: '🔒',
    question: 'Why does the website need microphone access?',
    answer: `Only tools that **listen to your singing** need the microphone — mainly the Vocal Range Test and Pitch Detector. The browser asks for permission when you start those tools. We use the mic only for real-time pitch analysis on your device. Tools like the Metronome and Tone Generator do not need a microphone.

If you prefer not to sing into the mic, the Vocal Range Test also offers **Manual mode** (piano keyboard). See the Vocal Range Test page FAQ for details.`,
  },
  {
    category: 'Privacy & Security',
    icon: '🔒',
    question: 'Do I need to create an account?',
    answer: `**No account is required.** All tools work without registration or email. We do not save your test results on our servers; you can note or screenshot results yourself if you want to track progress over time.`,
  },
  {
    category: 'Using SingMeter',
    icon: '🛠️',
    question: 'Do I need a microphone?',
    answer: `It depends on the tool:

- **Microphone needed**: Vocal Range Test (Sing mode), Pitch Detector
- **No microphone**: Tone Generator, Metronome, Vocal Range Test (Manual mode), Song Key Finder (search only)

A built-in phone or laptop mic is usually enough. Use a quiet room and headphones when possible to reduce feedback.`,
  },
  {
    category: 'Using SingMeter',
    icon: '🛠️',
    question: 'Can I use SingMeter on my phone or tablet?',
    answer: `Yes. SingMeter is **responsive** and works in modern mobile browsers (Safari on iOS, Chrome on Android). Grant microphone permission when prompted for singing tools. A quiet space and headphones often improve results on mobile.`,
  },
  {
    category: 'Using SingMeter',
    icon: '🛠️',
    question: 'What browsers are supported?',
    answer: `Use an **up-to-date** browser with Web Audio API support:

- **Recommended**: Chrome, Firefox, Edge, Safari (desktop and mobile)

Very old browsers (e.g. Internet Explorer) are not supported. If something fails, update your browser, allow microphone access, and try again.`,
  },
  {
    category: 'Using SingMeter',
    icon: '🛠️',
    question: 'How do I save or share my results?',
    answer: `SingMeter does not store results in the cloud. To keep them, **screenshot** the results screen, **write down** your range or pitch notes, or print/save as PDF from your browser. Share screenshots or notes with a teacher or friends as you like.`,
  },
  {
    category: 'Using SingMeter',
    icon: '🛠️',
    question: 'Can I use SingMeter for teaching or in the classroom?',
    answer: `Yes. Teachers and choir leaders often use our tools for quick range checks and pitch practice. Please link to singmeter.com when sharing with students. Our blog and tutorials pages provide extra material for structured learning.`,
  },
  {
    category: 'Using SingMeter',
    icon: '🛠️',
    question: 'Where can I learn vocal technique beyond the tools?',
    answer: `Use our **blog** for in-depth guides (range, pitch, high notes, song choice, vocal health) and the **tutorials** page for a learning path. Tools give feedback; articles explain how to practice. Good starting articles: How to Test Your Vocal Range and Improve Singing Pitch.`,
  },
  {
    category: 'Support',
    icon: '💬',
    question: 'How can I contact SingMeter for support or feedback?',
    answer: `Use the Contact page to send a message (bugs, feature ideas, or general questions). We typically reply within a few business days. For tool-specific how-tos, check that tool's FAQ first — links are listed on this page below.`,
  },
  {
    category: 'Support',
    icon: '💬',
    question: 'How can I support SingMeter?',
    answer: `The best support is to **use the tools**, **share** singmeter.com with other singers, and **send feedback** on the Contact page. We do not require payment or personal data to use the platform.`,
  },
];

/** Short list for the homepage — subset of site-wide FAQ (no tool-specific detail). */
export const homeFaqItems = siteFaqData
  .filter((item) =>
    [
      'Is SingMeter really free?',
      'What tools does SingMeter offer?',
      'Do I need a microphone?',
      'Can I use SingMeter on my phone or tablet?',
      'Is my voice recorded or stored when I use SingMeter?',
    ].includes(item.question)
  )
  .map(({ question, answer }) => ({ question, answer }));

/** Tool pages that host their own FAQ sections */
export const toolFaqLinks = [
  {
    name: 'Vocal Range Test',
    path: '/vocal-range-test',
    description: 'Range testing, Sing vs Manual mode, voice type, and accuracy',
  },
  {
    name: 'Pitch Detector',
    path: '/pitch-detector',
    description: 'Real-time pitch, cents, microphone tips, and practice',
  },
  {
    name: 'Tone Generator',
    path: '/tone-generator',
    description: 'Frequencies, wave types, tuning, and ear training',
  },
  {
    name: 'Online Metronome',
    path: '/metronome',
    description: 'BPM, time signatures, and rhythm practice for singers',
  },
  {
    name: 'Song Key Finder',
    path: '/song-key-finder',
    description: 'Song keys, database search, and transposition',
  },
];
