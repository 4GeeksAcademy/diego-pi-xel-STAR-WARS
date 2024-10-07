import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
// Custom components
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
// Custom pages/views
import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Single } from "./pages/Single.jsx";
import { Contacts } from "./component/ContactList.jsx";
import { EditContact } from "./component/EditContact.jsx";
import { AddContact } from "./component/AddContact.jsx";
import { Characters } from "./component/Characters.jsx";
import { CharacterInformation } from "./component/CharacterInformation.jsx";
import { Starships } from "./component/Starships.jsx";
import { StarshipsInformation } from "./component/StarshipsInformation.jsx";
import { Planets } from "./component/Planets.jsx";
import { PlanetInformation } from "./component/PlanetInformation.jsx";
import { Favorites } from "./component/Favorites.jsx";



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Favorites />} path="/favorites" />
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Characters />} path="/characters" />
                        <Route element={<CharacterInformation />} path="/characters/:uid" />
                        <Route element={<Planets />} path="/planets" />
                        <Route element={<PlanetInformation />} path="/planets/:uid" />
                        <Route element={<Starships />} path="/starships" />
                        <Route element={<StarshipsInformation />} path="/starships/:uid" />
                        <Route element={<Contacts />} path="/contacts" />
                        <Route element={<AddContact />} path="/add-contacts" />
                        <Route element={<EditContact />} path="/edit-contacts/:theid" />
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </>
    );
};

export default injectContext(Layout);