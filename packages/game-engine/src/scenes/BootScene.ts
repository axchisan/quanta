import Phaser from 'phaser';
import { eventEmitter } from './events.js';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {}

  create() {
    const text = this.add.text(400, 300, 'Quanta Game Engine', {
      fontSize: '32px',
      color: '#ffffff',
    });
    text.setOrigin(0.5);
    eventEmitter.emit('engine:ready');
  }
}

export { eventEmitter };