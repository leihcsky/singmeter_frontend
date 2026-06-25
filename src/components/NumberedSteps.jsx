/**
 * Left-aligned numbered steps — badge + title + body stay on one visual column.
 */
const NumberedSteps = ({ steps, className = '' }) => (
  <div className={`space-y-6 text-left ${className}`}>
    {steps.map((step) => (
      <div key={step.number} className="flex gap-4 items-start text-left">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${step.badgeClass}`}
          aria-hidden
        >
          <span className="font-bold">{step.number}</span>
        </div>
        <div className="flex-1 min-w-0 text-left">
          <h3 className="text-lg font-bold text-gray-900 mb-2 text-left">{step.title}</h3>
          <div className="text-gray-600 leading-relaxed text-left">{step.body}</div>
        </div>
      </div>
    ))}
  </div>
);

export default NumberedSteps;
