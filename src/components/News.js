import React, { Component } from "react";
import Newsitem from "./Newsitem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props); //kabhi bhi constructor use karna hai to apne ko super keyword use karna hi padega
    console.log("This is a constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - Khabri`;
  }

  //ye jo hai abhi component did mount to jab render function run ho jaega uske baad hi vo run hoega ye wala function
  //an usme kaisa hai n ki async await laga akhte mane rukh skhta  ha vo promises resolve hone ke phele mane ki ye to return karta hai promise to sare promise reolve hone ke phele ye await kar  sakhta hai

  //ye functioon kuch nahi refactoring ke poye use kar rahe hai kuiki ye cide n haar baar alag alag us hi rha bas +1 and -1 ka farak dekh raha hai
  /*
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d524e38640ce401eb82d266f9e0ece8e&page=${this.state.page}pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalresults: parsedData.totalResults,
    });
  }
  */
  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d524e38640ce401eb82d266f9e0ece8e&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalresults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  handlePrevClick = async () => {
    console.log("previous");
    if (
      this.state.page + 1 >
      Math.ceil(this.setState.totalresults / this.props.pageSize)
    ) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=d524e38640ce401eb82d266f9e0ece8e&page=${
        this.state.page - 1
      }&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
      });
    }
    /*
    this.setState({ page: this.state.page + 1 });
    this.updateNews();*/
  };
  handleNextClick = async () => {
    console.log("Next");
    if (
      this.state.page + 1 >
      Math.ceil(this.setState.totalresults / this.props.pageSize)
    ) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=d524e38640ce401eb82d266f9e0ece8e&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
      });
    }
    /* this.setState({ page: this.state.page - 1 });
    this.updateNews();*/
  };

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d524e38640ce401eb82d266f9e0ece8e&page=${this.state.page}pageSize=${this.props.pageSize}`;
    this.setState({ page: this.state.page + 1 });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalresults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1
          className="text-center"
          style={{ margin: "35px 0px", marginTop: "90px" }}
        >
          Khabri - Top Headlines on{" "}
          {this.capitalizeFirstLetter(this.props.category)}
        </h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/*
        <div className="conatainer d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            //iska kaisa hai n dekh prev aur nexxt button dala apb api me 30 article hai but show sirf 15 hi h rahe hai isliye mai page daal raha to agar page <=1 hai to button ko disabe  kar le aur iske liye hai hanlde prev click function use kar raha jaha url me page dyamically load ho raha haii uppar dekh skhta hai vo function me  jake handle wale sane goes fir next
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            //ab ye pata karne ke liye ki kitne page hai to api me ek parameter hai page size mane agar vo 2 hai to article 2 hi dikenge page me aur kuch nahi to apan url me page size daal denge apan
            disabled={
              this.state.page + 1 >
              Math.ceil(this.setState.totalresults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
          */}
      </div>
    );
  }
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "genreral",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
