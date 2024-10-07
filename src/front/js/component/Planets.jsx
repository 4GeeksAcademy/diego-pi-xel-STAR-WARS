import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Planets = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getPlanets();
    }, [actions]);

    const handleError = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
        event.target.style.objectFit = 'cover';
    };

    const viewMore = (uid) => {
        navigate(`/planets/${uid}`);
    };

    return (
        <div className="container mt-5 mb-5">
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    <li className="page-item">
                        <a className="page-link text-dark bg-warning" href="#">Previous</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link text-dark bg-warning" href="#">1</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link text-dark bg-warning" href="#">2</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link text-dark bg-warning" href="#">3</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link text-dark bg-warning" href="#">Next</a>
                    </li>
                </ul>
            </nav>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
                {store.planets.length === 0 ? (
                    <p>Cargando planetas...</p>
                ) : (
                    store.planets.map((item,index) => (
                        <div key={item.uid} className="col">
                            <div className="card my-3 mx-2">
                                <img
                                    src={`https://starwars-visualguide.com/assets/img/planets/${index + 1}.jpg`}
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
                                        <button type="button" className="btn btn-sm bg-warning" onClick={() => viewMore(item.uid)}>View more</button>
                                    </div>
                                    <span className="text-body-secondary">
                                        <i className="fa-regular fa-heart" onClick={() => actions.addToFavorites({ name: item.name, type: 'Planets' })}></i>
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
