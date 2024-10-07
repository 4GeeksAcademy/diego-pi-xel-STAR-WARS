import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import {Navbar} from '../component/Navbar.jsx';
import { Body } from "../component/Body.jsx";



export const Home = () => {
    return (
        <div>
            <Body/>
        </div>
    );
};