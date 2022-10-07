import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
const items = [
  {
    color: "red",
    value: "#f00",
  },
  {
    color: "green",
    value: "#0f0",
  },
  {
    color: "blue",
    value: "#00f",
  },
  {
    color: "cyan",
    value: "#0ff",
  },
  {
    color: "magenta",
    value: "#f0f",
  },
  {
    color: "yellow",
    value: "#ff0",
  },
  {
    color: "black",
    value: "#000",
  },
  {
    color: "red",
    value: "#f00",
  },
  {
    color: "green",
    value: "#0f0",
  },
  {
    color: "blue",
    value: "#00f",
  },
  {
    color: "cyan",
    value: "#0ff",
  },
  {
    color: "magenta",
    value: "#f0f",
  },
  {
    color: "yellow",
    value: "#ff0",
  },
  {
    color: "black",
    value: "#000",
  },
  {
    color: "red",
    value: "#f00",
  },
  {
    color: "green",
    value: "#0f0",
  },
  {
    color: "blue",
    value: "#00f",
  },
  {
    color: "cyan",
    value: "#0ff",
  },
  {
    color: "magenta",
    value: "#f0f",
  },
  {
    color: "yellow",
    value: "#ff0",
  },
  {
    color: "black",
    value: "#000",
  },
  {
    color: "red",
    value: "#f00",
  },
  {
    color: "green",
    value: "#0f0",
  },
  {
    color: "blue",
    value: "#00f",
  },
  {
    color: "cyan",
    value: "#0ff",
  },
  {
    color: "magenta",
    value: "#f0f",
  },
  {
    color: "yellow",
    value: "#ff0",
  },
  {
    color: "black",
    value: "#000",
  },
  {
    color: "red",
    value: "#f00",
  },
  {
    color: "green",
    value: "#0f0",
  },
  {
    color: "blue",
    value: "#00f",
  },
  {
    color: "cyan",
    value: "#0ff",
  },
  {
    color: "magenta",
    value: "#f0f",
  },
  {
    color: "yellow",
    value: "#ff0",
  },
  {
    color: "black",
    value: "#000",
  },
  {
    color: "red",
    value: "#f00",
  },
  {
    color: "green",
    value: "#0f0",
  },
  {
    color: "blue",
    value: "#00f",
  },
  {
    color: "cyan",
    value: "#0ff",
  },
  {
    color: "magenta",
    value: "#f0f",
  },
  {
    color: "yellow",
    value: "#ff0",
  },
  {
    color: "black",
    value: "#000",
  },
  {
    color: "red",
    value: "#f00",
  },
  {
    color: "green",
    value: "#0f0",
  },
  {
    color: "blue",
    value: "#00f",
  },
  {
    color: "cyan",
    value: "#0ff",
  },
  {
    color: "magenta",
    value: "#f0f",
  },
  {
    color: "yellow",
    value: "#ff0",
  },
  {
    color: "black",
    value: "#000",
  },
];
const Table = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [productPerPage, setProductPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [visitedPage, setVisitedPage] = useState(pageNumber * productPerPage);
  const [tableData, setTableData] = useState([]);
  const [pageCount, setPageCount] = useState(Math.ceil(items.length / productPerPage));
  useEffect(() => {
    setVisitedPage(pageNumber * productPerPage);
  }, [pageNumber, productPerPage]);
  useEffect(() => {
    setTableData(items.slice(visitedPage, visitedPage + productPerPage));
  }, [visitedPage]);
  useEffect(() => {
    setPageCount(Math.ceil(items.length / productPerPage));
  }, [items, productPerPage]);

  const searchedProduct = items.filter((item) => {
    if (searchTerm === "") {
      return item;
    }
    if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    } else {
      return console.log("not found");
    }
  });
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <>
      <div className="app-title">
        <div>
          <h1>
            <i className="fa fa-dashboard"></i> Dashboard
          </h1>
          <p>A free and open source Bootstrap 4 admin template</p>
        </div>
        <ul className="app-breadcrumb breadcrumb">
          <li className="breadcrumb-item">
            <i className="fa fa-home fa-lg"></i>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Table</a>
          </li>
        </ul>
      </div>
      <div className="tile">
        <div class="table-responsive">
          <table class="table table-hover table-bordered" id="sampleTable">
            <thead>
              <tr>
                <th>Color</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((t) => {
                return (
                  <tr>
                    <td>{t?.color}</td>
                    <td>{t?.value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
            <ReactPaginate
              pageCount={pageCount}
              onPageChange={changePage}
              previousLabel={"Prev"}
              nextLabel={"Next"}
              containerClassName=" paginationBttns "
              activeLinkClassName="paginationActivePage"
            />
          </div>
      </div>
    </>
  );
};

export default Table;
