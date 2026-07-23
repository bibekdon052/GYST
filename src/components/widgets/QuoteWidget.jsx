import { getDailyQuote } from '../../data/quotes'

export function QuoteWidget() {
  const quote = getDailyQuote()

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-3 text-center gap-2">
      <span className="text-2xl">💭</span>
      <p className="text-xs italic text-text/90 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
        "{quote.text}"
      </p>
      <p className="text-[11px] text-muted font-medium">
        — {quote.author}
      </p>
    </div>
  )
}
