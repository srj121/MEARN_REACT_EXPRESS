import React, { useState } from "react";

function GetName() {
    const [data, setData] = useState([]);
    const [userName, setUserName] = useState("")

   
    const getData = async () => {
        try {
            fetch(`http://localhost:3001/byname?name=${userName}`)
            .then(response => {
                if (response.status == 404) {
                    throw new Error('not found')
                }
                return response.json()
            })
            .then(data => setData(data))
            .catch(error => console.log(error.message));
            setUserName("")

        } catch (err){
          console.log(err.message)
        }
    }

    function handleChange(e) {
        setUserName(e.target.value)
    }

    return(
        <>
        <h3>Get By Name</h3>
        <form action="/byName" method="get"></form>
        <label>Name:</label>

        <input type="text" placeholder="Name" value={userName}
         onChange={handleChange} name="name" required></input>
         
        <button onClick={getData}>Find</button>
        {data.length != 0 && <table >  
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
export default GetName