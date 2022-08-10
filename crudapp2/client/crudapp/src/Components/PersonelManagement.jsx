import React from 'react'
import MainPage from './MainPage';
import '../App.css';
import List from './List';
import Add from './Add';





 const  PersonelManagement=()=> {
    return (
        <div className='App'>
        <div className='App-next'>
            
            <MainPage/>
            <List/>
            <Add/>
           

            </div>
   </div>
    )
}

export default PersonelManagement;