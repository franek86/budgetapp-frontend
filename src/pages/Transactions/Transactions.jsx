import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

import Title from "../../components/Title/Title";
import Loader from "../../components/Loader/Loader";
import SearchInput from '../../components/SearchInput/SearchInput';
import Filters from "../../components/Filters/Filters";

import { MdOutlineCreateNewFolder, MdOutlineDeleteForever, MdModeEditOutline } from "react-icons/md";
import ReactPaginate from "react-paginate";
import Select from "react-select";

import "./transactions.scss";
import formatDate from "../../utils/LuxonFormat";
import formatCurrency from "../../utils/FormatCurrency";

import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../querys/transactionsQuery";
import { getCategories } from "../../querys/categoriesQuery";

import { useFilterContext } from '../../context/FilterContext'

const Transactions = () => {
  const {checkedState} = useFilterContext();

  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [duration, setDuration] = useState(DateTime.utc().minus({ days: 30 }).toISO());
  const [searchData, setSearchData] = useState([]);
  const [searchDate, setSearchDate] = useState([new Date(), DateTime.utc().plus({ days: 7 }).toISO()]);

 

  const { data, isLoading, isError, error } = useQuery(["trans", page, perPage, duration, searchData, checkedState], () => getTransactions(page, perPage,duration, searchData, checkedState), {
    cacheTime: 1000,
    keepPreviousData:true
  });

  const {data:dataCat, isLoading:isLoadingCat, isError:isErrorCat, error:errorCat} = useQuery(['categories'], getCategories);
  

  const handlePageClick = (e) => {
    let currentPage = e.selected + 1
    setPage(currentPage);
  };
  const perPageValues = [
    { value: 10, label: 10 },
    { value: 25, label: 25 },
    { value: 50, label: 50 }
  ];
  const dateDurations = [
    { value: DateTime.utc().minus({ days: 7 }).toISO(), label: "7 days" },
    { value: DateTime.utc().minus({ days: 14 }).toISO(), label: "14 days" },
    { value: DateTime.utc().minus({ days: 30 }).toISO(), label: "30 days" },
  ];

  const handlePerPage = (e) => {
    setPerPage(e.value);
  };

  const handleDateDuration = (value) => {
    setDuration(value.value);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchData(value)
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  

  return (
    <div>
      <div className="flex align-items-center justify-content-between">
        <Title>Transactions</Title>
        <Link to="/transactions/create" className="flex align-items-center justify-content-between transaction_link_create">
          <span>Create</span>
          <MdOutlineCreateNewFolder size="30" />
        </Link>
      </div>

      <section className="grid column-filter column-gap mt-3">
        <div className="transaction_filter">
          <h4 className="mb-3">Filters:</h4>

          <h5>Search</h5>
          <SearchInput handleSearch={handleSearch} search={searchData}/>
          <h5 className="mt-2">By categories</h5>
          <Filters dataFilter={dataCat} isErrorFilter={isErrorCat} isLoadFilter={isLoadingCat} errorFilter={errorCat}/>
          <h5 className="mt-2">By dates</h5>
          <DateRangePicker id="date_input" className="form_date" name="date" format="dd-MM-y" value={searchDate} onChange={setSearchDate} calendarIcon={false} clearIcon={false}/>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="transaction_list">
            <div className="transaction_header">
              <div className="flex align-items-center">
                <label className="mr-1 font-12 text-color">Last:</label>
                <Select name="duration" options={dateDurations} value={dateDurations.value} defaultValue={{label: "30 days", value:DateTime.utc().minus({ days: 30 }).toISO()}} onChange={handleDateDuration} className="form_select mr-2" classNamePrefix="select-sm" />
              </div>

              <div className="flex align-items-center">
                <div className="flex align-items-center">
                  <label className="mr-1 font-12 text-color">Per page:</label>
                  <Select name="perPage" options={perPageValues} value={perPageValues.value} defaultValue={perPageValues[1]} onChange={handlePerPage} className="form_select mr-2" classNamePrefix="select-sm" />
                </div>
                <span className="text-color">
                  {data.paginationData.currentPage} page of {data.paginationData.totalPages}
                </span>
              </div>
            </div>

            {data.data.map(({ _id: id, date, title, categories: { slug }, amount }) => (
              <div key={id} className="transaction_item">
                <div className="transaction_date">
                  <div className="label">Date:</div>
                  <div>{formatDate(date)}</div>
                </div>
                <div className="transaction_title">
                  <div className="label">Info:</div>
                  <div>{title}</div>
                </div>

                <div className="transaction_category">
                  <div className="label">Category:</div>
                  <div className="category">{slug}</div>
                </div>
                <div className="transaction_amount">
                  <div className="label">Amount:</div>
                  <div className="amount">{formatCurrency(amount)}</div>
                </div>

                <div className="transaction_btns">
                  <button className="btn-edit">
                    <MdModeEditOutline />
                  </button>
                  <button className="btn-delete ml-1">
                    <MdOutlineDeleteForever />
                  </button>
                </div>
              </div>
            ))}

          
            { 
            data.data.length > 0 ?
            <ReactPaginate breakLabel="..." nextLabel=">" onPageChange={handlePageClick} pageRangeDisplayed={3} marginPagesDisplayed={3} pageCount={data.paginationData.totalPages} previousLabel="<"  activeClassName="active" containerClassName="paginations" previousClassName="pagination-prev" nextClassName="pagination-next" />
            : <div className="data-notfound">No data found.</div>
          }
            </div>
        )}
      </section>
    </div>
  );
};


export default Transactions;