const { exec } = require('child_process');

const cdBack = (req, res) => {
    const { pwd } = req.body;

    const sanitizedPwd = pwd.replace(/(\r\n|\n|\r)/g, "").trim();

    exec(`wsl bash -c "cd '${sanitizedPwd}' && cd .. && pwd"`, (error, stdout, stderr) => {
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
    cdBack
};
