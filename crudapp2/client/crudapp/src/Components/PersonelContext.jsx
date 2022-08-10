import React, { useState, createContext, useEffect } from 'react';
import Axios from 'axios';

export const PersonelContext = createContext();


const PersonelProvider=(props)=>{

    const [personel, setPersonel] = useState([]);

    useEffect(() => {

        Axios.get("http://localhost:3001/get").then((response) => {
            setPersonel(response.data);
        });

    }, []);

  


    return(
        <PersonelContext.Provider value={[personel,setPersonel]}>
            {props.children}
        </PersonelContext.Provider>
    )
}

export default PersonelProvider;