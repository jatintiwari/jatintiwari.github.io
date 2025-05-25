import { html, LitElement } from 'lit';

class ResumeApp extends LitElement {
    static properties = {
        data: { type: Object },
        columns: { type: Object },
        singleColumn: { type: Boolean },
        singlePage: { type: Boolean },
        yearsExperience: { type: Number },
    };

    constructor() {
        super();
        console.log('constructor called');
        this.data = {};
        this.columns = {
            startPageOne: 0,
            endPageOne: 1,
            startPageTwo: 2,
        };
        this.singleColumn = false;
        this.singlePage = true;
        this.yearsExperience = this.calculateYearsExperience();
    }

    calculateYearsExperience() {
        const currentDate = new Date();
        const dateStartedWorking = new Date('July 21, 2014');
        return (
            currentDate.getFullYear() -
            dateStartedWorking.getFullYear() -
            (currentDate.getMonth() >= dateStartedWorking.getMonth() ? 0 : 1)
        );
    }
    handleSingleColumn() {
        this.singleColumn = !this.singleColumn;
    }
    handleSinglePage() {
        this.singlePage = !this.singlePage;
        console.log(this.singlePage);
    }

    // Override to use external CSS instead of shadow DOM
    createRenderRoot() {
        return this;
    }

    render() {
        return this.data.personalInfo
            ? html`
                  <div class="know-more-app">
                      <div class="hide-print" id="updated">Last updated in ${this.data.personalInfo.lastUpdated}</div>
                      <button class="hide-print" id="print" @click=${() => window.print()}>Print</button>
                      <button class="hide-print" @click=${this.handleSingleColumn}>
                          ${this.singleColumn ? 'Double' : 'Single'} Column
                      </button>
                      <button class="hide-print" @click=${this.handleSinglePage}>
                          ${this.singlePage ? 'Multi' : 'Single'} Page
                      </button>

                      <div class="heading-container">
                          <div class="heading">${this.data.personalInfo.name}</div>
                          <div class="subheading-container">
                              <div class="subheading">
                                  <a href="mailto:${this.data.personalInfo.email}">${this.data.personalInfo.email}</a>
                              </div>
                              <div class="subheading">
                                  <a href="tel:${this.data.personalInfo.phone}">${this.data.personalInfo.phone}</a>
                              </div>
                              <div class="subheading">
                                  <a href="https://${this.data.personalInfo.website}" target="_blank"
                                      >${this.data.personalInfo.website}</a
                                  >
                              </div>
                          </div>
                      </div>

                      <div class="content-container page-one">
                          <div class="content-left">
                              <div class="section">
                                  <p class="type medium">
                                      EXPERIENCE -
                                      <span id="years">${this.yearsExperience}</span>+ Years
                                  </p>
                                  ${this.data.experience
                                      .slice(this.columns.startPageOne, this.columns.endPageOne + 1)
                                      .map((job) => this.renderJobMainColumn(job))}
                              </div>
                          </div>

                          <div class="content-right">
                              <div class="section skills">
                                  <p class="type medium">SKILLS</p>
                                  ${this.data.skills.map(
                                      (skill) => html`
                                          <div class="skill">
                                              <span class="medium">${skill.category}</span> - ${skill.items}
                                          </div>
                                      `
                                  )}
                              </div>

                              <div class="section">
                                  <p class="type medium">EDUCATION</p>
                                  ${this.data.education.degree}, ${this.data.education.university},
                                  ${this.data.education.period}
                              </div>

                              <div class="section">
                                  <p class="type medium">PREVIOUS EXPERIENCE</p>
                                  ${this.singlePage
                                      ? html`<ul>
                                            ${this.data.experience.slice(1).map(
                                                (job) =>
                                                    job.company &&
                                                    html`<li>
                                                        <span class="medium">${job.company}</span>,
                                                        <span>${job.position}</span>.
                                                        <br />
                                                        <span>${job.period}</span>
                                                    </li>`
                                            )}
                                        </ul>`
                                      : html`<ul>
                                            ${this.data.previousExperience.map(
                                                (job) => html`
                                                    <li>
                                                        <a href="${job.url}" target="_blank" rel="noopener noreferrer"
                                                            >${job.company}</a
                                                        >, ${job.position}.
                                                        <span class="small">${job.period}</span>
                                                    </li>
                                                `
                                            )}
                                        </ul>`}
                              </div>
                          </div>
                      </div>

                      ${this.singlePage
                          ? html``
                          : html`<div
                                class="content-container pagebreak page-two ${this.singleColumn ? 'single-column' : ''}"
                            >
                                <div class="section">
                                    ${this.renderJob(this.data.experience[this.columns.startPageTwo])}${this.renderJob(
                                        this.data.experience[this.columns.startPageTwo + 1]
                                    )}
                                </div>

                                <div class="section">
                                    ${this.data.experience
                                        .slice(this.columns.startPageTwo + 2)
                                        .map((job) => this.renderJob(job))}
                                </div>
                            </div>`}
                  </div>
              `
            : html``;
    }

