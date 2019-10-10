/** 
 * @author: shwbubbly 
 * @since: 2019-02-19 10:47:00 
 * @desc: 测试机 
 */

const path = require('path');

const Creater = require('../src/js/min_stack.js');
const dataProcessor = require('../utils/test_data_processor_js.js');



(async() => {
  let dataArray = await dataProcessor(path.join(__dirname, '../data/min_stack.data'));
  dataArray.forEach(data => {
    handle(data, Creater);
  });
})()

function handle(options, Creater) {
  const {
    action,
    argument,
    expected 
  } = options;

  // let self = Object.create(Creater).createNew(...argument[0]);
  let self = new Creater()
  for (let i = 1; i < action.length; i++) {
    console.log(action[i], i);
    if(i === 280) {
      debugger
    }
    let output = self[action[i]](...argument[i]);
    if(output === undefined) {
      output = null;
    }
    
    if(output !== expected[i]) {
      console.info( `${action[i]} ${argument[i]} index:: ${i} -${output}::${expected[i]}`)
    }
  }
}

