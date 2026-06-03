import { Link } from 'react-router-dom';
import VocalRangeChartVisual, { VOICE_TYPES } from '../../components/VocalRangeChartVisual';

const meta = {
  id: 'vocal-range-chart',
  slug: 'vocal-range-chart',
  title: 'Vocal Range Chart: Male, Female & SATB Voice Types Explained',
  seoTitle: 'Vocal Range Chart: Male, Female & SATB',
  seoDescription:
    'Visual vocal range chart for bass, baritone, tenor, alto, mezzo, soprano and SATB. Learn how to read the bars, compare your voice, and test your range free.',
  category: 'Vocal Range',
  readTime: '10 min read',
  date: '2025-12-02',
  updatedDate: '2026-06-01',
  author: 'SingMeter Team',
  excerpt:
    'Color-coded vocal range chart from E2 to C6 for male and female voice types plus SATB. See how to read the chart, use the reference table, and match your own range.',
  seoKeywords:
    'vocal range chart, vocal range chart male female, SATB vocal range, soprano range, alto range, tenor range, baritone range, bass range, mezzo soprano range',
};

const linkClass = 'text-indigo-600 hover:text-indigo-700 font-semibold underline';

function ReferenceTable() {
  return (
    <div className="overflow-x-auto my-6 rounded-xl border border-gray-200 not-prose">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-indigo-50 text-gray-900">
          <tr>
            <th className="px-4 py-3 font-semibold text-left">Voice type</th>
            <th className="px-4 py-3 font-semibold text-left">Approximate range</th>
            <th className="px-4 py-3 font-semibold text-left hidden sm:table-cell">Group</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-gray-600">
          {VOICE_TYPES.map((v) => (
            <tr key={v.label} className="bg-white even:bg-gray-50/80">
              <td className="px-4 py-3 font-medium text-gray-900 text-left">{v.label}</td>
              <td className="px-4 py-3 whitespace-nowrap text-left">
                {v.low}
                {' \u2013 '}
                {v.high}
              </td>
              <td className="px-4 py-3 hidden sm:table-cell text-gray-500 text-left">{v.group}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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
        A <strong>vocal range chart</strong> is one of the first references most singers look up, and one of the
        easiest to misread. Many people match their highest note to a voice type and assume the question is
        settled, then wonder why songs still feel uncomfortable.
      </p>
      <p>
        This guide centers on a <strong>visual vocal range chart</strong> you can use right away: typical ranges
        for male and female voice types, plus a SATB choir reference. You will also learn what the chart
        measures, what it leaves out, and how to pair it with your own{' '}
        <Link to="/vocal-range-test" className={linkClass}>
          vocal range test
        </Link>{' '}
        results on SingMeter.
      </p>

      <Callout>
        <p className="text-indigo-900 text-sm sm:text-base mb-0">
          <strong>At a glance:</strong> Soprano (C4{' \u2013 '}C6), Alto (F3{' \u2013 '}F5), Tenor (C3{' \u2013 '}C5), Bass (E2{' \u2013 '}E4), with
          Mezzo-Soprano and Baritone in the middle. Charts describe <em>typical</em> ranges; your comfortable
          tessitura matters more than a single peak note.
        </p>
      </Callout>

      <h2>Vocal range chart (interactive reference)</h2>
      <p>
        Use the chart below to see how voice types overlap on the same pitch axis from <strong>E2</strong> (low)
        to <strong>C6</strong> (high). Colored bars show approximate ranges for trained singers, not rigid boxes
        for every voice.
      </p>

      <VocalRangeChartVisual />

      <h3>Quick reference table</h3>
      <p className="mb-2">
        The table matches the chart above. Ranges overlap by design; overlap does not mean two voices are the
        same; it reflects natural variation.
      </p>
      <ReferenceTable />

      <h2>What is a vocal range chart?</h2>
      <p>
        A <strong>vocal range chart</strong> is a visual map of the typical lowest and highest notes associated
        with each voice type, written in pitch names (for example C4, A3, F5). It gives you orientation, not a
        diagnosis.
      </p>
      <p>A standard chart usually shows:</p>
      <ul>
        <li>Common voice types (Soprano, Alto, Tenor, Bass, and others)</li>
        <li>Approximate low and high notes for each type</li>
        <li>Overlap between categories on the keyboard</li>
        <li>Sometimes choir labels (SATB) for ensemble placement</li>
      </ul>
      <p>
        Charts were built for choirs, teachers, and repertoire planning. They still help in pop, rock, and
        musical theater when you treat them as <strong>flexible guides</strong>, not permanent labels.
      </p>

      <h2>What a vocal range chart does not show</h2>
      <p>
        This is where most confusion starts. A chart does <strong>not</strong> show:
      </p>
      <ul>
        <li>How comfortable a note feels day to day</li>
        <li>How long you can sustain notes in a phrase</li>
        <li>Tone color, weight, or brightness</li>
        <li>Fatigue, recovery, or vocal health limits</li>
        <li>Whether an extreme note is useful in real songs</li>
      </ul>
      <p>
        Charts show <strong>range</strong>, not <strong>tessitura</strong>?the zone where your voice sounds and
        feels best. Learn more in our guide to{' '}
        <Link to="/blog/tessitura-and-comfortable-range" className={linkClass}>
          tessitura and comfortable range
        </Link>
        .
      </p>

      <h2>Range vs. tessitura on the chart</h2>
      <p>
        Two singers can share the same numbers on a vocal range chart and still need different songs. One may
        live comfortably in the lower half of that span; another in the upper half. Classification should follow
        where you sing <strong>most of the time</strong>, not the one note you touched once.
      </p>
      <p>
        When choosing repertoire, prioritize tessitura over extremes. See{' '}
        <Link to="/blog/songs-for-your-voice-type" className={linkClass}>
          songs for your voice type
        </Link>{' '}
        for matching melodies to your comfort zone.
      </p>

      <h2>Why vocal ranges overlap (and why that is healthy)</h2>
      <p>
        Look at the chart again: bars cross each other on purpose. Human anatomy varies, training expands usable
        range, and voice type is a <strong>functional</strong> label, not a fixed slot. The goal is to respect
        comfort, not to force your voice into the tightest box on the page.
      </p>

      <h2>Five things every singer should know</h2>
      <ol>
        <li>
          <strong>Your highest note does not define your voice.</strong> Comfort, endurance, and consistency
          across a song matter more than a single peak.
        </li>
        <li>
          <strong>Overlapping ranges are normal.</strong> Use the chart to see where types share notes, then
          listen for where <em>you</em> sound strongest.
        </li>
        <li>
          <strong>Charts do not measure fatigue.</strong> If high notes collapse after a few songs, the chart
          cannot explain why?your body can.
        </li>
        <li>
          <strong>Charts are starting points.</strong> Voices change with training, health, and age. Revisit after
          you{' '}
          <Link to="/blog/can-vocal-range-change" className={linkClass}>
            work on range over time
          </Link>
          .
        </li>
        <li>
          <strong>Song choice beats labels.</strong> Picking music in your tessitura often improves pitch and
          confidence faster than chasing a new category name.
        </li>
      </ol>

      <h2>How to use this vocal range chart (step by step)</h2>
      <ol>
        <li>
          Run the{' '}
          <Link to="/vocal-range-test" className={linkClass}>
            SingMeter Vocal Range Test
          </Link>{' '}
          and note your lowest and highest <strong>comfortable</strong> notes.
        </li>
        <li>Find those notes on the chart and see which bars they overlap.</li>
        <li>Identify where most practice songs feel easiest?that is likely your tessitura, not the edges.</li>
        <li>
          Use the{' '}
          <Link to="/tone-generator" className={linkClass}>
            Tone Generator
          </Link>{' '}
          to hear any note on the chart and check pitch with the{' '}
          <Link to="/pitch-detector" className={linkClass}>
            Pitch Detector
          </Link>
          .
        </li>
        <li>
          Read{' '}
          <Link to="/blog/how-to-find-your-voice-type" className={linkClass}>
            how to find your voice type
          </Link>{' '}
          for range plus tone and tessitura together.
        </li>
      </ol>

      <h2>Common mistakes when reading a chart</h2>
      <ul>
        <li>Using only the highest note as your voice type</li>
        <li>Ignoring fatigue and recovery after practice</li>
        <li>Forcing your voice to &quot;fit&quot; a bar on the chart</li>
        <li>Comparing your range to professional studio recordings</li>
        <li>Treating ranges as fixed rules instead of references</li>
      </ul>

      <h2>SATB and choir placement</h2>
      <p>
        In four-part choir music, parts are labeled <strong>Soprano (S)</strong>, <strong>Alto (A)</strong>,{' '}
        <strong>Tenor (T)</strong>, and <strong>Bass (B)</strong>. The SATB block in the chart shows typical
        section ranges. Directors usually assign parts by tessitura and blend, not by a singer's single highest
        note.
      </p>

      <h2>Charts, song selection, and vocal health</h2>
      <p>
        When repertoire fits your chart-informed comfort zone, strain often drops and pitch improves. Pair chart
        reading with habits from our{' '}
        <Link to="/blog/vocal-health-and-maintenance" className={linkClass}>
          vocal health guide
        </Link>
        , and avoid living at your chart extremes for full sets or long rehearsals.
      </p>

      <h2>Famous singers (approximate ranges)</h2>
      <p>
        Comparing your range to well-known artists can be motivating if you treat numbers as rough references, not
        goals to force. Public analyses vary; live performances are not always measured precisely.
      </p>
      <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">Male singers (examples)</h3>
      <ul>
        <li>
          <strong>Freddie Mercury</strong> — roughly F2–F6 (~4 octaves)
        </li>
        <li>
          <strong>Johnny Cash</strong> — roughly E2–B4 (low baritone/bass color)
        </li>
        <li>
          <strong>Bruno Mars</strong> — roughly A2–D6 (modern pop tenor)
        </li>
      </ul>
      <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">Female singers (examples)</h3>
      <ul>
        <li>
          <strong>Whitney Houston</strong> — roughly A2–C6
        </li>
        <li>
          <strong>Ariana Grande</strong> — roughly D3–E7 (very wide, strong whistle register)
        </li>
        <li>
          <strong>Adele</strong> — roughly C3–F5 (mezzo-soprano area)
        </li>
      </ul>
      <p>
        Ask whether you share a similar <strong>home area</strong> (tenor, baritone, alto, etc.), not whether you
        match their highest note. Study how they use tessitura and save extremes for emotional peaks — then run the{' '}
        <Link to="/vocal-range-test" className={linkClass}>
          Vocal Range Test
        </Link>{' '}
        to see where you sit on this chart.
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
          a="Yes&mdash;training, health, and age can shift your usable range. Retest periodically with a vocal range test."
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

      <h2>More in this vocal range series</h2>
      <ul>
        <li>
          <Link to="/blog/how-to-test-vocal-range" className={linkClass}>
            How to test your vocal range
          </Link>
        </li>
        <li>
          <Link to="/blog/how-to-find-your-voice-type" className={linkClass}>
            How to find your voice type (range vs. type explained)
          </Link>
        </li>
        <li>
          <Link to="/blog/tessitura-and-comfortable-range" className={linkClass}>
            Tessitura &amp; comfortable range
          </Link>
        </li>
        <li>
          <Link to="/blog/can-vocal-range-change" className={linkClass}>
            Can vocal range change?
          </Link>
        </li>
        <li>
          <Link to="/blog/songs-for-your-voice-type" className={linkClass}>
            Songs for your voice type
          </Link>
        </li>
      </ul>

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
