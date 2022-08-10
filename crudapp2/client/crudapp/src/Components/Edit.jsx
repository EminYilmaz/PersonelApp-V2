import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';


 const  Edit=()=> {

  const [personel, setPersonel] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dept, setDept] = useState("");
  const [Idper, setIdper] = useState(0);
  let navigate = useNavigate();
  let { id } = useParams();

const idPer = id;
  useEffect(() => {
    
    loadPersonelData();
}, []);

const loadPersonelData = async (perNo) => {
  await Axios.get(`http://localhost:3001/getper/${idPer}`).then((response) => {
      setPersonel(response.data);
  });

}


const updatePersonel = async (idPer) => {
console.log(idPer);
  await Axios.put(`http://localhost:3001/update/${idPer}`, {
      name: name,
      surname:surname,
      dept: dept
  });

}

const goList = () => {
  navigate('/list');
}






  return (
    <div className="Edit">
      {personel.map((personel) => (
       <div className="editPer">
        <h1>Personel Güncelle</h1>
        <div className="edit-top">
        <div className="edit-left">
          <label htmlFor="">Ad</label>
          <label htmlFor="">Soyad</label>
          <label htmlFor="">Bölüm</label>
          </div>
        <div className="edit-right">
        <input type="text" placeholder={personel.name} onChange={(event)=>setName(event.target.value)}></input>
        <input type="text" placeholder={personel.surname} onChange={(event)=>setSurname(event.target.value)}></input>
        <input type="text" placeholder={personel.dept} onChange={(event)=>setDept(event.target.value)}></input>
        </div>
        </div>


        <div className="edit-bottom">
          <button onClick={()=>{updatePersonel(personel.id); goList()}}>Güncelle</button>
          <button onClick={()=> goList()}>Liste</button>
        </div>
       </div>
       ))}
      </div>
  )
}


export default Edit;