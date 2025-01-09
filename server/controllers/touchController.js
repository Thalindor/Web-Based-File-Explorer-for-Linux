const { exec } = require('child_process');


const touchFile = (req, res) => {
    const { username, pwd, fileName } = req.body;

    const cleanPwd = pwd.trim();  
    const cleanFileName = fileName.trim();  
    const directoryPath = `${cleanPwd}/${cleanFileName}`.replace(/\s+/g, ' ');
    console.log(directoryPath)

    exec(`wsl sudo touch ${directoryPath} && wsl sudo chown ${username}:${username} ${directoryPath}` , (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        res.status(200).send(stdout);
    });
};

module.exports = {
    touchFile,
};