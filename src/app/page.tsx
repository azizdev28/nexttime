"use client";
import React, { useEffect, useState } from "react";

interface NamazVaqti {
  month: string;
  day: number;
  weekday: string;
  times: {
    tong_saharlik: string;
    quyosh: string;
    peshin: string;
    asr: string;
    shom_iftor: string;
    hufton: string;
  };
}

const Home = () => {
  const [vaqtlar, setVaqtlar] = useState<NamazVaqti[]>([]);
  const [bugungiKun, setBugungiKun] = useState<string>("");
  const [hozirgiVaqt, setHozirgiVaqt] = useState<string>("");
  const [bugungiSana, setBugungiSana] = useState<string>("");
  const [ramadanDay, setRamadanDay] = useState<number>(0);

  useEffect(() => {
    async function fetchVaqtlar() {
      try {
        const response = await fetch(
          "https://islomapi.uz/api/monthly?region=Toshkent&month=4"
        );
        const data: NamazVaqti[] = await response.json();
        setVaqtlar(data);
      } catch (error) {
        console.error("Xatolik: ", error);
      }
    }

    fetchVaqtlar();

    const interval = setInterval(() => {
      const now = getHozirgiVaqt();
      setHozirgiVaqt(now);
    }, 1000);

    const today = new Date();
    const year = today.getFullYear();
    const month = today.toLocaleString("default", { month: "long" });
    const day = today.getDate();
    const formattedDate = `${day} ${month} ${year}`;
    setBugungiSana(formattedDate);
    setBugungiKun(today.toLocaleString("default", { weekday: "long" }));

    // Calculate Ramadan day starting from the 13th day
    const ramadanStart = 13;
    const ramadanCurrent = day >= ramadanStart ? day - ramadanStart + 1 : 0;
    setRamadanDay(ramadanCurrent);

    return () => clearInterval(interval);
  }, []);

  function getHozirgiVaqt() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0"); // soat
    const minutes = String(now.getMinutes()).padStart(2, "0"); // minut
    const seconds = String(now.getSeconds()).padStart(2, "0"); // sekund
    return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <div className="container cards">
      <div className="Navbar">
        <div className="left">
          <h1>
            <span>Tashkent</span>
            Namaz Vaqtlari
          </h1>
        </div>

        <div className="right">
          <h2 className="text-center">
            Hozirgi vaqt: <span>{hozirgiVaqt}</span>
          </h2>
          <h3 className="text-center">
            Bugungi sana: <span> {bugungiSana}</span>
          </h3>
        </div>
      </div>

      <ul className="list">
        {vaqtlar.map((namazVaqti, index) => (
          <li
            key={index}
            className="Card"
            style={{
              backgroundColor:
                namazVaqti.day === new Date().getDate() ? "lightgreen" : "",
            }}
          >
            <p>
              <span>Month</span> March
            </p>
            <p>
              <span>Day:</span> {namazVaqti.day}
            </p>
            <p>
              <span>Weekday:</span>{" "}
              {namazVaqti.weekday === "Yakshanba"
                ? "Dam olish kuni"
                : namazVaqti.weekday}
            </p>
            {namazVaqti.day >= 13 && (
              <p className="ramadan">
                <span>Ramadan Day</span>
              </p>
            )}

            <h2 className="time"> Namoz Vaqtlari </h2>
            <p>
              <span>Tong saharlik:</span> {namazVaqti.times.tong_saharlik} AM
            </p>
            <p>
              <span>Quyosh:</span> {namazVaqti.times.quyosh} AM
            </p>
            <p>
              <span>Peshin:</span> {namazVaqti.times.peshin} PM
            </p>
            <p>
              <span>Asr:</span> {namazVaqti.times.asr} PM
            </p>
            <p>
              <span>Shom:</span> {namazVaqti.times.shom_iftor} PM
            </p>
            <p>
              <span>Hufton:</span> {namazVaqti.times.hufton} PM
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
