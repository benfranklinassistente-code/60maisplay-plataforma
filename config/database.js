require('dotenv').config();

const dbConfig = {
    // Configuração para SQLite (testes locais)
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: process.env.DB_FILE || './database/60maisplay.db'
        },
        useNullAsDefault: true
    },
    
    // Configuração para MySQL (Hostgator / produção)
    mysql: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || '60maisplay_db',
            port: process.env.DB_PORT || 3306
        },
        pool: {
            min: 2,
            max: 10
        }
    }
};

// Escolhe o banco baseado na variável de ambiente
const environment = process.env.NODE_ENV || 'development';
const currentConfig = environment === 'production' ? dbConfig.mysql : dbConfig.sqlite;

module.exports = { dbConfig, currentConfig, environment };
