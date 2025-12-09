import { toast } from "react-toastify";

export const showToast = ({
    type = "info",
    message = "",
    icon = null,
    autoClose = 3000,
}) => {
    return toast(message, {
        type,                     // success | error | info | warning | default
        icon: icon || undefined,  // custom icon if given
        autoClose,
        position: "top-right",
        pauseOnHover: true,
        closeOnClick: true,
        hideProgressBar: false,
        draggable: true,
    });
};
