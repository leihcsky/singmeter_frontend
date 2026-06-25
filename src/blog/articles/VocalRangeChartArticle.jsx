import { Link } from 'react-router-dom';
import VocalRangeChartVisual from '../../components/VocalRangeChartVisual';

const meta = {
  id: 'vocal-range-chart',
  slug: 'vocal-range-chart',
  title: 'Vocal Range Chart: Male, Female & SATB Voice Types Explained',
  seoTitle: 'Vocal Range Chart: Male, Female & SATB',
  seoDescription:
    'Visual vocal range chart for bass, baritone, tenor, alto, mezzo, soprano and SATB. Learn how to read the bars, compare your voice, and test your range free.',
  category: 'Vocal Range',
  readTime: '9 min read',
  date: '2025-12-02',
  updatedDate: '2026-06-01',
  author: 'Max Ray',
  excerpt:
    'Color-coded vocal range chart from E2 to C6 for male and female voice types plus SATB. See how to read the chart and match your own range from the vocal range test.',
  seoKeywords:
    'vocal range chart, vocal range chart male female, SATB vocal range, soprano range, alto range, tenor range, baritone range, bass range, mezzo soprano range',
};

const linkClass = 'text-indigo-600 hover:text-indigo-700 font-semibold underline';

function Callout({ children }) {
  return (
    <div className="bg-indigo-50 border-l-4 border-indigo-400 p-5 my-6 rounded-r-lg text-left not-prose">
      {children}
    </div>
  );
}

function FaqItem({ q, a }) {
  return (
    <div className="border border-gray-100 rounded-lg p-4 bg-gray-50/50 text-left not-prose">
      <h3 className="font-semibold text-gray-900 mb-2 text-left text-base">{q}</h3>
      <p className="text-gray-600 text-sm leading-relaxed text-left">{a}</p>
    </div>
  );
}

