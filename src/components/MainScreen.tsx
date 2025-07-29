import React, { useState, useEffect } from "react";
import confetti from 'canvas-confetti';
import { motion } from "motion/react";

// Password Screen Component
function MainScreen({ onAuthenticated }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === 'kylie') {
            onAuthenticated();
        } else {
            setError('Incorrect password. Try again.');
            setPassword('');
        }
    };

    const laugh = () => {
        const laughSound = new Audio('home/laugh.wav');
        laughSound.play();
    }

    function shootConfetti() {
        var scalar = 2;
        var pineapple = confetti.shapeFromText({ text: '🐼', scalar });

        confetti({
            shapes: [pineapple],
            scalar,
            startVelocity: 30,
            spread: 360,
            origin: {
                x: Math.random(),
                y: Math.random() - 0.2
            }
        });
    }
    const [randomFlowers, setRandomFlowers] = useState<Array<{ id: number, x: number, y: number }>>([]);
    const [currentCursor, setCurrentCursor] = useState('cursor1');

    const toggleCursor = () => {
        if (currentCursor === 'cursor2') {
            setCurrentCursor('cursor1');
        } else {
            setCurrentCursor('cursor2');
        }
    };

    const showRandomFlower = () => {
        // Create 3 flowers with 0.5 second delays
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const newFlower = {
                    id: Date.now() + i, // Ensure unique IDs
                    x: Math.random() * (window.innerWidth - 200), // Random X position
                    y: Math.random() * (window.innerHeight - 200), // Random Y position
                };

                setRandomFlowers(prev => [...prev, newFlower]);

                // Remove the flower after 3 seconds
                setTimeout(() => {
                    setRandomFlowers(prev => prev.filter(flower => flower.id !== newFlower.id));
                }, 3000);
            }, i * 200); // 0.5 second delay between each flower
        }
    };

    const images = [
        <img src="home/kylie_two_finger_ascii.gif" alt="Kylie" className="hover:z-20 hover:scale-110 w-auto h-screen absolute left-0 bottom-0 z-0 cursor-pointer" onClick={toggleCursor} />,
        <img src="home/flower_bloom.gif" alt="Flower" className="hover:z-20 hover:scale-110 hover:invert w-auto h-1/3 absolute left-40 bottom-20 z-10 cursor-pointer" onClick={showRandomFlower} />,
        <img src="home/funny_postcard.png" alt="Postcard" className="hover:z-20 hover:cursor-pointer hover:scale-110 w-auto h-4/5 absolute -right-30 bottom-0 z-0" onClick={laugh} />,
        <img src="home/sixpack.jpg" alt="Sixpack" className="hover:z-20 hover:scale-110 w-auto h-4/7 transform rotate-5 absolute right-85 -bottom-5 z-0" />,
        <img src="home/flower_group.gif" alt="Flower" className="hover:z-20 hover:hue-rotate-180 hover:scale-110 w-auto h-1/2 absolute left-9/40 bottom-0 z-0" />,
        <img src="home/kylie_flower_sharpen.png" alt="Kylie" className="hover:z-20 hover:cursor-pointer hover:scale-120 w-auto h-7/8 absolute right-9/40 bottom-0 z-0" onClick={shootConfetti} />,
        <img src="home/oranges.png" alt="Oranges" className="w-3/7 h-auto absolute top-0 left-1/2 z-0 transform -translate-x-1/2 -rotate-180" />,
    ]

    useEffect(() => {
        setTimeout(() => {
            for (let i = 0; i < 4; i++) {
                confetti({
                    particleCount: 150,
                    startVelocity: 60,
                    spread: 360,
                    origin: {
                        x: Math.random(),
                        // since they fall down, start a bit higher than random
                        y: Math.random() - 0.2
                    }
                });
            }
        }, (images.length + 2) * .6 * 1000 + 1)
    }, [])

    return (
        <div className={`w-screen h-screen flex flex-col items-center bg-black text-white ${currentCursor}`}>

            {images.map((image, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 1,
                        delay: index * .6
                    }}>
                    {image}
                </motion.div>
            ))}
            {/* Random flowers that appear when clicking the main flower */}
            {randomFlowers.map(flower => (
                <img
                    key={flower.id}
                    src="home/flower_bloom.gif"
                    alt="Random Flower"
                    className="w-auto h-1/4 absolute z-20 animate-bounce hover:scale-110"
                    style={{
                        left: `${flower.x}px`,
                        top: `${flower.y}px`
                    }}
                />
            ))}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, z: 10, width: '100%' }}
                transition={{
                    duration: 1,
                    delay: images.length * .6 
                }}>
                <div className="z-10 flex flex-col items-center justify-center">
                    <p className={'toggled text-[160px] text-green-400 absolute -top-5'}>H.N.G.F.D.K.C!</p>
                    <p className={'text-justify w-[700px] text-gray-200 toggled text-3xl absolute top-40'}>Hey Kylie, these are the NOUNS that remind me of you:
                        California, (Sumo) Orange, Handstand, Transversus Abdominis, Watermelon, Zootopia, Scuffers, SPUMAAAAAA, Gum, Figma Ligma Sigma, Mini-Dab,
                        Type 1, twin, fat fingers, Soda Pop, Cookie Pie, "Pushed a PR!", Poopy Pants, Killing ducks, Startup CEO AI B2B SAAS interview OA, little chinese girl,
                        Lehigh, P-incident w/ CEO, Beli, Happy National Kylie Day!, Cherry Bombs, 至少還有你 + left hand mole, Skipping</p>
                </div>

                <div className='toggled absolute top-5 right-0 flex flex-col items-center justify-center'>
                    <p className="text-2xl">Password?</p>
                    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                        <input
                            className="w-[200px]"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password..."
                            autoFocus
                        />
                        <button
                            className="bg-green-700 hover:cursor-pointer"
                            type="submit"
                        >
                            Enter Game
                        </button>
                    </form>
                    {error && (
                        <p style={{ color: '#ff6b6b', marginTop: '20px' }}>{error}</p>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export default MainScreen;