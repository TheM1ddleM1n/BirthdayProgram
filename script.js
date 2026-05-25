function checkBirthday() {
  const input = document.getElementById('birthdayInput').value;
  const result = document.getElementById('result');

  if (!input) {
    result.className = 'result';
    result.innerHTML = '<h2 style="color:#e94560">Please enter your birthday!</h2>';
    return;
  }

  const [, month, day] = input.split('-').map(Number);
  const now = new Date();
  const todayMonth = now.getMonth() + 1;
  const todayDay = now.getDate();

  if (month === todayMonth && day === todayDay) {
    result.className = 'result birthday';
    result.innerHTML = `
      <h2>🎉 Happy Birthday!</h2>
      <p>from <strong>TheM1ddleM1n</strong>! 🎂<br/>Hope your day is absolutely amazing!</p>
    `;
    launchConfetti();
  } else {
    const daysLeft = daysUntilBirthday(month, day);
    const weeks = Math.floor(daysLeft / 7);
    const remainingDays = daysLeft % 7;
    const months = Math.floor(daysLeft / 30);
    const remainingAfterMonths = daysLeft % 30;

    result.className = 'result countdown';
    result.innerHTML = `
      <h2>Your birthday is coming up!</h2>
      <div class="countdown-boxes">
        <div class="box"><div class="num">${daysLeft}</div><div class="label">Days</div></div>
        <div class="box"><div class="num">${weeks}</div><div class="label">Weeks</div></div>
        <div class="box"><div class="num">${months}</div><div class="label">Months</div></div>
      </div>
    `;
  }
}

function daysUntilBirthday(month, day) {
  const now = new Date();
  const year = now.getFullYear();
  let next = new Date(year, month - 1, day);
  if (
    next.getMonth() + 1 < now.getMonth() + 1 ||
    (next.getMonth() + 1 === now.getMonth() + 1 && next.getDate() < now.getDate())
  ) {
    next = new Date(year + 1, month - 1, day);
  }
  const diff = next - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function launchConfetti() {
  const container = document.getElementById('confetti-container');
  container.innerHTML = '';
  const colors = ['#e94560', '#f5a623', '#00d4ff', '#a855f7', '#22c55e'];
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
    piece.style.animationDelay = (Math.random() * 1.5) + 's';
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(piece);
  }
  setTimeout(() => { container.innerHTML = ''; }, 5000);
}
