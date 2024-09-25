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
    let maxScroll = document.body.scrollHeight - window.innerHeight; // スクロールの最大値

    // スクロール量の割合（0～1）を計算
    let scrollRatio = Math.min(scrollPosition / maxScroll, 1); // スクロールが進むほど1に近づく

    // 初期のスタートカラーとエンドカラーを取得
    let [redStartInitial, greenStartInitial, blueStartInitial] = gradientColors.startColor;
    let [redEndInitial, greenEndInitial, blueEndInitial] = gradientColors.endColor;

    // スクロールに応じて色を計算（初期値から変化）
    let redStart = redStartInitial * (1 - scrollRatio) + 255 * scrollRatio;  // 赤色の変化（初期値から255に向かう）
    let blueEnd = blueEndInitial * (1 - scrollRatio) + 0 * scrollRatio;      // 青色の変化（初期値から0に向かう）

    // グラデーションを更新
    document.body.style.background = `linear-gradient(to right, rgb(${redStart}, ${greenStartInitial}, ${blueStartInitial}), rgb(${redEndInitial}, ${greenEndInitial}, ${blueEnd}))`;

    // スクロール位置がトップに戻った時も、スクロールの比率で初期色に向かって戻す
    if (scrollPosition === 0) {
      document.body.style.background = `linear-gradient(to right, rgb(${redStartInitial}, ${greenStartInitial}, ${blueStartInitial}), rgb(${redEndInitial}, ${greenEndInitial}, ${blueEndInitial}))`;
    }
  }
});

