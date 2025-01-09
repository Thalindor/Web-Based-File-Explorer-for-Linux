const { exec } = require('child_process');

const cd = (req, res) => {
    const { pwd, activeFolderName } = req.body;

    const sanitizedPwd = pwd.replace(/(\r\n|\n|\r)/g, "").trim();
    const sanitizedFolder = activeFolderName.replace(/(\r\n|\n|\r)/g, "").trim();
    const command = `wsl bash -c "cd '${sanitizedPwd}/${sanitizedFolder}' && pwd"`;

    exec(command, (error, stdout, stderr) => {
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
    cd
};
