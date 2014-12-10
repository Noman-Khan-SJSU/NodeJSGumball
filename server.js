
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , gumMachine = require('./routes/gumMachine');

var app = express();

// all environments
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000)
app.set('ip_address', process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1')
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', gumMachine.listMachines);
app.get('/users', user.list);
//app.get('/',gumMachine.addMachine);
app.get('/getDetails/:id', gumMachine.getDetails);
app.post('/getDetails/:id', gumMachine.updateMachine);
app.get('/listMachines', gumMachine.listMachines);

http.createServer(app).listen(app.get('port'), app.get('ip_address'),function(){
  console.log('Express server listening on port ' + app.get('port'));
});
