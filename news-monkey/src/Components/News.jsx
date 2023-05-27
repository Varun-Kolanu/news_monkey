import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    articles = [
        {
            "source": {
                "id": null,
                "name": "NDTV News"
            },
            "author": "NDTV Sports Desk",
            "title": "GT vs MI, IPL 2023, Qualifier 2 Live Updates: Revised Toss And Start Time For Gujarat Titans vs Mumbai Indians Game Announced - NDTV Sports",
            "description": "GT vs MI Live Score: IPL 2023 Qualifier 2 match between Gujarat Titans and Mumbai Indians. Catch all the live updates here",
            "url": "https://sports.ndtv.com/ipl-2023/gt-vs-mi-live-score-ipl-2023-qualifier-2-gujarat-titans-vs-mumbai-indians-live-score-updates-4068513",
            "urlToImage": "https://c.ndtvimg.com/2023-05/fgthcvg_shubman-gill-bcci_625x300_26_May_23.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=675",
            "publishedAt": "2023-05-26T14:03:33Z",
            "content": "GT vs MI, Qualifier 2 IPL 2023 Live Updates: Shubman Gill and Sai Sudharsan aim to keep one-down Gujarat Titans going against Mumbai Indians in IPL 2023, Qualifier 2 match on Friday. Piyush Chawla re… [+424 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Crictoday.com"
            },
            "author": "Abhinav Tyagi",
            "title": "Mumbai Indians star bowler Akash Madhwal has been banned - Crictoday.com (Cricket News) ",
            "description": "Ahead of the game against Gujarat Titans, Akash's brother Ashish shed light on several unknown details about the right arm quick.",
            "url": "http://crictoday.com/cricket/news/akash-was-banned-from-local-tennis-leagues-akashs-brother-reveals-a-stunning-detail-about-mis-latest-bowling-sensation/",
            "urlToImage": "https://crictoday.com/wp-content/uploads/2023/05/Akash-Madhwal.jpg",
            "publishedAt": "2023-05-26T13:21:04Z",
            "content": "Mumbai Indians will face Gujarat Titans on May 26 at the Narendra Modi Stadium for qualifier 2, where the winner would face Chennai Super Kings for the finals.\r\nAll eyes would be on MI's new bowling … [+1007 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Crictoday.com"
            },
            "author": "Abhinav Tyagi",
            "title": "Sunil Gavaskar drops a massive statement on Virat Kohli's selection for the 2024 T20 World Cup - Crictoday.com (Cricket News) ",
            "description": "Several experts weighed in their views on the matter, and the latest to jump onto the bandwagon is former India opener Sunil Gavaskar.",
            "url": "http://crictoday.com/cricket/daily-cricket-news/sunil-gavaskar-drops-a-massive-statement-on-virat-kohlis-selection-for-the-2024-t20-world-cup/",
            "urlToImage": "https://crictoday.com/wp-content/uploads/2023/01/Kohli-and-Gavaskar-Crictoday.jpg",
            "publishedAt": "2023-05-26T12:05:20Z",
            "content": "Royal Challengers Bangalore's dream of a maiden IPL trophy ended after they faced a defeat against Gujarat Titans on the last day of the group stage round. Despite RCB's exit, Virat Kohli has had a p… [+1323 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "NDTV News"
            },
            "author": "NDTV Sports Desk",
            "title": "\"Hasn't Lived Up To 1 Percent Of Expectations\": Virender Sehwag On GT Star - NDTV Sports",
            "description": "Virender Sehwag fired shots at Gujarat Titans star Dasun Shanaka, suggesting he didn't even deliver 1 percent of what was expected of him.",
            "url": "https://sports.ndtv.com/ipl-2023/hasnt-lived-up-to-1-percent-of-expectations-virender-sehwag-on-gt-star-4068319",
            "urlToImage": "https://c.ndtvimg.com/2021-01/483mpe8_virender-sehwag-instagram_650x400_17_January_21.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=675",
            "publishedAt": "2023-05-26T11:39:00Z",
            "content": "The Gujarat Titans became the first team to qualify for the Indian Premier League (IPL) 2023 playoffs, winning 10 of the 14 matches they played in the league stage. Though the franchise put in a cons… [+1634 chars]"
        }
    ]

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
            nextDisabled: false
        }
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=ff1b6a42901a4c5db04989f7f408de53&page=1&pageSize=20"
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults
        });
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=ff1b6a42901a4c5db04989f7f408de53&page=${this.state.page - 1}&pageSize=20`
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            nextDisabled: false
        });
    }

    handleNextClick = async () => {
        if ((this.state.page + 1 > (Math.ceil(this.state.totalResults / 20)))) {
            this.setState({nextDisabled: true})
        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=ff1b6a42901a4c5db04989f7f408de53&page=${this.state.page + 1}&pageSize=20`
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: parsedData.articles,
                page: this.state.page + 1,
                nextDisabled: false
            });
        }
    }
    render() {
        return (
            <div className='container my-3'>
                <h1>News Monkey - Top Headlines</h1>
                <div className="row">
                    {
                        this.state.articles.map((elmt) => {
                            return <div key={elmt.url} className="col-md-4">
                                <NewsItem title={elmt.title ? (elmt.title) : ""} description={elmt.description ? (elmt.description) : ""} imageUrl={elmt.urlToImage ? elmt.urlToImage : "https://c.ndtvimg.com/2023-05/fgthcvg_shubman-gill-bcci_625x300_26_May_23.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=675"} newsUrl={elmt.url} />
                            </div>
                        })
                    }
                </div>
                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.nextDisabled} type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News