import { generatePDF } from "./pdf-canvas";
import { intialize, RTCStore } from "./rtc";
import "./style.css";

const app$ = document.querySelector<HTMLDivElement>("#app")!;
app$.querySelector(".joinPublisher")!.addEventListener("click", async e => {
  e.preventDefault();
  RTCStore.role = "publisher";
  app$.querySelector(".publisher")!.classList.remove("hidden");
  app$.querySelector(".intro")!.classList.add("hidden");
  await generatePDF();
  intialize();
  return false;
})
app$.querySelector(".joinSubscriber")!.addEventListener("click", e => {
  e.preventDefault();
  RTCStore.role = "subscriber";
  app$.querySelector(".subscriber")!.classList.remove("hidden");
  app$.querySelector(".intro")!.classList.add("hidden");
  intialize();
  return false;
})
