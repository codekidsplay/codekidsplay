import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

type Props = {
  markdown: string
  accentColor?: string
}

/** Afișează lecțiile markdown, inclusiv culorile Scratch din <span style="..."> */
export default function LectieMarkdown({ markdown, accentColor = '#0ea5e9' }: Props) {
  return (
    <div
      className="lectie-md prose prose-slate max-w-none prose-headings:scroll-mt-20 prose-a:text-sky-600 prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-table:text-sm"
      style={{ ['--tw-prose-links' as string]: accentColor }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
