const { exec } = require('child_process');

const echoText = (req, res) => {
    const { pwd, activeFileName, text } = req.body;

    const sanitizedPwd = pwd.replace(/(\r\n|\n|\r)/g, "").trim();
    const sanitizedFileName = activeFileName.replace(/(\r\n|\n|\r)/g, "").trim();
    const fullPath = `${sanitizedPwd}/${sanitizedFileName}`;

    const command = `wsl bash -c "echo '${text.replace(/'/g, "'\\''")}' > '${fullPath}' && cat '${fullPath}'"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.status(200).send(`stdout:\n${stdout}`);
    });
};

module.exports = {
    echoText
};
