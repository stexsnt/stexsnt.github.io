/* Portail : quatre essais interactifs, un par site. Aucune dépendance. */
(function () {
  "use strict";
  const $ = id => document.getElementById(id);
  const fr = (x, d) => x.toFixed(d).replace(".", ",");
  const signe = n => (n >= 0 ? "+" + n : "−" + Math.abs(n));

  /* ---------- Mue : une boucle for ---------- */
  (function mue() {
    const curseur = $("mue-n"), code = $("mue-n-code"), sortie = $("mue-sortie");
    if (!curseur) return;
    const maj = () => {
      const n = +curseur.value;
      code.textContent = n;
      sortie.textContent = Array.from({ length: n }, (_, i) => "■".repeat(i + 1)).join("\n");
    };
    curseur.addEventListener("input", maj);
    maj();
  })();

  /* ---------- Synapse : un neurone à seuil ---------- */
  (function synapse() {
    const w1 = $("syn-w1"), w2 = $("syn-w2"), b = $("syn-b");
    if (!w1) return;
    const table = $("syn-table"), verdict = $("syn-verdict");
    const cas = [[0, 0], [0, 1], [1, 0], [1, 1]];
    const trait = (ligne, w) => {
      ligne.style.strokeWidth = (Math.abs(w) * 1.6 + 0.8).toFixed(1);
      ligne.dataset.signe = w > 0 ? "plus" : w < 0 ? "moins" : "nul";
    };
    const maj = () => {
      const a = +w1.value, c = +w2.value, d = +b.value;
      $("syn-w1-v").textContent = a; $("syn-w2-v").textContent = c; $("syn-b-v").textContent = d;
      $("syn-b-fig").textContent = signe(d);
      trait($("syn-l1"), a); trait($("syn-l2"), c);
      const sorties = cas.map(([x1, x2]) => { const s = a * x1 + c * x2 + d; return { x1, x2, s, y: s > 0 ? 1 : 0 }; });
      table.innerHTML = sorties.map(r =>
        `<tr class="${r.y ? "actif" : ""}"><td>${r.x1}</td><td>${r.x2}</td><td>${signe(r.s).replace("+", "")}</td><td><b>${r.y}</b></td></tr>`).join("");
      const motif = sorties.map(r => r.y).join("");
      verdict.dataset.etat = motif === "0001" ? "reussi" : "";
      verdict.textContent =
        motif === "0001" ? "Réussi : ton neurone calcule un « et ». Dans une IA, personne ne règle les poids à la main : c'est l'entraînement qui les trouve."
        : motif === "0111" ? "Il s'active dès qu'une entrée vaut 1 : c'est un « ou ». Essaie de baisser le biais."
        : motif === "0000" ? "Il ne s'active jamais. La somme doit dépasser 0 pour le dernier cas."
        : motif === "1111" ? "Il s'active toujours, même sans rien en entrée. Regarde le biais."
        : "La sortie vaut 1 quand la somme dépasse 0. Seule la dernière ligne doit s'activer.";
    };
    [w1, w2, b].forEach(c => c.addEventListener("input", maj));
    maj();
  })();

  /* ---------- Périple : Archimède encadre pi ---------- */
  (function periple() {
    const curseur = $("per-n"), fig = $("per-fig");
    if (!curseur) return;
    const COTES = [6, 12, 24, 48, 96], C = 140, R = 104;
    const poly = (n, r) => Array.from({ length: n }, (_, k) => {
      const t = -Math.PI / 2 + (2 * Math.PI * k) / n;
      return (C + r * Math.cos(t)).toFixed(2) + "," + (C + r * Math.sin(t)).toFixed(2);
    }).join(" ");
    const maj = () => {
      const n = COTES[+curseur.value];
      $("per-n-v").textContent = n;
      fig.innerHTML =
        `<polygon class="dehors" points="${poly(n, R / Math.cos(Math.PI / n))}"/>` +
        `<polygon class="dedans" points="${poly(n, R)}"/>` +
        `<circle class="cercle" cx="${C}" cy="${C}" r="${R}"/>` +
        `<line class="diametre" x1="${C - R}" y1="${C}" x2="${C + R}" y2="${C}"/>` +
        `<circle class="centre" cx="${C}" cy="${C}" r="3"/>`;
      // Un encadrement s'arrondit vers l'extérieur : par défaut à gauche, par excès à droite.
      const bas = fr(Math.floor(n * Math.sin(Math.PI / n) * 1e4 + 1e-7) / 1e4, 4);
      const haut = fr(Math.ceil(n * Math.tan(Math.PI / n) * 1e4 - 1e-7) / 1e4, 4);
      let k = 0;
      while (k < bas.length && bas[k] === haut[k]) k++;
      const marque = s => `<b>${s.slice(0, k)}</b>${s.slice(k)}`;
      $("per-enc").innerHTML = `${marque(bas)} <span>&lt;</span> <i>π</i> <span>&lt;</span> ${marque(haut)}`;
    };
    curseur.addEventListener("input", maj);
    maj();
  })();

  /* ---------- Sésame : le chiffre de César ---------- */
  (function sesame() {
    const msg = $("ses-msg"), cle = $("ses-cle"), sortie = $("ses-sortie");
    if (!msg) return;
    const net = t => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase().replace(/[^A-Z ]/g, "");
    const maj = () => {
      const propre = net(msg.value);
      if (propre !== msg.value) { const p = msg.selectionStart; msg.value = propre; try { msg.setSelectionRange(p, p); } catch (e) {} }
      const k = +cle.value;
      $("ses-cle-v").textContent = k;
      sortie.textContent = propre.replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0) - 65 + k) % 26 + 65)) || " ";
    };
    msg.addEventListener("input", maj);
    cle.addEventListener("input", maj);
    maj();
  })();
})();
