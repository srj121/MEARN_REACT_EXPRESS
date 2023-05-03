import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GetByName() {
    const [data, setData] = useState([]);
    const [userName, setUserName] = useState("")

    function showNotification(message, status = 'success') {
        const toastFunc = status === 'error' ? toast.error : toast.success;
      
        toastFunc(message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
      
   
    const getData = async () => {
        try {
            if(userName === '') {
                showNotification("User name should not be empty", "error");

            }else{
            const response = await fetch(`http://localhost:3001/byname?name=${userName}`)
          
            
            if (response.status === 404) {
                    showNotification(`User name ${userName} not found `, "error");
                    
                }else if (!response.ok) {
                    showNotification("Internal server Error!",'error')
                }else {
                const getName = await response.json();
                
                setData(getName);
                    showNotification("users are Availble by name!")
                setUserName("")
            }
        }

        } catch (err){
          console.log(err.message)
        showNotification(err.message,'error')
        }
    }

    function handleChange(e) {
        setUserName(e.target.value)
    }

    return(
        <>
        <h3>Get By Name</h3>
        <label>Name:</label>

        <input type="text" placeholder="Name" value={userName}
         onChange={handleChange} name="name" required></input>
         
        <button onClick={getData}>Find</button>
        {data.length !== 0 &&
         <table >  
                    <thead>
                        <tr >
                            <th>ID</th>
                            <th>NAME</th>
                            <th>AGE</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map(item => (
                        <tr  key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                        </tr>
                        ))}
                        </tbody>
                </table>}
        </>
    );

}
export default GetByName