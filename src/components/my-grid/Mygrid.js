import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import PropTypes from "prop-types";

function Mygrid({
  columns,
  rows,
  enablePagination = false,
  enableSorting = false,
}) {
  const [totalNumOfPages, settotalNumOfPages] = useState(0);

  const [pageSize, setpageSize] = useState(enablePagination ? 10 : 10000);
  const [realRow, setRealRow] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    settotalNumOfPages(Math.ceil(rows.length / 10));
    setRealRow(rows);
    setCurrentPage(1);
  }, [rows]);

  //   useEffect(() => {(enablePagination === false ? setpageSize(10000) : null)}, []);

  const handleRecordsPerPage = (e) => {
    settotalNumOfPages(Math.ceil(realRow.length / e.target.value));
    setpageSize(e.target.value);
    setCurrentPage(1);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [update, setUpdate] = useState(1);

  const searchInTable = (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      console.log(";;", e.target.value);
      let tempRow = rows.filter((item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );

      setRealRow(tempRow);
      settotalNumOfPages(Math.ceil(tempRow.length / pageSize));
      setCurrentPage(1);
    } else {
      console.log(";else", rows);
      setRealRow(rows);
      settotalNumOfPages(Math.ceil(rows.length / pageSize));
    }
  };

  let sortFlag1 = 1;
  let sortFlag2 = -1;

  let sortByCol = (targetCol) => {
    columns.forEach((val, ind) => {
      if (val.field === targetCol) {
        columns[ind].active = true;
        if (columns[ind].sorting) {
          if (columns[ind].sorting === "desc") {
            sortFlag1 = 1;
            sortFlag2 = -1;
            columns[ind].sorting = "asc";
          } else {
            sortFlag1 = -1;
            sortFlag2 = 1;
            columns[ind].sorting = "desc";
          }
        } else {
          columns[ind].sorting = "asc";
          sortFlag1 = 1;
          sortFlag2 = -1;
        }
      } else {
        columns[ind].active = false;
      }
    });
    // columns.map((val, ind) => {
    //   if (val.field === targetCol) {
    //     columns[ind].active = true;
    //     if (columns[ind].sorting) {
    //       if (columns[ind].sorting === "desc") {
    //         sortFlag1 = 1;
    //         sortFlag2 = -1;
    //         columns[ind].sorting = "asc";
    //       } else {
    //         sortFlag1 = -1;
    //         sortFlag2 = 1;
    //         columns[ind].sorting = "desc";
    //       }
    //     } else {
    //       columns[ind].sorting = "asc";
    //       sortFlag1 = 1;
    //       sortFlag2 = -1;
    //     }
    //   } else {
    //     columns[ind].active = false;
    //   }
    // });
    let sortedArray = realRow.sort((a, b) => {
      return a[targetCol] > b[targetCol]
        ? sortFlag1
        : b[targetCol] > a[targetCol]
        ? sortFlag2
        : 0;
    });
    setRealRow(sortedArray);
    forceupdate();
  };

  function forceupdate() {
    setUpdate(!update);
  }

  return (
    <div className="mygrid-container">
      <div className="mygrid-toolbar">
        <select
          id="selectNumOfRecords"
          className="mygrid-records-per-page"
          onChange={handleRecordsPerPage}
        >
          <option key="10" value="10">
            10
          </option>
          <option key="30" value="30">
            30
          </option>
          <option key="50" value="50">
            50
          </option>
        </select>
        <label> Per page</label>
        <input
          type="text"
          value={search}
          placeholder="Search"
          onChange={searchInTable}
          className="mygrid-search-input-text"
        />
      </div>
      <div className="mygrid-table-div">
        <table className="mygrid-data-table">
          <thead className="mygrid-table-head">
            <tr>
              {columns.map((colInfo, ind) => (
                <td
                  key={ind}
                  onClick={() => enableSorting && sortByCol(colInfo.field)}
                  className={
                    colInfo.active === true
                      ? colInfo.class + " mygrid-active-column"
                      : colInfo.class
                  }
                >
                  {colInfo.name}
                  {enableSorting && (
                    <label className="grid-sorting-direction">
                      {" "}
                      {colInfo.sorting === "desc" ? "↓" : "↑"}
                    </label>
                  )}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {realRow
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((rowInfo, index) => (
                <tr key={index.toString()}>
                  {columns.map((colInfo, index) => {
                    if (colInfo.type === "image") {
                      return (
                        <td key={index.toString()}>
                          <img
                            key={index.toString()}
                            src={rowInfo[colInfo.field]}
                            alt="profileImg"
                          ></img>
                        </td>
                      );
                    } else if (colInfo.type === "email") {
                      return (
                        <td key={index.toString()}>
                          <a
                            href={"mailto:" + rowInfo[colInfo.field]}
                            key={index.toString()}
                          >
                            {rowInfo[colInfo.field]}
                          </a>
                        </td>
                      );
                    } else if (colInfo.type === "boolean") {
                      if (rowInfo[colInfo.field] === true) {
                        return <td key={index.toString()}>✓</td>;
                      } else {
                        return <td key={index.toString()}>✖</td>;
                      }
                    } else {
                      return (
                        <td key={index.toString()}>{rowInfo[colInfo.field]}</td>
                      );
                    }
                  })}
                </tr>
              ))}
          </tbody>
        </table>
        {enablePagination === true && (
          <Pagination
            totalPages={totalNumOfPages}
            setCurrentPage={(page) => setCurrentPage(page)}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
}

Mygrid.propTypes = {
  name: PropTypes.string,
  columns: PropTypes.array,
  rows: PropTypes.array,
  enablePagination: PropTypes.bool,
  enableSorting: PropTypes.bool,
};

export default Mygrid;
