/**
 * Renders FAQ answer text with lightweight markdown (**bold**, lists, section labels).
 */

function parseInline(text) {
  const parts = [];
  const re = /\*\*([^*]+)\*\*/g;
  let last = 0;
  let key = 0;
  let match;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    parts.push(
      <strong key={key++} className="font-semibold text-gray-800">
        {match[1]}
      </strong>
    );
    last = re.lastIndex;
  }

  if (last < text.length) {
    parts.push(text.slice(last));
  }

  return parts.length > 0 ? parts : [text];
}

const STANDALONE_BOLD = /^\*\*([^*]+)\*\*:?\s*$/;

function FaqAnswerContent({ text }) {
  if (!text || typeof text !== 'string') {
    return null;
  }

  const lines = text.trim().split('\n');
  const elements = [];
  let listItems = [];
  let paragraphLines = [];

  const flushList = () => {
    if (listItems.length === 0) return;
    elements.push(
      <ul
        key={`ul-${elements.length}`}
        className="list-disc pl-5 space-y-2 my-3 text-gray-600 leading-relaxed"
      >
        {listItems.map((item, i) => (
          <li key={i} className="pl-0.5">
            {parseInline(item)}
          </li>
        ))}
      </ul>
    );
    listItems = [];
  };

  const flushParagraphs = () => {
    if (paragraphLines.length === 0) return;
    paragraphLines.forEach((line) => {
      elements.push(
        <p
          key={`p-${elements.length}`}
          className="text-gray-600 leading-relaxed mb-3 last:mb-0"
        >
          {parseInline(line)}
        </p>
      );
    });
    paragraphLines = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      flushParagraphs();
      continue;
    }

    if (trimmed.startsWith('- ')) {
      flushParagraphs();
      listItems.push(trimmed.slice(2));
      continue;
    }

    const headingMatch = trimmed.match(STANDALONE_BOLD);
    if (headingMatch) {
      flushList();
      flushParagraphs();
      elements.push(
        <p
          key={`h-${elements.length}`}
          className="font-semibold text-gray-900 mt-4 mb-1 first:mt-0"
        >
          {headingMatch[1]}
        </p>
      );
      continue;
    }

    flushList();
    paragraphLines.push(trimmed);
  }

  flushList();
  flushParagraphs();

  return <div className="faq-answer text-left space-y-0.5">{elements}</div>;
}

/** Plain text for JSON-LD / screen readers (strips ** markers). */
export function faqAnswerToPlainText(text) {
  if (!text) return '';
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/^- /gm, '• ')
    .trim();
}

export default FaqAnswerContent;
