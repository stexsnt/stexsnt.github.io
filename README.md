# Portail stexsnt.github.io

Page d'accueil commune aux quatre sites pour le lycée :

| Site | Sujet | Adresse |
|---|---|---|
| Mue | Python, de la Seconde à la Terminale | https://stexsnt.github.io/python-lycee/ |
| Synapse | L'intelligence artificielle en SNT | https://stexsnt.github.io/synapse/ |
| Périple | L'histoire des mathématiques | https://stexsnt.github.io/periple/ |
| Sésame | La cryptologie, de César au quantique | https://stexsnt.github.io/sesame/ |

Le dépôt héberge aussi deux diaporamas interactifs : `/nombre-derive/` et `/recurrence/`.

## Organisation

Tout le site est dans `public/`, en fichiers statiques, sans dépendance :

- `index.html` : la page d'accueil. Chaque bande présente un site dans ses propres couleurs et polices, avec un petit essai interactif.
- `portail.css` : la feuille de style. Les couleurs de chaque site sont regroupées dans son bloc (`.site-mue`, `.site-synapse`, `.site-periple`, `.site-sesame`).
- `portail.js` : les quatre essais (boucle `for`, neurone, polygones d'Archimède, chiffre de César).
- `polices/` : les polices des quatre sites, servies par le portail (licence SIL Open Font License).
- `nombre-derive/`, `recurrence/` : les diaporamas, inchangés.
- `pyodide/` : l'interpréteur Python partagé par les quatre sites (voir `pyodide/LISEZ-MOI.txt`).

## Publication

Astro ne sert qu'à publier le contenu de `public/` : chaque envoi sur la branche `main` déclenche
`.github/workflows/deploy.yml`, qui met le site en ligne. Pour vérifier avant d'envoyer :

    npm install && npm run build && npm run preview

## Ajouter un site ou un diaporama

Un diaporama : déposer son dossier dans `public/`, puis ajouter une ligne à la liste `.diapos` de `index.html`.
Un site : copier une bande `<section class="site …">` dans `index.html` et lui donner son bloc de couleurs dans `portail.css`.
