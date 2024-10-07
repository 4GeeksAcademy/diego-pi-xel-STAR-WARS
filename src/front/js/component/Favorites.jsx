import React, { useContext } from "react";
import { Context } from "../store/appContext.js";

export const Favorites = () => {
    const { store } = useContext(Context);

    return (
        <div className="container mt-5 mb-5">
            <h2>Favoritos</h2>
            <div className="row">
                {store.favorites.length === 0 ? (
                    <p>No hay favoritos añadidos.</p>
                ) : (
                    store.favorites.map((fav, index) => (
                        <div key={index} className="col">
                            <div className="card my-3 mx-2">
                                <div className="card-body">
                                    <h5 className="card-title">{fav.name}</h5>
                                    <p className="card-text">Tipo: {fav.type}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
