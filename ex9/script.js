const API_KEY = "ca370d51a054836007519a00ff4ce59e";

const imgListUrl =
  "https://api.flickr.com/services/rest/?" +
  "method=flickr.photos.getRecent" +
  "&api_key=" + API_KEY +
  "&per_page=10" +
  "&format=json" +
  "&nojsoncallback=1";

function httpGet(url, callback, errorCallback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(xhr.responseText);
    } else {
      errorCallback("HTTP 狀態錯誤：" + xhr.status);
    }
  };

  xhr.onerror = function () {
    errorCallback("網路連線失敗");
  };
}

function getImg() {
  const gallery = document.getElementById("gallery");
  const msg = document.getElementById("msg");

  gallery.innerHTML = "";
  msg.textContent = "載入中...";

  httpGet(
    imgListUrl,
    function (responseText) {
      const data = JSON.parse(responseText);

      if (!data.photos || !data.photos.photo || data.photos.photo.length === 0) {
        msg.textContent = "沒有取得照片資料";
        return;
      }

      // 只取前 7 張，做出和投影片接近的照片牆效果
      const photoList = data.photos.photo.slice(0, 7);
      addNewImg(photoList);
    },
    function (errMsg) {
      msg.textContent = errMsg;
    }
  );
}

function addNewImg(dataset) {
  const msg = document.getElementById("msg");
  let loadedCount = 0;

  dataset.forEach(function (item) {
    getImgById(item.id, function (imgSrc) {
      const gallery = document.getElementById("gallery");
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = item.title || "flickr photo";
      gallery.appendChild(img);

      loadedCount++;
      if (loadedCount === dataset.length) {
        msg.textContent = "";
      }
    }, function () {
      loadedCount++;
      if (loadedCount === dataset.length) {
        msg.textContent = "";
      }
    });
  });
}

function getImgById(photoId, successCallback, errorCallback) {
  const imgUrl =
    "https://api.flickr.com/services/rest/?" +
    "method=flickr.photos.getSizes" +
    "&api_key=" + API_KEY +
    "&photo_id=" + photoId +
    "&format=json" +
    "&nojsoncallback=1";

  httpGet(
    imgUrl,
    function (responseText) {
      const data = JSON.parse(responseText);

      if (!data.sizes || !data.sizes.size || data.sizes.size.length === 0) {
        errorCallback();
        return;
      }

      // 取較大的圖片，若要更穩定也可改成 Small / Medium
      const sizes = data.sizes.size;
      const imgSrc = sizes[sizes.length - 1].source;

      successCallback(imgSrc);
    },
    function () {
      errorCallback();
    }
  );
}
