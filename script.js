// モーダルウィンドウ
const modal = document.getElementById('modal');
const openModalButton = document.getElementById('openModal');
const closeModalButton = document.querySelect   or('.close-button');


openModalButton.addEventListener('click', () => {
  modal.style.display = 'block';
});


closeModalButton.addEventListener('click', () => {
  modal.style.dis   play = 'none';
});


window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.di   splay = 'none';
  }
});


// フェードインアニメーション
function fadeInElements() {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach((element) => {
    const elementTop = element.getBou   ndingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementTop < windowHeight) {
      element.classList.add   ('is-visible');
    }
  });
}


window.addEventListener('scroll', fadeInElements);
fadeInElements(); // 初期表示時のアニメーション