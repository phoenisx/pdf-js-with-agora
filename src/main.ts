// import { generatePDF } from "./pdf-canvas";
import { intialize, RTCStore } from "./rtc";
import "./style.css";

// generatePDF();

const app$ = document.querySelector<HTMLDivElement>("#app")!;
app$.querySelector(".joinPublisher")!.addEventListener("click", e => {
  e.preventDefault();
  RTCStore.role = "publisher";
  app$.querySelector(".grid")!.classList.remove("hidden");
  app$.querySelector(".intro")!.classList.add("hidden");
  intialize();
  return false;
})
app$.querySelector(".joinSubscriber")!.addEventListener("click", e => {
  e.preventDefault();
  RTCStore.role = "subscriber";
  app$.querySelector(".grid")!.classList.remove("hidden");
  app$.querySelector(".intro")!.classList.add("hidden");
  intialize();
  return false;
})
