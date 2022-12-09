import React, { useState } from "react";
import { Link } from "react-router-dom";

import { DateTime } from "luxon";
import { MdOutlineCreateNewFolder, MdClose } from "react-icons/md";
import { BiFilterAlt } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

import Title from "../../components/Title/Title";
import Loader from "../../components/Loader/Loader";
import SearchInput from "../../components/SearchInput/SearchInput";
import Filters from "../../components/Filters/Filters";
import TransactionList from "./TransactionList";
import Modal from "../../components/Modal/Modal";
import { ToastContainer, toast } from "react-toastify";

import "./transactions.scss";

import useMediaQuery from "../../hooks/useMediaQuery";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction, getQueryTransactions } from "../../querys/transactionsQuery";
import { getCategories } from "../../querys/categoriesQuery";

import { useFilterContext } from "../../context/FilterContext";
import { useThemeContext } from "../../context/ThemeContext";
import { useTransactionContext } from "../../context/TransactionsContext";

const Transactions = () => {
  const isDesktop = useMediaQuery('(min-width: 1200px)');

  const queryClient = useQueryClient();
  const { checkedState } = useFilterContext();
  const { toggleModal, closeModal } = useThemeContext();
  const { transactionId } = useTransactionContext();


  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [duration, setDuration] = useState(DateTime.utc().minus({ days: 30 }).toISO());
  const [searchData, setSearchData] = useState([]);
  const [searchDate, setSearchDate] = useState([new Date(), DateTime.utc().toISO()]);
  const [toggleFilter, setToggleFilter] = useState(false);

  const { data, isLoading, isError, error } = useQuery(
    ["trans", page, perPage, duration, searchDate[1], searchDate, checkedState],
    () => getQueryTransactions(page, perPage, duration, searchDate[1], searchData, checkedState),
    {
      cacheTime: 10,
      keepPreviousData: true,
    }
  );

  const { data: dataCat, isLoading: isLoadingCat, isError: isErrorCat, error: errorCat } = useQuery(["categories"], getCategories);
  const { mutate, isSuccess } = useMutation((id) => deleteTransaction(id), {
    onSuccess: () => {
      toast("Succesfully deleted transaction!");
    },
    onError: () => {
      toast("Something went wrong!");
    },
  });

  const handlePageClick = (e) => {
    let currentPage = e.selected + 1;
    setPage(currentPage);
  };
  const perPageValues = [
    { value: 5, label: 5 },
    { value: 10, label: 10 },
    { value: 25, label: 25 },
    { value: 50, label: 50 },
  ];
  const dateDurations = [
    { value: DateTime.utc().minus({ days: 7 }).toISO(), label: "7 days" },
    { value: DateTime.utc().minus({ days: 14 }).toISO(), label: "14 days" },
    { value: DateTime.utc().minus({ days: 30 }).toISO(), label: "30 days" },
    { value: DateTime.utc().minus({ days: 90 }).toISO(), label: "3 months" },
    { value: DateTime.utc().minus({ days: 180 }).toISO(), label: "6 months" },
  ];

  const handlePerPage = (e) => {
    setPerPage(e.value);
  };

  const handleDateDuration = (value) => {
    setDuration(value.value);
    setSearchDate([value.value, DateTime.utc().toISO()])
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchData(value);
  };

  const handleChangeDate = (date) => {
    let stratDate = date[0].toISOString();
    let endDate = date[1].toISOString();
    setDuration(stratDate);
    setSearchDate([stratDate, endDate]);
  }

  const handleDeleteTransaction = (transactionId) => {
    mutate(transactionId);
    queryClient.refetchQueries(["trans"]);
    setTimeout(() => {
      closeModal();
    }, 1000);
  };



  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <div className='flex align-center justify-between'>
        <Title>Transactions</Title>
        <Link to='/transactions/create' className='flex align-center justify-between transaction_link_create'>
          <span>Create</span>
          <MdOutlineCreateNewFolder size='30' />
        </Link>
      </div>

      <section className={`grid column-gap mt-3 ${ isDesktop ? 'column-filter' : 'column-1'}`}>

        <div className={`${isDesktop ? 'transaction_filter' : 'mobile_transaction_filter'} ${toggleFilter ? 'open_filter' : ''}`}>
          <div className="flex justify-between">
            <h4 className='mb-3'>Filters</h4>
            <div className="close_icon"  onClick={() => setToggleFilter(!toggleFilter)}>
              <MdClose size={30} fill="#fff"/>
            </div>
          </div>

          <h5>Search</h5>
          <SearchInput handleSearch={handleSearch} search={searchData} />
          <h5 className='mt-2'>By categories</h5>
          <Filters dataFilter={dataCat} isErrorFilter={isErrorCat} isLoadFilter={isLoadingCat} errorFilter={errorCat} />
          <h5 className='mt-2'>By dates</h5>
          <DateRangePicker id='date_input' className='form_date' name='date' format='dd-MM-y' value={searchDate} onChange={handleChangeDate} calendarIcon={false} clearIcon={false} />
        </div> 

        {isLoading ? (
          <Loader />
        ) : (
          <section>
            <div className='transaction_header'>
              {!isDesktop && <div className="filter_icon" onClick={() => setToggleFilter(!toggleFilter)}><BiFilterAlt size="25" fill="#fff"/></div>}

              <div className='flex align-center'>
                <label className='mr-1 font-12 text-color'>Last:</label>
                <Select
                  name='duration'
                  options={dateDurations}
                  value={dateDurations.value}
                  defaultValue={{ label: "30 days", value: DateTime.utc().minus({ days: 30 }).toISO() }}
                  onChange={handleDateDuration}
                  className='form_select mr-2'
                  classNamePrefix='select-sm'
                />
              </div>

              <div className='flex align-center'>
                <div className='flex align-center'>
                  <label className='mr-1 font-12 text-color'>Per page:</label>
                  <Select
                    name='perPage'
                    options={perPageValues}
                    value={perPageValues.value}
                    defaultValue={perPageValues[1]}
                    onChange={handlePerPage}
                    className='form_select mr-2'
                    classNamePrefix='select-sm'
                  />
                </div>
                <span className='text-color'>
                  {data.paginationData.currentPage} page of {data.paginationData.totalPages}
                </span>
              </div>
            </div>

            <div className='mt-4 grid row-gap'>
              {data.data.map((item) => (
                <TransactionList key={item._id} {...item} />
              ))}
            </div>

            {data.paginationData.totalPages > 1 && (
              <ReactPaginate
                breakLabel='...'
                nextLabel='>'
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={3}
                pageCount={data.paginationData.totalPages}
                previousLabel='<'
                activeClassName='active'
                containerClassName='paginations'
                previousClassName='pagination-prev'
                nextClassName='pagination-next'
              />
            )}

            {data.data.length < 1 && 
              <div className="mt-4">
                <h1>Transaction not found.</h1>
              </div>
            }
          </section>
        )}
      </section>

      {isSuccess && (
        <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='colored' />
      )}

      {toggleModal && (
        <Modal>
          <h3>Are you sure?</h3>
          <div className='flex'>
            <button className='btn btn-success mr-1' onClick={() => handleDeleteTransaction(transactionId)}>
              Yes
            </button>
            <button className='btn btn-danger' onClick={() => closeModal()}>
              No
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Transactions;
