import React,  { useState } from "react";
import { useNavigate } from 'react-router-dom';
import App from "../App";
import Axios from 'axios';

const Add =()=>{
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState();
    const [dept, setDept] = useState("");


 const GetData =()=>{
    console.log(name)
 }

 const cleanData = () => {

    setName("");
    setSurname("");
    setDept("");
}

const goList = () => {
    navigate('/list');
}


const AddPersonel = async () => {

    await Axios.post("http://localhost:3001/create", {
        name: name,
        surname:surname,
        dept: dept
    }).then(() => {
        console.log("Kayıt Başarılı");
    });

}


    return(
        <div className="Personel">
            <div className="Add">
            <h3>Personel Ekle</h3>

            <label>Ad</label>
            <input type="text"
            onChange={(e)=>{setName(e.target.value)}}
            ></input>

            <label>Soyad</label>
            <input type="text"
            onChange={(e)=>{setSurname(e.target.value)}}
            ></input>

            <label>Departman</label>
            <input type="text"
            onChange={(e)=>{setDept(e.target.value)}}
            ></input>

            <button onClick={()=>{ AddPersonel(); cleanData(); goList()}} >Kaydet</button>
            </div>
        </div>
    )
}

export default Add;