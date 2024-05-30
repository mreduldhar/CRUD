import React, { useEffect, useState } from "react";
import { Delete, Read } from "../../API/CRUDApi";
import FullScreenLoader from "../common/FullScreenLoader";
import { SuccessToast } from "../../helper/ValidationHelper";
import { withRouter } from "react-router";

const ListTable = (props) => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    Read().then((result) => {
      setDataList(result);
    });
  }, []);

  const deleteItem = (id) => {
    Delete(id).then((result) => {
      if (result === true) {
        SuccessToast("Item delete successfully.");
        props.history.push("/");
      } else {
        ErrorToast("Request fail, try again.");
      }
    });
  };

  const updateItem = (id) => {
    props.history.push("/update/" + id);
  };

  if (dataList.length > 0) {
    return (
      <div>
        <table className="table table-bordered align-items-center">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Code</th>
              <th>Image</th>
              <th>Unit</th>
              <th>Qty</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.ProductName}</td>
                  <td>{item.ProductCode}</td>
                  <td>
                    <img
                      className="list-im"
                      src={item.Img}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{item.UnitPrice}</td>
                  <td>{item.Qty}</td>
                  <td>{item.TotalPrice}</td>
                  <td>
                    <button
                      onClick={deleteItem.bind(this, item._id)}
                      className="btn btn-danger mx-1"
                    >
                      Delete
                    </button>
                    <button
                      onClick={updateItem.bind(this, item._id)}
                      className="btn btn-primary mx-1"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <FullScreenLoader />
      </div>
    );
  }
};

export default withRouter(ListTable);
