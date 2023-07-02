import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalize = (str) => {
        return str[0].toUpperCase() + str.slice(1);
    }

    const updateNews = async () => {
        // props.setProgress(0)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        // props.setProgress(100)
    }

    useEffect(() => {
        document.title = `${capitalize(props.category)} - News Monkey`;
        //eslint-disable-next-line no-use-before-define
        updateNews()
    }, [])

    const handlePrevClick = async () => {
        setPage(page-1)
        updateNews();
    }

    const handleNextClick = async () => {
        setPage(page+1)
        updateNews();
    }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }
    return (
        <>
            <h1 className='text-center' style={{marginTop: '90px'}}>News Monkey - {capitalize(props.category)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className='container my-3'>
                    <div className="row">
                        {articles.map((elmt) => {
                            return <div key={elmt.url} className="col-md-4">
                                <NewsItem title={elmt.title ? (elmt.title) : ""} description={elmt.description ? (elmt.description) : ""} imageUrl={elmt.urlToImage ? elmt.urlToImage : "https://c.ndtvimg.com/2023-05/fgthcvg_shubman-gill-bcci_625x300_26_May_23.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=675"} newsUrl={elmt.url} author={elmt.author} time={elmt.publishedAt} source={elmt.source.name} />
                            </div>
                        })
                        }
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className='container d-flex justify-content-between'>
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
                    <button disabled={page + 1 > (Math.ceil(totalResults / props.pageSize))} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div> */}
        </>
    )
}

News.defaultProps = {
    pageSize: 6,
    category: 'general',
    country: 'in'
}

News.propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    country: PropTypes.string
}
