# TaskFlow

Application web de gestion de projets et de tâches, construite avec React. TaskFlow permet de créer des projets, organiser des tâches par statut/priorité, visualiser sa charge de travail en liste, Kanban ou calendrier, et suivre sa progression via un dashboard analytique.

Projet réalisé dans un but d'apprentissage de l'écosystème React (Router, Context, hooks personnalisés, architecture en couches).

## Aperçu

- Dashboard avec statistiques calculées dynamiquement et graphiques (Recharts)
- Gestion de projets et de tâches (CRUD complet)
- Vue Kanban avec Drag & Drop natif
- Vue calendrier avec navigation mensuelle
- Recherche, filtres et tri des tâches
- Mode clair / sombre / système
- Système de notifications global
- Authentification simulée, multi-comptes avec données isolées par utilisateur

## Stack technique

| Domaine | Choix |
|---|---|
| Framework | React 18 + Vite |
| Style | Tailwind CSS v4 |
| Routing | React Router v6 |
| État global | Context API (Auth, Theme, Notifications) |
| Graphiques | Recharts |
| Tests | Vitest + Testing Library |
| Persistance | localStorage (voir limitations) |

## Installation

```bash
git clone https://github.com/TitonouAnaniHounas/taskflow.git
cd taskflow
npm install
npm run dev
```

L'application est accessible sur `http://localhost:5173`.

## Scripts disponibles

```bash
npm run dev        # Lance le serveur de développement
npm run build       # Build de production
npm run test         # Lance les tests en mode watch
npm run test -- --run  # Lance les tests une seule fois
npm run lint          # Vérifie la qualité du code
```

## Architecture

```
src/
├── components/       # Composants réutilisables, organisés par domaine
│   ├── ui/            # Button, Input, Modal, Loader, EmptyState...
│   ├── tasks/          # TaskCard, TaskForm, KanbanBoard...
│   ├── projects/        # ProjectCard, ProjectForm
│   ├── dashboard/         # StatCard, ProgressBar, graphiques
│   └── layout/              # Sidebar, Header, ProtectedRoute
├── pages/            # Une page = une route
├── layouts/           # DashboardLayout, AuthLayout
├── hooks/              # useAuth, useTasks, useProjects, useTheme...
├── services/            # db.js, taskService.js, projectService.js, api.js
├── context/               # AuthContext, ThemeContext, NotificationContext
└── utils/                  # validators.js, dateHelpers.js
```

Le flux de données suit une architecture en couches, pour éviter les appels réseau directement dans les composants :

```
Composant → Hook personnalisé → Service → Couche API simulée → localStorage
```

## Fonctionnement de l'authentification (important)

⚠️ **Ce n'est pas un système d'authentification sécurisé.** Il s'agit d'une simulation frontend à but pédagogique :

- Les comptes, mots de passe et données sont stockés en clair dans le `localStorage` du navigateur, sous une seule clé `taskflow_db`.
- Chaque utilisateur possède ses propres tâches et projets, isolés par email.
- Aucune donnée n'est envoyée à un serveur : tout reste local à l'appareil.
- Ne jamais utiliser de vrais mots de passe personnels avec cette application.

## Ce que le projet ne fait pas (volontairement)

- Pas de paiement (Stripe, PayPal, abonnements)
- Pas de vrai backend (Node.js, Django, base de données serveur)
- Pas de collaboration temps réel (WebSocket)
- Pas de vraie messagerie
- Pas de gestion financière/facturation

Ces exclusions sont assumées : l'objectif du projet est l'apprentissage de React côté frontend, pas la construction d'un SaaS commercial.

## Roadmap (bonus non implémentés)

- [ ] Export des tâches en JSON/CSV
- [ ] Command palette (Ctrl+K)
- [ ] Raccourcis clavier
- [ ] Vue timeline
- [ ] PWA

## Licence

Projet personnel à but d'apprentissage.