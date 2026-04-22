const API_KEY = 'ca370d51a054836007519a00ff4ce59e';
const PER_PAGE = 6;

const imglist_Url = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${API_KEY}&per_page=${PER_PAGE}&format=json&nojsoncallback=1`;

async function getimg() {
  const gallery = document.getElementById('gallery');
  const status = document.getElementById('status');

  gallery.innerHTML = '';
  status.textContent = '讀取 Flickr 圖片中...';

  try {
    // 先取得最近照片清單
    const response = await fetch(imglist_Url);
    const data = await response.json();

    console.log('getRecent JSON:', data);

    if (!response.ok || data.stat !== 'ok') {
      throw new Error(data.message || 'getRecent 失敗');
    }

    // flickr.photos.getRecent 回傳的照片陣列
    const photoList = data.photos.photo;

    // 逐張用 photo_id 去查圖片尺寸與實際網址
    const imagePromises = photoList.map(async (photo) => {
      const img_Url = `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${API_KEY}&photo_id=${photo.id}&format=json&nojsoncallback=1`;

      const imgResponse = await fetch(img_Url);
      const sizeData = await imgResponse.json();

      console.log(`getSizes JSON for ${photo.id}:`, sizeData);

      if (!imgResponse.ok || sizeData.stat !== 'ok') {
        return null;
      }

      // flickr.photos.getSizes 回傳的尺寸陣列
      const sizes = sizeData.sizes.size;

      // 優先取 Medium，沒有就往下找
      const bestSize =
        sizes.find(item => item.label === 'Medium') ||
        sizes.find(item => item.label === 'Large') ||
        sizes.find(item => item.label === 'Small') ||
        sizes[sizes.length - 1];

      return {
        src: bestSize.source,
        title: photo.title || 'Flickr Photo'
      };
    });

    const imageData = await Promise.all(imagePromises);
    const validImages = imageData.filter(item => item !== null);

    add_new_img(validImages);

    if (validImages.length > 0) {
      status.textContent = `成功載入 ${validImages.length} 張圖片`;
    } else {
      status.textContent = '沒有抓到圖片，可能是 API key 失效';
    }
  } catch (error) {
    console.error(error);
    status.textContent = '錯誤：' + error.message;
  }
}

function add_new_img(dataset) {
  const gal = document.getElementById('gallery');

  dataset.forEach(function(item) {
    const img = document.createElement('img');
    img.setAttribute('src', item.src);
    img.setAttribute('alt', item.title);
    img.setAttribute('title', item.title);
    gal.appendChild(img);
  });
}
