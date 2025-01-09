const express = require("express");
const cors = require('cors');
const app = express();
const port = 3001;

const authRoutes    = require('./routes/authRoutes');
const lsRoutes      = require('./routes/lsRoutes');
const touchRoutes   = require('./routes/touchRoutes');
const mkdirRoutes   = require('./routes/mkdirRoutes');
const rmRoutes      = require('./routes/rmRoutes');
const cdBackRoutes  = require('./routes/cdBackRoutes');
const cdRoutes      = require('./routes/cdRoutes');
const rmFilesRoutes = require('./routes/rmFilesRoutes');
const echoRoutes    = require('./routes/echoRoutes');
const catRoutes     = require('./routes/catRoutes');
const chmodRoutes   = require('./routes/chmodRoutes');

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/dir', lsRoutes);
app.use('/api/file', touchRoutes);
app.use('/api/folder', mkdirRoutes);

app.use('/api/delete', rmRoutes);
app.use('/api/rmFiles', rmFilesRoutes);

app.use('/api/cdBack', cdBackRoutes);
app.use('/api/cd', cdRoutes);
app.use('/api/echo', echoRoutes);
app.use('/api/cat', catRoutes);
app.use('/api/chmod', chmodRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})


/*
 Kullanilan Linux Komutlari 
    #  ls 
    #  touch
    #  mkdir
    #  chown
    #  cd
    #  rm 
    #  echo
    #  cat
    #  chmod
*/
