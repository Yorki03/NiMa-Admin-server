const mysql = require('mysql');

const mysqlConnet = mysql.createConnection({
    host: 'bja1sncwxsgkzisv2qnd-mysql.services.clever-cloud.com',
    user: 'ub74hk6vch7oojac',
    password: 'C02qXVJ4q9sjuvuzV7BC',
    database: 'bja1sncwxsgkzisv2qnd'
});

mysqlConnet.connect(function(err){
    if(err){
        console.error(err);        
    }else{
        console.log('Database conectada');        
    }
});

module.exports = mysqlConnet;