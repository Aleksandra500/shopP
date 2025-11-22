const AppError = require('./AppError')
const jwt = require('jsonwebtoken')
const db = require('../db')
exports.protect =  async (req, res, next) => {
   
  let token;
  let decoded
    //   da li token postoji
   if(req.headers.authorization) token = req.headers.authorization
   if(!token) return next( new AppError('Niste ulogovani, prvo se ulogujte', 401))
  
    
   
    //verifikovanje da li je token validan preko jwt secret
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if(err) return next(new AppError('Netacan ili istekao token, ulogujte se ponovo', 404))
        else  decoded = data;
    })

    //da li postoji korisnik sa ovim imenom
    const rows = await db.execute("SELECT * FROM users WHERE id = ?", [decoded.id]);

      if (rows.length === 0) {
        return next(new AppError("Korisnik više ne postoji.", 404));
      }
    
      

    //setujemo korisnika i nastavljamo sledevci middleware
    req.user = rows[0];
    next();
  

}