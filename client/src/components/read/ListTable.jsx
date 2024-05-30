import React, { useEffect, useState } from "react";
import { Read } from "../../API/CRUDApi";
import FullScreenLoader from "../common/FullScreenLoader";

const ListTable = () => {
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    Read().then((result) => {
      setDataList(result);
    });
  }, []);

  if (dataList.length > 0) {
    return (
      <div>
        <table className="table">
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
                  <td><img className="list-im" src={item.Img} style={{ width: '80px', height: '80px', objectFit: 'cover' }}/></td>
                  <td>{item.UnitPrice}</td>
                  <td>{item.Qty}</td>
                  <td>{item.TotalPrice}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
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

export default ListTable;
