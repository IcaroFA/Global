import React, { useState, useContext, useEffect } from "react";
import useFetchData from "../customHooks/useFetchData.js";
import { GlobalContex } from "../context/contex.js";
import loadingSvg from "../asset/loading.svg";
import DonationListConponent from "../components/DonationListComonent.js";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../components/PaginationComponent";
import DonationListComponentMobile from "../components/DonationListComponentMobile.js";

function DonationList({ setCurrentDonation, donationsUrl, PageType, baseUrl }) {
  const [donationData, setDonationData] = useState({ donations: [] });
  const navigate = useNavigate();
  const { notify } = useContext(GlobalContex);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page");
  const [page, setPage] = useState(currentPage ? Number(currentPage) : 1);
  const url = (page) => donationsUrl + `&page=${page}&limit=10`;

  const { loading, data, error, fetchData } = useFetchData();

  useEffect(() => {
    if (!loading) setDonationData(data);
  }, [loading]);

  useEffect(() => {
    notify(error, "error");
  }, [error]);

  useEffect(() => {
    fetchData(url(page));
    if (currentPage) navigate(baseUrl);
  }, [page]);

  return (
    <>
      <header className=" sticky top-0  left-0 pt-4  px-4 shadow-xl   border-b-4  flex justify-between items-center   border-blue-300  dark:border-gray-500 ">
        <h1 className="   text-xl md:text-2xl mb-3 font-semibold  text-blue-500   dark:text-white">
          {PageType}
        </h1>
      </header>
      <div className="px-4">
        {/* destop view */}
        <div className="hidden md:block mt-4">
          <table className="   w-full  mt-4">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-full shadow-xl">
              <tr>
                <th scope="col" className="px-6 py-3  text-start  ">
                  Donor
                </th>
                <th scope="col" className="px-6 py-3 ">
                  date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {loading
                ? null
                : donationData.donations &&
                  donationData.donations.map((donation) => (
                    <DonationListConponent
                      key={donation._id}
                      donation={donation}
                      setCurrentDonation={setCurrentDonation}
                      path={baseUrl}
                      page={page}
                    />
                  ))}
            </tbody>
          </table>
        </div>
        {/* desk top view end */}
        {/* mobile view  */}
        <div className=" block md:hidden mt-4">
          {loading
            ? null
            : donationData.donations &&
              donationData.donations.map((donation) => (
                <DonationListComponentMobile
                  key={donation._id}
                  donation={donation}
                  redirectPath={baseUrl}
                  setCurrentDonation={setCurrentDonation}
                />
              ))}
        </div>
        {/* mobile view  end */}
      </div>
      {loading ? (
        <div className="  top-0   left-0  absolute w-full  items-center flex justify-center  h-full">
          <img src={loadingSvg} />
        </div>
      ) : null}
      {/* page  */}
      <PaginationComponent
        loading={loading}
        page={page}
        nextPage={donationData.next}
        setPage={setPage}
      />
      {/* page end */}
    </>
  );
}

export default DonationList;