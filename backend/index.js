const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');
const bcrypt = require('bcrypt');
app.use(cors());
app.use(express.json());


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

// const a = [...Array(5)].map((_, index) =>{
//      console.log(index)
// }); 

// console.log(a);

app.post('/login' , (req, res) => {
   const { username, password } = req.body;
   
   const userDetails = {
      username : 'prasad',
      hashedPassword : bcrypt.hashSync('1234', 10)
   }
   
   if (username !== userDetails.username) {
      return res.status(404).json({message : 'User not found'})
   }
    const isPasswordMatch = bcrypt.compareSync(password, userDetails.hashedPassword);

    if (! isPasswordMatch) {
      return res.status(404).json({message : 'Invalid password'})
    }

    return res.status(200).json({message : 'Login successful'})
    
})


app.get('/get-students', (req, res) => {
   const { category } = req.query;
   
   let sql = ""
   let value = []
   
   if (category === 'top') {
       sql = 'SELECT * FROM student WHERE stu_mark > ? order BY stu_mark DESC';
       value = [80];
   }

   else if (category === 'low') {
       sql = 'SELECT * FROM student WHERE stu_mark < ?  order BY stu_mark DESC';
       value = [50];
   }
   else if (category === 'average') {
       sql = 'SELECT * FROM student WHERE stu_mark >= ? AND stu_mark <= ?  order BY stu_mark DESC';
       value = [50, 80];
   }
   else {
        sql = 'SELECT * FROM student  order BY stu_mark DESC';
   }

    db.query(sql , value , (error, results) => {
        if (error) {
           return res.status(500).json({message : 'Failed to fetch students'})
        }

        res.status(200).json({students : results})
      });
});

app.post('/students',  (req, res) => {
    const {  register_num, stu_name, stu_mark, stu_location } = req.body;

    const sql = 'INSERT INTO student (register_num, stu_name, stu_mark, stu_location) VALUES (?, ?, ?, ?)';

    db.query(sql , [register_num, stu_name, stu_mark, stu_location] , (err, result ) => {
         if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({
            message: 'Register number already exists'
          });
        }
         }

         res.status(200).json({message : 'Student added successfully'})
    })
   
})

 app.put('/update-student/:register_num' , (req, res) => {
  const {register_num} = req.params
  const {stu_name, stu_mark, stu_location} = req.body
  
   const getStudentSql = 'SELECT * FROM student WHERE register_num = ?';
     db.query(getStudentSql , [register_num] , (error , result) => {
       if (error) {
          return   res.status(404).json({message : 'Student not found'})
       }
       if (result.length === 0) {
          return   res.status(404).json({message : 'Student not found'})
       }
       else {
            const upDateName = stu_name  === "" ? result[0].stu_name : stu_name; 
            const upDateMark = stu_mark  === 0 ? result[0].stu_mark : stu_mark;
            const upDateLocation = stu_location  === "" ? result[0].stu_location : stu_location;

            const updateSql = 'UPDATE student SET stu_name = ?, stu_mark = ?, stu_location = ? WHERE register_num = ?';
           
            db.query(updateSql , [upDateName, upDateMark, upDateLocation, register_num] , (err, result) => {
                if (err) {
                   return   res.status(404).json({message : 'Failed to update student'})
                }
                res.status(200).json({message : 'Student updated successfully'})
            })
       }
 })
 })

app.delete('/delete-student/:register_num', (req, res) => {
    const {register_num} = req.params;
    const sql = 'DELETE FROM student WHERE register_num = ?';
   
    db.query(sql , [register_num] , (error, result) => {
     
       if (error) {
           
         return res.status(409).json({
            message: 'Register number Not Found'
          });    
       } 
      
       res.status(200).json({message : 'Student deleted successfully'})
    })
})