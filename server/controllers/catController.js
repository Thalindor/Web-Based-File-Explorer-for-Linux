const { exec } = require('child_process');

const cat = (req, res) => {
    const { pwd, activeFileName } = req.body;

    const sanitizedPwd = pwd.replace(/(\r\n|\n|\r)/g, "").trim();
    const sanitizedFolder = activeFileName.replace(/(\r\n|\n|\r)/g, "").trim();

    exec(`wsl cat '${sanitizedPwd}/${sanitizedFolder}' `, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(stdout)
        res.status(200).send(stdout);
    });
};

module.exports = {
    cat
};
