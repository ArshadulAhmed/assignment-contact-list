import React from "react";
import { connect } from "react-redux";
import {
  searchFriendName,
  loadContactList,
} from "../redux/actions/loadContactList";

function SearchForm(props) {
  const onFinish = (e) => {
    e.preventDefault();
    props.searchFriendName(e.target.value);
    if (e.target.value === undefined || e.target.value === "") {
      props.loadContactList();
    }
  };

  return (
    <form className="searchForm">
      <input
        type="text"
        placeholder="Search Friend"
        onChange={(e) => onFinish(e)}
      />
    </form>
  );
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  searchFriendName,
  loadContactList,
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
