import { h, app } from "hyperapp";

export default _ => ({
  state: {
    skills: {
      "HTML": [],
      "Javascript": ["ES6", "ES5"],
      "JS Frameworks": ["AngularJS", "Angular", "React"],
      "Task Runners": ["Gulp", "Webpack", "Grunt"],
      "Ruby": ["Ruby on Rails", "Rack"],
      "Node JS": ["Express JS", "Hapi JS"],
      "Database/Data-Store": ["Postgresql", "Redis"],
      "CSS": ["CSS3", "SASS", "Material Design"]
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

    return (
      <div>
        <div style="padding: 10px 0px; text-align: center;  font-size: 24px;">Skills</div>
        <div class="section" style="justify-content: space-around;">
          <div class="sub-section">
            <ul class="skills">
              {
                skillKeys.map(key => {
                  let subSkills = skills[key];
                  return (
                    <li class="skill">
                      <span class="red">&#8226; {key}&nbsp;</span>
                      {subSkills && subSkills.length ? <span>{subSkills.join(", ")}&nbsp;</span> : null}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        <div>
          <div style="padding: 10px 0px; font-size: 24px; text-align: center;">Expertise</div>
          <div class="skills">
            {expertise.map(exp => <span class="skill">
              <span class="red">&#8226;&nbsp;</span><span>{exp}&nbsp;</span>
            </span>)}
          </div>
        </div>
      </div>
    )
  }
})