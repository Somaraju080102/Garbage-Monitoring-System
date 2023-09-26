var http=require('http');
var fs=require('fs');
var index =fs.readFileSync("index.html");
const SerialPort =require('serialport').SerialPort;

const { DelimiterParser} = require('@serialport/parser-delimiter');

const port = new SerialPort(
  {
    path: 'COM3',
    baudRate: 9600
  }
);

const parser=port.pipe(new DelimiterParser({delimiter: '\n'}));



parser.on('open',function(){
  console.log("hello");

});
parser.on('data',function(data){
  var enc=new TextDecoder();
  var arr=new Uint8Array(data);
  ready=enc.decode(arr);
});

var app=http.createServer(function(req,res){
  res.writeHead(200,{'Content-Type': 'text/html'});
  res.end(index);
} );

var io = require('socket.io')(app);

io.on('connection', function(socket) {
    
    console.log('Node is listening to port');
    
});


parser.on('data', function(data) {
    
  // console.log('Distance: ' + data);
  
  io.emit('data', data);
});


app.listen(3000);