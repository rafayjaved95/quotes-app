import './style.css'

type quoteCardProps =  {
  author: String
  authorSlug: String
  dateAdded: String
  content: String
  setScroll: any
}

const QuoteCard = ({
  author,
  authorSlug,
  content,
  dateAdded,
  setScroll,
}: quoteCardProps) => {
  return (
    <div
      className='card-body'
      ref={(el) => {
        setScroll(el)
      }}
    >
      <div className='card-body-upper-section'>
        <div className='card-author'>
          {author}
          <span className='card-author-slug'>@{authorSlug}</span>
        </div>
        <div className='card-year'>{dateAdded.split('-')[0]}</div>
      </div>

      <div className='card-body-lower-section'>
        {content}
      </div>
    </div>
  )
}

export default QuoteCard
