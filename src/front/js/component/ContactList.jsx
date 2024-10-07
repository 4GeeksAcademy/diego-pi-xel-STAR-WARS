import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';

export const Contacts = () => {
    const { store, actions } = useContext(Context);
    const contact = store.contacts;

    const handleDelete = (id) => {
        actions.deleteContact(id);
    };

    return (
        <div className="container bg-dark mb-3">
            <div className="navbar navbar-dark bg-dark">
                <h1 className="text-light pt-4">Contacts</h1>
                <Link to="/add-contacts">
                    <button className="btn btn-secondary">Add Contact</button>
                </Link>
            </div>
            <ul>
                {contact.map((contact, index) => (
                    <div key={index} className="card mb-3 d-flex justify-content-between">
                        <div className="row g-0 bg-secondary bg-opacity-10">
                            <div className="col-md-3 p-2 position-relative">
                                <div className="d-none d-md-block position-absolute top-50 start-50 translate-middle">
                                    <img src="https://starwars.chocobar.net/star-wars-soldier.jpeg" className="img-fluid rounded-start" alt="Star Wars - Soldier" />
                                </div>
                            </div>
                            <div className="col-md-7 p-2 text-start">
                                <div className="card-body">
                                    <h5 className="card-title">{contact.name}</h5>
                                    <p className="card-text">
                                        <i className="fas fa-map-marker-alt"></i>
                                        {contact.address}
                                        <br />
                                        <i className="fas fa-phone"></i>
                                        {contact.phone}
                                        <br />
                                        <i className="fas fa-envelope"></i>
                                        {contact.email}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-2 p-2 text-end">
                                <div className="mt-3">
                                    <div className="d-flex justify-content-evenly">
                                        <Link className="btn btn-secondary" to={`/edit-contacts/${contact.id + 1}`}>
                                            <i className="far fa-edit"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(contact.id)}>
                                            <i className="far fa-trash-can"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};
