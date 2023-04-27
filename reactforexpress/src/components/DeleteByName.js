import React, { useState } from "react";

function DeletByName() {
    const [data, setData] = useState([]);
    const [userName, setUserName] = useState({name: ''})

    const getData = async (e) => {
        e.preventDefault()
     
        try {
            fetch('http://localhost:3001/deleteuserbyname', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(userName)
            })
            .then(response => {
                if (response.status == 404) {
                    throw new Error('not found')
                }
                return response.json()
            })
            .then(data => setData(data))
            .catch(error => console.log(error.message));
            setUserName({name: ''})

        }catch (err) {
            console.log(err.message)
        }
    }
        function handleChange(e) {
            setUserName({...userName, name: e.target.value})
        }


    return(
        <>
            <h3>Delete by Name</h3><br/>
            <form onSubmit={getData}>
                <label>NAME:</label>

                <input type="text" placeholder="Name" value={userName.name}
                  onChange={handleChange} name="name" required></input>

                 <button type="submit">Delete</button>
            {data.length !==0 &&
               <h3>
                Document has been Deleted!
               </h3>
            }
            </form>
        </>
    );
}
export default DeletByName