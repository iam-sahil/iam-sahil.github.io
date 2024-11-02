function Marquee(selector, speed) {
    const marqueeElements = document.querySelectorAll(selector);
  
      marqueeElements.forEach(marqueeElement => {
      let i = 0, interval;
      const firstElement = marqueeElement.children[0];
      const start = () => interval = setInterval(() => firstElement.style.marginLeft = `-${(i += speed) % firstElement.clientWidth}px`, 10);
      start();
    });
  }
  window.addEventListener('load', () => Marquee('.marquee', .7));
  // -----------------------------------------------------------------------------  
const currentTime = new Date();
const currentHour = currentTime.getHours(); 
if (currentHour >= 12 && currentHour < 18) {
    document.querySelector('#datetime').textContent = "Good Afternoon 🌤️";
    } 
if (currentHour >= 18 && currentHour < 24) {
    document.querySelector('#datetime').textContent = "Good Evening 🌇";
} 
if (currentHour >= 0 && currentHour < 12) {
    document.querySelector('#datetime').textContent = "Good Morning ☀️";
}
// -----------------------------------------------------------------------------  