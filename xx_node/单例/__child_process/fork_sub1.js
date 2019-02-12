process.on('message', function(m) {
  console.log('CHILD-1 got message:', m);
  process.send('x='+m);
});
