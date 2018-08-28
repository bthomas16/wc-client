import * as Cookies from 'js-cookie';



export default {

    SetCookies(key, value) {
        Cookies.set(key, value, {
            expires: 1
        });
    },

    GetCookies(key) {
        console.log('hi', key, Cookies.getJSON(key))
        return Cookies.getJSON(key);
    },

    ClearCookies(key) {
        Cookies.remove(key);
    }
}

