
export type Skill = {
    name: string;
    type: number;
    completionTime: number;
    currentTime: number;
    inProgress: boolean;
    
    //HTML STUFF
    progBar: HTMLDivElement;
};

const defaultHTML = {
    progBar: document.createElement("div"),
    incrementCounter: 0,
    width: 0
}

export const SkillType = {
    LOGGING: 0,
    MINING: 1,
} as const;

export const SkillName = {
    LOGGING: "LOGGING",
    MINING: "MINING"
} as const;

export class SkillSys {
    private skills: Skill[] = new Array<Skill>();
    private skillContainer: HTMLDivElement;

    public increment(timePassed: number) {
        for(var skill of this.skills.filter((s) => s.inProgress)) {
            skill.progBar.style.animationPlayState = 'running';
            skill.currentTime += timePassed;
            if (skill.currentTime >= skill.completionTime) {
                skill.currentTime = 0;
            }
        }
    }

    public getSkill(type: number): Skill {
        return this.skills[type];
    }
    
    constructor(skillContainer: HTMLDivElement) {
        this.skillContainer = skillContainer;
        this.skills[SkillType.LOGGING] = {
            name: SkillName.LOGGING,
            type: SkillType.LOGGING,
            completionTime: 1.25,
            currentTime: 0,
            inProgress: false,
            ...defaultHTML
        };
        this.buildSkills();
    }

    private buildSkills(): void {
        for(var skill of this.skills) {
            let skillBtn = document.createElement("div");
            skillBtn.className = "skill-btn";

            skill.progBar.className = "progress";
            skill.progBar.id = skill.name + "-BTN";
            skill.progBar.textContent = skill.name;
            
            
            //look into this some more + using queryselector for mass updates might make this
            //more systemlike
            //skill.progBar.style.animationPlayState = "paused";
            
            skill.progBar.style.animation = animation(skill.completionTime);

            skillBtn.appendChild(skill.progBar);
            this.skillContainer.appendChild(skillBtn);
        }
    }
}

function animation(completionTime: number): string {
    return `progressAnimation ${completionTime}s infinite linear`;
}