// 初期のグラデーションカラーを保存する変数
let initialGradientColors = null;

// 初期のグラデーションカラーを取得して保存する関数
function getInitialGradientColors() {
  if (!initialGradientColors) {
    const bodyStyle = window.getComputedStyle(document.body);
    const backgroundImage = bodyStyle.backgroundImage;

    // グラデーションのRGB値を抽出する（例: "rgb(255, 126, 95)" など）
    const matches = backgroundImage.match(/rgb\((\d+), (\d+), (\d+)\)/g);

    if (matches && matches.length >= 2) {
      const startColor = matches[0].match(/\d+/g).map(Number);
      const endColor = matches[1].match(/\d+/g).map(Number);
      initialGradientColors = { startColor, endColor }; // 初期カラーを保存
    }
  }
  return initialGradientColors;
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
    let maxScroll = document.body.scrollHeight - window.innerHeight; // スクロールの最大値

    // スクロール量の割合（0～1）を計算
    let scrollRatio = Math.min(scrollPosition / maxScroll, 1); // スクロールが進むほど1に近づく

    // 初期のスタートカラーとエンドカラーを取得
    let [redStartInitial, greenStartInitial, blueStartInitial] = gradientColors.startColor;
    let [redEndInitial, greenEndInitial, blueEndInitial] = gradientColors.endColor;

    // スクロール位置に応じて色を計算
    let redStart = redStartInitial + (255 - redStartInitial) * scrollRatio;  // 初期値から255に向かって変化
    let blueEnd = blueEndInitial - (blueEndInitial) * scrollRatio;           // 初期値から0に向かって変化

    // スクロールに基づいてグラデーションを更新
    document.body.style.background = `linear-gradient(to right, rgb(${redStart}, ${greenStartInitial}, ${blueStartInitial}), rgb(${redEndInitial}, ${greenEndInitial}, ${blueEnd}))`;

    // スクロール位置がトップに戻ったら、初期グラデーションに戻す
    if (scrollPosition === 0) {
      document.body.style.background = `linear-gradient(to right, rgb(${redStartInitial}, ${greenStartInitial}, ${blueStartInitial}), rgb(${redEndInitial}, ${greenEndInitial}, ${blueEndInitial}))`;
    }
  }
});

