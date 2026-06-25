/**
 * SingMeter-only editorial blocks for tool pages (testing notes, practice case, misconceptions).
 * Does not change page title or meta description.
 */
import { Link } from 'react-router-dom';

const ACCENTS = {
  orange: {
    border: 'border-orange-200',
    badge: 'bg-orange-100 text-orange-800',
    link: 'text-orange-600 hover:text-orange-800',
    caseBg: 'bg-orange-50 border-orange-100',
    myth: 'text-orange-700',
  },
  blue: {
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-800',
    link: 'text-blue-600 hover:text-blue-800',
    caseBg: 'bg-blue-50 border-blue-100',
    myth: 'text-blue-700',
  },
  purple: {
    border: 'border-purple-200',
    badge: 'bg-purple-100 text-purple-800',
    link: 'text-purple-600 hover:text-purple-800',
    caseBg: 'bg-purple-50 border-purple-100',
    myth: 'text-purple-700',
  },
};

/**
 * @param {{
 *   accent?: 'orange' | 'blue' | 'purple',
 *   howWeTest: { intro: string, bullets: string[] },
 *   practiceCase: { title: string, duration: string, steps: string[] },
 *   misconceptions: Array<{ myth: string, reality: string }>,
 *   blogLink: { to: string, label: string },
 *   tutorialLink: { to: string, label: string },
 *   heading?: string,
 * }} props
 */
const ToolPageDeepDive = ({
  accent = 'blue',
  heading = 'Built for home singers on SingMeter',
  howWeTest,
  practiceCase,
  misconceptions,
  blogLink,
  tutorialLink,
}) => {
  const a = ACCENTS[accent] || ACCENTS.blue;

  return (
    <section
      className={`bg-white rounded-2xl shadow-sm border ${a.border} p-6 sm:p-8 mb-8`}
      aria-labelledby="tool-deep-dive-heading"
    >
      <h2 id="tool-deep-dive-heading" className="text-2xl font-bold text-gray-900 mb-2">
        {heading}
      </h2>
      <p className="text-sm text-gray-500 mb-8">
        The notes below come from how we use and test SingMeter tools in real practice sessions.
      </p>

      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-3">How we test this tool</h3>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">{howWeTest.intro}</p>
        <ul className="space-y-2">
          {howWeTest.bullets.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
              <span className={`flex-shrink-0 mt-0.5 font-bold ${a.myth}`}>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`rounded-xl border p-5 sm:p-6 mb-8 ${a.caseBg}`}>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${a.badge}`}>
            Practice case
          </span>
          <span className="text-xs text-gray-500">{practiceCase.duration}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">{practiceCase.title}</h3>
        <ol className="space-y-2">
          {practiceCase.steps.map((step, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white border border-gray-200 text-xs font-bold flex items-center justify-center text-gray-600">
                {index + 1}
              </span>
              <span className="pt-0.5 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Common misconceptions</h3>
        <dl className="space-y-4">
          {misconceptions.map((item) => (
            <div key={item.myth} className="border-l-4 border-gray-200 pl-4">
              <dt className="font-semibold text-gray-900 text-sm mb-1">{item.myth}</dt>
              <dd className="text-sm text-gray-600 leading-relaxed">{item.reality}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="pt-6 border-t border-gray-100">
        <h3 className="text-sm font-bold text-gray-900 mb-2">Go deeper on SingMeter</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <Link to={blogLink.to} className={`font-semibold ${a.link} hover:underline`}>
              {blogLink.label}
            </Link>
            <span className="text-gray-500"> — blog guide</span>
          </li>
          <li>
            <Link to={tutorialLink.to} className={`font-semibold ${a.link} hover:underline`}>
              {tutorialLink.label}
            </Link>
            <span className="text-gray-500"> — step-by-step tutorial</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ToolPageDeepDive;
