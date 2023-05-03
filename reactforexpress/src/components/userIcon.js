import React, { useEffect, useState } from "react";
import '../css/icon.css'
import '../css/menu.css'
import { Logout, Profile, Settings } from "./Menu";

function Usericon() {
    const imageUrl = "https://www.w3schools.com/howto/img_avatar2.png";

    const [showMenu, setShowMenu] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [isActive, setActive] = useState({
      profile : false,
      settings : false,
      logout : false
    })


    const toggleMenu = () => {
        setShowMenu(!showMenu);

    }

    const handleItemClick = (item) => {
        // setActiveItem(item);
       if (item === 'profile') setActive({...isActive, [item]: !isActive.profile}) 
       else if (item === 'settings') setActive({...isActive, [item]: !isActive.settings}) 
       else if (item === 'logout') setActive({...isActive, [item]: !isActive.logout}) 
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
                  <div>
                <li onClick={() => handleItemClick("profile")}>Profile
                  {isActive.profile && <Profile />}
                </li>
                </div>
                  <li onClick={() => handleItemClick("settings")}>Settings
                  {isActive.settings && <Settings />}
                  </li>
                <li onClick={() => handleItemClick("logout")}>Logout
                {isActive.logout && <Logout />}
                </li>
                </ul>
                {activeItem === "profile" && <Profile />}
               {activeItem === "settings" && <Settings />}
              {activeItem === "logout" && <Logout />}

            </div>
        )}
      </>

    );
}
export default Usericon;