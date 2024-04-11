import React from "react";
import { IoWaterOutline } from "react-icons/io5";
import { TbFishBone } from "react-icons/tb";

const CardControl = ({
  statusAktuator,
  setStatusAktuator,
  statusKontrol,
  onClick,
  value,
  name,
  control = false,
}) => {
  return (
    <div
      onClick={() => {
        if (control == false) return;
        if (statusKontrol == "otomatis") return;

        setStatusAktuator({
          ...statusAktuator,
          [value]: !statusAktuator[value],
        });
        onClick(value);
      }}
      className={`flex h-[158px] w-[288px]  overflow-hidden rounded-xl  bg-white px-7 py-5 shadow-md ${statusKontrol == "otomatis" ? "cursor-not-allowed opacity-70" : "cursor-pointer"} ${statusAktuator[value] && "outline-primary outline outline-1"} ${!control && "cursor-default"}`}
    >
      <div className="flex flex-col items-start gap-4">
        <div
          className={`rounded-xl p-2 ${statusAktuator[value] ? "bg-emerald-100" : "bg-gray-50"}`}
        >
          {name == "Status Pakan" ? (
            <TbFishBone
              size={40}
              color={statusAktuator[value] ? "#16A34A" : "#9CA3AF"}
            />
          ) : (
            <IoWaterOutline
              size={40}
              color={statusAktuator[value] ? "#16A34A" : "#9CA3AF"}
            />
          )}
        </div>
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-lg font-semibold text-black/80">{name}</h1>
          <h2 className="-mt-[2px] text-sm font-normal text-black/40">
            {statusAktuator[value] ? "Aktif" : "Mati"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CardControl;
