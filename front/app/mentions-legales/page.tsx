import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales | Calculateur de salaire",
  robots: "noindex, follow",
};

export default function MentionsLegales() {
  return (
    <div>
      <Link
        href="/"
        aria-label="Retour à l’accueil"
        className=" text-gray-300 text-sm hover:underline"
      >
        <p className="flex mb-20 py-10 px-4">
          <ArrowLeft size={16} />
          Retour à l’accueil
        </p>
      </Link>
      <main className="max-w-3xl mx-auto px-4 text-gray-300">
        <h1 className="mt-4 text-2xl font-bold mb-6">Mentions légales</h1>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Éditeur du site</h2>
          <p>
            <strong>Laetitia Piat</strong>
            <br />
            Développeuse web (projet personnel / portfolio)
            <br />
            France
          </p>

          <h2 className="text-xl font-semibold">Hébergement</h2>
          <p>
            <strong>Vercel Inc.</strong>
            <br />
            440 N Barranca Ave #4133
            <br />
            Covina, CA 91723 – États-Unis
            <br />
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              https://vercel.com
            </a>
          </p>

          <h2 className="text-xl font-semibold">Objet du site</h2>
          <p>
            Le site <strong>Calculateur de salaire</strong> est une application
            web à but informatif permettant d’estimer un salaire net à partir
            d’un salaire brut.
          </p>

          <h2 className="text-xl font-semibold">Responsabilité</h2>
          <p>
            Les résultats fournis sont donnés à titre indicatif. L’éditrice du
            site ne saurait être tenue responsable d’une mauvaise utilisation de
            l’application ou d’une interprétation erronée des résultats.
          </p>

          <h2 className="text-xl font-semibold">Propriété intellectuelle</h2>
          <p>
            Le code source du projet est sous licence <strong>MIT</strong>.
          </p>

          <h2 className="text-xl font-semibold">Données personnelles</h2>
          <p>
            Le site ne collecte aucune donnée personnelle nominative. Des
            données techniques (adresse IP, logs) peuvent être collectées par
            l’hébergeur à des fins de sécurité.
          </p>

          <h2 className="text-xl font-semibold">Cookies</h2>
          <p>
            Le site n’utilise pas de cookies à des fins publicitaires ou de
            suivi.
          </p>
        </section>
      </main>
    </div>
  );
}
