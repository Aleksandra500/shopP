const db = require('../db'); // Pretpostavljamo da je tvoje DB konektovanje u posebnom fajlu

exports.orders = (req, res, next) => {
  const query = `SELECT orders.id, orders.price, orders.order_date, users.name
  FROM orders
  JOIN users ON orders.user_id = users.id;`
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

