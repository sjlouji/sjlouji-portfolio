async function fetchRSSFeed() {
  const rssURL = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sjlouji10';
  try {
    const response = await fetch(rssURL);
    const data = await response.json();
    displayFeed(data.items);
  } catch (error) {
    console.error('Error fetching the RSS feed:', error);
  }
}

function displayFeed(items) {
  const feedContainer = document.getElementById('rss-blogs');
  items.forEach(item => {
    const feedItem = document.createElement('div');
    const imageUrl = item['description'].toString().match(/<img[^>]+src="([^">]+)"/)[1];
    feedItem.className = 'col-lg-4 col-md-6 d-flex align-items-stretch mt-2';
    feedItem.innerHTML = `
        <div class="icon-box">
          <img src="${imageUrl}" alt="${item.title}" style="width: 100%; height: 50%; object-fit: cover; margin-bottom: 40px">
          <h4><a href="${item.link}" target="_blank" style="">${item.title}</a></h4>
        </div>
        `;
    feedContainer.appendChild(feedItem);
  });
}

document.addEventListener('DOMContentLoaded', fetchRSSFeed);
