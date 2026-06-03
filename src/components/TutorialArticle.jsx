/**
 * Renders a step-by-step practice tutorial (tools, steps, self-check, further reading).
 */
import { Link } from 'react-router-dom';

/**
 * @param {{
 *   intro: string,
 *   tools: Array<{ to: string, label: string, hint: string }>,
 *   steps: Array<{ title: string, duration?: string, body: string, toolCallout?: { to: string, label: string } }>,
 *   selfCheck: string[],
 *   goDeeper: Array<{ to: string, label: string }>,
 *   practiceInsights?: { whyItWorks: string, commonMistakes: string[], whenToStop: string },
 *   nextTutorial?: { slug: string, title: string },
 * }} props
 */
const TutorialArticle = ({ intro, tools, steps, selfCheck, goDeeper, practiceInsights, nextTutorial }) => (
  <article className="prose prose-indigo max-w-none">
    <p className="text-gray-700 leading-relaxed text-lg mb-8">{intro}</p>

    <section className="mb-10 not-prose">
      <h2 className="text-xl font-bold text-gray-900 mb-4">SingMeter tools for this lesson</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.to}
            to={tool.to}
            className="flex flex-col bg-indigo-50 border border-indigo-100 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition"
          >
            <span className="font-bold text-indigo-700">{tool.label} →</span>
            <span className="text-sm text-gray-600 mt-1">{tool.hint}</span>
          </Link>
        ))}
      </div>
    </section>

    <section className="mb-10 not-prose">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Step-by-step practice</h2>
      <ol className="space-y-6">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sm:p-6 border-l-4 border-l-indigo-500"
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center">
                {index + 1}
              </span>
              <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
              {step.duration && (
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {step.duration}
                </span>
              )}
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">{step.body}</p>
            {step.toolCallout && (
              <Link
                to={step.toolCallout.to}
                className="inline-flex items-center mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Open {step.toolCallout.label} →
              </Link>
            )}
          </li>
        ))}
      </ol>
    </section>

    <section className="mb-10 not-prose bg-green-50 border border-green-100 rounded-xl p-5 sm:p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-3">Self-check before you finish</h2>
      <ul className="space-y-2">
        {selfCheck.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="text-green-600 font-bold mt-0.5">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>

    {practiceInsights && (
      <section className="mb-10 not-prose bg-amber-50 border border-amber-100 rounded-xl p-5 sm:p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Why this routine works</h2>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">{practiceInsights.whyItWorks}</p>
        <h3 className="text-base font-bold text-gray-900 mb-2">Common mistakes</h3>
        <ul className="space-y-2 mb-6">
          {practiceInsights.commonMistakes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-amber-600 font-bold mt-0.5">!</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <h3 className="text-base font-bold text-gray-900 mb-2">When to stop</h3>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{practiceInsights.whenToStop}</p>
      </section>
    )}

    <section className="mb-10 not-prose">
      <h2 className="text-lg font-bold text-gray-900 mb-3">Go deeper (blog)</h2>
      <p className="text-sm text-gray-600 mb-3">
        These articles explain the &quot;why&quot; behind today&apos;s exercises—they are optional reading, not a repeat of
        this lesson.
      </p>
      <ul className="space-y-2">
        {goDeeper.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="text-indigo-600 font-semibold hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>

    {nextTutorial && (
      <section className="not-prose bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <p className="text-indigo-100 text-sm font-semibold uppercase tracking-wide mb-1">Next tutorial</p>
        <h2 className="text-xl font-bold mb-3">{nextTutorial.title}</h2>
        <Link
          to={`/tutorials/${nextTutorial.slug}`}
          className="inline-flex items-center px-4 py-2 bg-white text-indigo-700 font-bold rounded-lg hover:bg-indigo-50 transition text-sm"
        >
          Continue learning →
        </Link>
      </section>
    )}
  </article>
);

export default TutorialArticle;
