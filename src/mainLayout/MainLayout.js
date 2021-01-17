import React from "react";
import { connect } from "react-redux";
import "../assets/mainLayout.css";
import { Layout } from "antd";
const { Content } = Layout;

function MainLayout(props) {
  return (
    <Layout className="mainLayout">
      <Layout className="site-layout" className="mainLayoutInner">
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}

function mapStateToProps(state) {
  return {};
}
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
