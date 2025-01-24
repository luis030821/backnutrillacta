import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export function Global() {
  return (
    <div className="rounded-3xl max-w-[1200px] relative flex h-full w-10/12 md:11/12 mx-auto items-center justify-center overflow-hidden bg-background px-40 pb-52 pt-8 md:pb-96">
      <div className="absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px] top-28 md:top-52">
        <Globe />
      </div>
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-5xl md:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Distribución global
      </span>
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,.3),rgba(255,255,255,0))]" />
    </div>
  );
}
function Globe() {
  const canvasRef = useRef();
  useEffect(() => {
    let phi = 0;
    let width = 0;
    const onResize = () =>
      //@ts-ignore
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();
    //@ts-ignore
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor: [1.2, 1.2, 1.2],
      markers: [],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.005;
        state.width = width * 2;
        state.height = width * 2;
      },
    }); //@ts-ignore
    setTimeout(() => (canvasRef.current.style.opacity = "1"));
    return () => globe.destroy();
  }, []);
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 600,
        aspectRatio: 1,
        margin: "auto",
        position: "relative",
      }}
    >
      <canvas
        // @ts-ignore
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 1s ease",
        }}
      />
    </div>
  );
}
