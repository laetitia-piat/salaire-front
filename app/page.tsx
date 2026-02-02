"use client";

import { useState } from "react";

type Result = {
  heures_normales: number;
  heures_dimanche: number;
  salaire_net: number;
  salaire_brut: number;
  type: string;
};

export default function Home() {
  const [heures, setHeures] = useState<string>("");
  const [heuresDimanche, setHeuresDimanche] = useState<string>("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");

  async function onCalculate() {
    setError(null);
    setResult(null);

    const h = Number(heures);
    const hd = Number(heuresDimanche);

    if (!Number.isFinite(h) || !Number.isFinite(hd) || h < 0 || hd < 0) {
      setError("Merci d’entrer des nombres valides (>= 0).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heures: h, heures_dimanche: hd, type }),
      });

      if (!res.ok) {
        throw new Error("Erreur côté API");
      }

      const data = (await res.json()) as Result;
      setResult(data);
    } catch (e) {
      setError(
        "Impossible de joindre l’API Python (est-elle bien lancée sur :8000 ?).",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="mx-auto mt-10 max-w-[400px] p-4 bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat
    rounded-xl"
    >
      <h1 className="font-bold text-xl text-center mb-10">
        Calcul salaire vacations
      </h1>

      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 w-full rounded border border-gray-300 p-2"
        >
          <option value="Select">--Selectionner un lieu--</option>
          <option value="Tamaris">Tamaris</option>
          <option value="HPEL">HPEL</option>
          <option value="Diabeto">Diabeto</option>
        </select>
        <label>
          Heures travaillées (total)
          <input
            className="border"
            value={heures}
            onChange={(e) => setHeures(e.target.value)}
            type="number"
            min="0"
            step="0.25"
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        <label>
          Heures de dimanche
          <input
            className="border"
            value={heuresDimanche}
            onChange={(e) => setHeuresDimanche(e.target.value)}
            type="number"
            min="0"
            step="0.25"
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        <button
          onClick={onCalculate}
          disabled={loading}
          className="mt-5 p10 bg-gray-500 text-white rounded w-1/2 m-auto hover:pointer"
        >
          {loading ? "Calcul..." : "Calculer"}
        </button>

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        {result && (
          <div
            style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}
          >
            <p>Salaire net : {result.salaire_net} €</p>
            <p>Salaire brut : {result.salaire_brut} €</p>
            <hr />
          </div>
        )}
      </div>
    </main>
  );
}
