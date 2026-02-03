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
    <main className="mx-auto mt-10 max-w-[400px] p-4">
      <h1 className="font-bold text-2xl text-center mb-10 text-white">
        Calcul salaire vacations
      </h1>

      <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 w-[100%] rounded border border-gray-700 bg-gray-700 p-2 text-gray-300"
        >
          <option value="Select" className="text-center">
            --Selectionner un lieu--
          </option>
          <option value="AFTC">AFTC28</option>
          <option value="HPEL">HPEL</option>
          <option value="LNA">LNA</option>
        </select>
        <div className="mt-2 rounded-md border border-gray-500 bg-black p-4">
          <label className=" text-gray-300">
            Heures travaillées (total)
            <input
              className="rounded border border-gray-700 bg-gray-700 p-2 text-gray-300"
              value={heures}
              onChange={(e) => setHeures(e.target.value)}
              type="number"
              min="0"
              step="0.25"
              style={{ width: "100%", padding: 8, marginTop: 6 }}
            />
          </label>

          <label className="mt-4 mb-2 block text-gray-300">
            Heures de dimanche
            <input
              className="rounded border bg-gray-700 border-gray-700 p-2 text-gray-300"
              value={heuresDimanche}
              onChange={(e) => setHeuresDimanche(e.target.value)}
              type="number"
              min="0"
              step="0.25"
              style={{ width: "100%", padding: 8, marginTop: 6 }}
            />
          </label>
        </div>

        <div className="mt-2 p-2 rounded-md border border-gray-500 bg-black flex justify-center">
          <button
            onClick={onCalculate}
            disabled={loading}
            className="p-1 bg-gray-700 text-white rounded w-1/2 hover:bg-gray-500 disabled:opacity-50"
          >
            {loading ? "Calcul..." : "Calculer"}
          </button>
        </div>

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        {result && (
          <div className="bg-black text-white p-7 border border-gray-500 rounded-md">
            <h2 className="text-center">Salaire net :</h2>
            <p className="font-bold text-center">{result.salaire_net} €</p>
            <hr className="mt-1 mb-1" />
            <h2 className="text-center">Salaire brut :</h2>
            <p className="font-bold text-center">{result.salaire_brut} €</p>
          </div>
        )}
      </div>
    </main>
  );
}
