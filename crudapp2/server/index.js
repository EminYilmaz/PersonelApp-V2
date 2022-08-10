const mysql = require("mysql");
const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
  database: "personels",
  host: "localhost",
  user: "root",
  password: "password",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const dept = req.body.dept;

  if (name !== "" && dept !== "") {
    const insertDb =
      "insert into personel (name, surname, dept) values (?,?,?)";
    db.query(insertDb, [name, surname, dept], (err, result) => {
      console.log(err);
    });
  }
});

app.get("/get", (req, res) => {
  const getdata = "SELECT * FROM personels.personel";

  db.query(getdata, (err, result) => {
    res.send(result);
  });
});

app.get("/getper/:id", (req, res) => {
  const id = req.params.id;

  const getPer = "SELECT * FROM personels.personel where  id=?";

  db.query(getPer, id, (err, result) => {
    res.send(result);
  });
});

app.get("/getdata/:value", (req, res) => {
  const value = req.params.value;

  const getPer =
    "SELECT * FROM personels.personel WHERE CONCAT(surname,name,dept,city,country) LIKE ?";
  db.query(getPer, ["%" + value + "%"], (err, result) => {
    res.send(result);
  });
});

app.get("/getitem/:arr", (req, res) => {
  var arr = [];
  var arr = req.params.arr.split(",");

  let getItem = "SELECT * FROM personels.personel WHERE  dept=";

  let number = arr.length;
  console.log(number);
  if (number > 0) {
    for (var i = 0; i < number; i++) {
      let dept = arr[i];

      if (i > 0) {
        getItem = getItem.concat(" OR dept='", dept, "'");
      } else {
        getItem = getItem.concat("'", dept, "'");
      }
    }
  } else if (number === 0) {
    getItem = "SELECT * FROM personels.personel";
  }

  getItem = db.query(getItem, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const surname = req.body.surname;
  const dept = req.body.dept;

  let upPer = "UPDATE personels.personel SET";
  let add = "where id=?";
  let value = 0;

  if (name !== "") {
    //İsim boş değilse
    upPer = upPer.concat(" ", "name=?");
    value = value + 1; // sadece name
    if (surname !== "") {
      // soyad boş değilse
      upPer = upPer.concat(" ,", "surname=?");
      value = 2; // name ve surname

      if (dept !== "") {
        //Bölüm boş değilse
        upPer = upPer.concat(" ,", "dept=?");
        value = 3; // name surname dept
      }
    } else {
      if (dept !== "") {
        //Bölüm boş değilse
        upPer = upPer.concat(" ,", "dept=?");
        value = 4; // name  dept
      }
    }
  } else {
    if (surname !== "") {
      upPer = upPer.concat(" ", "surname=?");

      value = 5; // sadece surname
      if (dept !== "") {
        upPer = upPer.concat(" ,", "dept=?");
        value = 6; // surname dept
      }
    } else {
      if (dept !== "") {
        upPer = upPer.concat(" ", "dept=?");
        value = 7; // sadece dept
      }
    }
  }

  upPer = upPer.concat(" ", add);

  switch (value) {
    case 1:
      db.query(upPer, [name, id], (err, res) => {
        console.log(err);
      });
      break;
    case 2:
      db.query(upPer, [name, surname, id], (err, res) => {
        console.log(err);
      });
      break;

    case 3:
      db.query(upPer, [name, surname, dept, id], (err, res) => {
        console.log(err);
      });
      break;
    case 4:
      db.query(upPer, [name, dept, id], (err, res) => {
        console.log(err);
      });
      break;
    case 5:
      db.query(upPer, [surname, id], (err, res) => {
        console.log(err);
      });
      break;
    case 6:
      db.query(upPer, [surname, dept, id], (err, res) => {
        console.log(err);
      });
      break;
    case 7:
      db.query(upPer, [dept, id], (err, res) => {
        console.log(err);
      });
      break;
  }
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  const delPersonel = "delete from personels.personel where id=?";
  db.query(delPersonel, id, (err, result) => {
    console.log(err);
  });
});

app.listen(3001, () => {
  console.log("Bağlantı Kuruldu");
});
