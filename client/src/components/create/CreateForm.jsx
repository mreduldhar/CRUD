import React, { Fragment, useRef } from 'react';
import { ErrorToast, SuccessToast, isEmpty } from '../../helper/ValidationHelper';
import { Create } from './../../API/CRUDApi';
import FullScreenLoader from '../common/FullScreenLoader';
import {withRouter} from "react-router";


const CreateForm = (props) => {

    let ProductName, ProductCode, Img, UnitPrice, Qty, TotalPrice, Loader = useRef();

    const SaveData = () => {
       let Product_Name = ProductName.value;
       let Product_Code =ProductCode.value;
       let Product_Img = Img.value;
       let Unit_Price = UnitPrice.value;
       let Product_Qty = Qty.value;
       let Total_Price = TotalPrice.value;

       if(isEmpty(Product_Name)){
            ErrorToast("Product Name is required")
       }
       else if(isEmpty(Product_Code)){
        ErrorToast("Product Code is required")
       }
       else if(isEmpty(Product_Img)){
        ErrorToast("Product Image is required")
       }
       else if(isEmpty(Unit_Price)){
        ErrorToast("Unit Price is required")
       }
       else if(isEmpty(Product_Qty)){
        ErrorToast("Product Qty is required")
       }
       else if(isEmpty(Total_Price)){
        ErrorToast("Total Price is required")
       }
       else{
            Loader.classList.remove('d-none')
            Create(Product_Name, Product_Code, Product_Img, Unit_Price, Product_Qty, Total_Price).then((result)=>{
            Loader.classList.add('d-none')
                if(result === true){
                    SuccessToast("Data Save Successfully");
                    props.history.push("/")
                }
                else{
                    ErrorToast("Request Fail, Try Again");
                }
            })
       }

       

        
    }

    return (
        <Fragment>
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-md-4 p-2">
                        <label>Product Name</label>
                        <input ref={(input)=>ProductName=input} type="text" className='form-control' />
                    </div>
                    <div className="col-md-4 p-2">
                        <label>Product Code</label>
                        <input ref={(input)=>ProductCode=input} type="text" className='form-control' />
                    </div>
                    <div className="col-md-4 p-2">
                        <label>Image</label>
                        <input ref={(input)=>Img=input} type="text" className='form-control' />
                    </div>
                    <div className="col-md-4 p-2">
                        <label>Unit Price</label>
                        <input ref={(input)=>UnitPrice=input} type="text" className='form-control' />
                    </div>
                    <div className="col-md-4 p-2">
                        <label>Qty</label>
                        <input ref={(input)=>Qty=input} type="text" className='form-control' />
                    </div>
                    <div className="col-md-4 p-2">
                        <label>Total Price</label>
                        <input ref={(input)=>TotalPrice=input} type="text" className='form-control' />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-4 p-2">
                        <button onClick={SaveData} className='btn btn-primary w-100'>Save</button>
                    </div>
                </div>
            </div>
            <div className='d-none' ref={(div)=>Loader=div}>
                <FullScreenLoader/>
            </div>

        </Fragment>
    );
};

export default withRouter(CreateForm);