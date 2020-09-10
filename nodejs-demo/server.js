const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path');
const app = express()
const port = 3002;


const Recipe = require('./model/recipe')
const extractFile = require('./middleware/fileUpload');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(cors())

app.use(bodyParser.json());
app.use("/images", express.static(path.join("images")));


app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});



app.get('/getAllRecipe', async (req, res) => {
    let result = await Recipe.find({});
    res.status(200).json({
        status: 200,
        data: result
    })
})
app.post('/getOneRecipe', async (req, res) => {

    let result = await Recipe.find({
        recipeName: req.body.recipeName
    });
    res.status(200).json({
        status: 200,
        data: result
    })
})

app.post('/add-recipe', async (req, res) => {

    let recipeModel = new Recipe(req.body);
    let result = await recipeModel.save(recipeModel);
    res.status(200).json({
        status: 200,
        data: result
    })
})

app.post('/updateRecipe', async (req, res) => {

    let result = await Recipe.findOneAndUpdate({
        recipeName: req.body.recipeName
    }, req.body);
    res.status(200).json({
        status: 200,
        data: result
    })
})

app.post('/deleteRecipe', async (req, res) => {

    console.log('req.params', req.params)
    let result = await Recipe.findOneAndRemove({
        recipeName: req.body.recipeName
    });
    res.status(200).json({
        status: 200
    })
})

app.post('/upload-file', extractFile, async (req, res) => {
    // handling file through multer
    try {
        const url = req.protocol + "://" + req.get("host");
        res.status(200).json({
            message: "Upload successful!",
            status: 200,
            url: url + "/images/" + req.file.filename,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error to upload image",
            error: error,
            status: 500
        });
    }

})

mongoose.connect('mongodb://localhost:27017/machine', (err, client) => {
    if (err) {
        console.log('err', err);
    } else {
        console.log('database connected!');
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})