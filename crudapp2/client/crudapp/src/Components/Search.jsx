import "../../src/App.css";
import { useState } from "react";

const Search = ({ setArrFunc }) => {
  const [selected, setSelected] = useState(null);
  const [checklist, setChecklist] = useState([]);

  let i = 1;
  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  };

  const getData = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      //Kullanıcı checkboxa tıklarsa

      checklist.push(value);
      setArrFunc([...checklist]);
      console.log(checklist);
    } else {
      let index = checklist.findIndex((rank) => rank === value);

      checklist.splice(index, 1);
      setArrFunc([...checklist]);
      console.log(checklist);
    }
  };

  return (
    <div className="search">
      <div className="accordion">
        <div className="item">
          <div className="id" onClick={() => toggle(i)}>
            <h4>Bölümler</h4>
            <span>{selected === i ? "-" : "+"}</span>
          </div>
          {data.map((item) => (
            <div className={selected === i ? "dept show" : "dept"}>
              <h3>
                {item}{" "}
                <input
                  type={"checkbox"}
                  value={item}
                  onChange={(e) => getData(e)}
                ></input>
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const data = [
  "Training",
  "Accounting",
  "Engineering",
  "Research and Development",
  "Legal",
  "Sales",
  "Business Development",
  "Product Management",
];

export default Search;
