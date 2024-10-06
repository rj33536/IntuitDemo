const USER_SERVICE_URL = "http://127.0.0.1:8000/users/";
function getDummyPromise() {
    return new Promise((resolve, reject) => {
        resolve(true);
    })
}
export function register(username) {
    return getDummyPromise();
    // return fetch(USER_SERVICE_URL + "register/", {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         username: username,
    //     })
    // });
}

export function login(username) {
    return getDummyPromise();
    // return fetch(USER_SERVICE_URL + "login?username="+username, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Referrer-Policy': 'same-origin'
    //     },
        
    // });
}