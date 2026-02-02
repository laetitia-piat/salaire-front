"use client";

import { useState } from "react";

type Result = {
  heures_normales: number;
  heures_dimanche: number;
  taux_horaire: number;
  majoration_dimanche: number;
  salaire_normal: number;
  salaire_dimanche: number;
  total: number;
};

export default function Home() {
  const [heures, setHeures] = useState<string>("");
  const [heuresDimanche, setHeuresDimanche] = useState<string>("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onCalculate() {
    setError(null);
    setResult(null);

    const h = Number(heures);
    const hd = Number(heuresDimanche);

    if (!Number.isFinite(h) || !Number.isFinite(hd) || h < 0 || hd < 0) {
      setError("Merci d’entrer des nombres valides (>= 0).");
      return;
    }
    if (hd > h) {
      setError(
        "Les heures de dimanche ne peuvent pas dépasser les heures totales.",
      );
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heures: h, heures_dimanche: hd }),
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
      style={{
        maxWidth: 520,
        margin: "40px auto",
        padding: 16,
        fontFamily: "system-ui",
      }}
    >
      <h1>Calcul salaire vacations</h1>

      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <label>
          Heures travaillées (total)
          <input
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
          style={{ padding: 10, cursor: "pointer" }}
        >
          {loading ? "Calcul..." : "Calculer"}
        </button>

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        {result && (
          <div
            style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}
          >
            <p>
              <b>Total :</b> {result.total} €
            </p>
            <p>Salaire normal : {result.salaire_normal} €</p>
            <p>Salaire dimanche : {result.salaire_dimanche} €</p>
            <hr />
            <small>
              Taux horaire: {result.taux_horaire}€ — Majoration dimanche:{" "}
              {(result.majoration_dimanche * 100).toFixed(0)}%
            </small>
          </div>
        )}
      </div>
    </main>
  );
}
