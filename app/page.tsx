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
      <h1 className="font-bold text-xl text-center mb-10">
        Calcul salaire vacations
      </h1>

      <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 w-[100%] rounded border border-gray-500 bg-gray-300 p-2"
        >
          <option value="Select" className="text-center">
            --Selectionner un lieu--
          </option>
          <option value="Tamaris">Tamaris</option>
          <option value="HPEL">HPEL</option>
          <option value="Diabeto">Diabeto</option>
        </select>
        <div className="mt-6 rounded border border-gray-500 bg-gray-300 p-4">
          <label className="font-bold">
            Heures travaillées (total)
            <input
              className="rounded border"
              value={heures}
              onChange={(e) => setHeures(e.target.value)}
              type="number"
              min="0"
              step="0.25"
              style={{ width: "100%", padding: 8, marginTop: 6 }}
            />
          </label>

          <label className="font-bold mt-4 mb-2 block">
            Heures de dimanche
            <input
              className="rounded border"
              value={heuresDimanche}
              onChange={(e) => setHeuresDimanche(e.target.value)}
              type="number"
              min="0"
              step="0.25"
              style={{ width: "100%", padding: 8, marginTop: 6 }}
            />
          </label>
        </div>

        <div className="p-2 rounded border border-gray-500 bg-gray-300 flex justify-center">
          <button
            onClick={onCalculate}
            disabled={loading}
            className="p-1 bg-gray-500 text-white rounded w-1/2 hover:bg-gray-600 disabled:opacity-50"
          >
            {loading ? "Calcul..." : "Calculer"}
          </button>
        </div>

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        {result && (
          <div
            style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}
          >
            <p>
              Salaire net :{" "}
              <span className="font-bold">{result.salaire_net} €</span>
            </p>
            <p>Salaire brut : {result.salaire_brut} €</p>
            <hr />
          </div>
        )}
      </div>
    </main>
  );
}
