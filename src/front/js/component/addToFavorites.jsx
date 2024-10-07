const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            favorites: [],
        },
        actions: {

            // ADD TO FAVORITES
            addToFavorites: (item) => {
                const store = getStore();
                const exists = store.favorites.some(fav => fav.uid === item.uid);
                if (!exists) {
                    setStore({ favorites: [...store.favorites, item] });
                }
            },


        }
    };
};

export default getState;
