const snowContainer = document.getElementById('snow-container');

// 雪の結晶の最大数
const MAX_SNOWFLAKES = 50;

function createSnowflake() {
    if (snowContainer.childElementCount >= MAX_SNOWFLAKES) return; // 最大数を超えたら生成しない

    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    // ランダムな位置とサイズを設定
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`; // 2~5秒
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = `${Math.random() * 10 + 10}px`; // 10~20px

    snowflake.textContent = '❄'; // 雪の結晶文字
    snowContainer.appendChild(snowflake);

    // アニメーション終了後に削除
    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
    });
}

// 雪の結晶を生成する間隔を増やす（軽量化）
setInterval(createSnowflake, 300); // 0.3秒ごとに生成
