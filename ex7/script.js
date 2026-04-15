var container = document.getElementById("container");

// 頁面一載入先放 1~3 個亂數字元
window.onload = function () {
  container.textContent = add_new_chars(3);
  container.focus();
};

// 產生亂數字串
// x: 最大字數
// b=true => 產生 1~x 個
// b=false => 固定產生 x 個
function add_new_chars(x, b = true) {
  var n = x;
  if (b) {
    n = Math.floor(Math.random() * x) + 1;
  }

  var str = "";
  for (let i = 0; i < n; i++) {
    str += String.fromCharCode(97 + Math.floor(Math.random() * 26));
  }
  return str;
}

// 記錄連續打錯次數
var counter = 0;

window.addEventListener("keyup", function (e) {
  // 只處理 a~z
  if (!/^[a-z]$/.test(e.key)) {
    return;
  }

  var firstone = container.textContent.substring(0, 1);

  // 打對
  if (e.key == firstone) {
    container.textContent = container.textContent.substring(1);
    counter = 0; // 打對就重置連錯次數
  } else {
    // 打錯：先把錯的字加到後面
    container.textContent += e.key;
    counter++;

    // 連續打錯三次：除了原本要加的亂數字串，再額外加 3 個亂數產生的字串
    if (counter >= 3) {
      container.textContent += add_new_chars(3);
      container.textContent += add_new_chars(3);
      container.textContent += add_new_chars(3);
      counter = 0;
    }
  }

  // 每次 keyup 後，原本就要再加一串 1~3 個亂數字元
  container.textContent += add_new_chars(3);
});
