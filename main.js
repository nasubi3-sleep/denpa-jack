document.addEventListener("DOMContentLoaded", async () => {
  const rssUrl = "https://anchor.fm/s/102299d68/podcast/rss";
  const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(rssUrl);

  try {
    const res = await fetch(proxyUrl);
    const rssText = await res.text(); // ← ここで 'data' の代わりに rssText

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rssText, "text/xml");

    const firstItem = xmlDoc.querySelector("item");
    const title = firstItem.querySelector("title").textContent;
    const mp3 = firstItem.querySelector("enclosure").getAttribute("url");

    document.getElementById("episode-list").innerHTML = `
      <li>
        <h3>${title}</h3>
        <audio controls src="${mp3}"></audio>
      </li>
    `;
  } catch (error) {
    console.error("エピソード取得エラー:", error);
    document.getElementById("episode-list").innerHTML =
      "<li>エピソードを取得できませんでした。</li>";
  }
});
