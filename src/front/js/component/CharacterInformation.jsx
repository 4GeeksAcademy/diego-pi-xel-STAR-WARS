import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const CharacterInformation = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    useEffect(() => {
        actions.getCharacterInformation(item,index);
        
        return () => {
            actions.clearCharacterInformation();
        };
    }, [params.uid]);

    return (
        <div className="container mt-5 mb-5">
            {store.characterInformation?.name ? (
                <div className="card mb-3 mx-2" style={{ maxWidth: "800px" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img
                                src={`https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`}
                                className="img-fluid rounded-start"
                                alt="Character"
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{store.characterInformation.name}</h5>
                                <p className="card-text">Height: {store.characterInformation.height}</p>
                                <p className="card-text">Mass: {store.characterInformation.mass}</p>
                                <p className="card-text">Hair Color: {store.characterInformation.hair_color}</p>
                                <p className="card-text">Skin Color: {store.characterInformation.skin_color}</p>
                                <p className="card-text">Eye Color: {store.characterInformation.eye_color}</p>
                                <p className="card-text">Birth Year: {store.characterInformation.birth_year}</p>
                                <p className="card-text">Gender: {store.characterInformation.gender}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Cargando información del personaje...</p>
            )}
        </div>
    );
};
