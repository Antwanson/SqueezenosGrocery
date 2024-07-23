// routes.js
const express = require("express");
const router = express.Router();
const db = require("./db"); // Import the database connection

// Item Routes
router.get("/items", (req, res) => {
  db.query("SELECT * FROM items", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

router.get("/items/:id", (req, res) => {
  db.query(
    "SELECT * FROM items WHERE item_id = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ message: "Item not found" });
        return;
      }
      res.json(results[0]);
    }
  );
});

router.post("/items", (req, res) => {
  const { item_name, description, price, stock_quantity, category } = req.body;
  db.query(
    "INSERT INTO items (item_name, description, price, stock_quantity, category) VALUES (?, ?, ?, ?, ?)",
    [item_name, description, price, stock_quantity, category],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ item_id: result.insertId, ...req.body });
    }
  );
});

router.put("/items/:id", (req, res) => {
  const { item_name, description, price, stock_quantity, category } = req.body;
  db.query(
    "UPDATE items SET item_name = ?, description = ?, price = ?, stock_quantity = ?, category = ? WHERE item_id = ?",
    [item_name, description, price, stock_quantity, category, req.params.id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Item not found" });
        return;
      }
      res.json({ item_id: req.params.id, ...req.body });
    }
  );
});

router.delete("/items/:id", (req, res) => {
  db.query(
    "DELETE FROM items WHERE item_id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Item not found" });
        return;
      }
      res.json({ message: "Item deleted successfully" });
    }
  );
});

// Order Routes
router.get("/orders", (req, res) => {
  const { sort, order } = req.query;
  let query = "SELECT * FROM orders";

  if (sort && ["order_date", "user_id", "total_amount"].includes(sort)) {
    query += ` ORDER BY ${sort} ${order === "desc" ? "DESC" : "ASC"}`;
  }

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

router.get("/orders/current", (req, res) => {
  // Assuming 'current' orders are those with status 'processing' or 'shipped'
  db.query(
    'SELECT * FROM orders WHERE status IN ("processing", "shipped")',
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    }
  );
});

router.get("/orders/history", (req, res) => {
  // Assuming 'history' orders are those with status 'delivered' or 'cancelled'
  db.query(
    'SELECT * FROM orders WHERE status IN ("delivered", "cancelled")',
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    }
  );
});

router.post("/orders", (req, res) => {
  const { user_id, total_amount, status } = req.body;
  db.query(
    "INSERT INTO orders (user_id, total_amount, status, order_date) VALUES (?, ?, ?, NOW())",
    [user_id, total_amount, status],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: result.insertId, ...req.body });
    }
  );
});

// User Routes
router.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

router.get("/users/:id", (req, res) => {
  db.query(
    "SELECT * FROM users WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(results[0]);
    }
  );
});

router.put("/users/:id", (req, res) => {
  const { name, email, role } = req.body;
  db.query(
    "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?",
    [name, email, role, req.params.id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json({ id: req.params.id, ...req.body });
    }
  );
});

module.exports = router;
