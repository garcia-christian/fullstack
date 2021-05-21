const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//middle ware

//create
app.post("/todos", async (req, res) => {

    try {
        const { desc } = req.body;
        const { notes } = req.body;
        const sql = `insert into todo(todo_desc,todo_date,todo_notes)
         values ($1,CURRENT_TIMESTAMP,$2)
 returning * 
  
          
          `;
        const rs = await pool.query(sql, [desc,notes]);

        res.json(rs)
    } catch (err) {
        console.error(err.message);
    }
 
});
//get all
app.get("/todos", async (req, res) => {

    try {
        const sql = `select * from todo
                    order by "todo_id" ASC `;
        const rs = await pool.query(sql);
        res.json(rs.rows)
    } catch (err) {
        console.error(err.message);
    }

});

app.get("/todos/category", async (req, res) => {

    try {
        const sql = `select * from category `;
        const rs = await pool.query(sql);
        res.json(rs.rows)
    } catch (err) {
        console.error(err.message);
    }

});
// get a todo
app.get("/todos/:id", async (req, res) => {

    try {
        const { id } = req.params;
        const sql = `select * from todo where todo_id = $1 `;
        const rs = await pool.query(sql, [id]);
        res.json(rs.rows[0])
    } catch (err) {
        console.error(err.message);
    }

});


//update a todo

app.put("/todos/:id", async (req, res) => {

    try {
        const { id } = req.params;
        const { notes } = req.body;
        const { desc } = req.body;
        const sql = `update todo set todo_desc = $1,  todo_notes = $3 where todo_id = $2 `;
        const rs = await pool.query(sql, [desc, id,notes]);
        res.json("Todo was updated")
    } catch (err) {
        console.error(err.message);
    }
     
});

app.put("/todos/category/:id", async (req, res) => {

    try {
        const { id } = req.params;
        const { categ } = req.body;
        const sql = `update todo set cat_id = $1 where todo_id = $2 `;
        const rs = await pool.query(sql, [categ, id]);
        res.json("Todo was updated")
    } catch (err) {
        console.error(err.message);
    }
 
});


app.listen(5000, () => {
    console.log("Server started as localhost at Port: 5000")
})

// delete

app.delete("/todos/:id", async (req, res) => {

    try {
        const { id } = req.params;
        const sql = `DELETE FROM public.todo
        WHERE todo_id = $1`;
        const rs = await pool.query(sql, [id]);
        res.json("Todo was Deleted")
    } catch (err) {
        console.error(err.message);
    }

});