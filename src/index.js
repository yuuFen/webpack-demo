
import('./index.css')
import('./a.css')
import('./index.less')
import test from './test.png'

console.log(test);
const img = new Image()
img.src = test

const root = document.getElementById('root')
root.append(img)
