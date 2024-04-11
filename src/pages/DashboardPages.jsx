import React from "react";
import SidebarNavigation from "../components/SidebarNavigation";
import CardSensor from "../components/CardSensor";
import CardControl from "../components/CardControl.jsx";

import {
  getDataSensor,
  getKebutuhanPakan,
  getStatusAktuator,
  getWaktuPakan,
} from "../utils/api.js";

const DashboardPages = () => {
  const [dataSensor, setDataSensor] = React.useState({
    amonia: 0,
    ph: 0,
  });

  const [statusAktuator, setStatusAktuator] = React.useState({
    _pakan: false,
    _pompapengisian: false,
    _pompapengurasan: false,
  });

  const [waktuPakanTerakhir, setWaktuPakanTerakhir] = React.useState(0);
  const [kebutuhanPakan, setKebutuhanPakan] = React.useState(0);

  const getData = async () => {
    getDataSensor().then((res) => setDataSensor((state) => res || state));
    getStatusAktuator().then((res) =>
      setStatusAktuator((state) => res || state),
    );
    getWaktuPakan().then((res) =>
      setWaktuPakanTerakhir((state) => res || state),
    );
    getKebutuhanPakan().then((res) =>
      setKebutuhanPakan((state) => res || state),
    );
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <SidebarNavigation>
      <div className="title mb-2">
        <h1>Dashboard</h1>
      </div>

      <div className="flex flex-wrap justify-between gap-y-6 ">
        <CardSensor name="pH" value={dataSensor.ph} />
        <CardSensor name="Amonia" value={dataSensor.amonia} />
        <CardSensor name="Kebutuhan Pakan" value={kebutuhanPakan} />
        <CardSensor name="Waktu Pemberian Pakan" value={waktuPakanTerakhir} />
        <CardSensor name="Kebutuhan Pakan" value={kebutuhanPakan} />
      </div>

      <div className=" flex flex-wrap justify-between">
        <CardControl
          statusAktuator={statusAktuator}
          value="_pakan"
          name="Status Pakan"
        />
        <CardControl
          statusAktuator={statusAktuator}
          value="_pompapengisian"
          name="Pompa Pengisian"
        />
        <CardControl
          statusAktuator={statusAktuator}
          value="_pompapengurasan"
          name="Pompa Pengurasan"
        />
      </div>
    </SidebarNavigation>
  );
};

export default DashboardPages;
