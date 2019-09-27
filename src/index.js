import { h, app } from "hyperapp";

import Skills from './js/skills';
import Intro from './js/intro';
import Contact from './js/contact';
import './js/particles';

import styles from './css/index.css';

const modules = {
  Skills: Skills(),
  Intro: Intro(),
  Contact: Contact()
};

const Root = {
  state: {
    skills: modules.Skills.state,
    intro: modules.Intro.state,
    contact: modules.Contact.state
  },
  actions: {
    skills: modules.Skills.actions,
    intro: modules.Intro.actions,
    contact: modules.Contact.actions
  },
  view: (state, actions) => {
    const { intro, skills, contact } = {
      skills: modules.Skills.view(state.skills, actions.skills),
      intro: modules.Intro.view(state.intro, actions.intro),
      contact: modules.Contact.view(state.contact, actions.contact)
    }
    return (
      <main>
        {intro}
        {skills}
        {contact}
      </main>
    )
  }
};

const appElement = document.getElementById('app');
const main = app(Root.state, Root.actions, Root.view, appElement);