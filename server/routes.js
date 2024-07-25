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
    order_notes,
  } = req.body;

  db.query(
    `INSERT INTO orders (
      customer_id, order_status, total_amount, shipping_address, 
      billing_address, payment_method, shipping_method, promo_code, order_notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      customer_id,
      order_status,
      total_amount,
      shipping_address,
      billing_address,
      payment_method,
      shipping_method,
      promo_code,
      order_notes,
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
    order_notes,
  } = req.body;

  db.query(
    `UPDATE orders SET 
      customer_id = ?, order_status = ?, total_amount = ?, shipping_address = ?,
      billing_address = ?, payment_method = ?, shipping_method = ?, promo_code = ?, order_notes = ?
    WHERE order_id = ?`,
    [
      customer_id,
      order_status,
      total_amount,
      shipping_address,
      billing_address,
      payment_method,
      shipping_method,
      promo_code,
      order_notes,
      req.params.id,
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

router.get("/discounts", (req, res) => {
  db.query("SELECT * FROM discount_codes", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Get a specific discount by ID
// router.get("/discounts/:id", (req, res) => {
//   db.query(
//     "SELECT * FROM discount_codes WHERE discount_id = ?",
//     [req.params.id],
//     (err, results) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       if (results.length === 0) {
//         res.status(404).json({ message: "Discount not found" });
//         return;
//       }
//       res.json(results[0]);
//     }
//   );
// });

// Get a specific discount by code
router.get("/discounts/code/:code", (req, res) => {
  db.query(
    "SELECT * FROM discount_codes WHERE code = ?",
    [req.params.code],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ message: "Discount code not found" });
        return;
      }
      res.json(results[0]);
    }
  );
});

// Get active discounts
router.get("/discounts/active", (req, res) => {
  const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
  db.query(
    "SELECT * FROM discount_codes WHERE active = 1 AND (start_date IS NULL OR start_date <= ?) AND (end_date IS NULL OR end_date >= ?)",
    [currentDate, currentDate],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    }
  );
});

router.post("/discounts", (req, res) => {
  const {
    code,
    discount_value,
    start_date,
    end_date,
    min_order_amount,
    active,
    item_id,
  } = req.body;

  db.query(
    "INSERT INTO discount_codes (code, discount_value, start_date, end_date, min_order_amount, active, item_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      code,
      discount_value,
      start_date || null,
      end_date || null,
      min_order_amount || null,
      active !== undefined ? active : 1,
      item_id || null,
    ],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ discount_id: result.insertId, ...req.body });
    }
  );
});

// Update a discount
router.put("/discounts/:id", (req, res) => {
  const {
    code,
    discount_value,
    start_date,
    end_date,
    min_order_amount,
    active,
    item_id,
  } = req.body;

  db.query(
    "UPDATE discount_codes SET code = ?, discount_value = ?, start_date = ?, end_date = ?, min_order_amount = ?, active = ?, item_id = ? WHERE discount_id = ?",
    [
      code,
      discount_value,
      start_date || null,
      end_date || null,
      min_order_amount || null,
      active !== undefined ? active : 1,
      item_id || null,
      req.params.id,
    ],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Discount not found" });
        return;
      }
      res.json({ discount_id: req.params.id, ...req.body });
    }
  );
});

// Delete a discount
router.delete("/discounts/:id", (req, res) => {
  db.query(
    "DELETE FROM discount_codes WHERE discount_id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Discount not found" });
        return;
      }
      res.json({ message: "Discount deleted successfully" });
    }
  );
});

router.get("/users", (req, res) => {
  db.query("SELECT id, name, email FROM users", (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(result);
  });
});

router.get("/users/:id", (req, res) => {
  db.query(
    "SELECT id, name, email FROM users WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(result[0]);
    }
  );
});

router.post("/users", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, result) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.status(201).json({ id: result.insertId, name, email });
      }
    );
  });
});

router.put("/users/:id", (req, res) => {
  const { name, email, password } = req.body;
  let query = "UPDATE users SET name = ?, email = ?";
  let params = [name, email];

  if (password) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      query += ", password = ?";
      params.push(hashedPassword);
      params.push(req.params.id);

      db.query(query + " WHERE id = ?", params, (err, result) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        if (result.affectedRows === 0) {
          res.status(404).json({ message: "User not found" });
          return;
        }
        res.json({ message: "User updated successfully" });
      });
    });
  } else {
    params.push(req.params.id);
    db.query(query + " WHERE id = ?", params, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json({ message: "User updated successfully" });
    });
  }
});

router.delete("/users/:id", (req, res) => {
  db.query("DELETE FROM users WHERE id = ?", [req.params.id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ message: "User deleted successfully" });
  });
});

module.exports = router;
