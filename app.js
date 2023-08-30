const express = require('express');
const cors = require('cors');
const mysqlConnect = require('./mysql');
const path = require('path');

const app = express();

//Acceso al directorio publico
app.use(express.static('public'));

//Middlewares
app.use(cors({origin: "*"}));
app.use(express.json());

//Rutas
//Buscar todos los pedidios q se han echo
app.get('/pedidos', (req, res) => {
    const sql = 'SELECT p.*, pr.imagen FROM pedido p INNER JOIN producto pr ON p.id_producto = pr.id_producto';
    mysqlConnect.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.json(rows);
        }
    });
});

//Eliminar pedido
app.delete('/borrar-pedido/:id_pedido', (req, res) =>{
    const id_pedido = req.params.id_pedido;
    const sql = 'DELETE FROM pedido WHERE id_pedido = ?';

    mysqlConnect.query(sql, [id_pedido], (err, rows) =>{
        if (err) {
            console.log(err);
            res.status(500).json({error: 'Error al eliminar pedido'});
        } else {
            res.json({
                ok: true,
                msg: 'Eliminacion exitosa'
            });
        }
    });
});

//Contolador de rutas
app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

//Puerto de conexion del puerto
app.listen(3100, ()=>{
    console.log('Server corriendo en el puerto 3100');
})