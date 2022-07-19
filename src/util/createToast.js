import { toast } from 'react-toastify'

const createToast = (type = 'success', message) => {
    return toast[type](message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });
}
export default createToast;