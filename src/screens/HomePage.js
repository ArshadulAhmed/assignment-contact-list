import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  loadContactList,
  removeContactFromList,
  changeFavouritePreferene,
} from "../redux/actions/loadContactList";
import { DefaultLoading } from "../components/DefaultLoading";
import "../assets/mainLayout.css";
import { Modal } from "antd";
import SearchForm from "../components/SearchForm";
import FriendEntryForm from "../components/FriendEntryForm";
import Pagination from "../components/Pagination";
import NoList from "../components/NoList";
import { StarOutlined, StarFilled, DeleteOutlined } from "@ant-design/icons";

function HomePage(props) {
  let lastItemInList = props.homePageItems[props.homePageItems.length - 1];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState({});

  const [lasastList, setLastList] = useState(
    props.homePageItems.indexOf(lastItemInList)
  );

  // useEffect(() => {
  //   props.loadContactList(lasastList);
  // }, []);

  useEffect(() => {
    props.loadContactList(lasastList);
  }, []);

  const { isLoadingProducts } = props;

  const showModal = (id) => {
    setSelectedContact(id);

    setIsModalVisible(true);
  };

  const handleOk = async () => {
    await props.removeContactFromList(selectedContact.id);

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const changeFavouritePref = (id) => {
    props.changeFavouritePreferene(id);
  };

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
            {item.isFav ? (
              <StarFilled
                onClick={() => {
                  changeFavouritePref(item.id);
                }}
              />
            ) : (
              <StarOutlined
                onClick={() => {
                  changeFavouritePref(item.id);
                }}
              />
            )}
            <DeleteOutlined
              onClick={() => showModal(item)}
              className="deleteButton"
            />
          </div>
          <Modal
            title="Confirm Delete Contact"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            className="modalDelete"
          >
            <p>Are you sure want to delete this contact?</p>
          </Modal>
        </div>
      );
    });

  return (
    <React.Fragment>
      <div className="main">
        <div className="topBar">
          <p>Friends List</p>
          <SearchForm />
        </div>
        <FriendEntryForm />
        <div className="mainList">
          {props.homePageItems && props.homePageItems.length !== 0 ? (
            homePageCardItems
          ) : (
            <NoList />
          )}
        </div>
      </div>

      <div className="paginationMain">
        <Pagination />
      </div>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    isLoadingProducts: state.contactList.isLoading,
    homePageItems: state.contactList.mainData,
    homePageItemsIndex: state.contactList.data,
  };
}

const mapDispatchToProps = {
  loadContactList,
  removeContactFromList,
  changeFavouritePreferene,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
