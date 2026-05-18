const zlib = require('node:zlib');
const fs = require('fs');

const src = fs.createReadStream('./text.txt');
const destination = fs.createWriteStream('./text-gzip-compression.gz');

// compress data to binary
// windowBits : 얼마나 많은 공간을 윈도우(주소참조) 로 쓸 것인지
// 라이브러리마다 디폴트가 있어서 ,그것보다 더 작게 할수없음
src.pipe(zlib.createGzip({ windowBits: 12 })).pipe(destination);

// back to original (un-Gzip)
// zlib.createGunzip();
