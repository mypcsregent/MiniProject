const express=require('express');
const app = express();
const PORT=3000


var db = require('./models');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(require('./routes/bookRoutes'));
app.use(require('./routes/userRoutes'));
app.use(require('./routes/issueRoutes'));


app.get('/',(req,res)=>{
    res.send('Hello');
})

module.exports=app.listen(PORT,function(){
    db.sequelize.sync();
    console.log(`app running on http://localhost:${PORT}`)
});

