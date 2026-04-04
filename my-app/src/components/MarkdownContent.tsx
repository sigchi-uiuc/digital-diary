"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSanitize from "rehype-sanitize"

interface Props {
  content: string
}

export default function MarkdownContent({ content }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSanitize]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold text-[#1a4d3e] mt-6 mb-3 first:mt-0">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-bold text-[#1a4d3e] mt-5 mb-2 first:mt-0">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-semibold text-[#1a4d3e] mt-4 mb-2 first:mt-0">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-base font-semibold text-[#1a4d3e] mt-3 mb-1 first:mt-0">{children}</h4>
        ),
        p: ({ children }) => (
          <p className="text-[#1a4d3e]/90 leading-relaxed mb-3 last:mb-0">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-[#1a4d3e]">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-[#1a4d3e]/90">{children}</em>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-outside pl-5 mb-3 space-y-1 text-[#1a4d3e]/90">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-outside pl-5 mb-3 space-y-1 text-[#1a4d3e]/90">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-[#1a4d3e]/90 leading-relaxed">{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-[#4A90E2]/40 pl-4 my-3 italic text-[#1a4d3e]/70">
            {children}
          </blockquote>
        ),
        pre: ({ children }) => (
          <pre className="bg-black/5 rounded-xl p-4 my-3 overflow-x-auto text-sm">{children}</pre>
        ),
        code: ({ children, className }) => (
          className
            ? <code className="font-mono text-[#1a4d3e]">{children}</code>
            : <code className="bg-black/5 rounded px-1.5 py-0.5 text-sm font-mono text-[#1a4d3e]">{children}</code>
        ),
        hr: () => <hr className="border-[#1a4d3e]/20 my-5" />,
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-[#4A90E2] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
