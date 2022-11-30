// paso 1: requerimos los npms que tengamos activos o necesitemos

const express=require('express')    
require('colors')
const sql=require('mysql')



//paso 2: activamos el server con el express
const server=express()   

server.use(express.json())

//paso 3: hacemos la conexion a la base de datos 
const conexionBD=sql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'animales' //este sera el nombre de nuestro base de datos
})


// esto es para dejar hacer los metodos
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });




server.get('/',(req,res)=>{
    res.send('bienvenidos al inicio')
})


server.get('/pokemones',(req,res)=>{
    let mysql='SELECT * FROM pokemones'

    conexionBD.query(mysql,(err,resuls)=>{
        if(err) throw err
        if (resuls.length>0){
            res.json(resuls)
        } else{
            res.send('no hay datos disponibles')
        }
    })

})


server.post('/agregar-pokemon',(req,res)=>{
    const mysql= 'INSERT INTO pokemones SET ?'

    const pokemonesOBJ={
        idpokemones : req.body.idpokemones,
        nombre : req.body.nombre,
        tipo: req.body.tipo,
    }

    conexionBD.query(mysql,pokemonesOBJ,err=>{
        if (err) throw err

        res.send('pokemon añadido con exito')
    })
})

server.put('/actualizar-pokemon/:idpokemones',(req,res)=>{
    const id=req.params
    const {nombre,tipo}= req.body

    const mysql= `UPDATE pokemones SET nombre ="${nombre}", tipo="${tipo}" where idpokemones = ${id.idpokemones}`
    
    conexionBD.query(mysql, err =>{
        if (err) throw err

        res.send('pokemon actualizado con exito')
    })
})

server.delete('/eliminar-pokemon/:idpokemones',(req,res)=>{
    const id= req.params
    const mysql =`DELETE FROM pokemones where idpokemones = ${id.idpokemones} `
    
    conexionBD.query(mysql,err=>{
        if (err) throw err

        res.send ('pokemon eliminado con exito')
    })
})







// a qui le metemos cual es el numero del puerto en el que se ejecutara y si queremos ponemos el console.log para que nos avise 
server.listen(3007,()=>{
    console.log('servidor disponible en el puerto 3007'.yellow.underline)

})