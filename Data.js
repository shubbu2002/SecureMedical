import React from "react";
import "./data.css"
import { useDispatch, useSelector } from "react-redux";
import { dataBookSelector } from "../../store/selectors";
import { provider } from "../../store/reducer";
import { deleteData } from "../../store/interactions";
const Data = () =>{
    const account = useSelector((state)=>state.provider.account);
    const orderData = useSelector(dataBookSelector);
    const medical = useSelector((state)=>state.medical.contract);
    const dispatch = useDispatch();
    const provider = useSelector((state)=>state.provider.connection);
    const deleteHandler=(e,data)=>{
        if(window.confirm("Do you want to delete the record? It will be lost forever")){
            deleteData(medical,data.recordId,dispatch,provider);
        }else {
            console.log("Data not deleted");
        }
    }
    return (
        <div>{account?<div><table>
            <thead>
                <tr>
                    <th>recordId</th>
                    <th>Date and Time</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Blood Type</th>
                    <th>Allergies</th>
                    <th>Diagnosis</th>
                    <th>Treatment</th>
                    <th>Delete</th>

                </tr>
            </thead>
            <tbody>
                {
                    orderData && orderData.map((data,index)=>{
                        return(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{data.formattedTimestamp}</td>
                                <td>{data.name}</td>
                                <td>{data.ageNew}</td>
                                <td>{data.gender}</td>
                                <td>{data.bloodType}</td>
                                <td>{data.allergies}</td>
                                <td>{data.diagnosis}</td>
                                <td>{data.treatment}</td>
                                <td><button className="delete-button" onClick={(e)=>deleteHandler(e,data)}>Delete</button></td>
                            </tr>
                        ) 
                    })
                }
            </tbody>
            </table>
            </div>:<h3>Connect to account</h3>}</div>
    )
};
export default Data;