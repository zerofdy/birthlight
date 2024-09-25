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

  // ページ全体のスクロール量を取得
  let scrollPosition = window.scrollY;
  
  // スクロール量に応じて色を変化させる
  let red = Math.min(255, scrollPosition / 2);
  let blue = Math.min(255, 255 - scrollPosition / 2);
  
  // グラデーションの色を変更
  document.body.style.background = `linear-gradient(to right, rgb(${red}, 150, ${blue}), rgb(${red}, 200, ${blue}))`;
});

