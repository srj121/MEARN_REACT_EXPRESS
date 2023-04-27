import React, { useState, useEffect } from "react";

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
    getData()
}, []);

const getData = async () => {
    fetch('http://localhost:3001')
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error(error));

}
    return(
        <>
            <h1> Home </h1>
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
                </table>
        </>
    );
}

export default Home;