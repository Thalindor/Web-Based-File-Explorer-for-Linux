const { exec } = require('child_process');

const rmFolder = (req,res) => {
    const {activeFolderName, pwd, username} = req.body

    const cleanPwd = pwd.trim();  
    const cleanFileName = activeFolderName.trim();  
    const directoryPath = `${cleanPwd}/${cleanFileName}`.replace(/\s+/g, ' ');
    console.log(directoryPath)

    
    exec(`wsl sudo -u ${username}; rm -r ${directoryPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
    } )
}

module.exports = {
    rmFolder
};