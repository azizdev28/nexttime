"use client";
import { useEffect, useState } from "react";

interface NamazVaqti {
  title: string;
  time: string;
}

const Home = () => {
  const [vaqtlar, setVaqtlar] = useState<NamazVaqti[]>([]);

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
  }, []);

  return (
    <div>
      <h1>Namaz Vaqtlari</h1>
      <ul>
        {vaqtlar.map((namazVaqti, index) => (
          <li key={index}>
            <p>
              {" "}
              <span>Month</span>
              {namazVaqti.month}
            </p>
            <p>
              {" "}
              <span>Day</span>
              {namazVaqti.day}
            </p>
            <p>
              <span>weekday</span> {namazVaqti.weekday}
            </p>
            <p>
              {" "}
              <span>Tong saharlik</span>
              {namazVaqti.times.tong_saharlik}
            </p>
            <p>
              {" "}
              <span>Quyosh</span> {namazVaqti.times.quyosh}
            </p>
            <p>
              {" "}
              <span>Peshin</span>
              {namazVaqti.times.peshin}
            </p>
            <p>
              {" "}
              <span> Asr</span>
              {namazVaqti.times.asr}
            </p>
            <p>
              {" "}
              <span>Shom</span>
              {namazVaqti.times.shom_iftor}
            </p>
            <p>
              {" "}
              <span> Hufton</span>
              {namazVaqti.times.hufton}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
