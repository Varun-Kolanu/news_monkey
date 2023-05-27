import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, time, source } = this.props;
        return (
            <div className="card my-3">
                <img src={imageUrl} className="card-img-top" alt="Sports" />
                <div className="card-body">
                    <h5 className="card-title">{title} </h5>
                    <p className="card-text"> {description} </p>
                    <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {(new Date(time)).toUTCString()} </small></p>
                    <a rel='noreferrer' href={newsUrl} className="btn btn-dark" target='blank'>Read More</a>
                </div>
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%",zIndex:1}}>
                    {source}
                </span>
            </div>
        )
    }
}

export default NewsItem