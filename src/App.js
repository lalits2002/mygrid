import "./App.css";
import "./custom.css";
import Mygrid from "./components/my-grid/Mygrid";
import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  const [rows, setrows] = useState([]);
  useEffect(() => {
    axios.get("https://randomuser.me/api/?results=100").then((res) => {
      let results = [];
      results = res.data.results;
      results = results.map((val) => {
        return {
          id: val.id.value,
          name: val.name.first,
          email: val.email,
          phone: val.phone,
          photo: val.picture.medium,
        };
      });
      setrows(results);
    });
  }, []);
  let columns = [
    {
      name: "User Name",
      type: "string",
      field: "name",
      class: "customClass",
      defaultSorting: true,
    },
    {
      name: "E-mail",
      type: "email",
      field: "email",
    },
    {
      name: "Phone",
      type: "string",
      field: "phone",
    },
    {
      name: "Photo",
      type: "image",
      field: "photo",
    },
  ];
  return (
    <Mygrid
      rows={rows}
      columns={columns}
      enablePagination={true}
      enableSorting={true}
    />
  );
}

export default App;
