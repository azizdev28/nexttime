"use client";
import { useEffect, useState } from "react";

interface NamazVaqti {
  title: string;
  time: string;
}

const Home = () => {
  const [vaqtlar, setVaqtlar] = useState<NamazVaqti[]>([]);
  const [bugungiKun, setBugungiKun] = useState<string>("");

  useEffect(() => {
    async function fetchVaqtlar() {
      try {
        const response = await fetch(
          "https://islomapi.uz/api/monthly?region=Toshkent&month=4"
        );
        const data: NamazVaqti[] = await response.json();
        setVaqtlar(data);

        // Bugungi kuni aniqlash
        const today = new Date();
        const options = { weekday: "long" };
        const bugun = today.toLocaleDateString("en-US", options);
        setBugungiKun(bugun);
      } catch (error) {
        console.error("Xatolik: ", error);
      }
    }

    fetchVaqtlar();
  }, []);

  return (
    <div>
      <h1 className="text-center">
        Namaz Vaqtlari <span>Tashkent</span>
      </h1>

      <ul className="list">
        {vaqtlar.map((namazVaqti, index) => (
          <li
            key={index}
            style={{
              backgroundColor: namazVaqti.weekday === bugungiKun ? "red" : "",
            }}
          >
            <p>
              <span>Month</span>
              {namazVaqti.month}
            </p>
            <p>
              <span>Day</span>
              {namazVaqti.day}
            </p>
            <p>
              <span>Weekday</span>
              {namazVaqti.weekday === "Yakshanba"
                ? "Dam olish kuni"
                : namazVaqti.weekday}
            </p>
            <p>
              <span>Tong saharlik</span>
              {namazVaqti.times.tong_saharlik}
            </p>
            <p>
              <span>Quyosh</span> {namazVaqti.times.quyosh}
            </p>
            <p>
              <span>Peshin</span>
              {namazVaqti.times.peshin}
            </p>
            <p>
              <span> Asr</span>
              {namazVaqti.times.asr}
            </p>
            <p>
              <span>Shom</span>
              {namazVaqti.times.shom_iftor}
            </p>
            <p>
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
