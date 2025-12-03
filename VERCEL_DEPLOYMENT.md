# Configuration Vercel pour CV Platforme

## Variables d'environnement requises

Pour déployer sur Vercel, vous devez configurer les variables d'environnement suivantes dans les paramètres de votre projet :

### 1. DATABASE_URL

**Option A : Vercel Postgres (Recommandé)**
1. Allez dans votre projet Vercel
2. Onglet "Storage" → "Create Database" → "Postgres"
3. Copiez la variable `POSTGRES_PRISMA_URL`
4. Ajoutez-la comme `DATABASE_URL` dans les variables d'environnement

**Option B : Autre fournisseur PostgreSQL**
```
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
```

### 2. NEXTAUTH_URL
```
NEXTAUTH_URL="https://votre-app.vercel.app"
```
Remplacez par l'URL de votre déploiement Vercel.

### 3. NEXTAUTH_SECRET
Générez un secret sécurisé :
```bash
openssl rand -base64 32
```
Exemple :
```
NEXTAUTH_SECRET="ocazc0f8DpBqR/0vFkzV7u9CeZR8ur8R7Eng3SunfA8="
```

## Étapes de déploiement

1. **Créer une base de données Vercel Postgres**
   - Dans votre projet Vercel, allez dans "Storage"
   - Créez une nouvelle base de données Postgres
   - Copiez la variable `POSTGRES_PRISMA_URL`

2. **Configurer les variables d'environnement**
   - Allez dans "Settings" → "Environment Variables"
   - Ajoutez les 3 variables ci-dessus

3. **Mettre à jour le schéma Prisma pour PostgreSQL**
   Si vous utilisez PostgreSQL sur Vercel, mettez à jour `prisma/schema.prisma` :
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

4. **Redéployer**
   - Commitez et pushez vos changements
   - Vercel redéploiera automatiquement

## Migration de SQLite vers PostgreSQL

Si vous passez de SQLite (dev local) à PostgreSQL (Vercel) :

1. Mettez à jour le provider dans `prisma/schema.prisma`
2. Changez le type `data` de `String` à `Json` dans le modèle CV
3. Exécutez `npx prisma db push` localement pour tester
4. Déployez sur Vercel

## Vérification

Après le déploiement, vérifiez que :
- ✅ La page d'accueil se charge
- ✅ Vous pouvez créer un compte
- ✅ Vous pouvez vous connecter
- ✅ Le dashboard est accessible
