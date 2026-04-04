import { html, LitElement } from 'lit';

class ResumeApp extends LitElement {
    static properties = {
        data: { type: Object },
        isConcise: { type: Boolean },
        yearsExperience: { type: Number },
    };

    constructor() {
        super();
        this.data = {};
        this.isConcise = true;
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

    toggleConcise() {
        this.isConcise = !this.isConcise;
    }

    // Override to use external CSS instead of shadow DOM
    createRenderRoot() {
        return this;
    }

    render() {
        return this.data.personalInfo
            ? html`
                  <div class="know-more-app" style="max-width: 800px; margin: 0 auto; padding-top: 20px;">
                      <div class="hide-print" id="updated">Last updated in ${this.data.personalInfo.lastUpdated}</div>
                      <button class="hide-print" id="print" @click=${() => window.print()}>Print</button>
                      <button class="hide-print" @click=${() => this.toggleConcise()}>
                          ${this.isConcise ? 'Show Full' : 'Concise Mode'}
                      </button>

                      <div
                          class="heading-container"
                          style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #333; margin-bottom: 25px; padding-bottom: 15px;"
                      >
                          <div class="left-col" style="flex: 1; text-align: left;">
                              <h2
                                  class="heading"
                                  style="font-size: 2rem; font-weight: 700; text-transform: uppercase; line-height: 1.1; margin: 0;text-align: left;"
                              >
                                  ${this.data.personalInfo.name}
                              </h2>
                          </div>
                          <div
                              class="right-col"
                              style="flex: 1; display: flex; flex-direction: column; align-items: flex-end; justify-content: center; text-align: right; font-size: 1rem; line-height: 1.5;"
                          >
                              <div class="subheading">
                                  <a
                                      href="mailto:${this.data.personalInfo.email}"
                                      style="text-decoration: none; color: inherit;"
                                      >${this.data.personalInfo.email}</a
                                  >
                              </div>
                              <div class="subheading">
                                  <a
                                      href="tel:${this.data.personalInfo.phone}"
                                      style="text-decoration: none; color: inherit;"
                                      >${this.data.personalInfo.phone}</a
                                  >
                              </div>
                              <div class="subheading">
                                  <a
                                      href="https://${this.data.personalInfo.website}"
                                      target="_blank"
                                      style="text-decoration: none; color: inherit;"
                                      >${this.data.personalInfo.website}</a
                                  >
                              </div>
                          </div>
                      </div>

                      <div class="content-container" style="display: block;">
                          ${this.data.summary
                              ? html`
                                    <div class="section" style="margin-bottom: 20px;">
                                        <p style="line-height: 1.6;">${this.data.summary}</p>
                                    </div>
                                `
                              : ''}

                          <div class="section" style="margin-bottom: 20px;">
                              <div
                                  class="section-heading"
                                  style="border-bottom: 1px solid #ddd; margin-bottom: 15px; font-weight: bold; text-transform: uppercase;"
                              >
                                  Experience (${this.yearsExperience}+ Years)
                              </div>
                              ${(this.isConcise ? this.data.experience.slice(0, 3) : this.data.experience).map((job) =>
                                  this.renderJob(job)
                              )}
                          </div>

                          <div class="section" style="margin-bottom: 20px;">
                              <div
                                  class="section-heading"
                                  style="border-bottom: 1px solid #ddd; margin-bottom: 15px; font-weight: bold; text-transform: uppercase;"
                              >
                                  Education
                              </div>
                              <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                  <span style="font-weight: bold;">${this.data.education.degree}</span>
                                  <span>${this.data.education.period}</span>
                              </div>
                              <div>${this.data.education.university}</div>
                          </div>

                          <div class="section" style="margin-bottom: 20px;">
                              <div
                                  class="section-heading"
                                  style="border-bottom: 1px solid #ddd; margin-bottom: 15px; font-weight: bold; text-transform: uppercase;"
                              >
                                  Skills
                              </div>
                              <div
                                  style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 10px;"
                              >
                                  ${this.data.skills.map(
                                      (skill) => html`
                                          <div>
                                              <span style="font-weight: bold;">${skill.category}:</span>
                                              <span>${skill.items}</span>
                                          </div>
                                      `
                                  )}
                              </div>
                          </div>

                          ${this.data.previousExperience && this.data.previousExperience.length > 0
                              ? html`
                                    <div class="section" style="margin-bottom: 20px;">
                                        <div
                                            class="section-heading"
                                            style="border-bottom: 1px solid #ddd; margin-bottom: 15px; font-weight: bold; text-transform: uppercase;"
                                        >
                                            Previous Experience
                                        </div>
                                        <ul style="padding-left: 20px; margin-top: 5px;">
                                            ${this.data.previousExperience.map(
                                                (job) => html`
                                                    <li style="margin-bottom: 5px;">
                                                        <a
                                                            href="${job.url}"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style="font-weight: bold;"
                                                            >${job.company}</a
                                                        >, ${job.position}.
                                                        <span style="font-style: italic;">${job.period}</span>
                                                    </li>
                                                `
                                            )}
                                        </ul>
                                    </div>
                                `
                              : ''}
                      </div>
                  </div>
              `
            : html``;
    }

    renderJob(job) {
        return html`
            <div style="margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    ${job.company
                        ? html`<h3 style="margin: 0; font-size: 1.3rem; font-weight: 700;">${job.company}</h3>`
                        : html`<div></div>`}
                    <div style="font-style: italic;">${job.period || ''}</div>
                </div>
                ${job.position ? html`<div style="font-weight: 500; margin-bottom: 5px;">${job.position}</div>` : ''}

                <ul style="margin-top: 5px; padding-left: 20px;">
                    ${job.projects
                        ? job.projects.map(
                              (project) => html`
                                  ${project.name
                                      ? html`<li
                                            style="list-style-type: none; margin-left: -20px; font-weight: bold; margin-top: 10px; margin-bottom: 5px;"
                                        >
                                            ${project.name}
                                        </li>`
                                      : ''}
                                  ${project.responsibilities
                                      ? project.responsibilities.map(
                                            (resp) => html`<li style="margin-bottom: 5px;">${resp}</li>`
                                        )
                                      : ''}
                              `
                          )
                        : job.responsibilities
                          ? job.responsibilities.map((resp) => html`<li style="margin-bottom: 5px;">${resp}</li>`)
                          : ''}
                </ul>
            </div>
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
                lastUpdated: 'April 2026',
            },
            education: {
                degree: 'B.E. - ECE',
                university: 'Chitkara university, Himachal Pradesh',
                period: '2009 - 2013',
            },
            skills: [
                { category: 'Languages', items: 'Javascript, TypeScipt' },
                { category: 'Web services', items: 'REST, GraphQl, Websockets, Service Worker' },
                { category: 'JS', items: 'ES6, React Native, ReactJS, AngularJS, RelayJS' },
                { category: 'Build Tools', items: 'Webpack, Rollup' },
                {
                    category: 'Frontend Technologies',
                    items: 'HTML 5, CSS 3, SASS, Bootstrap, Material Design',
                },
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
                            name: 'AI Data and Engines',
                            responsibilities: [
                                'Architected dataset lineage frameworks for large-scale pre-training, ensuring all data utilized in Gemini models strictly adheres to global AI Act guidelines and safety protocols.',
                                'Collaborated cross-functionally with Google DeepMind to engineer infrastructure for dataset registration and automated compliance auditing, streamlining the path from raw data to model ingestion.',
                                'Developed a mission-critical internal platform that enables researchers to trace provenance and perform automated remediation of datasets, preventing non-compliant data from entering the training pipeline.',
                            ],
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
                            responsibilities: [
                                'Revamped ServiceNow e-commerce store - https://store.servicenow.com.',
                                'The new React-based website enhanced the SEO, UX and web vitals, leading to higher conversions and lower drop rates. It also reduced the number of support tickets related to content discovery and information gaps.',
                                'Drove substantial improvements in system efficiency by optimizing slow queries, which reduced average response time by approximately 60%.',
                            ],
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
                                'Served as the sole frontend engineer, providing technical leadership and mentoring cross-functional teams in JavaScript and modern frontend practices.',
                                'Led end-to-end development of a React Native TV application using Amazon’s Vega Script, and architected the Network and Onboarding apps—enabling efficient code reuse across key modules like Language, TZ Selector, Network, and Accessibility.',
                                'Introduced the MVVM design pattern to improve scalability and maintainability, and documented best practices for globally distributed teams.',
                                'Developed turbomodules to leverage native device capabilities and optimize performance by offloading resource-intensive tasks from the JavaScript thread.  It was a critical performance optimization for resource-limited environments on memory-constrained TV devices (1GB RAM).',
                                'Implemented proxy patterns for common libraries, enabling seamless compatibility between Kepler Script and Vanilla React Native, enhancing code flexibility and reusability.',
                                'Developed monotonic timers to prevent time sync issues while using defered functions in JS.',
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
                    responsibilities: [
                        "I was responsible for developing and maintaining company's own e-commerce portal — www.furlenco.com.",
                    ],
                },
                {
                    company: 'Lexnimble Solutions',
                    position: 'Junior Programmer Analyst',
                    period: 'July, 2014 — October, 2015',
                    responsibilities: [
                        'Designed and Developed Full duplex chat mechanism using Spring Sockets, Sock.js, Stromp.js.',
                        'Developed and maintained www.simplelaw.com.',
                    ],
                },
            ],
            previousExperience: [
                {
                    company: 'Servicenow',
                    position: 'Sr. Staff Software Engineer',
                    period: 'Aug 2024 - Mar 2025',
                    url: 'http://store.servicenow.com',
                },
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
