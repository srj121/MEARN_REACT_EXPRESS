import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DeletById({ userData, setUserData}) {
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState({_id:''})

    const getData = async (e) => {
        e.preventDefault()

        try {
           const response = await fetch('http://localhost:3001/deleteuserbyid', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(userId)
            });
           
             if (!response.ok) {
                throw new Error(`User Id { ${userId._id} } not found `)
            }   
                const deletedUser = await response.json();
                setUserId(...userData, deletedUser)
                    setData(deletedUser);
                    toast.success("user has been Deleted!", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });         

                const remainingUsers = userData.filter(u => u._id !== userId._id)
                setUserData(remainingUsers)
                setData(data)
               
            }catch (err) {
                console.log(err.message)
                toast.error(err.message,{
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                setUserId({_id: ''})
            }
    }
        function handleChange(e) {
            setUserId({...userId, _id: e.target.value})
        }


    return(
        <>
            <h3>Delete by Id</h3><br/>
            <form onSubmit={getData}>
                <label>Id:</label>

                <input type="text" placeholder="Id" value={userId._id}
                  onChange={handleChange} name="id" required></input>

                 <button type="submit">Delete</button>
           
            </form>
        </>
    );
}
export default DeletById
