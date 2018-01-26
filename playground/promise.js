var asyncAdd = (a,b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number'){
        resolve(a+b);
      } else {
        reject('Arguments must be numbers');
      }
    }, 1000);
  });
};

asyncAdd(5, 10).then((sum) => {
    console.log("Sum:  ", sum);
    return asyncAdd(sum, 33);
  }).then((sum) => {
      console.log('Sum after 2nd add: ', sum);
  }).catch((errorMsg) => {
    console.log(errorMsg);
  });



// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('Resolved. It worked!');
//     reject("Unable to fulfill promise :(");
//   }, 2500);
//
// });
//
// somePromise.then(
//   (message) => {
//     console.log(message);
//   },
//   (errorMsg) => {
//     console.log("Error:  ", errorMsg);
//   }
// );
