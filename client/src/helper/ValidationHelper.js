import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function isEmpty(value){
    if(value.length===0){
        return true;
    }
    else{
        return false;
    }
}

export function SuccessToast(msg){
    toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
}

export function ErrorToast(msg){
    toast.error(msg, { position: toast.POSITION.TOP_RIGHT });
}



