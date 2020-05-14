// Port

process.env.PORT = process.env.PORT || 3000;

// Enviorement

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Database

let urlDB;

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb+srv://mongo_admin:fxIdetlPJqy4VAfL@clustertest-ixda1.mongodb.net/cafe'
}

process.env.URLDB = urlDB;
