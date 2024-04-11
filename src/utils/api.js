import { v4 as uuidv4 } from "uuid";

import app from "../config.js";
import { getDatabase, ref, get, set, remove } from "firebase/database";

const db = getDatabase(app);

export const getDataSensor = async () => {
  const dbRef = ref(db, "nilai_sensor");

  const snapshot = await get(dbRef);

  if (snapshot.exists())
    return {
      amonia: parseFloat(snapshot.val().split("/")[0]).toFixed(2),
      ph: parseFloat(snapshot.val().split("/")[1]).toFixed(1),
    };
};

export const getWaktuPakan = async () => {
  const dbRef = ref(db, "waktu_pakan_terakhir");
  const snapshot = await get(dbRef);
  if (snapshot.exists()) return snapshot.val();
};

export const getKebutuhanPakan = async () => {
  const dbRef = ref(db, "kebutuhan_pakan");
  const snapshot = await get(dbRef);
  if (snapshot.exists()) return snapshot.val();
};

export const getStatusKontrol = async () => {
  const dbRef = ref(db, "status_kontrol");

  const snapshot = await get(dbRef);
  if (snapshot.exists()) return snapshot.val();
};

export const getStatusAktuator = async () => {
  const dbRef = ref(db, "status_aktuator");

  const snapshot = await get(dbRef);
  if (snapshot.exists())
    return {
      _pakan: parseFloat(snapshot.val().split("/")[0]),
      _pompapengisian: parseFloat(snapshot.val().split("/")[1]),
      _pompapengurasan: parseFloat(snapshot.val().split("/")[2]),
    };
};

export const getDataIkan = async () => {
  let data = [];

  const dbRef = ref(db, "data_ikan");
  const snapshot = await get(dbRef);

  snapshot.forEach((res) => {
    data.push({
      id: res.key,
      data: res.val(),
    });
  });
  if (snapshot.exists()) return data;
};

export const saveStatusKontrol = async (statusKontrol) => {
  const dbRef = ref(db, "status_kontrol");
  set(dbRef, statusKontrol)
    .then(() => {
      console.log("Data Berhasil");
    })
    .catch((error) => {
      console.log("Tidak Berhasil Disimpan");
    });
};

export const saveStatusAktuator = async (status) => {
  let { _pakan, _pompapengisian, _pompapengurasan } = status;

  const data = `${_pakan || _pakan == 1 ? "1" : "0"}/${_pompapengisian || _pompapengisian == 1 ? "1" : "0"}/${_pompapengurasan || _pompapengurasan == 1 ? "1" : "0"}`;

  const dbRef = ref(db, "status_aktuator");
  set(dbRef, data)
    .then(() => {
      console.log("Data Berhasil");
    })
    .catch((error) => {
      console.log("Tidak Berhasil Disimpan");
    });
};

export const saveWaktuPakan = async () => {
  const day = new Date().toLocaleDateString();
  const time = new Date().toTimeString().split(" ")[0];
  const date = day.split("/").join("-") + "/" + time;

  const dbRef = ref(db, "waktu_pakan_terakhir");
  set(dbRef, date)
    .then(() => {
      console.log("Data Berasil Disimpan");
    })
    .catch((error) => {
      console.log("Tidak Berasil Disimpan");
    })
    .finally(() => {
      saveJamPakan(time);
    });
};

export const saveJamPakan = async (time) => {
  const jam = parseInt(time.replace(/^0(?:0:0?)?/, "").split(":")[0]);

  const dbRef = ref(db, "jam_pakan_terakhir");
  set(dbRef, jam)
    .then(() => {
      console.log("Data Berasil Disimpan");
    })
    .catch((error) => {
      console.log("Tidak Berasil Disimpan");
    });
};

export const saveDataIkan = async ({ weight, date, total }) => {
  const dbRef = ref(db, "data_ikan/" + uuidv4());

  set(dbRef, {
    _id: new Date().getTime(),
    _beratratarata: parseFloat((weight / total).toFixed(2)).toFixed(1),
    _biomassa: parseFloat((weight / total) * total),
    _kebutuhanpakan: Math.round(parseFloat((weight / total) * total) * 0.03),
    _tanggal: date,
    _jumlah: parseInt(total),
    _jam: new Date().toTimeString().split(" ")[0],
  })
    .then(() => {
      alert("Data Berhasil");
    })
    .catch((error) => {
      alert("Tidak Berhasil Disimpan");
    })
    .finally(() => {
      saveKebutuhanPakan(
        Math.round(parseFloat((weight / total) * total) * 0.03),
      );
    });
};

export const saveKebutuhanPakan = async (_kebutuhanpakan) => {
  const dbRef = ref(db, "kebutuhan_pakan");
  set(dbRef, _kebutuhanpakan)
    .then(() => {
      console.log("Data Berasil Disimpan");
    })
    .catch((error) => {
      console.log("Tidak Berasil Disimpan");
    });
};

export const deleteDataIkan = async () => {
  const dbRef = ref(db, "data_ikan");

  remove(dbRef)
    .then(() => {
      console.log("Data berhasil dihapus");
    })
    .catch((error) => {
      console.log("Tidak berhasil dihapus");
    })
    .finally(() => {
      saveKebutuhanPakan(0);
    });
};
