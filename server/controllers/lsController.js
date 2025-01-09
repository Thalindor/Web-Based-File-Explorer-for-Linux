const { exec } = require('child_process');


const lsDirectory = (req, res) => {
    const { username, pwd } = req.body;

    exec(`wsl sudo -u ${username} whoami && wsl ls -la ${pwd}`, (error, stdout, stderr) => {
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
    lsDirectory
};