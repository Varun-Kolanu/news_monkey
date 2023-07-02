import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

    static defaultProps = {
        pageSize: 6,
        category: 'general',
        country: 'in'
    }

    static propTypes = {
        pageSize: PropTypes.number,
        category: PropTypes.string,
        country: PropTypes.string
    }

    capitalize = (str) => {
        return str[0].toUpperCase() + str.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalize(this.props.category)} - News Monkey`;
    }

    async updateNews() {
        // this.props.setProgress(0)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        // this.props.setProgress(100)
    }

    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        });
    }
    render() {
        return (
            <>
                <h1 className='text-center' >News Monkey - {this.capitalize(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className='container my-3'>
                        <div className="row">
                            {this.state.articles.map((elmt) => {
                                    return <div key={elmt.url} className="col-md-4">
                                        <NewsItem title={elmt.title ? (elmt.title) : ""} description={elmt.description ? (elmt.description) : ""} imageUrl={elmt.urlToImage ? elmt.urlToImage : "https://c.ndtvimg.com/2023-05/fgthcvg_shubman-gill-bcci_625x300_26_May_23.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=675"} newsUrl={elmt.url} author={elmt.author} time={elmt.publishedAt} source={elmt.source.name} />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > (Math.ceil(this.state.totalResults / this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
}

export default News