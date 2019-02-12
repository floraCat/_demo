process.on('message', function(m) {
  console.log('CHILD-2 got message:', m);
  process.send('y='+m);
});
