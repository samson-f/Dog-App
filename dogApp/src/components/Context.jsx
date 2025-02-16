import { createContext, useState, useEffect } from "react";
import { addFavorite, addUser, deleteFavoriteByID, deleteUserById,
    getAllUsers, getFavorites, updateFavoriteNameById, updateProfileById } from "../utils/api";

export const DogsContext = createContext();

export function DogsContextProvider({children}) {
    // logic
    const [users, setUsers] = useState([]);
    const [activeUser, setActiveUser] = useState('');
    const [favorites, setFavorites] = useState([]);

    const updateFavorites = () => activeUser && getFavorites(activeUser).then(setFavorites);

    useEffect(() => {
        updateFavorites();
    }, [activeUser]);

    const addToFavorites = (imgSrc) => {
        addFavorite(activeUser, imgSrc)
            .then(updateFavorites);
    }

    const removeFromFavorites = (favId) => {
        deleteFavoriteByID(activeUser, favId)
            .then(updateFavorites);
    }

    const updateFavoriteName = (favId, name) => {
        updateFavoriteNameById(activeUser, favId, name)
            .then(updateFavorites);
    }


    const updateUsers = () => getAllUsers().then(setUsers);

    useEffect(() => {
        updateUsers()
    }, []);

    const addToUsers = (name) => {
        addUser(name).then(updateUsers);
    }

    const removeFromUsers = id => {
        deleteUserById(id).then(updateUsers);
    }

    const updateProfile = (favId) => {
        updateProfileById(id, favId).then(updateUsers);
    }

    const value = {
        activeUser, 
        setActiveUser,
        favorites,
        addToFavorites,
        removeFromFavorites,
        updateFavoriteName,
        users,
        addToUsers,
        removeFromUsers,
        updateProfile,
    };

    return <DogsContext.Provider value={value}>
        {children}
    </DogsContext.Provider>
}