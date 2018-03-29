const sendgridMailClient = require('@sendgrid/mail');
const sanitizeHtml = require('sanitize-html');

const validateEmail = (email) => {
    const re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return re.test(email);
}

exports.index = (req, res) => {
    res.render('index', { 
        title: 'Web Developer', 
        bodyCss: 'landing' ,
        scripts: ['/static/js/main.bundle.js']
    });
};

exports.apiContact = (req, res) => {

    const contactEmail = sanitizeHtml(req.body.contact_email);
    const contactName = sanitizeHtml(req.body.contact_name);
    const contactSubject = sanitizeHtml(req.body.contact_subject);
    const contactMessage = sanitizeHtml(req.body.message);

    if(!validateEmail(contactEmail) || !contactName || !contactMessage || !contactSubject) {
        return res.status(500).json({
            message: 'Error: bad message'
        });
    }

    sendgridMailClient.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: ['castillocentralbiz@gmail.com'],
        bcc: ['ocastillo@gmail.com'],
        from: contactName + ' <' + contactEmail + '>',
        subject: 'CastilloBiz: ' + contactSubject,
        text: contactMessage
    };

    sendgridMailClient.send(msg)
        .then(() => {
            res.json({
                message: 'Success'
            });
        })
        .catch(error => {
            console.error(error.toString());
            const {message, code, response} = error;
            const {headers, body} = response;
            res.status(500).json({
                message: 'Error: ' + message
            });
        });
};
