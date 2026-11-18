import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import "highlight.js/styles/github-dark.css";

/** Notion 본문(마크다운) 렌더러: GFM 표·체크리스트, heading id, 코드 하이라이팅 */
export function Markdown({ content }: { content: string }) {
  return (
    <div className="prose-guide">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug, rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