const VocalRangeChartArticle = () => {
  return (
    <div className="blog-post-body text-left">
      <p>
        A <strong>vocal range chart</strong> maps typical low and high notes for each voice type on the same
        pitch axis. It is a starting map—not a label you must fit into, and not a substitute for how your voice
        feels when you sing real songs.
      </p>

      <h2>What is a vocal range chart?</h2>
      <p>
        Each colored bar shows an <strong>approximate comfortable span</strong> for a voice type (for example
        Tenor C3–C5), written in pitch names from E2 (low) to C6 (high). Charts help with choir placement,
        repertoire browsing, and comparing your own test results to common references.
      </p>
      <p>A useful chart shows:</p>
      <ul>
        <li>Voice types from Bass through Soprano (and SATB choir parts)</li>
        <li>Low and high note names for each type</li>
        <li>Overlap between categories—because real voices do not sit in non-overlapping boxes</li>
      </ul>

      <Callout>
        <p className="text-indigo-900 text-sm sm:text-base mb-0">
          <strong>At a glance:</strong> Soprano (C4{' \u2013 '}C6), Alto (F3{' \u2013 '}F5), Tenor (C3{' \u2013 '}C5),
          Bass (E2{' \u2013 '}E4), with Mezzo-Soprano and Baritone between. Your{' '}
          <strong>tessitura</strong>—where you sing most easily—matters more than one peak note.
        </p>
      </Callout>

      <h2>What a chart does not show</h2>
      <p>
        Charts list <strong>range</strong>, not <strong>tessitura</strong>, tone color, fatigue, or vocal health.
        Two singers with the same numbers can need different songs. For comfort zone vs. extremes, see{' '}
        <Link to="/blog/tessitura-and-comfortable-range" className={linkClass}>
          tessitura and comfortable range
        </Link>
        .
      </p>

      <h2>Interactive vocal range chart</h2>
      <p>
        Read the axis left (low) to right (high). Each bar lists its note span in the center. Overlap is
        intentional—use it to see where your test results sit, not to force a single category.
      </p>

      <VocalRangeChartVisual />

      <h2>How to use this chart with your own voice</h2>
      <ol>
        <li>
          Run the{' '}
          <Link to="/vocal-range-test" className={linkClass}>
            SingMeter Vocal Range Test
          </Link>{' '}
          and note your lowest and highest <strong>comfortable</strong> notes.
        </li>
        <li>Find those notes on the chart and see which bars they overlap.</li>
        <li>Notice where most of your practice songs feel easiest—that is likely your tessitura.</li>
        <li>
          Optional: hear any note on the{' '}
          <Link to="/tone-generator" className={linkClass}>
            Tone Generator
          </Link>{' '}
          and check pitch with the{' '}
          <Link to="/pitch-detector" className={linkClass}>
            Pitch Detector
          </Link>
          .
        </li>
        <li>
          For range <em>and</em> voice type together, continue with{' '}
          <Link to="/blog/how-to-find-your-voice-type" className={linkClass}>
            how to find your voice type
          </Link>
          .
        </li>
      </ol>

      <h2>Common mistakes when reading a chart</h2>
      <ul>
        <li>Using only the highest note as your voice type</li>
        <li>Forcing your voice to fit the tightest box on the page</li>
        <li>Comparing your range to studio recordings or celebrity extremes</li>
        <li>Ignoring fatigue—chart extremes are not where you should live in rehearsal</li>
        <li>Treating ranges as fixed (they can shift with training and health)</li>
      </ul>

      <h2>SATB choir reference</h2>
      <p>
        Four-part music uses <strong>Soprano, Alto, Tenor, Bass</strong>. Directors usually assign by tessitura
        and blend, not by a singer&apos;s single highest note. The SATB block in the chart above shows typical
        section spans.
      </p>

      <h2>Famous singers (approximate ranges)</h2>
      <p>
        Public analyses vary; treat these as rough references, not goals to force.
      </p>
      <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">Male singers (examples)</h3>
      <ul>
        <li>
          <strong>Freddie Mercury</strong> — roughly F2–F6
        </li>
        <li>
          <strong>Johnny Cash</strong> — roughly E2–B4
        </li>
        <li>
          <strong>Bruno Mars</strong> — roughly A2–D6
        </li>
      </ul>
      <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">Female singers (examples)</h3>
      <ul>
        <li>
          <strong>Whitney Houston</strong> — roughly A2–C6
        </li>
        <li>
          <strong>Ariana Grande</strong> — roughly D3–E7
        </li>
        <li>
          <strong>Adele</strong> — roughly C3–F5
        </li>
      </ul>
      <p>
        Ask whether you share a similar <strong>home area</strong>, not whether you match their highest note.
        Then overlay your own test on the chart above.
      </p>

      <h2>FAQ</h2>
      <div className="space-y-3 mb-8 not-prose">
        <FaqItem
          q="What is a vocal range chart used for?"
          a="To compare typical note spans for voice types and choir parts when exploring repertoire or placement."
        />
        <FaqItem
          q="Are vocal range charts accurate?"
          a="They are accurate as references. Your personal comfort and tessitura refine how you apply them."
        />
        <FaqItem
          q="Can my range change over time?"
          a="Yes—training, health, and age can shift your usable range. Retest periodically with a vocal range test."
        />
        <FaqItem
          q="Does my highest note define my voice type?"
          a="No. Sustainable comfort and where you sing most often matter more."
        />
        <FaqItem
          q="Why do charts differ between websites?"
          a="Some list extreme limits; others list comfortable ranges. SingMeter's chart aims at practical, singable spans."
        />
        <FaqItem
          q="Is tessitura more important than total range?"
          a="For everyday singing and long-term comfort, usually yes."
        />
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-400 p-6 mt-8 rounded-r-lg text-left not-prose">
        <p className="text-indigo-900 mb-3">
          The most useful step is to <strong>overlay your own range</strong> on this chart, not memorize labels.
        </p>
        <Link
          to="/vocal-range-test"
          className="blog-cta inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition shadow-sm"
        >
          Take the free Vocal Range Test
        </Link>
      </div>
    </div>
  );
};

VocalRangeChartArticle.meta = meta;

export default VocalRangeChartArticle;
