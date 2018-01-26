console.log("Starting app ...");

setTimeout(()=>{
  console.log("Callback after first timeout");
}, 2000);

setTimeout(() =>{
  console.log("Callback after 2nd timeout");
},0);

console.log("... Finishing up");
