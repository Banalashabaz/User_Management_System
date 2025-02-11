const express=require('express');
const app=express()
app.listen(4000,()=>console.log('Server is Running SUccesfully.......'))

const cors=require('cors');
app.use(cors())
app.use(express.json())

const mysql=require('mysql')

const db = mysql.createConnection({
    host: 'localhost',        
    user: 'root',    
    password: 'root123',
    database: 'Office' 
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('Connected to the MySQL database.');
});

app.get('/', (req, res) => {
    const query = 'SELECT * from  candidates'; 
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results); 
 
    });
});

app.get('/data/:id', (req, res) => {
  const query = `SELECT * from  candidates  WHERE id="${req.params.id}"`; 
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error executing query:', err.message);
          return res.status(500).json({ error: 'Database query failed' });
      }
      res.json(results); 

  });
});



app.post('/',(req,res)=>
{
    const {firstname,lastname,emailId,phonenumber}=req.body;
    const data=req.body;
    const query=`INSERT INTO candidates (first_name,last_name,email,phone) values("${firstname}","${lastname}","${emailId}","${phonenumber}")`;
  console.log(data)
  db.query(query, (err, results) => {
    if (err) {
        console.error('Error executing query:', err.message);
        alert('Duplicate Values are not allowed')
        
    }
    res.json(results); 
    console.log(req.body)
});
  



})
app.delete('/delete-user/:id', (req, res) => {
    const userId = req.params.id; 
    const query = `DELETE FROM candidates WHERE id=${userId} `;
    db.query(query,(err, result) => {
      if (err) {
        res.status(500).json({ error: 'Failed to delete user' });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'User not found' }); 
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    });
  });
  

  app.put('/update-user/:id', (req, res) => {
    
    const userId = req.params.id; 
    const {fname,lname, email,phone } = req.body;
    const query = `UPDATE candidates SET first_name = "${req.body.firstname}",last_name="${req.body.lastname}", email ="${req.body.emailId}", phone="${req.body.phonenumber}"  WHERE id =${userId} `;
    const values = [fname,lname, email,phone, userId];
         console.log(userId,'userID',req.body)
         console.log( `UPDATE candidates SET first_name="${req.body.firstname}",last_name="${req.body.lastname}", email ="${req.body.emailId}", phone="${req.body.phonenumber}"  WHERE id =${userId} `)
        db.query(query, (err, result) => {
      if (err) {
        console.error('Error updating user:', err.message);
        res.status(500).json({ error: 'Failed to update user' });
        return;
      }
  
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json({ message: 'User updated successfully' });
      }
    });
  });