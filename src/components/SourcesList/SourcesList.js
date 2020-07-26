import React, { Component } from "react";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";

class SourcesList extends Component {
  render() {
    const {
      sources = [],
      sources: [{ id } = {}] = [],
      onNavSelect = () => {}
    } = this.props;

    const menuItems = sources.map(source => {
      const { id, name } = source;

      return <Menu.Item key={id}>{name}</Menu.Item>;
    });

    return (
      <Layout>
        <p
          style={{
            fontWeight: "bold",
            backgroundColor: "#001529",
            fontSize: "16px",
            color: "white",
            textAlign: "left",
            padding: "10px",
            margin: "0px"
          }}
        >
          News By
        </p>
        {id ? (
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[id]}
            onSelect={({ key }) => {
              onNavSelect(key)
            }}
          >
            {menuItems}
          </Menu>
        ) : null}
      </Layout>
    );
  }
}

export default SourcesList;
