const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);// 
const hashMap = xObject || [
  {logo: 'B', url: 'https://www.bilibili.com'}, // 默认数据直接调用这里的, 后面添加回调用函数
  {logo: 'Y', url: 'https://www.youtube.com'},
];

const simplifyUrl = (url)=> {
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '') // 删除 / 后面所有的内容
}

const render = ()=> {
  $siteList.find('li:not(.last)').remove(); // ?
  hashMap.forEach((node, index)=> { // forEach(参数一, 参数二) 参数一当前元素, 参数二下标
    const $li = $(
      `<li>
          <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
              <svg class="icon">
                <use xlink:href="#icon-CloseSquare"></use>
              </svg>
            </div>
          </div>
      </li>`
    ).insertBefore($lastLi);
    $li.on('click', ()=> {
      window.open(node.url);// js 实现a标签的功能
    });
    $li.on('click', '.close', (e)=> {
      e.stopPropagation(); // 阻止冒泡
      hashMap.splice(index, 1);
      render();
    })
  });
}

render();

$('.addButton').on('click', ()=> {
  let url = window.prompt('请输入你要添加的网址!');
  if(url.indexOf('https') !== 0) {
    url = 'https://' + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0],
    url: url
  });
  render();
});

window.onbeforeunload = ()=> {
  const string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
}

// 键盘事件
$(document).on('keypress', (e)=> {
  const {key} = e; // const key = e.key;  变量名和属性名一样时可以这样简写
  console.log(key);
  // hashMap.forEach((key2, key)=> {
  //   let i = 0;
  //   let key2 = hashMap[i].logo.toLowerCase();
  //   if(key2 === key) {
  //     window.open(hashMap[i].url);
  //   }
  //   i++
  // })
  for(let i = 0; i < hashMap.length; i++) {
    if(hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});