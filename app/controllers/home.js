exports.index = (req, res) => {
    res.render('index', { 
        title: 'Web Developer', 
        bodyCss: 'landing' ,
        scripts: ['/static/js/main.bundle.js']
    });
};