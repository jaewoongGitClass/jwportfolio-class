const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const toast = document.querySelector(".toast");
const copyButton = document.querySelector(".copy-email");
const projectDialog = document.querySelector("#project-dialog");
const dialogCloseButton = document.querySelector(".dialog-close");
const projectCards = document.querySelectorAll(".project-card[data-project]");

const projectDetails = {
  lumio: {
    title: "Lumio — 웰니스 루틴 앱",
    description: "흩어진 건강 데이터를 하나의 일상 루틴으로 연결한 모바일 경험입니다.",
    role: "프로덕트 디자이너 · 사용자 리서치, UX 설계, UI 디자인",
    technologies: ["Figma", "FigJam", "Prototyping"],
    outcome: "샘플: 핵심 건강 지표를 한 화면에 모아 일일 루틴 완료율을 높였습니다."
  },
  mori: {
    title: "Mori — 라이프스타일 커머스",
    description: "취향 기반 큐레이션으로 쇼핑의 발견하는 재미를 다시 설계했습니다.",
    role: "프로덕트 디자이너 · 정보 구조, 탐색 경험, 디자인 시스템",
    technologies: ["Figma", "FigJam", "Design system"],
    outcome: "샘플: 개인화된 컬렉션을 통해 상품 탐색과 저장 경험을 개선했습니다."
  },
  ondo: {
    title: "Ondo Studio — 브랜드 경험",
    description: "오래 쓰일 물건의 가치를 온라인에서도 느끼게 하는 브랜드 경험입니다.",
    role: "브랜드 디자이너 · 아트 디렉션, 웹 경험, 콘텐츠 디자인",
    technologies: ["Figma", "Illustrator", "Web design"],
    outcome: "샘플: 제품의 제작 과정과 소재 정보를 강조해 브랜드 스토리 전달을 강화했습니다."
  }
};

let activeProjectCard = null;

// 모달에 선택된 프로젝트 정보를 채우고, 닫을 때 돌아갈 카드를 기억합니다.
function openProjectDialog(card) {
  if (!projectDialog) return;

  const project = projectDetails[card.dataset.project];
  if (!project) return;

  activeProjectCard = card;
  projectDialog.querySelector("#dialog-title").textContent = project.title;
  projectDialog.querySelector("#dialog-description").textContent = project.description;
  projectDialog.querySelector("#dialog-role").textContent = project.role;
  projectDialog.querySelector("#dialog-outcome").textContent = project.outcome;

  const technologyList = projectDialog.querySelector("#dialog-technologies");
  technologyList.replaceChildren(...project.technologies.map((technology) => {
    const item = document.createElement("li");
    item.textContent = technology;
    return item;
  }));

  projectDialog.showModal();
  dialogCloseButton.focus();
}

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

if (copyButton && toast) {
  copyButton.addEventListener("click", async () => {
    const email = copyButton.dataset.email;
    await navigator.clipboard.writeText(email);
    toast.textContent = "이메일 주소를 복사했어요.";
    toast.classList.add("is-visible");
    window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
  });
}

projectCards.forEach((card) => {
  card.addEventListener("click", () => openProjectDialog(card));
  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openProjectDialog(card);
  });
});

if (projectDialog && dialogCloseButton) {
  dialogCloseButton.addEventListener("click", () => projectDialog.close());
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && projectDialog.open) {
      event.preventDefault();
      projectDialog.close();
    }
  });
  projectDialog.addEventListener("click", (event) => {
    if (event.target === projectDialog) projectDialog.close();
  });
  projectDialog.addEventListener("close", () => {
    if (activeProjectCard) activeProjectCard.focus();
    activeProjectCard = null;
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));
