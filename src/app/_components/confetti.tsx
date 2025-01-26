import React, { useEffect, useRef, useState } from 'react';

const Confetti: React.FC<{ duration?: number }> = ({ duration = 5000 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const confettiCount = 180;
        const confetti: ConfettiParticle[] = [];

        // Confetti shape class
        class ConfettiParticle {
            x: number = 0;
            y: number = 0;
            w: number = 0;
            h: number = 0;
            color: string = '';
            velocityX: number = 0;
            velocityY: number = 0;
            rotation: number = 0;
            rotationSpeed: number = 0;

            constructor() {
                if (canvas) {
                    this.x = Math.random() * canvas.width;
                }
                this.y = Math.random() * (canvas?.height ?? 0) - (canvas?.height ?? 0);
                this.w = Math.random() * 10 + 5;
                this.h = Math.random() * 5 + 2;
                this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
                this.velocityX = Math.random() * 4 - 2;
                this.velocityY = Math.random() * 4 + 2;
                this.rotation = Math.random() * 360;
                this.rotationSpeed = Math.random() * 10 - 5;
            }

            update() {
                this.x += this.velocityX;
                this.y += this.velocityY;
                this.rotation += this.rotationSpeed;
                if (canvas && this.y > canvas.height) {
                    this.y = -10;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate((this.rotation * Math.PI) / 180);
                ctx.fillStyle = this.color;
                ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
                ctx.restore();
            }
        }

        for (let i = 0; i < confettiCount; i++) {
            confetti.push(new ConfettiParticle());
        }

        let animationFrameId: number;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            confetti.forEach((c) => {
                c.update();
                c.draw(ctx);
            });
            if (isRunning) {
                animationFrameId = requestAnimationFrame(render);
            }
        };

        render();

        const stopConfetti = () => {
            setIsRunning(false);
            cancelAnimationFrame(animationFrameId);
        };

        const timeout = setTimeout(stopConfetti, duration);

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearTimeout(timeout);
        };
    }, [isRunning]);

    return (
        <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 1000 }} />
    );
};

export default Confetti;
