import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadContactList } from "../redux/actions/loadContactList";
import { DefaultLoading } from "../components/DefaultLoading";
import "../assets/mainLayout.css";
import { StarOutlined, StarFilled, DeleteOutlined } from "@ant-design/icons";

function HomePage(props) {
  useEffect(() => {
    props.loadContactList();
  }, []);

  const { isLoadingProducts } = props;

  if (isLoadingProducts) {
    return <DefaultLoading />;
  }

  const homePageCardItems =
    props.homePageItemsIndex &&
    props.homePageItemsIndex.map((item, id) => {
      return (
        <div className="contact_individual" key={item.id}>
          <div className="left_list">
            <p className="list_name">{item.name}</p>
            <p>is your friend</p>
          </div>
          <div className="right_list">
            {item.isFav ? <StarFilled /> : <StarOutlined />}
            <DeleteOutlined className="deleteButton" />
          </div>
        </div>
      );
    });

  return (
    <React.Fragment>
      <div className="main">
        <div className="topBar">
          <p>Friends List</p>
        </div>
        <div className="mainList">
          {props.homePageItems && props.homePageItems.length !== 0 ? (
            homePageCardItems
          ) : (
            <p>No data</p>
          )}
        </div>
      </div>

      <div className="paginationMain"></div>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    isLoadingProducts: state.contactList.isLoading,
    homePageItemsIndex: state.contactList.data,
    homePageItems: state.contactList.mainData,
  };
}

const mapDispatchToProps = {
  loadContactList,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
