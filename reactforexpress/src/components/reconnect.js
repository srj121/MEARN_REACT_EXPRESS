import React from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/icon.css'

function Reconnect({ userData }) {

    const handleReconnectClick = async (req, res) => {
        try {
            const response = await fetch('http/localhost:3001/reconnect');
            
            if(response.status === 200) {

            toast.success("Reconnected to DB ", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }

            console.log(response.status);
        } catch (err) {
            console.error(err);
            toast.error("Enable connecting to DB ", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }

    };
    return(
        <div className="reconnect">
            <button onClick={handleReconnectClick}> Reconnect </button>
        </div>
    )
}
export default Reconnect;
  