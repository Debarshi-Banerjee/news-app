import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Col, Row } from "antd";
import moment from "moment";

import "antd/dist/antd.css";

class NewsDetilsPage extends Component {
  render() {
    const {
      match: { params: { id: selectedNewsId } } = {},
      news: { articles = [] } = {}
    } = this.props;
    
    const seletedNews = articles.reduce((cum, cur, index) => {
      cum[index] = cur;
      return cum;
    }, {})[selectedNewsId];

    const {
      author,
      title,
      content,
      urlToImage,
      url,
      publishedAt,
      source: { name }
    } = seletedNews;

    const now = moment();
    const publishedDate = moment(publishedAt);
    const duration = moment.duration(now.diff(publishedDate));
    console.log(seletedNews);
    return (
      <Card
        bodyStyle={{
          padding: "0px"
        }}
      >
        <div style={{ position: "relative" }}>
          <img
            src={urlToImage}
            alt=""
            style={{
              display: "block",
              width: "100%",
              height: "100vh",
              objectFit: "cover"
            }}
          />
          <div
            className="shadow"
            style={{
              color: "white",
              position: "absolute",
              bottom: "10px",
              left: "16px"
            }}
          >
            <h1 style={{ textShadow: "2px 2px 4px #000000" }}>
              <a href={url} target="_blank" style={{ color: "white" }}>
                {title}
              </a>
            </h1>
            <h2 style={{ color: "white", textShadow: "2px 2px 4px #000000"}}>
              Article By {author} at {name} {duration.humanize()} ago
            </h2>
            <p style={{ color: "white", textShadow: "2px 2px 4px #000000"}}>{content}</p>
          </div>
        </div>
      </Card>
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsDetilsPage);
