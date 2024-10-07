import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Characters = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getCharacters();
    }, [actions]);

    const handleError = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
        event.target.style.objectFit = 'cover';
    };

    const viewMore = (uid) => {
        navigate(`/characters/${uid}`);
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
                {store.characters.length === 0 ? (
                    <p>Cargando personajes...</p>
                ) : (
                    store.characters.map((item,index) => (
                        <div key={index} className="col">
                            <div className="card my-3 mx-2">
                                <img
                                    src={`https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`}
                                    className="card-img-top img-fluid"
                                    alt={item.name}
                                    onError={handleError}
                                    style={{ aspectRatio: "1/1", width: '100%' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                </div>
                                <div className="card-footer d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-sm bg-warning" onClick={() => viewMore(index + 1)}>Ver más</button>
                                    </div>
                                    <span className="text-body-secondary">
                                        <i className="fa-regular fa-heart" onClick={() => actions.addToFavorites({ name: item.name, type: 'Characters' })}></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
