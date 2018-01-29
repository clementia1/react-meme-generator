let express = require('express'),
    path = require('path'),
    router = express.Router(),
    multer = require('multer');    
let app = express();


app.use(express.static(path.join(__dirname, '..', 'public'))); //serves the index.html
// app.use(express.static('/upload'));
app.listen(3000); //listens on port 3000 -> http://localhost:3000/

// configuring Multer to use files directory for storing files
// this is important because later we'll need to access file path
const storage = multer.diskStorage({
  destination: './upload',
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

// express route where we receive files from the client
// passing multer middleware
app.post('/upload', upload.single('file'), (req, res) => {
//  req.file - file passed from client
//  req.body - all other values passed from the client, like name, etc..
 });

/*app.route('/upload')
  .get(function(req, res) {
    
  })
  .post(upload.single('file'), function(req, res) {
    
  })
  .delete(function(req, res) {
    
  });*/

app.get('/upload/:name', function (req, res, next) {
  
  let options = {
    root: path.join(__dirname, '..', '..', 'upload'),
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  let fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});
