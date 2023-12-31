import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import ax, { getToken } from "../../api/Axios";

const UserItem = ({ }) => {

    const [itemList, setItemList] = useState([]);

    const refreshList = () => {
        ax
            .get("/api/users/me/items/")
            .then((res) => {
                console.log(res.data);
                setItemList(res.data);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        refreshList();
    }, []);



    return (
        <div>
            <h2>Item List</h2>

            <div className="row">
                <div className="col-md-6">

                </div>
            </div>
        </div>
    );
};

export default UserItem;