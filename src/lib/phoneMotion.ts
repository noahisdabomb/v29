import { CYCLE_MOTION, PHONE_ROTATION } from '@/lib/constants';
import { clamp, ease, lerp } from '@/lib/easing';

export type PhoneMotionPhase = 'entry' | 'rest' | 'exit';

export interface PhoneMotionTransform {
  phase: PhoneMotionPhase;
  phaseT: number;
  rotY: number;
  rotX: number;
  scale: number;
  posX: number;
  posY: number;
  posZ: number;
}

export function getPhoneMotionTransform(
  progress: number,
  reducedMotion = false,
): PhoneMotionTransform {
  const { entry, hold, holdDrift, exit } = PHONE_ROTATION;
  const { entryEnd, exitStart, holdEnd } = CYCLE_MOTION.phone;

  if (reducedMotion) {
    return { ...hold, phase: 'rest', phaseT: 1 };
  }

  if (progress <= entryEnd) {
    const t = ease(clamp(progress / entryEnd, 0, 1));
    return {
      phase: 'entry',
      phaseT: t,
      rotY: lerp(entry.rotY, hold.rotY, t),
      rotX: lerp(entry.rotX, hold.rotX, t),
      scale: lerp(entry.scale, hold.scale, t),
      posX: lerp(entry.posX, hold.posX, t),
      posY: lerp(entry.posY, hold.posY, t),
      posZ: lerp(entry.posZ, hold.posZ, t),
    };
  }

  if (progress <= exitStart) {
    const holdWindow = Math.max(holdEnd - entryEnd, 0.0001);
    const holdT = clamp((Math.min(progress, holdEnd) - entryEnd) / holdWindow, 0, 1);
    const driftTheta = holdT * holdDrift.cycles * Math.PI * 2;
    const yawDrift = Math.sin(driftTheta) * holdDrift.rotYAmplitude;
    const pitchDrift = Math.sin(driftTheta * 0.85 + Math.PI / 5) * holdDrift.rotXAmplitude;

    return {
      phase: 'rest',
      phaseT: holdT,
      rotY: hold.rotY + yawDrift,
      rotX: hold.rotX + pitchDrift,
      scale: hold.scale,
      posX: hold.posX,
      posY: hold.posY + Math.sin(driftTheta * 0.9) * holdDrift.posYAmplitude,
      posZ: hold.posZ + Math.cos(driftTheta) * holdDrift.posZAmplitude,
    };
  }

  const t = ease(clamp((progress - exitStart) / (1 - exitStart), 0, 1));
  return {
    phase: 'exit',
    phaseT: t,
    rotY: lerp(hold.rotY, exit.rotY, t),
    rotX: lerp(hold.rotX, exit.rotX, t),
    scale: lerp(hold.scale, exit.scale, t),
    posX: lerp(hold.posX, exit.posX, t),
    posY: lerp(hold.posY, exit.posY, t),
    posZ: lerp(hold.posZ, exit.posZ, t),
  };
}
