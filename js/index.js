const express=require('express')
const mysql=require('mysql2')
const path=require('path')
const XlsxPopulate = require('xlsx-populate');
const app=express()
app.use(express.static(path.join(__dirname,'..')));
const port=3000
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'your_database_password',
    database:'contact_management',
})
connection.connect((err)=>{
    if(err){
        console.log("Connection with mysql failed",err)
    }else{
        console.log("Connection established successfully")
    }
})
app.use(express.urlencoded({extended:true}));
app.get('/add_contacts',(req,res)=>{
res.sendFile(path.join(__dirname,'..','contact.html'))
})
app.post('/add_contacts',(req,res)=>{
const{phone_no,user_name,user_emailid}=req.body;
const sql='insert into contacts (phone_no,name,email) values (?,?,?)';
connection.query(sql,[phone_no,user_name,user_emailid],(err,result)=>{
    if(err) throw err;
    else{
        console.log("Data added succesfully")
        res.redirect('/add_contacts')
    }
})
})
app.get('/delete_contacts',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','contact.html'))
})
app.post('/delete_contacts',(req,res)=>{
    const{phone_no,user_name}=req.body
    const sql='delete from contacts where phone_no =? and name=?'
    connection.query(sql,[phone_no,user_name],(err,result)=>{
        if(err) throw err;
        else{
            console.log("Data deleted successfully")
            res.redirect('/delete_contacts');
        }
    })
})
app.get('/update_contacts',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','contact.html'))
})
app.post('/update_contacts',(req,res)=>{
    const{attribute,phone_no,pre_value,update_value}=req.body
    let sql
    switch(attribute){
        case 'phone__no':
            sql='update contacts set phone_no=? where phone_no=? and phone_no=?'
            break
        case 'name':
            sql='update contacts set name=? where name=? and phone_no=?'
            break
        case 'emailid':
            sql='update contacts set email=? where email=? and phone_no=?'
            break
        default:
            return res.status(400).json({ error: "Invalid attribute" });
    }
    connection.query(sql,[update_value,pre_value,phone_no],(err,result)=>{
        if(err) throw err
        else{
            console.log("Updated data succesfully")
            res.redirect('/update_contacts')
        }
    })
})
function dataToHTMLTable(data) {
    let tableHTML = '<table border="1"><tr>';
    for (const column in data[0]) {
        tableHTML += `<th>${column}</th>`;
    }
    tableHTML += '</tr>';
    data.forEach(row => {
        tableHTML += '<tr>';
        for (const column in row) {
            tableHTML += `<td>${row[column]}</td>`;
        }
        tableHTML += '</tr>';
    });
    tableHTML += '</table>';
    return tableHTML;
}

// Route to handle displaying contacts
app.post('/display_contacts', (req, res) => {
    const { attribute, display_value } = req.body;
    let sql;

    // Construct SQL query based on selected attribute
    if (attribute === 'all') {
        sql = 'SELECT * FROM contacts';
    } else {
        switch (attribute) {
            case 'name':
                sql = 'SELECT * FROM contacts WHERE name=?';
                break;
            case 'phone__no':
                sql = 'SELECT * FROM contacts WHERE phone_no=?';
                break;
            case 'email':
                sql = 'SELECT * FROM contacts WHERE email=?';
                break;
            default:
                return res.status(400).json({ error: "Invalid attribute" });
        }
    }

    // Execute SQL query
    connection.query(sql, [display_value], (err, result) => {
        if (err) {
            console.error("Error retrieving contacts:", err);
            res.status(500).send("Error retrieving contacts");
        } else {
            // Convert data to HTML table format
            const tableHTML = dataToHTMLTable(result);
            // Render a new HTML page with the table data
            res.send(`<html><head><title>Contact List</title></head><body><h2>Contact List</h2>${tableHTML}</body></html>`);
        }
    });
});


app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})