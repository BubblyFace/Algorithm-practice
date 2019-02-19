const path = require('path');
const fs = require('fs');

const testFileDirPath = path.join(__dirname, '..', 'src', 'js');

function doTest(testFileName){
  if(!testFileName) {
    throw new Error('test file name can not be null')
  }

  let filePath = path.join(testFileDirPath, testFileName);
  
  if(fs.existsSync(filePath)) {
      require(filePath)
  } else {
    throw new Error('File not exist')
  }
}

exports.doTest = doTest