import { tsParticles } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export async function initParticles(): Promise<void> {
  await loadSlim(tsParticles);

  await tsParticles.load("tsparticles", {
    fullScreen: {
      enable: true,
    },
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: "#00cccc",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: 0.7,
      },
      links: {
        enable: false,
        // color: "#00cccc",
        // distance: 150,
        // opacity: 0.4,
        // width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        outModes: {
          default: "bounce",
        },
      },
    },
  });
}
