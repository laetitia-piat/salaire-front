"use client";

import { useState } from "react";

type CalculationResult = {
  heures_normales: number;
  heures_dimanche: number;
  salaire_net: number;
  salaire_brut: number;
  heures_nuit: number;
  lieu: string;
};

type CalculationInput = {
  heures: string;
  heures_dimanche: string;
  lieu: string;
  heures_nuit: string;
};

type CalculationState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; result: CalculationResult }
  | { status: "error"; message: string };

const initialInput: CalculationInput = {
  heures: "",
  heures_dimanche: "",
  lieu: "Select",
  heures_nuit: "",
};

export default function Home() {
  const [calcState, setCalcState] = useState<CalculationState>({
    status: "idle",
  });
  const [input, setInput] = useState<CalculationInput>(initialInput);

  const lieux = [
    { value: "Select", label: "--Selectionner un lieu--" },
    { value: "AFTC", label: "AFTC28" },
    { value: "HPEL", label: "HPEL" },
    { value: "LNA", label: "LNA" },
  ];

  const onCalculate = async () => {
    const h = Number(input.heures);
    const hd = Number(input.heures_dimanche);
    const hn = Number(input.heures_nuit);
    const lieu = input.lieu;

    if (!lieu || lieu === "Select") {
      setCalcState({
        status: "error",
        message: "Veuillez sélectionner un lieu.",
      });
      return;
    }
    if (
      !Number.isFinite(h) ||
      !Number.isFinite(hd) ||
      !Number.isFinite(hn) ||
      h < 0 ||
      hd < 0 ||
      hn < 0
    ) {
      setCalcState({
        status: "error",
        message: "Merci d’entrer des nombres valides (>= 0).",
      });
      return;
    }

    setCalcState({ status: "loading" });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heures: h,
          heures_dimanche: hd,
          lieu,
          heures_nuit: hn,
        }),
      });

      if (!res.ok) {
        throw new Error("Erreur côté serveur");
      }

      const data = (await res.json()) as CalculationResult;
      setCalcState({ status: "success", result: data });
    } catch (e) {
      setCalcState({
        status: "error",
        message:
          "Impossible de joindre l’API Python (est-elle bien lancée sur :8000 ?).",
      });
    }
  };

  const isHPEL = input.lieu === "HPEL";

  return (
    <main className="mx-auto mt-10 max-w-[400px] p-4">
      <h1 className="font-bold text-2xl text-center mb-10 text-white">
        Calcul salaire vacations
      </h1>

      <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
        <select
          value={input.lieu}
          onChange={(e) => setInput({ ...input, lieu: e.target.value })}
          className="mt-1 w-[100%] rounded border border-gray-700 bg-gray-700 p-2 text-gray-300"
        >
          {lieux.map((lieu) => (
            <option key={lieu.value} value={lieu.value} className="text-center">
              {lieu.label}
            </option>
          ))}
        </select>
        <div className="mt-2 rounded-md border border-gray-500 bg-black p-4">
          <label className=" text-gray-300">
            Heures travaillées (total)
            <input
              className="rounded border border-gray-700 bg-gray-700 p-2 text-gray-300"
              value={input.heures}
              onChange={(e) => setInput({ ...input, heures: e.target.value })}
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
              value={input.heures_dimanche}
              onChange={(e) =>
                setInput({ ...input, heures_dimanche: e.target.value })
              }
              type="number"
              min="0"
              step="0.25"
              style={{ width: "100%", padding: 8, marginTop: 6 }}
            />
          </label>
          {isHPEL && (
            <label className="mt-4 mb-2 block text-gray-300">
              Heures de nuit
              <input
                className="rounded border bg-gray-700 border-gray-700 p-2 text-gray-300"
                value={input.heures_nuit}
                onChange={(e) =>
                  setInput({ ...input, heures_nuit: e.target.value })
                }
                type="number"
                min="0"
                step="0.25"
                style={{ width: "100%", padding: 8, marginTop: 6 }}
              />
            </label>
          )}
        </div>

        <div className="mt-2 p-2 rounded-md border border-gray-500 bg-black flex justify-around">
          <button
            onClick={onCalculate}
            disabled={calcState.status === "loading"}
            className="p-1 bg-gray-700 text-gray-300 rounded w-1/3 hover:bg-gray-500 disabled:opacity-50"
          >
            {calcState.status === "loading" ? "Calcul..." : "Calculer"}
          </button>
          <button
            onClick={() => {
              setInput(initialInput);
              setCalcState({ status: "idle" });
            }}
            disabled={calcState.status === "loading"}
            className="p-1 bg-gray-700 text-gray-300 rounded w-1/3 hover:bg-gray-500 disabled:opacity-50"
          >
            {"Réinitialiser"}
          </button>
        </div>

        {calcState.status === "error" && (
          <p style={{ color: "crimson" }}>{calcState.message}</p>
        )}

        {calcState.status === "success" && (
          <div className="bg-black text-white p-7 border border-gray-500 rounded-md">
            <h2 className="text-center">Salaire net :</h2>
            <p className="font-bold text-center">
              {calcState.result.salaire_net} €
            </p>
            <hr className="mt-1 mb-1" />
            <h2 className="text-center">Salaire brut :</h2>
            <p className="font-bold text-center">
              {calcState.result.salaire_brut} €
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
