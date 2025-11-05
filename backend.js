const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const app = express()
app.use(express.json())
app.use(cors())

const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: { type: String },
    sinopse: { type: String }
}))

const usuarioSchema = mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario", usuarioSchema)

async function conectarAoMongoDB() {
    await
        mongoose.connect(`mongodb+srv://rebeccauema_db_user:1212@cluster0.mlyw4mf.mongodb.net/?appName=Cluster0`)
}

app.get("/filmes", async (req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)
    //obtém os dados enviados pelo cliente
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //monta um objeto agrupando os dados. Ele representa um novo filme
    // a seguir, construímos um objeto Filme a partir do modelo do mongoose
    const filme = new Filme({ titulo: titulo, sinopse: sinopse })
    // save salva o novo filme na base gerenciada pelo MongoDB
    await filmes.save()
})

//GET http://localhost:3000/hey
app.get('/hey', (req, res) => {
    res.send('hey')
})

app.listen(3000, () => {
    try {
        conectarAoMongoDB()
        console.log("up and running")
    }
    catch (e) {
        console.log('Erro', e)
    }
})

