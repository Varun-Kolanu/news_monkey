import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

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
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff1b6a42901a4c5db04989f7f408de53&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff1b6a42901a4c5db04989f7f408de53&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            loading: false
        });
    }

    handleNextClick = async () => {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff1b6a42901a4c5db04989f7f408de53&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
            this.setState({loading: true})
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: parsedData.articles,
                page: this.state.page + 1,
                loading: false
            });
    }
    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center' >News Monkey - Top Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    { (!this.state.loading) &&
                        this.state.articles.map((elmt) => {
                            return <div key={elmt.url} className="col-md-4">
                                <NewsItem title={elmt.title ? (elmt.title) : ""} description={elmt.description ? (elmt.description) : ""} imageUrl={elmt.urlToImage ? elmt.urlToImage : "https://c.ndtvimg.com/2023-05/fgthcvg_shubman-gill-bcci_625x300_26_May_23.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=675"} newsUrl={elmt.url} />
                            </div>
                        })
                    }
                </div>
                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > (Math.ceil(this.state.totalResults / this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News