    renderJobMainColumn(job) {
        return html`
            ${job.company && html`<div class="section-heading">${job.company}, ${job.position}</div>`}
            ${job.period && html`<div class="section-subheading">${job.period}</div>`}
            <ul>
                ${job.projects
                    ? job.projects.map(
                          (project) => html`
                              <li>
                                  <section class="medium heading">${project.name}</section>
                                  <ul>
                                      ${project.responsibilities.map((resp) => html`<li>${resp}</li>`)}
                                  </ul>
                              </li>
                          `
                      )
                    : job.responsibilities.map((resp) => html`<li>${resp}</li>`)}
            </ul>
        `;
    }

    renderJob(job) {
        return html`
            ${job.company && html`<div class="section-heading">${job.company}, ${job.position}</div>`}
            ${job.period && html`<div class="section-subheading">${job.period}</div>`}
            <ul>
                ${job.projects
                    ? job.projects.map(
                          (project) => html`
                              <li>
                                  ${project.name && html`<section class="heading">${project.name}</section>`}
                                  <ul>
                                      ${project.responsibilities &&
                                      project.responsibilities.map((resp) => html`<li>${resp}</li>`)}
                                  </ul>
                              </li>
                          `
                      )
                    : job.responsibilities && job.responsibilities.map((resp) => html`<li>${resp}</li>`)}
            </ul>
        `;
    }
}
customElements.define('resume-app', ResumeApp);
document.addEventListener('DOMContentLoaded', function () {
    // Set resume data from an external source
    const resumeApp = document.querySelector('resume-app');
    if (resumeApp) {
        // You'll need to paste your resumeData object here
        resumeApp.data = {
            personalInfo: {
                name: 'JATIN TIWARI',
                email: 'mail@jatintiwari.com',
                phone: '+91-7675807450',
                website: 'www.jatintiwari.com',
                lastUpdated: 'Sept 2024',
            },
            education: {
                degree: 'B.E. - ECE',
                university: 'Chitkara university, Himachal Pradesh',
                period: '2009 - 2013',
            },
            skills: [
                { category: 'Languages', items: 'Javascript, TypeScipt' },
                { category: 'JS', items: 'ES6, React Native, ReactJS, AngularJS, RelayJS' },
                { category: 'Web services', items: 'REST, GraphQl, Websockets, Service Worker' },
                {
                    category: 'Frontend Technologies',
                    items: 'HTML 5, CSS 3, SASS, Bootstrap, Material Design',
                },
                { category: 'Build Tools', items: 'Webpack, Rollup' },
                { category: 'Framework', items: 'Express JS, NextJS' },
                { category: 'Automation', items: 'Appium, Puppeteer' },
            ],
            experience: [
                {
                    company: 'Google',
                    position: 'Senior Software Engineer',
                    period: 'March, 2025 - Present',
                    projects: [
                        {
                            name: 'AI Platforms',
                            responsibilities: ['Building responsible AI'],
                        },
                    ],
                },
                {
                    company: 'ServiceNow',
                    position: 'Sr. Staff Software Engineer',
                    period: 'August, 2024 - March, 2025',
                    projects: [
                        {
                            name: 'Application platform',
                            responsibilities: ['Revamped ServiceNow e-commerce store - https://store.servicenow.com.', 
                                               'Drove substantial improvements in system efficiency by optimizing slow queries, which reduced average response time by approximately 60%.'],
                        },
                    ],
                },
                {
                    company: 'Amazon',
                    position: 'Frontend Engineer 2',
                    period: 'July, 2022 - August, 2024',
                    projects: [
                        {
                            name: 'Fire TV Devices (Stealth mode)',
                            responsibilities: [
                                'As the sole Frontend engineer, providing technical leadership and mentorship to cross-functional team members seeking JavaScript expertise.',
                                "Spearheaded the development of a React Native TV application from scratch, utilizing Amazon's proprietary React Native fork (Vega Script), demonstrating adaptability to custom frameworks.",
                                'Architected a high-impact Network application, which became the most utilized module during device onboarding and within Settings. Led the Onboarding application development, ensuring efficient code reuse across multiple modules (Language/TZ Selector, Network, Accessibility) in both Onboarding and Settings apps.',
                                'Introduced and championed the MVVM (Model-View-ViewModel) design pattern, improving code maintainability and scalability. Authored comprehensive documentation to facilitate knowledge transfer across globally distributed team members.',
                                'Developed turbomodules to leverage native device capabilities and optimize performance by offloading resource-intensive tasks from the JavaScript thread.',
                                'Implemented proxy patterns for common libraries, enabling seamless compatibility between Kepler Script and Vanilla React Native, enhancing code flexibility and reusability.',
                                'Demonstrated strong skills in performance optimization for resource-limited environments on memory-constrained TV devices (1GB RAM).',
                            ],
                        },
                    ],
                },
                {
                    company: 'Atlassian',
                    position: 'Software Engineer 2',
                    period: 'December, 2021 - July, 2022',
                    responsibilities: [
                        'Mentored a summer intern for 6 months, guiding the implementation of visual diffing for E2E test cases, evolving from a Hackday project.',
                        'Atlassian initiative from scratch: an interface connecting help providers and seekers. Owned GraphQL implementation using Relay.',
                    ],
                },
                {
                    company: 'Flipkart',
                    position: 'Front End Engineer 2',
                    period: 'April, 2018 — November, 2021',
                    projects: [
                        {
                            name: 'Ease of Order discovery',
                            responsibilities: [
                                'Completely revamped the My Orders module to add Search, Filters, and recommendations.',
                                'The Goodness of 15% more click-throughs from My Orders to Order Details. Total Event of interaction with search > 1Cr in 1 month after launch.',
                            ],
                        },
                        {
                            name: 'Cancellation Nudges',
                            responsibilities: [
                                'Introduced nudges to assist the user during reason-based cancellations.',
                                '~25% goodness achieved while enabling nudge and taking action on order instead of canceling it.',
                            ],
                        },
                        {
                            name: 'Other Achievements',
                            responsibilities: [
                                'Completed migration from order level item grouping to unit/item level for My Orders and Order Details Page for Desktop.',
                                'Migrated apps to use Brotli compression and reduced the Over the network transfer size by ~20%.',
                            ],
                            hidden: ['Created many internal google chatbots to integrate JIRA, GitHub, and Jenkins.'],
                        },
                        {
                            name: 'Automated the entire process for regression and sanity across Apps.',
                            responsibilities: [
                                'Used Appium to automate the regression and sanity of the Android, iOS and mobile site apps. Wrote ~1200 test cases.',
                                'Single code base for all the apps removes the effort of maintenance.',
                                'Onboarded QAs and removed the manual verification process. Reduced the time from 2 hours to a couple of minutes.',
                            ],
                            hidden: [
                                'Set up the complete VM infra and dashboard to execute test cases on the fly with one click.',
                            ],
                        },
                        {
                            name: 'Created multiple automation tools using Puppeteer for',
                            responsibilities: [
                                'User interaction events - mimic and assert user GA and Omniture events.',
                                'Verify GUI - compare baseline screenshots with Post UI deployment.',
                            ],
                        },
                        {
                            name: 'Added a feasibility to change order address and add an alternate phone number.Overall improvement in cancellation metrics. 15% fewer orders are canceled.',
                        },
                    ],
                },
                {
                    projects: [
                        {
                            name: "Developed Order in transit widget for native apps(Android, iOS) and mobile site for the home page presence of users' orders. Used native Android + React Native for Android and AsyncDisplayKit for iOS.",
                            responsibilities: ['~15% increase in customer awareness and self-serve effectiveness.'],
                        },
                        {
                            name: 'Other Achievements',
                            responsibilities: [
                                'Developed consoles for monitoring CX agents status.',
                                'Converted single tenant Smart Assist app to multi tenant and extended our software to support Myntra operations. This removed third party dependencies and trimmed annual expense by 6 cr.',
                                "Developed return and refund flows on flipkart.com to refund the amount to the users' selected source. Increased the adaption rate for NEFT and EGV as they are the fastest.",
                                'Introduced Pull to Refresh in webview pages of the Native app and mobile app which has reduced the order status related tickets by 6%.',
                                'Modified React components to share them across various platforms. Almost all of the 2gud.com client components are replica of Flipkart.',
                                "Developed a tool to mimic users App state - My Order, Order Details, Help Centre, Order Confirmation page, using actual users' account ID. Reduced manual work of copying API response and take screenshots. Reduced the TAT for customer query.",
                                'Reduced deployment man hours via optimising Jenkins groovy scripts and precompiled dependencies with custom docker image.',
                                'Developed request for reschedule of delivery with slot date and time, address change request and added/edited alternate phone number. Bringing all the actions to the client side to reduce the turn around time and improve CX.',
                                'Developed schedule a call back for help. Reduced the waiting time for the user via providing capability to schedule a callback within range of their suitable frame.',
                            ],
                        },
                    ],
                },
                {
                    company: 'Furlenco',
                    position: 'Senior Software Engineer',
                    period: 'October, 2015 — April, 2018',
                    hidden: [
                        "I was responsible for developing and maintaining company's own e-commerce portal — www.furlenco.com.",
                    ],
                },
                {
                    company: 'Lexnimble Solutions',
                    position: 'Programmer Analyst',
                    period: 'July, 2014 — October, 2015',
                    hidden: [
                        'Designed and Developed Full duplex chat mechanism using Spring Sockets, Sock.js, Stromp.js.',
                        'Developed and maintained www.simplelaw.com.',
                    ],
                },
            ],
            previousExperience: [
                {
                    company: 'Amazon',
                    position: 'FEE 2',
                    period: 'Jul 2022 - Aug 2024',
                    url: 'http://www.amazon.in',
                },
                {
                    company: 'Atlassian',
                    position: 'SDE 2',
                    period: 'Dec 2021 - Jul 2022',
                    url: 'http://www.atlassian.com',
                },
                {
                    company: 'Flipkart',
                    position: 'UI 2',
                    period: 'Apr 2018 - Dec 2021',
                    url: 'http://www.flipkart.com',
                },
                {
                    company: 'Furlenco',
                    position: 'Sen. Software Engg.',
                    period: 'Oct 2015 - Apr 2018',
                    url: 'http://www.furlenco.com',
                },
                {
                    company: 'LexNimble Solutions',
                    position: 'Junior Programmer Analyst',
                    period: 'Jul 2014 - Oct 2015',
                    url: 'http://simplelaw.com',
                },
            ],
        };
    }
});
