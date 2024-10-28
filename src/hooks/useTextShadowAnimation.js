import { useEffect } from "react";

const useTextShadowAnimation = (selector = ".line") => {
    useEffect(() => {
        const lines = document.querySelectorAll(selector);

        // Function to reset all text shadows
        const resetTextShadows = () => {
            lines.forEach((line) => {
                line.style.transition = "text-shadow 1s ease, opacity 1s ease";
                line.style.textShadow = "none";
                line.style.opacity = "0.7";
            });
        };

        // Function to animate text shadows sequentially on reload
        const animateTextShadowsOnLoad = () => {
            lines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.opacity = "1";
                    line.style.transition = "text-shadow 2s ease, opacity 1s ease";
                    line.style.textShadow = "5px 8px 16px rgba(255, 131, 63, 1)";

                    // Keep the shadow for 5 seconds before resetting
                    setTimeout(() => {
                        if (index === lines.length - 1) {
                            setTimeout(resetTextShadows, 5000);
                        }
                    }, 5000);
                }, index * 2000);
            });
        };

        // Initial text shadow animation for all lines on page load
        animateTextShadowsOnLoad();

        // After the initial sequence, start the individual animations with delays
        setTimeout(() => {
            const animateEachLineIndividually = () => {
                lines.forEach((line, index) => {
                    setTimeout(() => {
                        line.style.opacity = "1";
                        line.style.transition = "text-shadow 2s ease, opacity 1s ease";
                        line.style.textShadow = "5px 8px 16px rgba(255, 131, 63, 1)";

                        setTimeout(() => {
                            line.style.opacity = "0.7";
                            line.style.textShadow = "none";
                        }, 2000);
                    }, index * 10000);
                });
            };

            setTimeout(() => {
                animateEachLineIndividually();
                const intervalId = setInterval(() => {
                    animateEachLineIndividually();
                }, lines.length * 10000);

                return () => clearInterval(intervalId);
            }, 3000);
        }, lines.length * 2000 + 8000);
    }, [selector]);
};

export default useTextShadowAnimation;
