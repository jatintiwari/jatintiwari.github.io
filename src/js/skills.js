import { h, app } from "hyperapp";

export default _ => ({
    state: {
        skills: {
            HTML: ["HTML5"],
            Javascript: ["ES6", "ES5"],
            "JS Frameworks": ["AngularJS", "Angular", "React"],
            "Task Runners": ["Gulp", "Webpack", "Grunt"],
            Ruby: ["Ruby on Rails", "Rack"],
            "Node JS": ["Express JS", "Hapi JS"],
            "Database/Data-Store": ["Postgresql", "Redis"],
            CSS: ["CSS3", "SASS", "Material Design"]
        },
        expertise: [
            "Building enterpise web application",
            "E-Commerce web applications",
            "Providing native app experience in mobile web app.",
            "Modular Application Architecture."
        ]
    },
    actions: {},
    view: (state, actions) => {
        const skills = state.skills || {};
        const skillKeys = Object.keys(state.skills);
        const expertise = state.expertise || [];
        const skillsLength = skillKeys.length - 1;
        return (
            <div class="section skills-container">
                <div className="json-container">
                    <div>{"{"}</div>
                    <div class="sub-section">
                        <div>
                            <span class="red">skills:</span> {"{"}
                        </div>
                        <div class="skills">
                            {skillKeys.map((key, i) => {
                                let subSkills = skills[key];
                                return (
                                    <div class="skill">
                                        <span class="red">
                                            "<span class="orange">{key}</span>":&nbsp;
                                        </span>
                                        [
                                        {subSkills && subSkills.length ? (
                                            <span>
                                                {subSkills.map((skill, i) => {
                                                    return (
                                                        <span>
                                                            {i > 0 ? ", " : null}
                                                            <span class="red">
                                                                "<span class="white">{skill}</span>"
                                                            </span>
                                                        </span>
                                                    );
                                                })}
                                            </span>
                                        ) : null}
                                        ] {skillsLength !== i ? "," : null}
                                    </div>
                                );
                            })}
                        </div>
                        <div>{"}"},</div>
                        <div>
                            <span class="red">expertise: </span>[
                        </div>
                        <div class="skills">
                            {expertise.map(exp => (
                                <div class="skill">
                                    <span class="red">
                                        "<span class="white">{exp}</span>"
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div>]</div>
                    </div>
                    <div>{"}"}</div>
                </div>
            </div>
        );
    }
});
