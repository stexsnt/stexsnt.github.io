#!/usr/bin/env node
// Vérifie que les fichiers communs à Mue, Synapse, Périple et Sésame sont restés identiques.
// Une correction faite dans l'un de ces fichiers doit être recopiée dans les quatre dépôts.
//
//   node outils/verifier-communs.mjs              compare les sites en ligne
//   node outils/verifier-communs.mjs ../          compare des copies locales des dépôts (dossier parent)
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const SITES = ["python-lycee", "synapse", "periple", "sesame"];
const COMMUNS = ["js/moteur.js", "js/confort.js", "js/prof-plus.js", "js/qrcode.min.js"];
const local = process.argv[2];

async function lire(site, fichier) {
  if (local) return readFile(join(local, site, fichier));
  const r = await fetch(`https://stexsnt.github.io/${site}/${fichier}`, { cache: "no-store" });
  if (!r.ok) throw new Error(`${r.status} pour ${site}/${fichier}`);
  return Buffer.from(await r.arrayBuffer());
}

let ecarts = 0;
for (const f of COMMUNS) {
  const empreintes = {};
  for (const s of SITES) {
    try { empreintes[s] = createHash("sha256").update(await lire(s, f)).digest("hex").slice(0, 12); }
    catch (e) { empreintes[s] = "illisible (" + e.message + ")"; }
  }
  const valeurs = new Set(Object.values(empreintes));
  if (valeurs.size === 1) console.log(`identique   ${f}`);
  else { ecarts++; console.log(`DIFFÉRENT   ${f}`); for (const s of SITES) console.log(`            ${s.padEnd(13)} ${empreintes[s]}`); }
}
console.log(ecarts ? `\n${ecarts} fichier(s) à resynchroniser.` : "\nLes fichiers communs sont identiques sur les quatre sites.");
process.exit(ecarts ? 1 : 0);
