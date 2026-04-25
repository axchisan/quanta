import Phaser from 'phaser';
import type { FreeFallChallenge, FreeFallPayload, FreeFallSolution } from '../types';

export interface FreeFallSceneConfig {
  challenge: FreeFallChallenge;
  onComplete: (result: { score: number; isCorrect: boolean; timeTakenMs: number }) => void;
}

export class FreeFallScene extends Phaser.Scene {
  private config!: FreeFallSceneConfig;
  private startTime = 0;
  private dropped = false;
  private object!: Phaser.GameObjects.Arc;
  private ground!: Phaser.GameObjects.Rectangle;
  private heightLine!: Phaser.GameObjects.Line;
  private heightText!: Phaser.GameObjects.Text;
  private slider!: Phaser.GameObjects.Rectangle;
  private sliderHandle!: Phaser.GameObjects.Rectangle;
  private predictedTimeText!: Phaser.GameObjects.Text;
  private resultText!: Phaser.GameObjects.Text;
  private gravity = 10;
  private predictedTime = 3;
  private userPrediction = 3;

  constructor() {
    super({ key: 'FreeFallScene' });
  }

  init(data: FreeFallSceneConfig) {
    this.config = data;
  }

  create() {
    const { width, height } = this.scale;
    const payload = this.config.challenge.payload as FreeFallPayload;
    
    this.gravity = payload.gravity ?? 10;
    this.predictedTime = Math.sqrt((2 * 45) / this.gravity);
    this.userPrediction = this.predictedTime;
    
    this.cameras.main.setBackgroundColor(0x1a1a2e);
    
    this.drawScene(width, height);
    this.createUI(width, height, payload);
    
    this.startTime = Date.now();
  }

  private drawScene(width: number, height: number) {
    const centerX = width / 2;
    const groundY = height - 80;
    const buildingHeight = 300;
    const buildingY = groundY - buildingHeight;
    
    const building = this.add.rectangle(
      centerX, 
      buildingY + buildingHeight / 2, 
      60, 
      buildingHeight, 
      0x4a4a6a
    );
    building.setStrokeStyle(2, 0x6a6a8a);

    const windowsCount = Math.floor(buildingHeight / 40);
    for (let i = 0; i < windowsCount; i++) {
      const windowY = buildingY + 20 + i * 40;
      this.add.rectangle(centerX, windowY, 20, 25, 0x2a2a4a)
        .setStrokeStyle(1, 0x3a3a5a);
    }

    this.ground = this.add.rectangle(centerX, groundY, width, 20, 0x2d5a27);
    
    this.heightLine = this.add.line(0, 0, centerX, buildingY, centerX, groundY, 0x666666);
    this.heightLine.setLineWidth(1, 2);

    this.heightText = this.add.text(centerX + 20, buildingY + buildingHeight / 2 - 20, '45m', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Space Grotesk',
    });

