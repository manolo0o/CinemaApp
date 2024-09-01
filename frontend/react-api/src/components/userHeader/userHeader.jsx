import React, { useState, useEffect, useRef } from "react";
import './userHeader.css'

function UserHeader() {
    return(
        <div className="fatherContainer">
            <div className="clientImg">
                <img src="./src/assets/images.png" alt="" />
            </div>
            <div className="contentContainer">
                <p class="text1">Hi, ferucio Tuccine!</p>
                <p class="text2">Let's watch movie together</p>
            </div>
            <div className="notificationContainer">
                <div className="iconContainer">
                    <i class='bx bx-bell bx-flip-horizontal' ></i>
                </div>
            </div>
        </div>
    );
}

export default UserHeader;