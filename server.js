const express = require('express');
const yaml = require('js-yaml')
fs = require('fs')


const app = express(express.json());
const port = process.env.PORT || 3333;

//get names of all folders
app.get('/api/folders', (req, res) => {
try {
    let fileContents = fs.readFileSync('./config.yaml', 'utf8');
    let config = yaml.safeLoad(fileContents);
    return res.send(config.folders);
} catch (e) {
    console.log(e);
}
});

//get all file names from a folder
app.get('/api/folder/:folder_name', (req, res) => {
    var file_list = [];
    fs.readdir('./log_folders/'+req.params.folder_name, function(err, items) {
        if(err){
            return res.sendStatus(404);
        }
        console.log(items);
        for (var i=0; i<items.length; i++) {
            console.log(items[i]);
            file_list.push(items[i]);
        }
        return res.send(file_list);
    });
    
  });

//parse the data from a file
app.get('/api/file/', (req, res) => {
    try {
        let fileContents = fs.readFileSync('./log_folders/' + req.headers.path, 'utf8');
        return res.send(fileContents);
    } catch (e) {
        console.log(e);
    }
    
  });


app.post('/api/add_folder/', (req, res) => {
    
  });
 
app.listen(port , () =>
  console.log(`File Reader listening on port ${port}!`),
);