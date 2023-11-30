import {toast} from "react-toastify";

const NotificationService = {
    showSuccess: function (message) {
        toast.success(message, {
            position: "top-right", autoClose: 2000,
        });
    },

    showError: function (message) {
        toast.error(message, {
            position: "top-right", autoClose: 2000,
        });
    }
};

export default NotificationService;