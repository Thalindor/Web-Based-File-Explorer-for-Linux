const { exec } = require('child_process');

const login = (req, res) => {
    const { username, password } = req.body;

    exec(`wsl sudo -u ${username} whoami`, { 
        input: password + '\n' 
    }, (error, stdout, stderr) => {
        if (error) {
            console.error(`login error: ${error}`);
            return res.status(400).send('Login error');
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(400).send('Login error');
        }

        res.status(200).send({
            message: 'Login successful',
            username:username, 
        });
    });
};

module.exports = {
    login,
};
