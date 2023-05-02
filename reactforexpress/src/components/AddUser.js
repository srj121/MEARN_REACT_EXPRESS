import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddUser({userData, setUserData}) {

    const [userName, setUserName] = useState({name:''})
    const [userAge, setUserAge] = useState({age:''})

    const addData = async (e) => {
            e.preventDefault()

        try {   
           const response = await fetch('http://localhost:3001/addUser',{
            method: 'POST',
            headers: {
                'content-Type':'application/json'
            },
        body: JSON.stringify({ name: userName.name, age: userAge.age })
    });
        if(response.status === 400) {
            throw new Error('Age should not be less than 0');    
        }
    if(!response.ok) {
        throw new Error('Failed to add user.');
    }
        const addedUser = await response.json();

        setUserData([...userData, addedUser]);
        setUserName({name:''})
        setUserAge({age:''})

        toast.success("user has been added!", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
} catch(err) {
     console.log(err.message)
     toast.error(err.message,{
        position: toast.POSITION.BOTTOM_RIGHT
     });
}
    }

    function handleChangeForName(e) {
        setUserName({...userName, name: e.target.value})
       
    }
    function handleChangeforAge(e) {
        setUserAge({...userAge, age: e.target.value});
       
    }

    return(
        <>
        <h3>Add User</h3>
        <form onSubmit={addData}>

        <label>Name:</label>
        <input type="text" placeholder="Name" value={userName.name}
        onChange={handleChangeForName} name='name' required></input><br/>
        
        <label>Age:</label>
        <input type="number" placeholder="Age" value={userAge.age}
        onChange={handleChangeforAge} name='age' required></input>

        <button type="submit">Add</button>
        
        </form>
        <ToastContainer />
        </>
    )
}
export default AddUser