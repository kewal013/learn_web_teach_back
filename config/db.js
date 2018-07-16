module.exports = {
    mysql: {
        //host: "127.0.0.1",
        host: process.env.DB_HOST,
        //db host
        port: process.env.DB_PORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        db: process.env.DB_NAME,
    },
    tables: [{
        table: "userDetails",
        id: "user_id"
    }]
}