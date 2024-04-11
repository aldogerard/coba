import React from "react";

const TableData = ({ data }) => {
  return (
    <div className="mt-2 h-max overflow-x-auto rounded-lg bg-white shadow-lg">
      <table width="100%" padding="3rem" className="overflow-x-scroll">
        <thead>
          <tr className="bg-emerald-600 text-left text-sm text-white">
            <th className="p-4 px-3 font-medium ">No</th>
            <th className="p-4 px-3 font-medium">Jumlah</th>
            <th className="p-4 font-medium">Berat rata-rata </th>
            <th className="p-4 font-medium">Biomassa </th>
            <th className="p-4 font-medium">Kebutuhan pakan </th>
            <th className="p-4 font-medium">Tanggal</th>
            <th className="p-4 font-medium">Jam</th>
          </tr>
        </thead>
        <tbody>
          {data
            .sort((a, b) => parseInt(b.data._id) - parseInt(a.data._id))
            .map((item, i) => {
              return (
                <tr key={i} className={` ${i % 2 == 1 && "bg-emerald-50"}`}>
                  <td className="font-base px-3 py-3">{i + 1}</td>
                  <td className="font-base px-3 py-3">{item.data._jumlah}</td>
                  <td className="font-base px-4 py-3">
                    {item.data._beratratarata.toString().replace(".", ",")}
                  </td>
                  <td className="font-base px-4 py-3">
                    {item.data._biomassa
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                  </td>
                  <td className="font-base px-4 py-3">
                    {item.data._kebutuhanpakan
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                  </td>
                  <td className="font-base px-4 py-3">{item.data._tanggal}</td>
                  <td className="font-base px-4 py-3">{item.data._jam}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
