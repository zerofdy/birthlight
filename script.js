// GSAPを使ってアニメーションを制御
window.addEventListener("load", function () {
  gsap.from(".hero-content h2", { duration: 1, y: 50, opacity: 0 });
  gsap.from(".hero-content p", { duration: 1.5, y: 50, opacity: 0, delay: 0.5 });
});

// パララックス効果を実装
document.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset;
  const parallaxLayers = document.querySelectorAll(".parallax-layer");

  parallaxLayers.forEach(function (layer) {
    const speed = layer.getAttribute("data-speed");
    const yPos = -(scrollTop * speed);
    layer.style.transform = `translateY(${yPos}px)`;
  });
});
