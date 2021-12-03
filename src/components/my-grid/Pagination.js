import React, { useState } from "react";

function Pagination(props) {
  const [totalPage, settotalPage] = useState([]);
  React.useEffect(() => {
    let loopLimit = 0;
    let loopStart = 1;
    if (props.currentPage === 1) {
      loopLimit = props.totalPages < 5 ? props.totalPages : 5;
    } else {
      loopLimit =
        props.currentPage + 4 <= props.totalPages
          ? props.currentPage + 4
          : props.totalPages;
      loopStart =
        props.currentPage + (props.totalPages < 5 ? props.totalPages : 5) <=
        props.totalPages
          ? props.currentPage
          : props.totalPages - (props.totalPages < 4 ? props.totalPages : 4);
    }
    let temparr = [];
    if (loopStart === 0) {
      loopStart = 1;
    }
    for (let index = loopStart; index <= loopLimit; index++) {
      temparr.push(index);
    }
    settotalPage(temparr);
  }, [props.currentPage, props.totalPages]);

  return (
    <div className="mygrid-pagination-btn-div">
      {/* Jump to: <input type="text" className="jump-to-page-input" value={props.currentPage} onChange={(e) => props.setCurrentPage(e.target.value)}/>  */}
      <button
        className="mygrid-pagination-btn"
        onClick={() => props.setCurrentPage(1)}
      >
        &#60;&#60;
      </button>
      {totalPage.map((val,index) => (
        <button
        key={index.toString()}
          onClick={() => props.setCurrentPage(val)}
          className={
            props.currentPage === val
              ? "mygrid-pagination-btn grid-button-active"
              : "mygrid-pagination-btn"
          }
        >
          {val}
        </button>
      ))}
      <button
        className="mygrid-pagination-btn"
        onClick={() => props.setCurrentPage(props.totalPages)}
      >
        &#62;&#62;
      </button>
    </div>
  );
}

export default Pagination;
