import React, { useState } from "react";

function GetByAge() {
    const [data, setData] = useState([]);
    const [userAge, setUserAge] = useState({age: ''})

    const getData = async (e) => {
        e.preventDefault()
     
        try {
            fetch('http://localhost:3001/byage', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(userAge)
            })
            .then(response => {
                if (response.status == 404) {
                    throw new Error('not found')
                }
                return response.json()
            })
            .then(data => setData(data))
            .catch(error => console.log(error.message));
            setUserAge({age: ''})

        }catch (err) {
            console.log(err.message)
        }
    }
        function handleChange(e) {
            setUserAge({...userAge, age: e.target.value})
        }


    return(
        <>
            <h3>Get By Age</h3><br/>
            <form onSubmit={getData}>
                <label>ID:</label>
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