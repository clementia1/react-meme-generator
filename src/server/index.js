let express = require('express'),
    path = require('path'),
    router = express.Router(),
    multer = require('multer');
let app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, '..', 'public'))); 
app.use('/upload', express.static('upload'));
app.listen(app.get('port'), function() {
  console.log('App is running on port', app.get('port'));
});

const storage = multer.diskStorage({
    destination: './upload',
    filename(req, file, cb) {
        cb(null, `${file.originalname}`);
    },
});

const upload = multer({
    storage
});

app.post('/upload', upload.single('file'), (req, res, next) => {
    res.sendStatus(200);
});

app.get('*', function (req, res) {
  res.redirect('/');
});