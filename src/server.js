const Express = require('express');

const app = Express();
const port = 3000;

app.listen('/', (req, res) => {

});


app.listen(port, err => {
  console.log(err);
})