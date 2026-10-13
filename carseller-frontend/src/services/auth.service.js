import http from "../http-common";

function login(username, password) {
    var data = {
        name: username,
        password: password
    };
    return http
        .post("/auth/login", data)
        .then(response => {
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data)); // записываем данные пользователя в локальное хранилище, которое хранится в браузере
        }
        return response.data;
    });
}

function logout() {
    localStorage.removeItem('user'); // при нажатии кнопки "Выйти" удаляем данные пользователя из локального хранилища
}
function register(username, password, email) {
    var data = {
        name: username,
        password: password,
        email: email
    };
    return http.post("/auth/register", data);
}

const exportedObject = {
    login: login,
    logout: logout,
    register: register
};

export default exportedObject;
