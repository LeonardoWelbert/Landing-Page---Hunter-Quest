document.addEventListener("DOMContentLoaded", () => {

/* =========================================================
   🎯 SLIDER DE IMAGENS
========================================================= */
const sliderTrack = document.getElementById("sliderTrack");
const sliderNext = document.querySelector(".slider .next");
const sliderPrev = document.querySelector(".slider .prev");

if (sliderTrack && sliderNext && sliderPrev) {
  let sliderIndex = 0;
  const sliderTotal = sliderTrack.children.length;

  function updateSlider() {
    sliderTrack.style.transform = `translateX(-${sliderIndex * 100}%)`;
  }

  sliderNext.addEventListener("click", () => {
    sliderIndex = (sliderIndex + 1) % sliderTotal;
    updateSlider();
  });

  sliderPrev.addEventListener("click", () => {
    sliderIndex = (sliderIndex - 1 + sliderTotal) % sliderTotal;
    updateSlider();
  });

  setInterval(() => {
    sliderIndex = (sliderIndex + 1) % sliderTotal;
    updateSlider();
  }, 4000);

  updateSlider();
}

/* =========================================================
   🎯 CAROUSEL
========================================================= */
const carouselTrack = document.querySelector(".carousel__track");
const carouselItems = document.querySelectorAll(".carousel__item");
const carouselNext = document.querySelector(".carousel .next");
const carouselPrev = document.querySelector(".carousel .prev");

if (carouselTrack && carouselItems.length) {
  let carouselIndex = 0;
  const carouselTotal = carouselItems.length;

  function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${carouselIndex * 100}%)`;

    carouselItems.forEach(item => item.classList.remove("active"));
    carouselItems[carouselIndex].classList.add("active");
  }

  carouselNext?.addEventListener("click", () => {
    carouselIndex = (carouselIndex + 1) % carouselTotal;
    updateCarousel();
  });

  carouselPrev?.addEventListener("click", () => {
    carouselIndex = (carouselIndex - 1 + carouselTotal) % carouselTotal;
    updateCarousel();
  });

  setInterval(() => {
    carouselIndex = (carouselIndex + 1) % carouselTotal;
    updateCarousel();
  }, 5000);

  updateCarousel();
}

/* =========================================================
   🎯 ANIMAÇÃO DOS INGRESSOS
========================================================= */
const cards = document.querySelectorAll('.card-ingresso');

if (cards.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('mostrar');
      }
    });
  });

  cards.forEach(card => observer.observe(card));
}

/* =========================================================
   🎯 FAQ (ACORDEÃO)
========================================================= */
const faqs = document.querySelectorAll('details');

faqs.forEach(faq => {
  faq.addEventListener('toggle', () => {
    if (faq.open) {
      faqs.forEach(other => {
        if (other !== faq) other.removeAttribute('open');
      });
    }
  });
});

/* =========================================================
   🎯 CONTADOR
========================================================= */
const contador = document.getElementById("contador");

if (contador) {
  const dataEvento = new Date("Oct 9, 2026 13:00:00").getTime();

  setInterval(() => {
    const agora = new Date().getTime();
    const distancia = dataEvento - agora;

    if (distancia <= 0) {
      contador.innerHTML = "Evento iniciado!";
      return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    contador.innerHTML = `${dias}d : ${horas}h : ${minutos}m : ${segundos}s`;
  }, 1000);
}

/* =========================================================
   🎯 EMAILJS (NEWSLETTER)
========================================================= */
(function () {
  emailjs.init({
    publicKey: "5bvo3AU7BTiz4fNCF",
  });
})();

const btn = document.querySelector(".newsletter button");

if (btn) {
  btn.addEventListener("click", () => {
    const emailInput = document.querySelector(".newsletter input");
    const email = emailInput.value;

    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!valid.test(email)) {
      alert("Digite um email válido!");
      return;
    }

    btn.innerText = "Enviando...";

    emailjs.send(
      "service_8npm489",
      "template_7sue3ns",
      {
        user_email: email
      },
      "5bvo3AU7BTiz4fNCF"
    )
    .then(() => {
      alert("🎉 Cadastro realizado! Verifique seu email.");
      emailInput.value = "";
      btn.innerText = "Cadastrar";
    })
    .catch(() => {
      alert("❌ Erro ao enviar.");
      btn.innerText = "Cadastrar";
    });
  });
}

/* =========================================================
   🎟️ CHECKOUT / INGRESSOS
========================================================= */

let ingressoAtual = {
  preco: 0,
  tipo: ""
};

/* ---------- ABRIR CHECKOUT ---------- */
window.abrirCheckout = function (preco, tipo) {
  const checkout = document.getElementById("checkout");
  const titulo = document.getElementById("tituloIngresso");
  const total = document.getElementById("total");

  ingressoAtual.preco = preco;
  ingressoAtual.tipo = tipo;

  titulo.innerText = `Ingresso ${tipo}`;
  total.innerText = `R$ ${preco}`;

  checkout.style.display = "flex";
};

/* ---------- FECHAR CHECKOUT ---------- */
window.fecharCheckout = function () {
  const checkout = document.getElementById("checkout");
  checkout.style.display = "none";
};

/* ---------- ATUALIZAR TOTAL ---------- */
const quantidadeInput = document.getElementById("quantidade");

if (quantidadeInput) {
  quantidadeInput.addEventListener("input", () => {
    const total = document.getElementById("total");
    const quantidade = parseInt(quantidadeInput.value || 1);

    const valor = quantidade * ingressoAtual.preco;
    total.innerText = `R$ ${valor}`;
  });
}

/* =========================================================
   🎯 FINALIZAR COMPRA + CPF VALIDADO
========================================================= */
window.finalizarCompra = function () {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const quantidade = document.getElementById("quantidade").value;

  const cpf = document.getElementById("cpf").value;
  const cardNumber = document.getElementById("cardNumber").value;
  const cardName = document.getElementById("cardName").value;
  const cardDate = document.getElementById("cardDate").value;
  const cardCvv = document.getElementById("cardCvv").value;

  const mensagem = document.getElementById("mensagemCompra");

  if (!nome || !email || !cpf || !cardNumber || !cardName || !cardDate || !cardCvv) {
    mensagem.innerText = "Preencha todos os campos!";
    return;
  }

  if (!validarCPF(cpf)) {
    mensagem.innerText = "CPF inválido!";
    return;
  }

  mensagem.innerText = "Processando pagamento...";

  const total = document.getElementById("total").innerText;

  emailjs.send(
    "service_8npm489",
    "template_7sue3ns",
    {
      user_name: nome,
      user_email: email,
      ticket_type: ingressoAtual.tipo,
      quantity: quantidade,
      total_price: total
    },
    "5bvo3AU7BTiz4fNCF"
  )
  .then(() => {
    mensagem.innerText = "🎉 Compra aprovada! Verifique seu email.";

    setTimeout(() => {
      fecharCheckout();
    }, 2000);
  })
  .catch(() => {
    mensagem.innerText = "Erro ao processar pagamento.";
  });
};

/* ---------- VALIDAÇÃO DE CPF ---------- */
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;

  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;

  return resto === parseInt(cpf.substring(10, 11));
}

/* =========================================================
   🎯 FECHAR BARRA FLUTUANTE
========================================================= */
window.fecharBar = function () {
  const bar = document.getElementById("contadorBar");
  if (bar) bar.style.display = "none";
};

});