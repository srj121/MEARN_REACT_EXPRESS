import React, { useEffect, useState } from "react";
import '../icon.css'
import { Logout, Profile, Setting } from "./Menu";

function Usericon() {
    const imageUrl = "https://www.w3schools.com/howto/img_avatar2.png";

    const [showMenu, setShowMenu] = useState(false);
    const [activeItem, setActiveItem] = useState(null);


    const toggleMenu = () => {
        setShowMenu(!showMenu);

    }

    const handleItemClick = (item) => {
        setActiveItem(item);
      };

     
    return(
      <>  
        <div className="imgcontainer">
        <img src= { imageUrl } alt="Avatar" id="avatar" className="avatar"
        // onMouseOver={toggleMenu} 
        onClick={toggleMenu}
        // onMouseLeave={toggleMenu}
        />
      </div>
      {showMenu && (
            <div className="user-menu">
                <ul>
                <li onClick={() => handleItemClick("profile")}>Profile</li>
                  <li onClick={() => handleItemClick("settings")}>Settings</li>
                <li onClick={() => handleItemClick("logout")}>Logout</li>
                </ul>
                {activeItem === "profile" && <Profile />}
               {activeItem === "settings" && <Setting />}
              {activeItem === "logout" && <Logout />}

            </div>
        )}
      </>

    );
}
export default Usericon;