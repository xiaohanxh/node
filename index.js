const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
io.on('connection',function(socket){
	console.log('a user connect');
	socket.on('disconnect',function(){
		console.log('user dis')
	})
	socket.on('chat message',function(msg){
		console.log('message:',msg)
	})
})
app.get('/',function(req,res){
	res.send('hello');
});
http.listen(5000,function(){
	console.log('listening on *:5000')
});
