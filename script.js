// 初期のグラデーションカラーを保存する変数
let initialGradientColors = null;

function getInitialGradientColors() {
  if (!initialGradientColors) {
    const bodyStyle = window.getComputedStyle(document.body);
    const backgroundImage = bodyStyle.backgroundImage;

    // グラデーションのRGB値を抽出する（例: "rgb(255, 204, 112)" など）
    const matches = backgroundImage.match(/rgb\((\d+), (\d+), (\d+)\)/g);

    if (matches && matches.length >= 2) {
      const startColor = matches[0].match(/\d+/g).map(Number); // スタートカラー（夕焼け）
      const endColor = matches[1].match(/\d+/g).map(Number);   // エンドカラー（夕焼け）
      initialGradientColors = { startColor, endColor }; // 初期カラーを保存
    }
  }
  return initialGradientColors;
}

// GSAPを使ってアニメーションを制御
window.addEventListener("load", function () {
  gsap.from(".hero-content h2", { duration: 1, y: 50, opacity: 0 });
  gsap.from(".hero-content p", { duration: 1.5, y: 50, opacity: 0, delay: 0.5 });
  
  const heroImg = document.querySelector('.hero img');
  heroImg.classList.add('visible');  // 強制的にクラスを追加して画像が表示されるか確認

});

document.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset;
  const parallaxLayers = document.querySelectorAll(".parallax-layer");

  // パララックス効果の実装
  parallaxLayers.forEach(function (layer) {
    const speed = layer.getAttribute("data-speed");
    const yPos = -(scrollTop * speed);
    layer.style.transform = `translateY(${yPos}px)`;
  });

  const gradientColors = getInitialGradientColors();

  if (gradientColors) {
    let scrollPosition = window.scrollY;
    let maxScroll = document.body.scrollHeight - window.innerHeight; // スクロールの最大値

    // スクロール量の割合（0～1）を計算
    let scrollRatio = Math.min(scrollPosition / maxScroll, 1); // スクロールが進むほど1に近づく

    // 初期の夕焼けカラーと夜空のターゲットカラーを設定
    let startColorDay = gradientColors.startColor; // CSSから取得した夕焼けのスタートカラー
    let endColorDay = gradientColors.endColor;     // CSSから取得した夕焼けのエンドカラー

    // 淡い夜空の色（少し明るめのブルー系）
    let startColorNight = [100, 100, 255]; // 淡いミッドナイトブルー
    let endColorNight = [25, 25, 112];     // 濃いミッドナイトブルー

    // スクロール位置に応じて色を線形補間
    let redStart = Math.floor(startColorDay[0] + (startColorNight[0] - startColorDay[0]) * scrollRatio);
    let greenStart = Math.floor(startColorDay[1] + (startColorNight[1] - startColorDay[1]) * scrollRatio);
    let blueStart = Math.floor(startColorDay[2] + (startColorNight[2] - startColorDay[2]) * scrollRatio);

    let redEnd = Math.floor(endColorDay[0] + (endColorNight[0] - endColorDay[0]) * scrollRatio);
    let greenEnd = Math.floor(endColorDay[1] + (endColorNight[1] - endColorDay[1]) * scrollRatio);
    let blueEnd = Math.floor(endColorDay[2] + (endColorNight[2] - endColorDay[2]) * scrollRatio);

    // スクロールに基づいてbodyのグラデーションを更新
    document.body.style.background = `linear-gradient(to right, rgb(${redStart}, ${greenStart}, ${blueStart}), rgb(${redEnd}, ${greenEnd}, ${blueEnd}))`;

    // スクロールに基づいてヘッダーの背景色も更新
    document.querySelector("header").style.background = `linear-gradient(to right, rgb(${redStart}, ${greenStart}, ${blueStart}), rgb(${redEnd}, ${greenEnd}, ${blueEnd}))`;

    // スクロール位置がトップに戻ったら、初期グラデーションに戻す
    if (scrollPosition === 0) {
      document.body.style.background = `linear-gradient(to right, rgb(${startColorDay.join(",")}), rgb(${endColorDay.join(",")}))`;
      document.querySelector("header").style.background = `linear-gradient(to right, rgb(${startColorDay.join(",")}), rgb(${endColorDay.join(",")}))`; // ヘッダーの色も初期値に戻す
    }
  }
  const heroText = document.querySelector('.hero-content');
  const heroImg = document.querySelector('.hero img');
  
  const heroTop = heroImg.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (2.0 <  window.scrollY) {
    heroImg.classList.add('visible');
  }
});

