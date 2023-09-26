import { SkillSys, SkillType } from './skills.js'

const secondsEl = document.getElementById("seconds");
const skillsContainer = document.getElementById("skills-container") as HTMLDivElement;

let SkillSystem = new SkillSys(skillsContainer);

let increment: number = 0;
let secondsPassed: number = 0;
let oldTimestamp: number = 0;
let fps: number = 0;

function gameLoop(timestamp: number) {
    secondsPassed = (timestamp - oldTimestamp) / 1000;
    oldTimestamp = timestamp;

    fps = Math.round(1 / secondsPassed);

    SkillSystem.increment(secondsPassed);
    let skill = SkillSystem.getSkill(SkillType.LOGGING);

    secondsEl!.textContent = skill.currentTime.toString().slice(0,5);
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
