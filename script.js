function getInitialGradientColors() {
  const bodyStyle = window.getComputedStyle(document.body);
  const backgroundImage = bodyStyle.backgroundImage;

  // グラデーションのRGB値を抽出する（例: "rgb(255, 126, 95)" など）
  const matches = backgroundImage.match(/rgb\((\d+), (\d+), (\d+)\)/g);
  
  if (matches && matches.length >= 2) {
    const startColor = matches[0].match(/\d+/g).map(Number);
    const endColor = matches[1].match(/\d+/g).map(Number);
    return { startColor, endColor };
  }
  
  return null; // 何もマッチしなかった場合
}

// GSAPを使ってアニメーションを制御
window.addEventListener("load", function () {
  gsap.from(".hero-content h2", { duration: 1, y: 50, opacity: 0 });
  gsap.from(".hero-content p", { duration: 1.5, y: 50, opacity: 0, delay: 0.5 });
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

    // 初期のスタートカラーとエンドカラーを取得
    let [redStart, greenStart, blueStart] = gradientColors.startColor;
    let [redEnd, greenEnd, blueEnd] = gradientColors.endColor;

    // スクロール量に応じて色を変化させる
    redStart = Math.min(255, redStart + scrollPosition / 15);  // スタートカラーの赤を変化
    blueEnd = Math.max(0, blueEnd - scrollPosition / 15);      // エンドカラーの青を変化

    // グラデーションを更新
    document.body.style.background = `linear-gradient(to right, rgb(${redStart}, ${greenStart}, ${blueStart}), rgb(${redEnd}, ${greenEnd}, ${blueEnd}))`;
  }
});

