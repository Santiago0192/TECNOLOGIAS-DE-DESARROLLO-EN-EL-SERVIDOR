const router = require('express').Router()

router.get('',(req,res) => {
    const url = pasth.join(__dirname,'..','views','index.html');
    res.sendFile(url);
})

module.export = router;