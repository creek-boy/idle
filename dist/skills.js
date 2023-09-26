const defaultHTML = {
    progBar: document.createElement("div"),
    incrementCounter: 0,
    width: 0
};
export const SkillType = {
    LOGGING: 0,
    MINING: 1,
};
export const SkillName = {
    LOGGING: "LOGGING",
    MINING: "MINING"
};
export class SkillSys {
    increment(timePassed) {
        for (var skill of this.skills.filter((s) => s.inProgress)) {
            skill.progBar.style.animationPlayState = 'running';
            skill.currentTime += timePassed;
            if (skill.currentTime >= skill.completionTime) {
                skill.currentTime = 0;
            }
        }
    }
    getSkill(type) {
        return this.skills[type];
    }
    constructor(skillContainer) {
        this.skills = new Array();
        this.skillContainer = skillContainer;
        this.skills[SkillType.LOGGING] = Object.assign({ name: SkillName.LOGGING, type: SkillType.LOGGING, completionTime: 1.25, currentTime: 0, inProgress: false }, defaultHTML);
        this.buildSkills();
    }
    buildSkills() {
        for (var skill of this.skills) {
            let skillBtn = document.createElement("div");
            skillBtn.className = "skill-btn";
            skill.progBar.className = "progress";
            skill.progBar.id = skill.name + "-BTN";
            skill.progBar.textContent = skill.name;
            skill.progBar.style.animationPlayState = "paused";
            //skill.progBar.style.animation = animation(skill.completionTime);
            skillBtn.appendChild(skill.progBar);
            this.skillContainer.appendChild(skillBtn);
        }
    }
}
function animation(completionTime) {
    return `progressAnimation ${completionTime}s infinite linear`;
}
