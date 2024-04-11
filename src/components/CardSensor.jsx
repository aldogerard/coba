import React from "react";
import { TbBiohazard, TbClock, TbMeat, TbMedicalCross } from "react-icons/tb";

const dataMonth = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const CardSensor = ({ name, value }) => {
  const date = (x) => {
    if (x == 1) return value.split("/")[1];
    const hari = value.split("/")[0].split("-");
    return hari[0] + " " + dataMonth[hari[1] - 1] + " " + hari[2];
  };

  return (
    <>
      <div className={`card `}>
        <div className="flex flex-col items-start ">
          <div className={`rounded-2xl bg-rose-100 p-2`}>
            {name == "pH" ? (
              <TbBiohazard size={28} color="#FB7185" />
            ) : name == "Amonia" ? (
              <TbMedicalCross size={28} color="#FB7185" />
            ) : name == "Kebutuhan Pakan" ? (
              <TbMeat size={28} color="#FB7185" />
            ) : (
              <TbClock size={28} color="#FB7185" />
            )}
          </div>
          <h1 className="my-5 text-sm font-medium  text-black">
            {name == "pH" && "Nilai "}
            {name == "Amonia" && "Nilai "}
            {name == "Waktu Pemberian Pakan"
              ? "Waktu Terakhir Pemberian Pakan"
              : name}
          </h1>
          <div className="flex items-end gap-2">
            <h2 className="text-[46px] font-semibold leading-none text-slate-800/80">
              {name != "Waktu Pemberian Pakan" ? value : value != "" && date(1)}
            </h2>
            <h3 className="text-xs font-semibold leading-7 text-red-800/80">
              {name == "Waktu Pemberian Pakan" && value != "" && date(2)}
              {name == "Amonia" && "ppm"}
              {name == "Kebutuhan Pakan" && "gram"}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardSensor;
