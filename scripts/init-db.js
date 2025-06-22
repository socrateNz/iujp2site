const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

// Configuration - à modifier selon votre environnement
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/iujp2-site';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@iujp2.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Administrateur Principal';

async function initDatabase() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connecté à MongoDB');

    const db = client.db();

    // Créer les collections si elles n'existent pas
    const collections = ['users', 'articles', 'contacts'];
    
    for (const collectionName of collections) {
      try {
        await db.createCollection(collectionName);
        console.log(`✅ Collection '${collectionName}' créée`);
      } catch (error) {
        if (error.code === 48) { // Collection already exists
          console.log(`ℹ️  Collection '${collectionName}' existe déjà`);
        } else {
          console.error(`❌ Erreur création collection '${collectionName}':`, error);
        }
      }
    }

    // Vérifier si un admin existe déjà
    const existingAdmin = await db.collection('users').findOne({ role: 'admin' });
    
    if (existingAdmin) {
      console.log('ℹ️  Un administrateur existe déjà');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Nom: ${existingAdmin.name}`);
    } else {
      // Créer l'utilisateur admin par défaut
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
      
      const adminUser = {
        email: ADMIN_EMAIL,
        name: ADMIN_NAME,
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await db.collection('users').insertOne(adminUser);
      
      console.log('✅ Utilisateur administrateur créé');
      console.log(`   Email: ${ADMIN_EMAIL}`);
      console.log(`   Mot de passe: ${ADMIN_PASSWORD}`);
      console.log('⚠️  IMPORTANT: Changez ce mot de passe après la première connexion !');
    }

    // Créer des index pour optimiser les performances
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('articles').createIndex({ published: 1 });
    await db.collection('articles').createIndex({ category: 1 });
    await db.collection('articles').createIndex({ createdAt: -1 });
    await db.collection('contacts').createIndex({ status: 1 });
    await db.collection('contacts').createIndex({ createdAt: -1 });
    
    console.log('✅ Index créés');

    console.log('\n🎉 Base de données initialisée avec succès !');
    console.log('\n📋 Prochaines étapes:');
    console.log('1. Configurez vos variables d\'environnement dans .env.local');
    console.log('2. Installez les dépendances: npm install');
    console.log('3. Lancez le serveur: npm run dev');
    console.log('4. Connectez-vous à /admin/login avec les identifiants ci-dessus');

  } catch (error) {
    console.error('❌ Erreur initialisation base de données:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

// Exécuter le script
initDatabase(); 