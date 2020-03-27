//usei o express pra criar e config o servidor
const express = require("express")
const server = express()

const db = require("./db")

//config arquivos estáticos(css, scripts, imagens)
server.use(express.static("public"))

//habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))

//config do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
  express: server,
  noCache: true, 
})


//criei uma rota /
//capturo o pedido do cliente para responder
server.get("/", function(req, res) {
  
  db.all(`SELECT * FROM sugestoes`, function(err, rows) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }

    const reversedSugestoes = [...rows].reverse()

    let lastSugestoes = []
    for (sugestao of reversedSugestoes) {
      if(lastSugestoes.length < 2) {
        lastSugestoes.push(sugestao)
      }
    }
    
    return res.render("index.html", { sugestoes: lastSugestoes })
  })

  
})

server.get("/sugestoes", function(req, res) {
  
  db.all(`SELECT * FROM sugestoes`, function(err, rows) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }
    const reversedSugestoes = [...rows].reverse()
    return res.render("sugestoes.html", {sugestoes: reversedSugestoes})

  })

})

server.post("/", function(req, res) {
  //INSERIR DADOS
  const query = `
  INSERT INTO sugestoes(
    image,
    title,
    category,
    description,
    link
  ) VALUES (?,?,?,?,?);
  `  
  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link
  ]  

  db.run(query, values, function(err) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }
    return res.redirect("/sugestoes")
  })
})

//liguei meu servidor na porta 3000
server.listen(3000)