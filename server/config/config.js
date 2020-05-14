// Port

process.env.PORT = process.env.PORT || 3000;

// Enviorement

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Expiration

process.env.EXPIRATION = 60 * 60 * 24 * 30;

// Seed

process.env.SEED = process.env.SEED || 'secret-seed';

// Database

let urlDB;

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb+srv://mongo_admin:fxIdetlPJqy4VAfL@clustertest-ixda1.mongodb.net/cafe'
}

process.env.URLDB = urlDB;

// Google Client ID

process.env.CLIENT_ID =
  process.env.CLIENT_ID ||
  "250927213013-89qlfolntklqig0gd39k2ln0t6gud79o.apps.googleusercontent.com";
