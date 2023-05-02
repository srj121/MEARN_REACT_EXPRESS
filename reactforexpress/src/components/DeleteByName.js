import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DeletByName({ userData, setUserData }) {
    const [data, setData] = useState([]);
    const [userName, setUserName] = useState({name: ''})

    const getData = async (e) => {
        e.preventDefault()

        try {
           const response = await fetch('http://localhost:3001/deleteuserbyname', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(userName)
            });
            if (response.status === 404) {
                throw new Error(`User name ${userName.name} not found `)
             }if (!response.ok) {
                 throw new Error('Internal server Error')
                }   
                const deletedUser = await response.json();
                setUserName(...userData, deletedUser)
                setUserName({name: ''})
                setData(deletedUser);
                    toast.success("user has been Deleted!", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });         
                    
                    const remainingUsers = userData.filter(u => u.name !== userName.name)
                setUserData(remainingUsers)
                setData(data)
                
            }catch (err) {
                console.log(err.message)
                toast.error(err.message,{
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
        function handleChange(e) {
            setUserName({...userName, name: e.target.value})
        }


    return(
        <>
            <h3>Delete by Name</h3><br/>
            <form onSubmit={getData}>
                <label>Name:</label>

                <input type="text" placeholder="Name" value={userName.name}
                  onChange={handleChange} name="name" required></input>

                 <button type="submit">Delete</button>
           
            </form>
        </>
    );
}
export default DeletByName