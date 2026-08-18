const thumbnailId = new URLSearchParams(window.location.search).get("slide");
const thumbnailRenderOptions = { thumbnail: true };
const thumbnailSlides = [...(window.sectionSlides || [])];
const thumbnailSlide = thumbnailSlides.find(slide => slide.id === thumbnailId);
const thumbnailStage = document.querySelector("#thumbnailStage");

if (!thumbnailSlide) {
  thumbnailStage.innerHTML = '<section class="presentation-slide"><h1 class="slide-title">页面预览不可用</h1></section>';
} else {
  thumbnailStage.innerHTML = thumbnailSlide.render(thumbnailRenderOptions);
  window.alignSourceFrameTitles?.(thumbnailStage);
  const slideIndex = thumbnailStage.querySelector(".slide-index");
  if (slideIndex) slideIndex.textContent = "预览";
  document.title = `${thumbnailSlide.title} · 页面预览`;
}
