function UnaryMathHandler(unary) {
  unary.send({num: 1 + 1})
}
let resArr = [];
function ClientToServerHandler(clientStream) {
  clientStream.on('data', ({numArray}) => {
    resArr = resArr.concat(numArray);
  })
  setTimeout(() => {
    clientStream.send({ 
      completed: true,
      serverResponse: `client stream is complete after 1 second`,
      arrayItemsStreamed : resArr.reduce((total, item) => total + item),
    });
  }, 1000)
};
let filledArray;
function ServerToClientHandler(clientCall){
  // console.log('clientStream:', clientCall.body);
  let num = 1000000;
  const timer = setInterval(() => {
    num += 1000000
    filledArray = new Array(num).fill(1);
    clientCall.write({numArray: filledArray})
  }, 1);
  setTimeout(() => {
    clearInterval(timer)
    console.log(num)
  }, 5000)
};
module.exports = { 
	UnaryMathHandler,
  ClientToServerHandler,
  ServerToClientHandler,
}