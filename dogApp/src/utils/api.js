const BASE_URL = 'http://localhost:3007';

function APICall(url, method, body) {
    const options = {method};
    if(body) {
        options.body = JSON.stringify(body);
        options.headers = {'content-type': 'application/json'};
    }
    return fetch(BASE_URL + url, options)
        .then(res => res.json())
        .then(res => {
            if (res.status == 'success')
                return res.data;
            else
                throw new Error(res.message);
        });
};

export const addUser = name => APICall('/user', 'POST', {name});
export const getAllUsers = () => APICall('/users', 'GET');
export const getUserById = userId => APICall(`/user/${userId}`, 'GET');
export const updateNameById = (userId, name) => APICall(`/user/${userId}/name`, 'PATCH', {name});
export const updateProfileById = (userId, profilePic) => APICall(`/user/${userId}/profile`, 'PATCH', {profilePic});
export const deleteUserById = userId => APICall(`/user/${userId}`, 'DELETE');
export const deleteProfileById = userId => APICall(`/user/${userId}/profile`, 'DELETE');

export const addFavorite = (userId, imgSrc) => APICall(`/user/${userId}/favorite`, 'POST', {imgSrc, userId});
export const getFavorites = (userId) => APICall(`/user/${userId}/favorites`, 'GET');
export const updateFavoriteNameById = (userId, favId, name) => APICall(`/user/${userId}/favorite/${favId}/name`, 'PATCH', {name});
export const deleteFavoriteByID = (userId, favId) => APICall(`/user/${userId}/favorite/${favId}`, 'DELETE');
export const deleteFavoriteNameByID = (userId, favId) => APICall(`/user/${userId}/favorite/${favId}/name`, 'DELETE');