import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Layout } from "antd";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsCard from "../../components/NewsCard/NewsCard";
import SourcesList from "../../components/SourcesList/SourcesList";
import * as actionTypes from "../../store/actions";
import "antd/dist/antd.css";

const { Sider, Content } = Layout;

class NewsPage extends Component {
  
  componentDidMount() {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/sources?category=technology&language=en&apiKey=e0a135705a85474db6f404ea7cb35857"
      )
      .then(responce => {
        const sources = responce.data.sources;
        const [{ id: sourceId }] = sources;

        this.props.onFechSource({
          ...this.props.source,
          sources: [...sources].reduce((com, val) => {
            com[val.id] = val;
            return com;
          }, {})
        });

        this.makeNewsApiRequest(sourceId);
      });
  }

  makeNewsApiRequest = (sourceId, refresh = false, page = 1, pageSize = 20) => {
    const {
      source: { sources = {} }
    } = this.props;

    const { url: selectedUrl } = sources[sourceId];
    const split = selectedUrl.split("//");
    const onlyUrl = split[1].split(".");
    let domainUrl = "";
    if (onlyUrl.length > 2) {
      const [_, domain, topLevelDomain] = split[1].split(".");
      domainUrl = `${domain}.${topLevelDomain}`;
    } else {
      domainUrl = split;
    }
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=technology&domains=${domainUrl}&page=${page}&pageSize=${pageSize}&apiKey=e0a135705a85474db6f404ea7cb35857`
      )
      .then(responce => {
        let presentArticles = [];

        if (!refresh) {
          presentArticles = this.props.news.articles;
        }

        this.props.onFechSource({
          ...this.props.source,
          selectedSourceId: sourceId
        });

        this.props.onFetchNews({
          ...this.props.news,
          page: page,
          totalCount: responce.data.totalResults,
          articles: [...presentArticles, ...responce.data.articles]
        });
      });
  };

  onNavSelectHandler = sourceId => {
    this.makeNewsApiRequest(sourceId, true);
  };

  render() {
    const {
      news: { totalCount = 0, articles = [], page },
      source: { sources = {}, selectedSourceId }
    } = this.props;
    const newsArray = articles.map((article, index) => (
      <Link to={`/details/${index}`} key={index}>
        <NewsCard news={article} />
      </Link>
    ));

    return (
      <Layout style={{ height: "100vh" }}>
        <Layout>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0
            }}
          >
            <SourcesList
              sources={Object.values(sources)}
              onNavSelect={this.onNavSelectHandler}
            />
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Content>
              {newsArray.length ? (
                <InfiniteScroll
                  dataLength={newsArray.length} //This is important field to render the next data
                  next={() => {
                    this.makeNewsApiRequest(selectedSourceId, false, page + 1);
                  }}
                  height={"100vh"}
                  hasMore={totalCount !== newsArray.length}
                  loader={<h2 style={{ textAlign: "center" }}>Loading...</h2>}
                  endMessage={
                    <h2 style={{ textAlign: "center" }}>Thats it folks...</h2>
                  }
                >
                  {newsArray}
                </InfiniteScroll>
              ) : (
                <h2 style={{ textAlign: "center" }}>No News...</h2>
              )}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    news: state.news,
    source: state.source
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchNews: news => dispatch({ type: actionTypes.FETCH_NEWS, news: news }),
    onFechSource: source =>
      dispatch({ type: actionTypes.FETCH_SOURCE, source: source })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsPage);