    this.object = this.add.circle(centerX, buildingY - 10, 15, 0xff6b6b);
    this.object.setStrokeStyle(2, 0xff8888);
  }

  private createUI(width: number, height: number, payload: FreeFallPayload) {
    const panelX = width / 2;
    const panelY = height - 200;
    
    const panel = this.add.rectangle(panelX, panelY, 500, 180, 0x1e1e32, 0.95);
    panel.setStrokeStyle(2, 0x4a4a6a);
    panel.setInteractive(new Phaser.Geom.Rectangle(panelX - 250, panelY - 90, 500, 180));

    const title = this.add.text(panelX, panelY - 70, 'Predice el tiempo de caída:', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Space Grotesk',
    }).setOrigin(0.5);

    this.predictedTimeText = this.add.text(panelX, panelY - 20, `${this.userPrediction.toFixed(1)} s`, {
      fontSize: '36px',
      color: '#60a5fa',
      fontFamily: 'Space Grotesk',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    const sliderY = panelY + 30;
    const sliderWidth = 300;
    
    this.add.rectangle(panelX, sliderY, sliderWidth, 8, 0x3a3a5a, 1).setOrigin(0.5, 0.5);
    
    const minTime = 1;
    const maxTime = 8;
    const initialX = panelX - sliderWidth / 2 + (sliderWidth * ((this.userPrediction - minTime) / (maxTime - minTime)));
    
    this.sliderHandle = this.add.rectangle(initialX, sliderY, 20, 30, 0x60a5fa);
    this.sliderHandle.setStrokeStyle(2, 0x93c5fd);
    this.sliderHandle.setInteractive({ draggable: true });

    this.sliderHandle.on('drag', (_: any, dragX: number) => {
      const clampedX = Phaser.Math.Clamp(dragX, panelX - sliderWidth / 2, panelX + sliderWidth / 2);
      this.sliderHandle.x = clampedX;
      
      const ratio = (clampedX - (panelX - sliderWidth / 2)) / sliderWidth;
      this.userPrediction = minTime + ratio * (maxTime - minTime);
      this.predictedTimeText.setText(`${this.userPrediction.toFixed(1)} s`);
    });

    this.add.text(panelX - sliderWidth / 2 - 10, sliderY, `${minTime}s`, {
      fontSize: '14px',
      color: '#888888',
    }).setOrigin(1, 0.5);

    this.add.text(panelX + sliderWidth / 2 + 10, sliderY, `${maxTime}s`, {
      fontSize: '14px',
      color: '#888888',
    }).setOrigin(0, 0.5);

    const dropButton = this.add.rectangle(panelX, panelY + 85, 180, 50, 0x22c55e);
    dropButton.setInteractive({ useHandCursor: true });
    
    const dropText = this.add.text(panelX, panelY + 85, '¡Soltar!', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Space Grotesk',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    dropButton.on('pointerover', () => dropButton.setFillStyle(0x16a34a));
    dropButton.on('pointerout', () => dropButton.setFillStyle(0x22c55e));
    
    dropButton.on('pointerdown', () => {
      if (!this.dropped) {
        this.drop();
        dropButton.setVisible(false);
        dropText.setVisible(false);
      }
    });

    this.resultText = this.add.text(panelX, height / 2, '', {
      fontSize: '28px',
      color: '#ffffff',
      fontFamily: 'Space Grotesk',
      fontStyle: 'bold',
    }).setOrigin(0.5).setVisible(false);
  }

  private drop() {
    this.dropped = true;
    const solution = this.config.challenge.solution as FreeFallSolution;
    const actualTime = solution.answer;
    const tolerance = solution.tolerance ?? 0.5;
    
    const isCorrect = Math.abs(this.userPrediction - actualTime) <= tolerance;
    const timeTakenMs = Date.now() - this.startTime;

    const targetY = this.ground.y - 10;
    
    this.tweens.add({
      targets: this.object,
      y: targetY,
      duration: actualTime * 1000,
      ease: 'Linear',
      onComplete: () => {
        this.showResult(isCorrect, actualTime, solution);
        this.config.onComplete({
          score: this.calculateScore(isCorrect, timeTakenMs),
          isCorrect,
          timeTakenMs,
        });
      },
    });
  }

  private showResult(isCorrect: boolean, actualTime: number, solution: FreeFallSolution) {
    const { width, height } = this.scale;
    
    const bgColor = isCorrect ? 0x22c55e : 0xef4444;
    const resultIcon = isCorrect ? '✓' : '✗';
    const resultMessage = isCorrect 
      ? '¡Correcto!' 
      : `Incorrecto. Tiempo real: ${actualTime.toFixed(1)}s`;

    this.cameras.main.flash(200, isCorrect ? 34 : 239, isCorrect ? 68 : 68, isCorrect ? 46 : 68);

    const resultBg = this.add.rectangle(width / 2, height / 2, 400, 200, bgColor, 0.95);
    resultBg.setStrokeStyle(3, isCorrect ? 0x4ade80 : 0xf87171);
    resultBg.setInteractive();

    this.resultText
      .setText(`${resultIcon}\n${resultMessage}`)
      .setVisible(true);
  }

  private calculateScore(isCorrect: boolean, timeTakenMs: number): number {
    if (!isCorrect) return 0;
    
    const baseScore = 1000;
    const timeBonus = Math.max(0, 500 - timeTakenMs / 10);
    const difficultyMultiplier = this.config.challenge.difficulty === 'hard' ? 2 : 
                                  this.config.challenge.difficulty === 'medium' ? 1.5 : 1;
    
    return Math.round((baseScore + timeBonus) * difficultyMultiplier);
  }
}