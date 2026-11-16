# Le confédéralisme rampant en Belgique — dossier critique

Site statique (« Jamstack sans build ») publié sur GitHub Pages : <https://ouaisfieu.github.io/sujet/>

Dossier analytique en français, état des lieux au 16 novembre 2026 : concept, réformes de l'État, mécanismes, article 195 et suppression du Sénat, finances, acteurs, Bruxelles, opinion, analyse critique, comparaisons, scénarios, chronologie, glossaire, FAQ et bibliographie (plus de 150 sources).

Rédaction : Claude (Anthropic). Publication anonyme.

## Mise en ligne

1. Déposer **tout le contenu de ce dossier** à la racine du dépôt `sujet` (branche `main`), y compris le fichier caché `.nojekyll`.
2. Dans le dépôt : *Settings → Pages → Build and deployment → Source : Deploy from a branch*, branche `main`, dossier `/ (root)`.
3. Le site est servi à `https://ouaisfieu.github.io/sujet/` après une ou deux minutes.

Aucune compilation, aucune dépendance : HTML, CSS et JavaScript natifs. Les liens internes sont relatifs (le site fonctionne aussi en local avec `python3 -m http.server`), sauf la page `404.html`, qui utilise le préfixe absolu `/sujet/`.

## Référencement et web sémantique

- Balises `title`, `description`, `canonical`, `hreflang fr-BE`, Open Graph et Twitter Card sur chaque page ; image de partage 1200 × 630.
- JSON-LD schema.org en `@graph` : `WebSite` (+ `SearchAction`), `Organization`, `Person` (auteur), `WebPage`, `BreadcrumbList`, `Article` / `Report` avec `citation`, `about`, `hasPart`, `license` ; `FAQPage`, `DefinedTermSet`, `ItemList` d'événements et de sources.
- HTML sémantique : `article`, `nav`, `aside`, `time datetime`, `dfn`, `cite`, `lang="nl"` sur les termes néerlandais, tableaux avec `caption` et `scope`.
- `sitemap.xml`, `robots.txt`, `feed.xml` (Atom), `opensearch.xml`, `manifest.webmanifest`, `llms.txt`, `humans.txt`.
- Accessibilité : lien d'évitement, contrastes AA, navigation au clavier, thème clair ou sombre, `prefers-reduced-motion`, styles d'impression.

Après la mise en ligne, soumettre `https://ouaisfieu.github.io/sujet/sitemap.xml` dans Google Search Console et Bing Webmaster Tools.

## Mettre à jour

Les pages sont des fichiers HTML autonomes : on peut les modifier directement. Si vous changez la date de mise à jour, pensez à `dateModified` dans le bloc JSON-LD, à `sitemap.xml` et à `feed.xml`.

## Licence

Textes : [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/deed.fr). Code (CSS, JS) : même licence. Les documents cités restent la propriété de leurs auteurs.
