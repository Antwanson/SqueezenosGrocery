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

router.get("/orders", (req, res) => {
  const { sort, order } = req.query;
  let query = "SELECT * FROM orders";

  if (sort && ["order_date", "customer_id", "total_amount"].includes(sort)) {
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
  // Assuming 'current' orders are those with status 'Processing' or 'Shipped'
  db.query(
    'SELECT * FROM orders WHERE order_status IN ("Processing", "Shipped")',
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
  // Assuming 'history' orders are those with status 'Delivered' or 'Cancelled'
  db.query(
    'SELECT * FROM orders WHERE order_status IN ("Delivered", "Cancelled")',
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
  const {
    customer_id,
    order_status,
    total_amount,
    shipping_address,
    billing_address,
    payment_method,
    shipping_method,
    promo_code,
    order_notes
  } = req.body;

  db.query(
    `INSERT INTO orders (
      customer_id, order_status, total_amount, shipping_address, 
      billing_address, payment_method, shipping_method, promo_code, order_notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      customer_id, order_status, total_amount, shipping_address,
      billing_address, payment_method, shipping_method, promo_code, order_notes
    ],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ order_id: result.insertId, ...req.body });
    }
  );
});

router.get("/orders/:id", (req, res) => {
  db.query(
    "SELECT * FROM orders WHERE order_id = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ message: "Order not found" });
        return;
      }
      res.json(results[0]);
    }
  );
});

router.put("/orders/:id", (req, res) => {
  const {
    customer_id,
    order_status,
    total_amount,
    shipping_address,
    billing_address,
    payment_method,
    shipping_method,
    promo_code,
    order_notes
  } = req.body;

  db.query(
    `UPDATE orders SET 
      customer_id = ?, order_status = ?, total_amount = ?, shipping_address = ?,
      billing_address = ?, payment_method = ?, shipping_method = ?, promo_code = ?, order_notes = ?
    WHERE order_id = ?`,
    [
      customer_id, order_status, total_amount, shipping_address,
      billing_address, payment_method, shipping_method, promo_code, order_notes,
      req.params.id
    ],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Order not found" });
        return;
      }
      res.json({ order_id: req.params.id, ...req.body });
    }
  );
});

router.delete("/orders/:id", (req, res) => {
  db.query(
    "DELETE FROM orders WHERE order_id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Order not found" });
        return;
      }
      res.json({ message: "Order deleted successfully" });
    }
  );
});

module.exports = router;
