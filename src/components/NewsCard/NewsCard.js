import React, { Component } from "react";
import { Card, Col, Row } from "antd";
import moment from "moment";

import "antd/dist/antd.css";

import "./NewsCard.css";

class NewsCard extends Component {
  render() {
    const { news } = this.props;
    const { author, title, description, urlToImage, publishedAt } = news;

    const now = moment();
    const publishedDate = moment(publishedAt);
    const duration = moment.duration(now.diff(publishedDate));

    return (
      <div className="newsCard">
        <Card title={title}>
          <Row>{description}</Row>
          <Row>
            <Col
              style={{
                textAlign: "right"
              }}
              span={8}
              offset={16}
            >
              by {author} {duration.humanize()} ago
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default NewsCard;
