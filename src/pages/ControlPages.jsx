import React from "react";
import SidebarNavigation from "../components/SidebarNavigation";
import ToggleMode from "../components/ToggleMode";
import {
  getStatusAktuator,
  getStatusKontrol,
  saveStatusAktuator,
  saveStatusKontrol,
  saveWaktuPakan,
} from "../utils/api";
import CardControl from "../components/CardControl";

const ControlPages = () => {
  const [statusKontrol, setStatusKontrol] = React.useState("");

  const [statusAktuator, setStatusAktuator] = React.useState({
    _pakan: false,
    _pompapengisian: false,
    _pompapengurasan: false,
  });

  React.useEffect(() => {
    getStatusKontrol().then((res) => setStatusKontrol(res));
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      getStatusAktuator().then((res) => setStatusAktuator(res));
    }, 1000);
    return () => clearInterval(interval);
  });

  const handleClickControl = (value) => {
    saveStatusAktuator({ ...statusAktuator, [value]: !statusAktuator[value] });
    if (value == "_pakan") {
      saveWaktuPakan();
    }
  };

  const handleClickMode = () => {
    saveStatusKontrol(statusKontrol == "manual" ? "otomatis" : "manual");
    if (statusKontrol == "manual") {
      saveStatusAktuator({
        _pakan: false,
        _pompapengisian: false,
        _pompapengurasan: false,
      });
    }
  };

  return (
    <SidebarNavigation>
      <div className="title mb-2">
        <h1>Sistem Kontrol</h1>
      </div>
      <ToggleMode
        statusKontrol={statusKontrol}
        setStatusKontrol={setStatusKontrol}
        onClick={handleClickMode}
      />

      <div className="flex flex-wrap justify-between">
        <CardControl
          statusAktuator={statusAktuator}
          statusKontrol={statusKontrol}
          setStatusAktuator={setStatusAktuator}
          onClick={handleClickControl}
          value="_pakan"
          name="Status Pakan"
          control={true}
        />
        <CardControl
          statusAktuator={statusAktuator}
          statusKontrol={statusKontrol}
          setStatusAktuator={setStatusAktuator}
          onClick={handleClickControl}
          value="_pompapengisian"
          name="Pompa Pengisian"
          control={true}
        />
        <CardControl
          statusAktuator={statusAktuator}
          statusKontrol={statusKontrol}
          setStatusAktuator={setStatusAktuator}
          onClick={handleClickControl}
          value="_pompapengurasan"
          name="Pompa Pengurasan"
          control={true}
        />
      </div>
    </SidebarNavigation>
  );
};

export default ControlPages;
