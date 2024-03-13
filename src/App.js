import React, { useState } from "react";
import { data } from "./Mock Api data/data.js";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import QrCodeIcon from "@mui/icons-material/QrCode";
import LoginIcon from "@mui/icons-material/Login";

import "./App.css";



function App() {
  // Some Usestate varialbles
  const [defaultChecked, setdefauilChecked] = useState(false);
  const [sortedProducts, setSortedProducts] = useState([...data.products]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState({});
  const [Open, setOpen] = useState(false);
  const productsPerPage = 15;
  const [Show, setShow] = useState("hidden");
  const [Sidebar, setSidebar] = useState("hidden");
  const [search, setSearch] = useState("");


  // To display Action dropdown button
  function ShowBox() {
    setShow(Show === "hidden" ? "" : "hidden");
  }


//  For all Checked box
  function CheckAll() {
    setdefauilChecked(defaultChecked === true ? false : true);
  }



  // Function to sort products by a specified key
  const sortProducts = (key) => {
    const order = sortOrder[key] === "asc" ? "desc" : "asc";
    const sortedProductsCopy = [...sortedProducts].sort((a, b) => {
      if (order === "asc") {
        setOpen(true);
        return a[key] < b[key] ? -1 : 1;
      } else {
        setOpen(false);
        return a[key] > b[key] ? -1 : 1;
      }
    });
    setSortedProducts(sortedProductsCopy);
    setSortOrder({ ...sortOrder, [key]: order }); // Update sorting order for the key
    setCurrentPage(1); // Reset to first page after sorting
  };



  // Function to handle page navigation
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  // Calculate indexes for slicing the products array
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  
  
  
//  For Switch On or Off Sidebar
  function toggleSidebar() {
    setSidebar(Sidebar === "hidden" ? "flex" : "hidden");
  }



  return (
    <>
      {" "}
      <div>
        <nav className=" bg-white border-b border-gray-200 fixed z-30 w-full">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start">
                <button
                  id="toggleSidebarMobile"
                  onClick={toggleSidebar}
                  aria-expanded="true"
                  aria-controls="sidebar"
                  className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                >
                  <svg
                    id="toggleSidebarMobileHamburger"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    id="toggleSidebarMobileClose"
                    className="w-6 h-6 hidden"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <a
                  href="/"
                  className="text-xl font-bold flex items-center lg:ml-2.5"
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrIRDbxykuWePz3K5POuRzax993McsYqSFoA&usqp=CAU"
                    className="h-7 mr-2"
                    alt="Windster Logo"
                  />
                  <span className="self-center whitespace-nowrap">
                    My-Dashboard
                  </span>
                </a>
                <form
                  onChange={(e) => setSearch(e.target.value)}
                  action="/"
                  method="GET"
                  className="hidden lg:block lg:pl-32"
                >
                  <label for="topbar-search" className="sr-only">
                    Search
                  </label>
                  <div className="mt-1 relative lg:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="email"
                      id="topbar-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5"
                      placeholder="Search"
                    />
                  </div>
                </form>
              </div>
              <div className="flex items-center">
                <button
                  id="toggleSidebarMobileSearch"
                  type="button"
                  className="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg"
                >
                  <span className="sr-only">Search</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <ul className="flex items-center space-x-6">
                  <li className="font-semibold text-gray-700">Home</li>
                  <li className="font-semibold text-gray-700">Articles</li>
                  <li className="hidden md:block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                  </li>
                  <li className="hidden md:block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </li>
                  <li className="hidden md:block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </li>
                </ul>
                <a
                  href="/"
                  className="hidden sm:inline-flex ml-5 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </nav>
        <div className="flex overflow-hidden bg-white pt-16">
          <aside
            id="sidebar"
            className={`fixed ${Sidebar}  z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75`}
            aria-label="Sidebar"
          >
            <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex-1 px-3 bg-white divide-y space-y-1">
                  <ul className="space-y-2 pb-2">
                    <li>
                      <form action="/" method="GET" className="lg:hidden">
                        <label for="mobile-search" className="sr-only">
                          Search
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                              className="w-5 h-5 text-gray-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                            </svg>
                          </div>
                          <input
                            type="text"
                            name="text"
                            onChange={(e) => setSearch(e.target.value)}
                            id="mobile-search"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:ring-cyan-600 block w-full pl-10 p-2.5"
                            placeholder="Search"
                          />
                        </div>
                      </form>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 bg-gray-200 group"
                      >
                        <DashboardIcon />
                        <span className="ml-3">Dashboard</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        target="_blank"
                        className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                      >
                        <ViewKanbanIcon />
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          Kanban
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        target="_blank"
                        className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                      >
                        <MoveToInboxIcon />
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          Inbox
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                      >
                        <AccountCircleIcon />
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          Users
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                      >
                        <QrCodeIcon />
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          Products
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                      >
                        <LoginIcon />
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          Sign In
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                      >
                        <svg
                          className="w-6 h-6 text-gray-900 flex-shrink-0 transition duration-75"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          Sign Up
                        </span>
                      </a>
                    </li>
                  </ul>
                  <div className="space-y-2 pt-2">
                    <a
                      href="/"
                      className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
                    >
                      <svg
                        className="w-5 h-5 text-gray-900 flex-shrink-0  transition duration-75"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="gem"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M378.7 32H133.3L256 182.7L378.7 32zM512 192l-107.4-141.3L289.6 192H512zM107.4 50.67L0 192h222.4L107.4 50.67zM244.3 474.9C247.3 478.2 251.6 480 256 480s8.653-1.828 11.67-5.062L510.6 224H1.365L244.3 474.9z"
                        ></path>
                      </svg>
                      <span className="ml-4">Upgrade to Pro</span>
                    </a>
                    <a
                      href="/"
                      target="_blank"
                      className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
                    >
                      <svg
                        className="w-6 h-6 text-gray-900 flex-shrink-0 transition duration-75"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                        <path
                          fill-rule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span className="ml-3">Documentation</span>
                    </a>
                    <a
                      href="/"
                      target="_blank"
                      className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
                    >
                      <svg
                        className="w-6 h-6 text-gray-900 flex-shrink-0  transition duration-75"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                      </svg>
                      <span className="ml-3">Components</span>
                    </a>
                    <a
                      href="/"
                      target="_blank"
                      className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
                    >
                      <svg
                        className="w-6 h-6 text-gray-900 flex-shrink-0 transition duration-75"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span className="ml-3">Help</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <div
            className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
            id="sidebarBackdrop"
          ></div>
          <div
            id="main-content"
            className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
          >
            <main>
              <div className="flex-grow bg-white dark:bg-gray-900 overflow-y-auto">
                <div className=" pb-2 sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800 sticky top-0">
                  <div className="flex w-full items-center">
                    <div className=" font-serif flex items-center text-3xl text-gray-900 dark:text-white">
                      Products
                    </div>
                    <div className="ml-auto sm:flex hidden items-center justify-end">
                      <div className="flex gap-4">
                        <button className="inline-flex items-center h-8 px-4  rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none ">
                          Meeting
                        </button>
                        <button className="inline-flex mr-3 items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
                          Import / export
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:p-7 p-4">
                  <div className="flex w-full items-center mb-7">
                    <button
                      onClick={ShowBox}
                      className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0"
                    >
                      Action
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 ml-1.5 text-gray-400 dark:text-gray-600"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>

                    <div
                      className={` ${Show} fixed z-50 ml-24 py-1 bg-white pr-12  rounded-lg border border-zinc-300 border-solid`}
                      role="none"
                    >
                      <a
                        href="/"
                        className="text-gray-700 block px-4 text-base hover:text-lg hover:font-semibold"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-0"
                      >
                        Create
                      </a>
                      <a
                        href="/"
                        className="text-gray-700 block px-4  text-base hover:text-lg hover:font-semibold"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-1"
                      >
                        Delete
                      </a>
                      <a
                        href="/"
                        className="text-gray-700 block px-4  text-base hover:text-lg hover:font-semibold"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-2"
                      >
                        update
                      </a>
                    </div>

                    <div className="ml-auto text-gray-500 text-xs sm:inline-flex hidden items-center">
                      <span className="mr-3">Page 1 of 2</span>
                      {Array.from(
                        {
                          length: Math.ceil(
                            sortedProducts.length / productsPerPage
                          ),
                        },
                        (_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className="mr-2 inline-flex items-center h-8 px-4  rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none "
                          >
                            {i + 1}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <table className="mt-4  table-auto text-left ">
                    <thead>
                      <tr>
                        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                          <input
                            type="checkbox"
                            onClick={CheckAll}
                            className="p-4"
                          />
                        </th>
                        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                          <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                            Brand{" "}
                            <svg
                              onClick={() => sortProducts("brand")}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              aria-hidden="true"
                              className="h-4 w-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                              ></path>
                            </svg>
                          </p>
                        </th>
                        <th className=" w-1/2 cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                          <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                            description{" "}
                            <svg
                              onClick={() => sortProducts("description")}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              aria-hidden="true"
                              className="h-4 w-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                              ></path>
                            </svg>
                          </p>
                        </th>
                        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                          <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                            Members{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              aria-hidden="true"
                              className="h-4 w-4"
                            ></svg>
                          </p>
                        </th>
                        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                          <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                            category{" "}
                            <svg
                              onClick={() => sortProducts("category")}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              aria-hidden="true"
                              className="h-4 w-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                              ></path>
                            </svg>
                          </p>
                        </th>
                        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                          <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                            Dates{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              aria-hidden="true"
                              className="h-4 w-4"
                            ></svg>
                          </p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProducts
                        .filter((members) => {
                          return search.toLocaleLowerCase() === ""
                            ? members
                            : members.brand
                                .toLocaleLowerCase()
                                .includes(search);
                        })
                        .map((products) => {
                          return (
                            <>
                              <tr key={products.id}>
                                <td className="p-4 border-b border-blue-gray-50">
                                  {defaultChecked === true ? (
                                    <input
                                      id={products.id}
                                      type="checkbox"
                                      checked
                                      className="p-4"
                                    />
                                  ) : (
                                    <input
                                      id={products.id}
                                      type="checkbox"
                                      className="p-4"
                                    />
                                  )}
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                  <div className="flex items-center gap-3">
                                    <div className="flex flex-col">
                                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                                        {products.brand}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                  <p className="block w-1/2 antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal truncate-7">
                                    {products.description}
                                  </p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                  <div className="flex -space-x-4 rtl:space-x-reverse">
                                    {products.images.map((members) => {
                                      return (
                                        <>
                                          <img
                                            className="w-7 h-7 border-2 border-white rounded-full dark:border-gray-800"
                                            src={members}
                                            alt=""
                                          />
                                        </>
                                      );
                                    })}
                                  </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                  <div className="w-max">
                                    <div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-600 py-1 px-2 text-xs rounded-md">
                                      <span className="">
                                        {products.category}
                                      </span>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                                    23/04/18
                                  </p>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                    </tbody>
                  </table>

                  <div className="flex w-full mt-5 space-x-2 justify-end">
                    {Array.from(
                      {
                        length: Math.ceil(
                          sortedProducts.length / productsPerPage
                        ),
                      },
                      (_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => handlePageChange(i + 1)}
                          className="inline-flex items-center h-8 px-4  rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none "
                        >
                          {i + 1}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
