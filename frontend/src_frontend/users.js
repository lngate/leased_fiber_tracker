const express = require('express');
const router = express.Router();
const  dbconn =require('/Users/lewisngate/Desktop/moringa school projects/leased_fiber_tracker/backend/src/config/databaseConfig')

//dispplay user page

router.get('/', (req, res, next)=>{
    dbconn.query('SELECT * FROM users ORDER BY id desc', (err,rows)=>{
        if(err){
            req.flash('error', err);
            //render to views/users/index.ejs
            res.render('users',{data:''});
        } else {
            //render to views/users/index.ejs
            res.render('users',{data:rows});
        }
    });
});

//display add user page
router.get('/add',(req, res, next)=>{
    //render to add.ejs
    res.render('users/add',{
        name: '',
        email:'',
        mobile:''

    })
})

//add a new user
router.post('/add',(req, res, next)=>{
    let name =req.body.name;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let error = false;

    if (name.length === 0 || email.length === 0 || mobile.length ===0){
        error = true;

        //set flash message
        req.flash('error','please enter name and email and mobile');
        //render to add.ejs with flash message
        res.render('users/add',{
            name: name,
            email: email,
            mobile: mobile
        })
        //if no error
        if(!error){
            var form_data={
                name: name,
                email: email,
                mobile: mobile
            }
            //insert query
            dbconn.query('INSERT INTO users SET ?', form_data,(error, result)=>{
                //if(err) throw err
                if (err){
                    req.flash('error', err)
                    //render to add.ejs
                    res.render('users/add',{
                        name: form_data.name,
                        email: form_data.email,
                        mobile:form_data.mobile
                    })
                }else{
                    req.flash('success, user successfully added');
                    res.redirect('/users');
                }
            })
        }
    }
})

//display edit user page
router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    dbconn.query('SELECT * FROM users WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'User not found with id = ' + id)
            res.redirect('/users')
        }
          // if user found
          else {
            // render to edit.ejs
            res.render('users/edit', {
                title: 'Edit User', 
                id: rows[0].id,
                name: rows[0].name,
                email: rows[0].email,
                position: rows[0].position
            })
        }
    })
})
