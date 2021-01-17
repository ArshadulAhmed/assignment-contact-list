import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { handleIncrement } from "../redux/actions/loadContactList";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";

function Pagination(props) {
  let lastItemInList = props.homePageItems[props.homePageItems.length - 1];
  let lastlistIndex = props.homePageItems.indexOf(lastItemInList);

  const [lastList, setLastList] = useState(lastlistIndex);

  useEffect(() => {
    setLastList(lastlistIndex);
  }, [lastlistIndex]);

  useEffect(() => {
    props.handleIncrement(lastList);
  }, [lastList]);

  const handlePaginationDec = () => {
    setLastList(lastList + 4);
  };

  const handlePaginationInc = () => {
    if (lastList > 4) {
      setLastList(lastList - 4);
    } else {
      setLastList(lastList);
    }
  };

  return (
    <div className="paginationInner">
      {!(lastList === props.homePageItems.indexOf(lastItemInList)) ? (
        <DoubleLeftOutlined
          className="leftPagination"
          onClick={handlePaginationDec}
        />
      ) : null}
      {props.homePageItemsButton && props.homePageItemsButton.length >= 4 ? (
        <DoubleRightOutlined
          className="rightPagination"
          onClick={handlePaginationInc}
        />
      ) : null}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLoadingProducts: state.contactList.isLoading,
    homePageItemsButton: state.contactList.data,
    homePageItems: state.contactList.mainData,
  };
}

const mapDispatchToProps = {
  handleIncrement,
};
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
