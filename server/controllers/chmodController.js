const { exec } = require('child_process');

const chmodFile = (req, res) => {
    const { pwd, activeFileName, selectedChmod } = req.body;

    const sanitizedPwd = pwd.replace(/(\r\n|\n|\r)/g, "").trim();
    const sanitizedFileName = activeFileName.replace(/(\r\n|\n|\r)/g, "").trim();
    const fullPath = `${sanitizedPwd}/${sanitizedFileName}`;

    console.log(selectedChmod)

    exec(`wsl ${selectedChmod} '${fullPath}'`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            res.status(500).send(`Error executing chmod command: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            res.status(500).send(`Error: ${stderr}`);
            return;
        }

        console.log(`stdout: ${stdout}`);
        res.status(200).send(`Permissions changed successfully: ${stdout}`);
    });
};

module.exports = {
    chmodFile
};
