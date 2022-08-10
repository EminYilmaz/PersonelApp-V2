import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/App.css";
import Search from "./Search";
import Axios from "axios";

const List = () => {
  const [booleanValue, setBooleanValue] = useState(false);
  const [arr, setArr] = useState([]);
  const navigate = useNavigate();
  const [personels, setPersonels] = useState([]);
  const [search, setSearch] = useState("");

  console.log(`testing`, arr);

  useEffect(() => {
    dataFilter();
  }, [arr]);

  // useEffect(() => {
  //   getAllPers();
  // }, [booleanValue]);

  const getAllPers = async () => {
    await Axios.get("http://localhost:3001/get").then((response) => {
      setPersonels(response.data);
    });
  };

  const toogleBoolean = () => {
    setBooleanValue(!booleanValue);
  };

  const getData = async (value) => {
    await Axios.get(`http://localhost:3001/getdata/${value}`).then(
      (response) => {
        setPersonels(response.data);
      }
    );
  };

  const delPersonel = async (id) => {
    await Axios.delete(`http://localhost:3001/delete/${id}`);
    toogleBoolean();
  };

  const goEditPage = async (id) => {
    navigate(`/edit/${id}`);
  };

  const dataFilter = async () => {
    if (arr.length > 0) {
      await Axios.get(`http://localhost:3001/getitem/${arr}`).then(
        (response) => {
          if (response.data.length > 0) {
            setPersonels(response.data);
          }
        }
      );
    } else {
      Axios.get("http://localhost:3001/get").then((response) => {
        setPersonels(response.data);
      });
    }
  };

  return (
    <div className="listcontainer">
      <div className="listheader">
        <p>Personel Listesi</p>
      </div>
      <div className="search-list">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => getData(e.target.value)}
        />
      </div>

      <div className="divided">
        <div className="div-left">
          <Search setArrFunc={setArr}></Search>
        </div>
        <div className="div-right">
          <div className="list">
            {personels.map((personel) => {
              return (
                <div className="card">
                  <div className="card-body">
                    <div className="card-text">
                      <label>Ad</label>
                      <h3>{personel.name}</h3>
                      <label>Soyad</label> <h3>{personel.surname}</h3>
                      <label>Bölüm</label>
                      <h3>{personel.dept}</h3>
                    </div>
                    <div className="buttons">
                      <input
                        type="button"
                        id="edit"
                        value="Güncelle"
                        onClick={() => goEditPage(personel.id)}
                      />
                      <input
                        type="button"
                        id="del"
                        value="Sil"
                        onClick={() => {
                          delPersonel(personel.id);
                          toogleBoolean();
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* component={Link} to={`/edit/${personel.id}`} */}
        </div>
      </div>
    </div>
  );
};

export default List;
