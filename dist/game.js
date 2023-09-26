import { SkillSys, SkillType } from './skills.js';
const secondsEl = document.getElementById("seconds");
const skillsContainer = document.getElementById("skills-container");
let SkillSystem = new SkillSys(skillsContainer);
let increment = 0;
let secondsPassed = 0;
let oldTimestamp = 0;
let fps = 0;
function gameLoop(timestamp) {
    secondsPassed = (timestamp - oldTimestamp) / 1000;
    oldTimestamp = timestamp;
    fps = Math.round(1 / secondsPassed);
    SkillSystem.increment(secondsPassed);
    let skill = SkillSystem.getSkill(SkillType.LOGGING);
    secondsEl.textContent = skill.currentTime.toString().slice(0, 5);
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
