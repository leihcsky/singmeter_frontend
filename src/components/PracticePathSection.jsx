/**
 * Singing-focused practice path block (tool pages). Does not affect page title/description.
 */
import { Link } from 'react-router-dom';

const THEMES = {
  blue: {
    wrapper: 'from-blue-50 via-indigo-50 to-cyan-50 border-indigo-200',
    stepBorder: 'border-blue-500',
    badge: 'bg-blue-600',
    goal: 'bg-blue-50 text-blue-900',
    link: 'text-indigo-600 hover:text-indigo-800',
  },
  orange: {
    wrapper: 'from-orange-50 via-red-50 to-amber-50 border-orange-200',
    stepBorder: 'border-orange-500',
    badge: 'bg-orange-600',
    goal: 'bg-orange-50 text-orange-900',
    link: 'text-orange-600 hover:text-orange-800',
  },
  purple: {
    wrapper: 'from-purple-50 via-indigo-50 to-pink-50 border-purple-200',
    stepBorder: 'border-purple-500',
    badge: 'bg-purple-600',
    goal: 'bg-purple-50 text-purple-900',
    link: 'text-indigo-600 hover:text-indigo-800',
  },
};

/**
 * @param {{
 *   theme?: 'blue' | 'orange' | 'purple',
 *   title?: string,
 *   intro: string,
 *   comboTitle?: string,
 *   comboSteps: string[],
 *   routines: Array<{
 *     title: string,
 *     duration: string,
 *     body: string,
 *     goal?: string,
 *     settings?: string,
 *   }>,
 *   nextTools?: Array<{ to: string, label: string, hint: string }>,
 *   blogLink?: { to: string, label: string },
 * }} props
 */
const PracticePathSection = ({
  theme = 'blue',
  title = 'Singing Practice Path',
  intro,
  comboTitle = '10-Minute Combined Session',
  comboSteps,
  routines,
  nextTools = [],
  blogLink,
}) => {
  const t = THEMES[theme] || THEMES.blue;

  return (
    <section
      className={`bg-gradient-to-br ${t.wrapper} rounded-2xl p-6 sm:p-8 shadow-sm mb-8 border-2`}
      aria-labelledby="practice-path-heading"
    >
      <h2 id="practice-path-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
        🎤 {title}
      </h2>
      <p className="text-gray-700 leading-relaxed mb-8 max-w-3xl">{intro}</p>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 sm:p-6 shadow-sm mb-8 border border-white">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{comboTitle}</h3>
        <ol className="space-y-3">
          {comboSteps.map((step, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-700 text-sm sm:text-base">
              <span
                className={`flex-shrink-0 w-7 h-7 rounded-full ${t.badge} text-white text-xs font-bold flex items-center justify-center`}
              >
                {index + 1}
              </span>
              <span className="pt-0.5 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-4">Three routines you can repeat daily</h3>
      <div className="space-y-5 mb-8">
        {routines.map((routine, index) => (
          <div
            key={routine.title}
            className={`bg-white rounded-xl p-5 shadow-sm border-l-4 ${t.stepBorder}`}
          >
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-xs font-bold uppercase tracking-wide ${t.link}`}>
                Routine {index + 1}
              </span>
              <span className="text-xs text-gray-500">· {routine.duration}</span>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">{routine.title}</h4>
            {routine.settings && (
              <p className="text-xs font-medium text-gray-500 mb-2">
                <span className="text-gray-700">Tool settings:</span> {routine.settings}
              </p>
            )}
            <p className="text-sm text-gray-600 leading-relaxed mb-3">{routine.body}</p>
            {routine.goal && (
              <p className={`text-sm rounded-lg p-3 ${t.goal}`}>
                <strong>Goal:</strong> {routine.goal}
              </p>
            )}
          </div>
        ))}
      </div>

      {nextTools.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">What to do next</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {nextTools.map((tool) => (
              <Link
                key={tool.to}
                to={tool.to}
                className="group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all"
              >
                <p className={`font-bold ${t.link} group-hover:underline`}>{tool.label} →</p>
                <p className="text-sm text-gray-600 mt-1">{tool.hint}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {blogLink && (
        <p className="text-sm text-gray-600">
          Go deeper:{' '}
          <Link to={blogLink.to} className={`font-semibold ${t.link} hover:underline`}>
            {blogLink.label}
          </Link>
        </p>
      )}
    </section>
  );
};

export default PracticePathSection;
