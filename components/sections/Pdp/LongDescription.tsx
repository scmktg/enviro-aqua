import { Fragment } from "react";

interface LongDescriptionProps {
  text: string;
}

/**
 * Lightweight renderer for the catalogue's markdown-flavour copy. We only
 * support the patterns that appear in the source — paragraphs, bold spans,
 * and bullet lists prefixed with "•". This avoids pulling in a markdown
 * library for the four formatting cases we actually use.
 */
export function LongDescription({ text }: LongDescriptionProps) {
  const blocks = parseBlocks(text);

  return (
    <div className="prose-spec text-base text-ink/85 max-w-prose">
      {blocks.map((block, i) => {
        if (block.type === "list") {
          return (
            <ul
              key={i}
              className="list-disc pl-5 my-3 space-y-1.5 marker:text-muted"
            >
              {block.items.map((item, j) => (
                <li key={j} className="text-ink/85">
                  {renderInline(item)}
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "heading") {
          return (
            <h3
              key={i}
              className="text-base font-semibold text-ink mt-6 mb-2 tracking-tight"
            >
              {renderInline(block.text)}
            </h3>
          );
        }
        return (
          <p key={i} className="my-2.5 leading-relaxed">
            {renderInline(block.text)}
          </p>
        );
      })}
    </div>
  );
}

type Block =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

function parseBlocks(text: string): Block[] {
  const lines = text.split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i]!.trim();

    if (line.length === 0) {
      i++;
      continue;
    }

    // Bullet list — collect contiguous "• " or "- " lines.
    if (line.startsWith("• ") || line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length) {
        const next = lines[i]!.trim();
        if (next.startsWith("• ")) {
          items.push(next.slice(2));
          i++;
        } else if (next.startsWith("- ")) {
          items.push(next.slice(2));
          i++;
        } else if (next.length === 0) {
          i++;
          break;
        } else {
          break;
        }
      }
      blocks.push({ type: "list", items });
      continue;
    }

    // Heading — a paragraph that is entirely **bold** is treated as h3.
    if (line.startsWith("**") && line.endsWith("**") && !line.slice(2, -2).includes("**")) {
      blocks.push({ type: "heading", text: line.slice(2, -2) });
      i++;
      continue;
    }

    blocks.push({ type: "paragraph", text: line });
    i++;
  }

  return blocks;
}

/**
 * Inline renderer — resolves **bold** segments. Anything else passes
 * through as plain text (we don't allow raw HTML from the catalogue).
 */
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
