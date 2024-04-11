import React from "react";
const ToggleMode = ({ statusKontrol, onClick, setStatusKontrol }) => {
  return (
    <div className="box-toggle">
      <span
        className={`${statusKontrol == "manual" ? "text-black/50" : "text-black"} font-medium`}
      >
        Otomatis
      </span>
      <label
        className={`toggle-switch  ${statusKontrol == "otomatis" ? "from-emerald-700 to-emerald-400" : "from-amber-400 to-amber-700"}`}
      >
        <input
          type="checkbox"
          className="hidden"
          onChange={() => {
            setStatusKontrol(statusKontrol == "manual" ? "otomatis" : "manual");
            onClick();
          }}
        />
        <div
          className={`toggle-switch-inner ${statusKontrol == "otomatis" ? "-left-1 " : "left-6 "}`}
        ></div>
      </label>
      <span
        className={`${statusKontrol == "otomatis" ? "text-black/50" : "text-black"} font-medium`}
      >
        Manual
      </span>
    </div>
  );
};

export default ToggleMode;
