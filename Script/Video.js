// ========================================
// YouTube の埋め込み
// <div class="video-embed" data-youtube="..."> の data-youtube に
// 動画 ID(例: dQw4w9WgXcQ)か URL(youtu.be/... や watch?v=...)を入れると、
// 中の「準備中」の表示を埋め込みプレイヤーに置き換える。
// 限定公開の動画も埋め込めます(YouTube 側で「埋め込みを許可」をオンにしておく)。
// ========================================

// 動画 ID か URL から、動画 ID を取り出す
function toYouTubeId(value) {
    const text = value.trim();

    if (/^[\w-]{11}$/.test(text)) {
        return text;
    }

    const match = text.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
    return match ? match[1] : "";
}

document.querySelectorAll(".video-embed[data-youtube]").forEach((frame) => {
    const id = toYouTubeId(frame.dataset.youtube);

    if (!id) {
        return;
    }

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
    iframe.title = frame.dataset.title || "動画";
    iframe.loading = "lazy";
    iframe.allow = "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;

    frame.replaceChildren(iframe);
});
