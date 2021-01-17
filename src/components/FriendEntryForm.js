import React from "react";
import { connect } from "react-redux";
import { addFriendToList } from "../redux/actions/loadContactList";

function FriendEntryForm(props) {
  const [value, setValue] = React.useState("");
  const [errorMessage, setErrorMessa] = React.useState(null);
  var letters = /^[A-Za-z0-9 ]+$/;

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      setErrorMessa("Please enter name");
    } else if (!value.match(letters)) {
      setErrorMessa("Only alphabets allowed");
    } else {
      setErrorMessa(null);
      setValue("");
      props.addFriendToList(value);
    }
  };
  const setStateHandler = (input) => {
    setValue(input);
  };

  return (
    <form onSubmit={onFormSubmit} className="addListForm">
      <input
        type="text"
        placeholder="Enter your friend's name"
        onChange={(e) => setStateHandler(e.target.value)}
        value={value}
      />
      {errorMessage ? <p className="error">{errorMessage}</p> : null}
    </form>
  );
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  addFriendToList,
};
export default connect(mapStateToProps, mapDispatchToProps)(FriendEntryForm);
