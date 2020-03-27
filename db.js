const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function() {

  // CRIAR TABELA
  db.run(`
    CREATE TABLE IF NOT EXISTS sugestoes(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      title TEXT,
      category TEXT,
      description TEXT,
      link TEXT
    );
  `)
  

  
  // CONSULTAR DADOS
  // db.all(`SELECT * FROM sugestoes`, function(err, rows) {
  //   if (err) return console.log(err)

  //   console.log(rows)
  // })

  //DELETAR UM DADO
  // db.run(`DELETE FROM sugestoes WHERE id = ?`, [1], function(err) {
  //   if (err) return console.log(err)

  //   console.log("Deletado!", this)
  // })

})

module.exports = db