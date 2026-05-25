/**
 * Team member cards for About page.
 */
import { teamMembers, TEAM_INTRO, getMemberAccentClasses, getMemberInitials } from '../data/teamMembers';

const TeamMemberCards = () => (
  <div className="not-prose">
    <p className="text-gray-600 mb-8 leading-relaxed">{TEAM_INTRO}</p>
    <div className="grid sm:grid-cols-2 gap-6">
      {teamMembers.map((member) => {
        const accent = getMemberAccentClasses(member.accent);
        return (
          <article
            key={member.id}
            className={`rounded-xl border-2 ${accent.border} bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${
              member.isFounder ? 'sm:col-span-2 ring-1 ring-indigo-100' : ''
            }`}
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className={`flex-shrink-0 w-14 h-14 rounded-full ${accent.avatar} flex items-center justify-center text-lg font-bold`}
                aria-hidden
              >
                {getMemberInitials(member.name)}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  {member.isFounder && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                      Founder
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-indigo-700">{member.role}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{member.bio}</p>
            <ul className="flex flex-wrap gap-2">
              {member.focuses.map((focus) => (
                <li key={focus}>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${accent.tag}`}>
                    {focus}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
    <p className="text-xs text-gray-500 mt-6">
      SingMeter provides educational tools and guides only—not medical care, diagnosis, or voice therapy.
    </p>
  </div>
);

export default TeamMemberCards;
