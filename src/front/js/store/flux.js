const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            username: "diego",
            message: null,
            contacts: [],
            currentContacts: {},
            hostContact: "https://playground.4geeks.com/contact",
            characters: [],
            planets: [],
            starships: [],
            favorites: [],
            planetInformation: {},
            starshipsInformation: {},
            characterInformation: {},
        },
        actions: {
            getMessage: async () => {
                const response = await fetch(process.env.BACKEND_URL + "/api/hello");
                if (!response.ok) {
                    console.log("Error loading message from backend", response.status, response.statusText);
                    return;
                }
                const data = await response.json();
                setStore({ message: data.message });
                return data;
            },

            getAgenda: async () => {
                const response = await fetch(`${getStore().hostContact}/agendas/${getStore().username}`, {
                    method: 'GET'
                });
                if (!response.ok) {
                    getActions().createAgenda();
                }
                const data = await response.json();
                setStore({ contacts: data.contacts });
            },

            createAgenda: async () => {
                const response = await fetch(`${getStore().hostContact}/agendas/${getStore().username}`, {
                    method: 'POST'
                });
                getActions().getAgenda();
            },

            // ADD CONTACT
            addContact: async (dataToSend) => {
                const response = await fetch(`${getStore().hostContact}/agendas/${getStore().username}/contacts/`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dataToSend)
                });
                if (response.ok) {
                    getActions().getAgenda();
                }
            },

            // EDIT CONTACT
            editContact: async (id, dataToSend) => {
                const uri = `${getStore().hostContact}/agendas/${getStore().username}/contacts/${id}`;
                const options = {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dataToSend)
                };
                const response = await fetch(uri, options);
                if (response.ok) {
                    getActions().getAgenda();
                }
            },

            // DELETE CONTACT
            deleteContact: async (designateNumber) => {
                const uri = `${getStore().hostContact}/agendas/${getStore().username}/contacts/${designateNumber}`;
                const options = {
                    method: 'DELETE'
                };
                console.log(":", uri);
                const response = await fetch(uri, options);
                if (response.ok) {
                    getActions().getAgenda();
                }
            },

            // GET CHARACTERS
            getCharacters: async () => {
                const response = await fetch("https://swapi.dev/api/people");
                if (response.ok) {
                    const data = await response.json();
                    setStore({ characters: data.results });
                }
            },

            // GET PLANETS
            getPlanets: async () => {
                const response = await fetch("https://swapi.dev/api/planets");
                if (response.ok) {
                    const data = await response.json();
                    setStore({ planets: data.results });
                }
            },

            // GET STARSHIPS
            getStarships: async () => {
                const response = await fetch("https://swapi.dev/api/starships");
                if (response.ok) {
                    const data = await response.json();
                    setStore({ starships: data.results });
                }
            },

            // GET PLANET INFORMATION
            getPlanetInformation: async (uid) => {
                const response = await fetch(`https://swapi.dev/api/planets/${uid}/`);
                if (response.ok) {
                    const data = await response.json();
                    setStore({ planetInformation: data });
                }
            },

            // CLEAR PLANET INFORMATION
            clearPlanetInformation: () => {
                setStore({ planetInformation: {} });
            },

            // GET STARSHIP INFORMATION
            getStarshipsInformation: async (uid) => {
                const response = await fetch(`https://swapi.dev/api/starships/${uid}/`);
                if (response.ok) {
                    const data = await response.json();
                    setStore({ starshipsInformation: data });
                }
            },

            // CLEAR STARSHIP INFORMATION
            clearStarshipsInformation: () => {
                setStore({ starshipsInformation: {} });
            },

            // GET CHARACTER INFORMATION
            getCharacterInformation: async (uid) => {
                const response = await fetch(`https://swapi.dev/api/people/${uid}/`);
                if (response.ok) {
                    const data = await response.json();
                    setStore({ characterInformation: data }); 
                }
            },

            // CLEAR CHARACTER INFORMATION
            clearCharacterInformation: () => {
                setStore({ characterInformation: {} }); 
            },

            // ADD TO FAVORITES
            addToFavorites: (item) => {
                setStore({ favorites: [...getStore().favorites, item] });
            }
        }
    };
};

export default getState;
