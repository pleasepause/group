// const PORT = process.env.PORT || 8080;

// new WebpackDevServer(webpack(config), {
//   publicPath: config.output.publicPath,
//   hot: true,
//   historyApiFallback: true,
//   setup(app) {
//     const server = require('http').Server(app);
//     let onlineUsers = 0;
//     const io = require('socket.io')(server);

//     io.on('connection', socket => {
//       console.log(`A client is connected:${socket.id}`);
//       onlineUsers++;
//       io.sockets.emit('onlineUsers', {
//         onlineUsers
//       });
//     });

//     server.listen(3000, () => {
//       console.log('listening on *:3000');
//     });
//   }
// }).listen(PORT, 'localhost', err => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(`Listening at localhost: ${PORT}`);
// });
