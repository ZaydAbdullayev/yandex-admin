// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";

// const PizzaAnimation = () => {
//   const mainSVGRef = useRef(null);
//   const pizzaBaseRef = useRef(null);
//   const ingredientGroupRef = useRef(null);
//   const eggRef = useRef(null);
//   const eggBitsRef = useRef(null);
//   const eggShineRef = useRef(null);

//   useEffect(() => {
//     gsap.config({ trialWarn: false });
//     gsap.set(mainSVGRef.current, { visibility: "visible" });

//     const select = (s) => document.querySelector(s);
//     const q = gsap.utils.selector(document);
//     const toArray = (s) => gsap.utils.toArray(s);
//     const pizzaSpinDuration = 4;
//     const mainSVG = mainSVGRef.current;
//     const pizzaBase = pizzaBaseRef.current;
//     const allIngredients = toArray(".ingredient");
//     const allMushrooms = toArray(".mushroom");
//     const allSalami = toArray(".salami");
//     const allOlive = toArray(".olive");
//     const allPeppers = toArray(".pepper");

//     gsap.set(mainSVG, {
//       visibility: "visible",
//     });

//     gsap.set(pizzaBase, {
//       rotation: 0,
//       svgOrigin: "400 300",
//     });

//     function addToPizza(el) {
//       let pizzaRot = gsap.getProperty(pizzaBase, "rotation");
//       gsap.set(el, {
//         rotation: 360 - pizzaRot,
//         svgOrigin: "400 300",
//       });
//       ingredientGroupRef.current.appendChild(el);
//     }

//     function reset() {
//       allIngredients.forEach((c) => {
//         ingredientGroupRef.current.appendChild(c);
//         gsap.set(c, {
//           rotation: 0,
//           y: 0,
//         });
//       });
//       gsap.set(eggBitsRef.current, {
//         scale: 0,
//         svgOrigin: "400 300",
//       });
//       gsap.set(eggShineRef.current, {
//         opacity: 0,
//       });
//     }

//     let tl = gsap.timeline({ repeat: -1, onRepeat: reset });
//     tl.to(pizzaBase, {
//       duration: pizzaSpinDuration,
//       rotation: -360,
//       repeat: 2,
//       svgOrigin: "400 300",
//       ease: "none",
//     })
//       .to(
//         eggRef.current,
//         {
//           duration: pizzaSpinDuration,
//           rotation: -360,
//           repeat: 2,
//           ease: "none",
//         },
//         0
//       )
//       .to(
//         allMushrooms,
//         {
//           duration: 1.2,
//           opacity: 1,
//           y: "+=158",
//           stagger: {
//             each: pizzaSpinDuration / allMushrooms.length,
//             onComplete: function () {
//               addToPizza(this.targets()[0]);
//             },
//           },
//           ease: "power3.in",
//         },
//         0.47
//       )
//       .to(
//         allPeppers,
//         {
//           opacity: 1,
//           y: "+=200",
//           stagger: {
//             each: pizzaSpinDuration / allPeppers.length,
//             onComplete: function () {
//               addToPizza(this.targets()[0]);
//             },
//           },
//           ease: "power1.in",
//         },
//         1
//       )
//       .to(
//         allSalami,
//         {
//           opacity: 1,
//           y: "+=152",
//           stagger: {
//             each: pizzaSpinDuration / allSalami.length,
//             onComplete: function () {
//               addToPizza(this.targets()[0]);
//             },
//           },
//           ease: "power3.in",
//         },
//         1.5
//       )
//       .to(
//         allOlive,
//         {
//           opacity: 1,
//           y: "+=180",
//           stagger: {
//             each: pizzaSpinDuration / allOlive.length,
//             onComplete: function () {
//               addToPizza(this.targets()[0]);
//             },
//           },
//           ease: "power3.in",
//         },
//         0.78
//       )
//       .to(
//         eggBitsRef.current,
//         {
//           duration: 1,
//           scale: 1,
//           stagger: {
//             amount: 0.2,
//           },
//           ease: "elastic(0.6, 0.5)",
//         },
//         "-=4"
//       )
//       .to(
//         eggShineRef.current,
//         {
//           opacity: 0.6,
//         },
//         "-=3.65"
//       )
//       .to(
//         ".ingredient, #egg, #eggShine",
//         {
//           opacity: 0,
//         },
//         "-=0.5"
//       );

//     gsap.globalTimeline.timeScale(1.25);
//     reset();
//   }, []);

//   return (
//     <svg ref={mainSVGRef}>
//       <g id="pizzaBase" ref={pizzaBaseRef}></g>
//       <g id="ingredientGroup" ref={ingredientGroupRef}></g>
//       <g id="egg" ref={eggRef}></g>
//       <g id="eggShine" ref={eggShineRef}></g>
//     </svg>
//   );
// };

// export default PizzaAnimation;

