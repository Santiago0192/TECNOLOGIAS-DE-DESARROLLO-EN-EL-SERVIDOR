const router = require('express').Router();
const path = require('path')

router.get('',(req,res) => {
    //const url = path.join(__dirname,'..','views','index.html');
    //res.sendFile(url);
    res.render('home', {
        title: 'APP NAME'
    });
});

router.get('/about',(req, res) => {
    res.render('about');
})

// Traer JSON usanbdo axios y si no recive userId envien un error, sino trae el usuario consultado
router.get('/tareas',(req, res) => {
    const userId = req.query.user;
    if (userId) {
        const url = `https://jsonplaceholder.typicode.com/todos?userId=${userId}`;
        axios.get(url).then(response => {
            res.render('todos',{
                userId: userId,
                todos: response.data
            });
        }).catch();
    } else {
        res.render('todos');
    }
})

module.exports = router;