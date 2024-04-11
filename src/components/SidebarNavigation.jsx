import React from "react";
import {
  FaGear,
  FaHouse,
  FaQuestion,
  FaWeightScale,
  FaWind,
} from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

import { TbFishChristianity } from "react-icons/tb";

const SidebarNavigation = ({ children }) => {
  const location = useLocation().pathname.split("/")[1];

  const logout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (!confirm) return;
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <section className=" relative mx-auto flex h-screen min-w-max max-w-7xl bg-light ">
        <nav className="fixed z-50 flex h-full w-52 flex-col justify-between bg-light px-4 py-10">
          <div className="flex w-full flex-row items-center justify-center gap-3 ">
            <TbFishChristianity
              size={32}
              className="mt-1 rotate-45 text-primary "
            />
            <h1 className="text-xl">
              <span className="font-semibold">Cat</span>Fish
              <br />
              <h1 className="text-xs leading-[.5]">Farming System</h1>
            </h1>
          </div>

          <main className=" mt-14 flex h-full flex-col gap-2">
            <Link
              to="/"
              className={`list  ${location == "" ? "bg-slate-100 text-primary" : "text-gray-400"}`}
            >
              <FaHouse size={15} />
              <h1 className="text-sm">Dashboard</h1>
            </Link>

            <Link
              to="/kontrol"
              className={`list ${location == "kontrol" ? "bg-slate-100 text-primary" : "text-gray-400"}`}
            >
              <FaGear size={15} />
              <h1 className="text-sm ">Kontrol</h1>
            </Link>

            <Link
              to="/add"
              className={`list ${location == "add" ? "bg-slate-100 text-primary" : "text-gray-400"}`}
            >
              <FaWeightScale size={15} />
              <h1 className="text-sm ">Data Ikan</h1>
            </Link>
          </main>

          {/* <div onClick={logout} className="list cursor-pointer  text-gray-400 ">
            <FaArrowRightFromBracket size={15} />
            <h1 className="text-sm ">Logout</h1>
          </div> */}
        </nav>

        <main className="overflow-X-hidden relative ml-52 flex h-max min-h-full w-full flex-col gap-6  border-emerald-500 bg-slate-100 px-20 py-10 ">
          {children}
        </main>
      </section>
    </>
  );
};

export default SidebarNavigation;
