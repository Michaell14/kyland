import React, { useEffect, useState } from "react";
import kaplay from "kaplay";

let isFlower = false;
let count = 0;
// Game Component
function Game() {

    useEffect(() => {
        initializeGame();
    }, []);

    const createBackground = (k: any, GAME_WIDTH: number, GAME_HEIGHT: number) => {
        k.add([
            k.sprite("water"),
            k.pos(0, 0),
            k.scale(GAME_WIDTH / 32, GAME_HEIGHT / 64),
            k.z(-100),
        ]);
    };

    const createGrassArea = (k: any, startX: number, endX: number, startY: number, endY: number, tileSize: number) => {
        const tilesX = Math.ceil(endX / tileSize);
        const tilesY = Math.ceil(endY / tileSize);

        for (let x = 0; x < tilesX; x++) {
            for (let y = 0; y < tilesY; y++) {
                const tileX = x * tileSize;
                const tileY = y * tileSize;

                if (tileX >= startX && tileX < endX && tileY >= startY && tileY < endY) {
                    k.add([
                        k.sprite("grass"),
                        k.pos(tileX, tileY),
                    ]);
                }
            }
        }
    };

    const createAllGrassAreas = (k: any, GAME_WIDTH: number, GAME_HEIGHT: number) => {
        const tileSize = 64;
        const GRASS_AREA_WIDTH = 600;
        const GRASS_AREA_HEIGHT = 400;
        const GRASS_START_X = (GAME_WIDTH - GRASS_AREA_WIDTH) / 2;
        const GRASS_START_Y = (GAME_HEIGHT - GRASS_AREA_HEIGHT) / 2;
        const GRASS_END_X = GRASS_START_X + GRASS_AREA_WIDTH;
        const GRASS_END_Y = GRASS_START_Y + GRASS_AREA_HEIGHT;

        // Main grass area
        createGrassArea(k, GRASS_START_X, GRASS_END_X, GRASS_START_Y, GRASS_END_Y, tileSize);

        // Second grass grid
        const secondGridStartX = GRASS_START_X + GRASS_AREA_WIDTH * 0.25;
        const secondGridEndX = GRASS_START_X + GRASS_AREA_WIDTH * 0.75;
        const secondGridStartY = GRASS_START_Y - GRASS_AREA_HEIGHT * 1.5;
        const secondGridEndY = GRASS_START_Y;
        createGrassArea(k, secondGridStartX, secondGridEndX, secondGridStartY, secondGridEndY, tileSize);

        // Third grass grid
        const thirdGridStartX = GRASS_START_X;
        const thirdGridEndX = GRASS_END_X;
        const thirdGridStartY = secondGridStartY - GRASS_AREA_HEIGHT;
        const thirdGridEndY = secondGridStartY;
        createGrassArea(k, thirdGridStartX, thirdGridEndX, thirdGridStartY, thirdGridEndY, tileSize);

        // Fourth grass grid
        const fourthGridStartX = GRASS_START_X + GRASS_AREA_WIDTH;
        const fourthGridEndX = GRASS_START_X + GRASS_AREA_WIDTH * 2;
        const fourthGridStartY = GRASS_START_Y - GRASS_AREA_HEIGHT * 2.25;
        const fourthGridEndY = GRASS_START_Y - GRASS_AREA_HEIGHT * 1.75;
        createGrassArea(k, fourthGridStartX, fourthGridEndX, fourthGridStartY, fourthGridEndY, tileSize);

        // Fifth grass grid
        const fifthGridStartX = GRASS_START_X + GRASS_AREA_WIDTH * 2;
        const fifthGridEndX = GRASS_START_X + GRASS_AREA_WIDTH * 3;
        const fifthGridStartY = secondGridStartY - GRASS_AREA_HEIGHT;
        const fifthGridEndY = secondGridStartY;
        createGrassArea(k, fifthGridStartX, fifthGridEndX, fifthGridStartY, fifthGridEndY, tileSize);

        // Sixth grass grid
        const sixthGridStartX = GRASS_START_X + GRASS_AREA_WIDTH * 3;
        const sixthGridEndX = GRASS_START_X + GRASS_AREA_WIDTH * 4;
        const sixthGridStartY = GRASS_START_Y - GRASS_AREA_HEIGHT * 2.25;
        const sixthGridEndY = GRASS_START_Y - GRASS_AREA_HEIGHT * 1.75;
        createGrassArea(k, sixthGridStartX, sixthGridEndX, sixthGridStartY, sixthGridEndY, tileSize);

        // Seventh grass grid
        const seventhGridStartX = GRASS_START_X + GRASS_AREA_WIDTH * 4;
        const seventhGridEndX = GRASS_START_X + GRASS_AREA_WIDTH * 5;
        const seventhGridStartY = secondGridStartY - GRASS_AREA_HEIGHT;
        const seventhGridEndY = secondGridStartY;
        createGrassArea(k, seventhGridStartX, seventhGridEndX, seventhGridStartY, seventhGridEndY, tileSize);

        // Eighth grass grid
        const eighthGridStartX = GRASS_START_X + GRASS_AREA_WIDTH * 4;
        const eighthGridEndX = GRASS_START_X + GRASS_AREA_WIDTH * 5;
        const eighthGridStartY = (GAME_HEIGHT - GRASS_AREA_HEIGHT) / 2;
        const eighthGridEndY = GRASS_START_Y + GRASS_AREA_HEIGHT;
        createGrassArea(k, eighthGridStartX, eighthGridEndX, eighthGridStartY, eighthGridEndY, tileSize);

        // Ninth grass grid
        const ninthGridStartX = GRASS_START_X + GRASS_AREA_WIDTH * 4.25;
        const ninthGridEndX = GRASS_START_X + GRASS_AREA_WIDTH * 4.75;
        const ninthGridStartY = GRASS_START_Y - GRASS_AREA_HEIGHT * 1.5;
        const ninthGridEndY = GRASS_START_Y;
        createGrassArea(k, ninthGridStartX, ninthGridEndX, ninthGridStartY, ninthGridEndY, tileSize);
    };

    const createPlayer = (k: any, GAME_WIDTH: number, GAME_HEIGHT: number) => {
        return k.add([
            k.pos(GAME_WIDTH / 2, GAME_HEIGHT / 2),
            k.sprite("kylie"),
            k.area(),
            "player"
        ]);
    };

    const createNPCs = (k: any, GRASS_START_X: number, GRASS_START_Y: number, GRASS_AREA_WIDTH: number, GRASS_AREA_HEIGHT: number) => {
        return [
            k.add([
                k.sprite("michael"),
                k.pos(GRASS_START_X + GRASS_AREA_WIDTH * .5, GRASS_START_Y - 32),
                k.area(),
                { dialogue: "Hey Kylie, HAPPY NATIONAL GF DAY! To really test if you are deserving of me as your bf, I'm going to ask you a few questions. You must go through this test to prove your worthiness." }
            ]),
            k.add([
                k.sprite("michael"),
                k.pos(GRASS_START_X + GRASS_AREA_WIDTH * .5, GRASS_START_Y - GRASS_AREA_HEIGHT * 2),
                k.area(),
                { dialogue: "Hello girlfriend, Your first question is: What was the first restaurant I took you to?" }
            ]),
            k.add([
                k.sprite("michael"),
                k.pos(GRASS_START_X + GRASS_AREA_WIDTH * 2.5, GRASS_START_Y - GRASS_AREA_HEIGHT * 2),
                k.area(),
                { dialogue: "Oh Wow, how did you know that? I'm impressed. You're doing great so far. Your next question is: What were the gifts I got you at Suraya??" }
            ]),
            k.add([
                k.sprite("michael"),
                k.pos(GRASS_START_X + GRASS_AREA_WIDTH * 4.5, GRASS_START_Y - GRASS_AREA_HEIGHT * 2),
                k.area(),
                { dialogue: "AYYY, sick brain of yours so smart! Last question: What day is our anniversary?" }
            ]),
            k.add([
                k.sprite("michael"),
                k.pos(GRASS_START_X + GRASS_AREA_WIDTH * 4.5, GRASS_START_Y + GRASS_AREA_HEIGHT * 0.5),
                k.area(),
                { dialogue: "You're right! You're the best girlfriend I could ask for. I love you so much! Now run around and plant lots of flowers!" }
            ]),
        ];
    };

    const setupDialogueSystem = (k: any, player: any, sprites: any[], SCREEN_HEIGHT: number, lastMichael: any) => {
        let currentDialogue: string | null = null;
        let dialogueTimer = 0;
        let dialogueText: any = null;
        const fallingSprites: any[] = [];
        k.onUpdate(() => {
            sprites.forEach((sprite) => {
                if (player.isColliding(sprite)) {
                    if (!currentDialogue) {
                        currentDialogue = sprite.dialogue;
                        dialogueTimer = 180;
                    }
                    if (sprite === lastMichael) {
                        k.shake(.5);
                        if (!isFlower) {
                            isFlower = true;
                        }
                    }
                }
            });
            if (isFlower) {
                if (count === 12) {
                    const fallingSprite = k.add([
                        k.sprite("flower"),
                        k.pos(player.pos.x, player.pos.y),
                        k.area(),
                        k.body(),
                        k.z(1000),
                    ]);
                    fallingSprites.push(fallingSprite);
                } else if (count === 24) {
                    const fallingSprite = k.add([
                        k.sprite("heart"),
                        k.pos(player.pos.x, player.pos.y),
                        k.area(),
                        k.body(),
                        k.z(1000),
                    ]);
                    fallingSprites.push(fallingSprite);
                }
                count = (count + 1) % 25;
            }
            if (dialogueTimer > 0) {
                dialogueTimer--;
                if (dialogueTimer === 0) {
                    currentDialogue = null;
                }
            }

            if (currentDialogue && !dialogueText) {
                dialogueText = k.add([
                    k.text(currentDialogue, {
                        size: 32,
                        font: "sans-serif",
                        align: "left",
                        width: window.innerWidth * 0.9,
                    }),
                    k.pos(50, SCREEN_HEIGHT - 100),
                    k.color(255, 255, 255),
                    k.fixed(),
                    k.z(1000),
                ]);
            } else if (!currentDialogue && dialogueText) {
                dialogueText.destroy();
                dialogueText = null;
            }

            fallingSprites.forEach((sprite) => {
                if (sprite.pos.y > 3100) {
                    sprite.destroy();
                }
            });

        });
    };

    const setupPlayerMovement = (k: any, player: any) => {
        const SPEED = 400;

        k.onKeyDown("w", () => {
            player.move(0, -SPEED);
        });
        k.onKeyDown("s", () => {
            player.move(0, SPEED);
        });
        k.onKeyDown("a", () => {
            player.move(-SPEED, 0);
        });
        k.onKeyDown("d", () => {
            player.move(SPEED, 0);
        });
    };

    const setupCamera = (k: any, player: any) => {
        let targetCamX = player.pos.x + player.width / 2;
        let targetCamY = player.pos.y + player.height / 2;

        player.onUpdate(() => {
            targetCamX = player.pos.x + player.width / 2;
            targetCamY = player.pos.y + player.height / 2;

            const cameraSpeed = 0.1;
            const currentCamX = k.camPos().x;
            const currentCamY = k.camPos().y;

            const newCamX = currentCamX + (targetCamX - currentCamX) * cameraSpeed;
            const newCamY = currentCamY + (targetCamY - currentCamY) * cameraSpeed;

            k.camPos(newCamX, newCamY);
        });
    };

    const setupGameEvents = (k: any) => {
        k.onClick(() => k.addKaboom(k.mousePos()));
    };

    const initializeGame = () => {
        const k = kaplay();

        k.loadRoot("./");
        k.loadSprite("kylie", "sprites/kylie_sprite2.png",
            {
                sliceX: 2, // how many sprites are in the X axis
                sliceY: 1, // how many sprites are in the Y axis
                anims: {
                    idle: { from: 0, to: 0, loop: false },
                    walking: { from: 0, to: 1, loop: true },
                },
            });
        k.loadSprite("michael", "sprites/michael_sprite.png", {
            sliceX: 2,
            sliceY: 1,
            anims: {
                idle: { from: 0, to: 0, loop: false },
                walking: { from: 0, to: 1, loop: true },
            },
        });
        k.setGravity(100);
        k.loadSprite("grass", "sprites/grass.png");
        k.loadSprite("water", "sprites/water.png");
        k.loadSprite("heart", "sprites/heart.png");
        k.loadSprite("flower", "sprites/flower.png");
        k.loadSprite("heart", "sprites/heart.png");

        const SCREEN_WIDTH = window.innerWidth;
        const SCREEN_HEIGHT = window.innerHeight;
        const GAME_WIDTH = SCREEN_WIDTH * 5;
        const GAME_HEIGHT = SCREEN_HEIGHT * 5;

        const GRASS_AREA_WIDTH = 600;
        const GRASS_AREA_HEIGHT = 400;
        const GRASS_START_X = (GAME_WIDTH - GRASS_AREA_WIDTH) / 2;
        const GRASS_START_Y = (GAME_HEIGHT - GRASS_AREA_HEIGHT) / 2;

        createBackground(k, GAME_WIDTH, GAME_HEIGHT);
        createAllGrassAreas(k, GAME_WIDTH, GAME_HEIGHT);
        const player = createPlayer(k, GAME_WIDTH, GAME_HEIGHT);
        player.play("walking");
        const sprites = createNPCs(k, GRASS_START_X, GRASS_START_Y, GRASS_AREA_WIDTH, GRASS_AREA_HEIGHT);
        sprites.forEach((sprite) => {
            sprite.play("walking");
        });
        const lastMichael = sprites[sprites.length - 1];
        setupDialogueSystem(k, player, sprites, SCREEN_HEIGHT, lastMichael);
        setupPlayerMovement(k, player);
        setupCamera(k, player);
        setupGameEvents(k);
    };

    return React.createElement('div', { id: 'game-container', className: 'w-screen h-screen' });
}

export default Game;