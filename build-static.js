const fs = require('fs');
const path = require('path');
const renderFile = require('express-react-views').createEngine();

fs.readFile(path.resolve(__dirname, './public/css/main.css'), {
    encoding: 'UTF-8'
}, (err, headerCss) => {
    if (err) throw err;

    renderFile(__dirname + '/app/views/pages/home/homePage', {
      settings: {
        views: __dirname + '/app/views'
      },
      title: 'Web Developer', 
      headerCss
    }, (err, markup) => {
      if (err) throw err;

      fs.writeFile('index.html', markup, (err) => {
        if (err) throw err;

        console.log('Successfully Written to static File.');
      });
    });
});
