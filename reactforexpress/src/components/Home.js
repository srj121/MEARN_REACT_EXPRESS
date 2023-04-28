import React, { useState, useEffect } from "react";
import DeletByName from "./DeleteByName";
import GetByName from "./GetByName";
import GetByAge from "./GetByAge";
import AddUser from "./AddUser";
import DeletById from "./DeleteById";

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
    getData()
}, [data.length]);

const getData = async () => {
    fetch('http://localhost:3001')
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error(error));

}
    return(
        <>
        <div className="home_component">
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
        </div>
                <div className="rest_of_component">
                <GetByName/>
                 <GetByAge/>
                 <AddUser userData={ data } setUserData={ setData }/>   
                <DeletById userData={ data } setUserData={ setData }/>
                <DeletByName userData={ data } setUserData={ setData }/>
                </div>
                </>
    );
}

export default Home;