import React, { useState, useEffect, useRef } from "react";
import './browser.css'

function BrowserComponent(){
    return(
    <div className="fatherBrowser">
            <div className="browserContainer">
                <button className="searchButton"><i class='bx bx-search'></i></button>
                <input type="text" placeholder="Search movies" className="browser"/>
            </div>
    </div>
    );
}

export default BrowserComponent;