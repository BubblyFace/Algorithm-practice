// process.stdin.setEncoding('utf8');
// var chunk
// process.stdin.on('readable', () => {
//     chunk = process.stdin.read();
//     if(typeof chunk === 'string'){
//         chunk = chunk.slice(0,-2);
//         process.stdout.write(`stringLength:${chunk.length}\n`);
//     }
//     if(chunk === ''){
//         process.stdin.emit('end');
//         return
//     }
//     if (chunk !== null) {
//         process.stdout.write(`data: ${chunk}\n`);
//     }
// });
// var main = (chunk) => {
//     console.log(chunk)
// }

// process.stdin.on('end', () => {
//     process.stdout.write('end');
//     main(chunk)
// });
var readline = require('readline');
const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
});
rl.on('line', function(line){
   var tokens = line.split(' ');
    console.log(parseInt(tokens[0]) + parseInt(tokens[1]));
});