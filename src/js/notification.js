import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import "@pnotify/countdown/dist/PNotifyCountdown.css";
import { alert } from '@pnotify/core';

export default {
    successRequest() {
        alert({
                    title: "Your images found",
                    text: "Have a nice viewing!",
                    type: 'info',
                    delay: 2500,
                    hide: true,
                });
    },

    incorrectRequest() {
        alert({
                    title: "No image has been found",
                    text: "Please enter your request again!",
                    type: 'error',
                    delay: 3000,
                    hide: true,
                });
    },

    fetchError() {
        alert({
        title: "Error",
        text: "Please, try again!",
        type: 'error',
        delay: 3000,
        hide: true,
      });
    },

    emptyInputError() {
        alert({
        title: "Error",
        text: "Please, try again!",
        type: 'error',
        delay: 3000,
        hide: true,
      });
    },
}