import  { useState, useEffect, useCallback } from 'react'
import './style.css'
import QuoteCard from '../QuoteCard'

const QuoteFeed = () => {
  type ApiResponseType = {
    author: String
    authorSlug: String
    content: String
    dateAdded: String
    dateModified: String
    length: Number
  }
  const [data, setData] = useState<Array<ApiResponseType>>([])
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<Boolean>(false)
  const [scroll, setScroll] = useState<HTMLDivElement>()

  useEffect(() => {
    if (scroll) {
      scroll.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      })
    }
  }, [scroll])

  const fetchData = useCallback(async () => {
    const currentData: Array<ApiResponseType> = data
    setLoading(true)

    await fetch(`https://api.quotable.io/quotes?page=${page}&limit=3`)
      .then((res) => res.json())
      .then((json) => {
        let newData = json.results
        let a: Array<ApiResponseType> = [...currentData, ...newData]
        setData(a)
      })
    const newPage: number = page + 1
    setPage(newPage)
    setLoading(false)
  }, [data, page])

  useEffect(() => {
    fetchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='container-body'>
      <div className='container-upper-section'>
        <p className='container_heading'>
          Hello, here are your morning quotes!
        </p>

        {data.map((i,index) => {
          return (
            <QuoteCard
              dateAdded={i.dateAdded}
              content={i.content}
              author={i.author}
              authorSlug={i.authorSlug}
              key={index}
              setScroll={setScroll}
            />
          )
        })}
      </div>

      <div className='container-button-section'>
        {!loading ? (
          <p className='container-button-text-load-more' onClick={fetchData}>
            Load More
          </p>
        ) : (
          <p className='container-button-text-loading'>Loading...</p>
        )}
      </div>
    </div>
  )
}

export default QuoteFeed
