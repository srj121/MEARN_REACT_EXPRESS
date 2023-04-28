import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function GetByAge() {
    const [data, setData] = useState([]);
    const [userAge, setUserAge] = useState({age: ''})

    const getData = async (e) => {
        e.preventDefault()
     
        try {
            const response = await fetch('http://localhost:3001/byage', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(userAge)
            });

                if (response.status == 404) {
                    throw new Error(`User with age ${userAge.age} not found!`)
                }
                if (!response.ok) {
                    throw new Error('Internal server Error')
                }

                const getAge = await response.json();
                setData(getAge);
                toast.success("users are Availble by age!", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });

            setUserAge({age: ''})

        }catch (err) {
            console.log(err.message)
            toast.error(err.message,{
                position: toast.POSITION.BOTTOM_RIGHT
             });
        }
    }
        function handleChange(e) {
            setUserAge({...userAge, age: e.target.value})
        }


    return(
        <>
            <h3>Get By Age</h3><br/>
            <form onSubmit={getData}>
                <label>Age:</label>
                <input type="number" placeholder="Age" value={userAge.age}  onChange={handleChange} name="age" required></input>
                 <button type="submit">Find</button>
            {data.length !==0 &&
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>AGE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key ={item._id}>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            </form>
        </>
    );
}
export default GetByAge