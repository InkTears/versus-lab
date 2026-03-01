# Versus.Lab

Application de gestion de tournois e-sport et sportifs. Versus.Lab offre une plateforme complète pour organiser, configurer et suivre des tournois en élimination directe avec gestion automatique des scores et progression des participants.

## Fonctionnalités

- **Tableau de bord**: Vue d'ensemble centralisée des tournois actifs et terminés avec statuts en temps réel
- **Création de tournois**: Configuration rapide avec gestion des participants et génération automatique d'arbres de tournoi
- **Moteur de bracket**: Génération algorithmique d'arbres de tournoi en élimination directe avec support des exemptions (Byes) pour nombres non-puissances de 2
- **Gestion des scores**: Interface de saisie intuitive pour enregistrer les résultats de matchs avec validation et progression automatique des vainqueurs

## Installation 

### Prérequis

- Node.js 16.0 ou supérieur
- npm ou yarn

### Configuration

```bash
git clone https://github.com/InkTears/versus-lab.git
cd versus-lab
npm install
```

### Exécution

Serveur de développement:
```bash
npm run dev
```

Construction de production:
```bash
npm run build
```

L'application sera accessible à http://localhost:5173

## Architecture

```
versus-lab/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Dashboard.jsx
    │   ├── CreateTournament.jsx
    │   ├── BracketView.jsx
    │   └── ScoreModal.jsx
    └── utils/
        └── bracketEngine.js
```

## Stack Technologique

- **Frontend**: React 19.2.0
- **Build Tool**: Vite 7.3.1
- **Styling**: Tailwind CSS 3.4.19
- **Icons**: Lucide React 0.575.0
- **CSS Processing**: PostCSS 8.5.6, Autoprefixer 10.4.27
- **Linting**: ESLint 9.39.1

## Composants

### App.jsx
Composant racine gérant l'état global, la navigation et la logique des tournois.

### Navbar
Navigation persistante avec logo et contrôles de vue.

### Dashboard
Grille de tournois avec statuts et aperçus de participation.

### CreateTournament
Formulaire de création avec génération automatique du bracket.

### BracketView
Affichage visuel de l'arbre de tournoi avec tous les rounds.

### ScoreModal
Interface modale pour saisir et valider les résultats de matchs.

## Module Métier

Le moteur de bracket (bracketEngine.js) gère:
- Génération d'arbres de tournoi équilibrés
- Allocation des exemptions (Byes)
- Chaînage des matchs entre rounds
- Progression automatique des vainqueurs

## Développement

Module réalisé dans le cadre du cursus d'Architecture Logicielle - YNOV Aix
