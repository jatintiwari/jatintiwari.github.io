import { h, app } from "hyperapp";

import Skills from './js/skills';
import Intro from './js/intro';
import Footer from './js/footer';

import styles from './css/index.css';

const modules = {
  Skills: Skills(),
  Intro: Intro(),
  Footer: Footer()
};

const Root = {
  state: {
    skills: modules.Skills.state,
    intro: modules.Intro.state,
    footer: modules.Footer.state
  },
  actions: {
    skills: modules.Skills.actions,
    intro: modules.Intro.actions,
    footer: modules.Footer.actions
  },
  view: (state, actions) => {
    const { intro, skills, footer } = {
      skills: modules.Skills.view(state.skills, actions.skills),
      intro: modules.Intro.view(state.intro, actions.intro),
      footer: modules.Footer.view(state.footer, actions.footer)
    }
    return (
      <main>
        {intro}
        {skills}
        {footer}
      </main>
    )
  }
};

const appElement = document.getElementById('app');
const main = app(Root.state, Root.actions, Root.view, appElement);