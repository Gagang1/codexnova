/** Minimal renderer for trusted editorial content only. */
export function renderMarkdown(markdown: string) {
  const blocks = markdown.trim().split(/\n{2,}/);
  return blocks
    .map((block) => {
      if (block.startsWith('## ')) {
        const text = block.replace(/^## /, '');
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
        return `<h2 id="${id}">${escapeHtml(text)}</h2>`;
      }
      if (/^\d+\. /.test(block)) {
        const items = block
          .split('\n')
          .map((line) => `<li>${escapeHtml(line.replace(/^\d+\.\s*/, ''))}</li>`)
          .join('');
        return `<ol>${items}</ol>`;
      }
      return `<p>${escapeHtml(block).replace(/\n/g, '<br />')}</p>`;
    })
    .join('\n');
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
