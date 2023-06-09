import React from 'react'

export const NewsItem = (props) => {

        let { title, description, imageUrl, newsUrl, author, time, source } = props;
        return (
            <div className="card my-3">
                <img src={imageUrl} className="card-img-top" alt="Sports" />
                <div className="card-body">
                    <h5 className="card-title">{title} </h5>
                    <p className="card-text"> {description} </p>
                    <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {(new Date(time)).toUTCString()} </small></p>
                    <a rel='noreferrer' href={newsUrl} className="btn btn-dark" target='blank'>Read More</a>
                </div>
                <div style={{display:'flex', position: 'absolute', right: '0', justifyContent: 'flex-end'}}>
                <span className="badge rounded-pill bg-danger">
                    {source}
                </span>
                </div>
            </div>
        )
}

export default NewsItem