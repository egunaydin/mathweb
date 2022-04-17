import {Pool} from 'pg';
const pool = new Pool({
    host: "localhost",
    port:"5432",
    user:"postgres",
    password:"1",
    database:"pevn"
});

module.exports = pool;