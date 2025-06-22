# Back Office Admin - UIJP II

Ce document explique comment installer et utiliser le back office administrateur pour le site de l'Université Internationale Jean Paul II de Bafang.

## 🚀 Installation

### 1. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# Base de données MongoDB
MONGODB_URI=mongodb://localhost:27017/iujp2-site
# ou pour MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/iujp2-site

# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Configuration Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@iujp2.com

# Configuration Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Configuration de l'application
NODE_ENV=development
```

### 2. Installation des dépendances

```bash
npm install
```

### 3. Initialisation de la base de données

```bash
node scripts/init-db.js
```

Cela créera :
- Les collections nécessaires (users, articles, contacts)
- Un utilisateur administrateur par défaut
- Les index pour optimiser les performances

**Identifiants par défaut :**
- Email: `admin@iujp2.com`
- Mot de passe: `admin123`

⚠️ **IMPORTANT :** Changez ces identifiants après la première connexion !

### 4. Lancement du serveur

```bash
npm run dev
```

Le back office sera accessible à l'adresse : `http://localhost:3000/admin`

## 📋 Fonctionnalités

### 🔐 Authentification
- Connexion sécurisée avec NextAuth
- Gestion des rôles (admin/user)
- Protection des routes admin
- Sessions JWT

### 👥 Gestion des utilisateurs
- Liste des utilisateurs
- Création de nouveaux administrateurs
- Gestion des rôles
- Recherche et filtrage

### 📝 Gestion des articles
- CRUD complet des articles
- Upload d'images via Cloudinary
- Gestion des statuts (publié/brouillon)
- Catégorisation
- Recherche et filtrage

### 💬 Gestion des messages de contact
- Liste des messages reçus
- Statuts (nouveau/lu/répondu)
- Réponse aux messages avec envoi d'email
- Notifications automatiques

### 📊 Dashboard
- Statistiques en temps réel
- Vue d'ensemble du système
- Actions rapides

## 🛠️ Configuration des services

### MongoDB
1. Installez MongoDB localement ou utilisez MongoDB Atlas
2. Configurez l'URI de connexion dans `.env.local`

### Email (Nodemailer)
1. Créez un compte Gmail
2. Activez l'authentification à 2 facteurs
3. Générez un mot de passe d'application
4. Configurez les variables SMTP dans `.env.local`

### Cloudinary
1. Créez un compte sur [Cloudinary](https://cloudinary.com)
2. Récupérez vos clés d'API
3. Configurez les variables dans `.env.local`

## 🔒 Sécurité

### Protection des routes
- Middleware Next.js pour protéger `/admin/*`
- Vérification des rôles admin
- Sessions sécurisées

### Validation des données
- Validation côté client et serveur
- Sanitisation des entrées
- Protection contre les injections

### Gestion des erreurs
- Messages d'erreur appropriés
- Logs d'erreur
- Gestion gracieuse des échecs

## 📁 Structure des fichiers

```
app/
├── admin/                    # Pages du back office
│   ├── login/               # Page de connexion
│   ├── users/               # Gestion des utilisateurs
│   ├── articles/            # Gestion des articles
│   ├── contacts/            # Gestion des messages
│   └── layout.tsx           # Layout admin
├── api/
│   ├── auth/                # NextAuth
│   ├── admin/               # APIs admin
│   └── contact/             # API contact public
lib/
├── mongodb.ts               # Connexion MongoDB
├── sendMail.ts              # Service email
├── cloudinary.ts            # Service upload images
└── types.ts                 # Types TypeScript
components/
└── ui/                      # Composants ShadCN UI
scripts/
└── init-db.js               # Script d'initialisation
```

## 🚀 Déploiement sur Vercel

1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement dans Vercel
3. Déployez automatiquement

### Variables d'environnement Vercel
- `MONGODB_URI`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `ADMIN_EMAIL`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## 🔧 Maintenance

### Sauvegarde de la base de données
```bash
# MongoDB local
mongodump --db iujp2-site --out backup/

# MongoDB Atlas
mongodump --uri="mongodb+srv://..." --db iujp2-site --out backup/
```

### Mise à jour des dépendances
```bash
npm update
```

### Vérification des logs
Les logs d'erreur sont disponibles dans la console du serveur et dans les logs Vercel.

## 📞 Support

Pour toute question ou problème :
1. Vérifiez les logs d'erreur
2. Consultez la documentation des services utilisés
3. Contactez l'équipe de développement

## 🔄 Mises à jour

### Version 1.0.0
- ✅ Authentification NextAuth
- ✅ Gestion des utilisateurs
- ✅ CRUD articles avec upload images
- ✅ Gestion des messages de contact
- ✅ Dashboard avec statistiques
- ✅ Interface responsive
- ✅ Sécurité et validation

### Prochaines fonctionnalités
- [ ] Gestion des formations
- [ ] Statistiques avancées
- [ ] Export de données
- [ ] Notifications push
- [ ] API publique pour le front office 