import toast from 'react-hot-toast';
// import 'react-toastify/dist/ReactToastify.css';


export function isEmpty(value){
    if(value.length===0){
        return true;
    }
    else{
        return false;
    }
}

export function SuccessToast(msg){
    toast.success(msg, {position:"top-right"});
}

export function ErrorToast(msg){
    toast.error(msg, {position:"top-right"});
}



