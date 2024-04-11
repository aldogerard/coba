import React from "react";
import SidebarNavigation from "../components/SidebarNavigation";

import { getDataIkan, saveDataIkan, deleteDataIkan } from "../utils/api.js";

import TableData from "../components/TableData.jsx";
import ChartData from "../components/ChartData.jsx";

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

const AddWeightPages = () => {
  const month = new Date().getMonth();
  const date = new Date().toLocaleDateString().split("/");
  const dateNow = date[0] + " " + dataMonth[month] + " " + date[2];

  const [data, setData] = React.useState([]);

  const [dataIkan, setdataIkan] = React.useState({
    total: 0,
    weight: 0,
    date: dateNow,
  });

  React.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getDataIkan().then((res) => {
      setData(res || []);
    });
  };

  const handleClickSubmit = (e) => {
    e.preventDefault();
    e.target.reset();

    if (dataIkan.weight <= 0 || dataIkan.total <= 0)
      return alert("Biomassa dan jumlah ikan harus lebih dari 0");

    saveDataIkan(dataIkan).then(() => getData());
  };

  const handleClickReset = () => {
    if (!confirm("Apakah anda yakin ingin menghapus semua data?")) return;
    deleteDataIkan().then(() => getData());
  };

  return (
    <SidebarNavigation>
      <div className="title mb-4 flex justify-between">
        <h1>Data Ikan</h1>
        <button
          className="w-32 rounded-md bg-rose-600 px-4 py-2 text-sm text-white shadow-lg hover:bg-rose-700 focus:bg-rose-800 focus:outline-none disabled:cursor-not-allowed disabled:bg-rose-500"
          onClick={() => handleClickReset()}
          disabled={data.length == 0 && true}
        >
          Reset Data
        </button>
      </div>
      <form
        className="flex flex-row justify-between "
        onSubmit={(e) => handleClickSubmit(e)}
      >
        <input
          className="w-60 rounded-md bg-white px-4 py-2 shadow-sm placeholder:text-sm focus:border-none focus:shadow-md  focus:outline-none"
          type="number"
          onChange={(e) => setdataIkan({ ...dataIkan, total: e.target.value })}
          placeholder="Banyak Ikan"
        />
        <input
          className="w-60 rounded-md bg-white px-4 py-2 shadow-sm placeholder:text-sm focus:border-none focus:shadow-md  focus:outline-none"
          type="number"
          step="any"
          onChange={(e) => setdataIkan({ ...dataIkan, weight: e.target.value })}
          placeholder="Berat Seluruh ikan (gram)"
        />
        <input
          className="w-60 cursor-not-allowed rounded-md px-4 py-2 text-black/60 shadow-sm focus:border-b-2 focus:border-primary focus:outline-none disabled:bg-[#ffffff]"
          value={dateNow}
          disabled
          placeholder="pakan"
        />

        <button
          className="w-32 rounded-md bg-primary px-4 py-2 text-sm text-white shadow-lg hover:bg-emerald-700 focus:bg-emerald-800 focus:outline-none"
          type="submit"
        >
          Simpan
        </button>
      </form>

      {data.length != 0 ? (
        <>
          <TableData data={data} />
          <ChartData data={data} />
        </>
      ) : (
        <>
          <h1 className="mt-[20vh] text-center text-lg">Data Kosong</h1>
        </>
      )}
    </SidebarNavigation>
  );
};

export default AddWeightPages;
