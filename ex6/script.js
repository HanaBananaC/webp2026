const container = document.getElementById("container");

// 亂數產生 a-z 字元
function randomChar() {
  const code = Math.floor(Math.random() * 26) + 97; // a~z
  return String.fromCharCode(code);
}

// 亂數產生指定數量字串
function randomString(count) {
  let str = "";
  for (let i = 0; i < count; i++) {
    str += randomChar();
  }
  return str;
}

// 增加 1~3 個字元到字串後面
function add_new_chars() {
  const count = Math.floor(Math.random() * 3) + 1; // 1~3
  container.textContent += randomString(count);
}

// window.onload 時先產生 0~2 個字元
window.onload = function () {
  const count = Math.floor(Math.random() * 3); // 0~2
  container.textContent = randomString(count);
  container.focus();
};

// keyup event
window.addEventListener("keyup", function (e) {
  const nowText = container.textContent;

  // 只處理單一英文字母輸入
  if (/^[a-z]$/.test(e.key)) {
    // 如果輸入字元和第一個字元相等，刪除第一個字元
    if (nowText.length > 0 && e.key === nowText[0]) {
      container.textContent = nowText.slice(1);
    }
  }

  // 每次 keyup 後，尾端再加 1~3 個亂數字元
  add_new_chars();
});
