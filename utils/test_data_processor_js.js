/** 
 * @author: shwbubbly 
 * @since: 2019-02-21 10:22:43 
 * @desc: 读取测试数据 
 */
const fs = require('fs');

module.exports = async (filePath) => {
  if (fs.existsSync(filePath)) {
    let dataRaw = fs.readFileSync(filePath)
    let dataString = await dataRaw.toString();
    let dataArray = dataString.split('\n').map(handleDataParagraph);
    
    return dataArray
  } else {
    throw new Error('data not exist')
  }
}

function handleDataParagraph(dp) {
  let dataObject = {}
  dp.split('$').forEach(op => {
    if(op) {
      [key, value] = op.split(':');
      dataObject[key.toLowerCase()] = JSON.parse(value);
    }
  });
  return dataObject
}