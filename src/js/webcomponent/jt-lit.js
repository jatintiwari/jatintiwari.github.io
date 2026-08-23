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

    createRenderRoot() {
        return this;
    }

    render() {
        if (!this.data.personalInfo) return html``;

        const displayedExperience = this.isConcise ? this.data.experience.slice(0, 3) : this.data.experience;
        const displayedPrevious = this.isConcise
            ? this.data.previousExperience.filter(
                  (job) => !['ServiceNow', 'Amazon', 'Google'].includes(job.company)
              )
            : this.data.previousExperience;

        return html`
            <div class="know-more-app">
                <!-- Action controls hidden in print & ATS -->
                <div class="hide-print action-bar">
                    <div id="updated">Last updated in ${this.data.personalInfo.lastUpdated}</div>
                    <div>
                        <button id="print" @click=${() => window.print()} style="margin-right: 8px;">Print / Save PDF</button>
                        <button @click=${() => this.toggleConcise()}>
                            ${this.isConcise ? 'Show Full Mode' : 'Concise (1-Page Mode)'}
                        </button>
                    </div>
                </div>

                <!-- ATS-friendly Single Column Stacked Header -->
                <header class="heading-container">
                    <h1 class="heading">
                        ${this.data.personalInfo.name}
                    </h1>
                    <div class="subheading-container">
                        <div class="subheading">
                            <a href="mailto:${this.data.personalInfo.email}">${this.data.personalInfo.email}</a>
                        </div>
                        <span class="separator">•</span>
                        <div class="subheading">
                            <a href="tel:${this.data.personalInfo.phone}">${this.data.personalInfo.phone}</a>
                        </div>
                        <span class="separator">•</span>
                        <div class="subheading">
                            <a href="https://${this.data.personalInfo.website}" target="_blank" rel="noopener noreferrer">${this.data.personalInfo.website}</a>
                        </div>
                    </div>
                </header>

                <!-- Professional Summary text without heading -->
                ${this.data.summary
                    ? html`
                          <div class="summary-container">
                              <p class="summary-text">${this.data.summary}</p>
                          </div>
                      `
                    : ''}

                <div class="content-container">
                    <section class="section">
                        <div class="section-heading">WORK EXPERIENCE</div>
                        ${displayedExperience.map((job) => this.renderJob(job))}
                    </section>

                    <section class="section">
                        <div class="section-heading">SKILLS</div>
                        <div class="skills-list">
                            ${this.data.skills.map(
                                (skill) => html`
                                    <div class="skill-item">
                                        <strong>${skill.category}:</strong>
                                        <span>${skill.items}</span>
                                    </div>
                                `
                            )}
                        </div>
                    </section>

                    <section class="section">
                        <div class="section-heading">EDUCATION</div>
                        <div class="education-item">
                            <div><strong>${this.data.education.degree}</strong>, ${this.data.education.university}</div>
                            <div class="period-badge">${this.data.education.period}</div>
                        </div>
                    </section>

                    ${this.isConcise && displayedPrevious && displayedPrevious.length > 0
                        ? html`
                              <section class="section">
                                  <div class="section-heading">PREVIOUS EXPERIENCE</div>
                                  <div class="previous-exp-list">
                                      ${displayedPrevious.map(
                                          (job, idx) => html`
                                              <span class="prev-job-item">
                                                  <a href="${job.url}" target="_blank" rel="noopener noreferrer"><strong>${job.company}</strong></a>
                                                  (${job.position}, <em>${job.period}</em>)${idx < displayedPrevious.length - 1 ? ' • ' : ''}
                                              </span>
                                          `
                                      )}
                                  </div>
                              </section>
                          `
                        : ''}
                </div>
            </div>
        `;
    }

    renderJob(job) {
        const displayedProjects = this.isConcise && job.projects ? job.projects.slice(0, 1) : job.projects;

        return html`
            <article class="job-article">
                <div class="job-header">
                    <h3 class="job-company">${job.company}</h3>
                    <div class="period-badge">${job.period || ''}</div>
                </div>
                ${job.position ? html`<div class="job-position">${job.position}</div>` : ''}

                <ul class="responsibilities-list">
                    ${displayedProjects
                        ? displayedProjects.map(
                              (project) => html`
                                  ${project.name
                                      ? html`<li class="project-title">${project.name}</li>`
                                      : ''}
                                  ${project.responsibilities
                                      ? (this.isConcise && project.responsibilities.length > 4
                                            ? project.responsibilities.slice(0, 4)
                                            : project.responsibilities
                                        ).map(
                                            (resp) => html`<li class="responsibility-item">${resp}</li>`
                                        )
                                      : ''}
                              `
                          )
                        : job.responsibilities
                          ? job.responsibilities.map((resp) => html`<li class="responsibility-item">${resp}</li>`)
                          : ''}
                </ul>
            </article>
        `;
    }
}
customElements.define('resume-app', ResumeApp);
document.addEventListener('DOMContentLoaded', function () {
    const resumeApp = document.querySelector('resume-app');
    if (resumeApp) {
        const currentDate = new Date();
        const dateStartedWorking = new Date('July 21, 2014');
        const yearsExp =
            currentDate.getFullYear() -
            dateStartedWorking.getFullYear() -
            (currentDate.getMonth() >= dateStartedWorking.getMonth() ? 0 : 1);

        resumeApp.data = {
            personalInfo: {
                name: 'JATIN TIWARI',
                email: 'mail@jatintiwari.com',
                phone: '+91-7675807450',
                website: 'www.jatintiwari.com',
                lastUpdated: 'August 2026',
            },
            summary: `Senior Software Engineer with ${yearsExp}+ years of experience leading frontend architecture and high-scale applications across Google, ServiceNow, Amazon, Atlassian, and Flipkart. Proven expert in JavaScript, TypeScript, React, React Native, and distributed systems, specializing in developer platforms and performance optimization.`,
            education: {
                degree: 'B.E. - Electronics and Communication Engineering (ECE)',
                university: 'Chitkara University, HP',
                period: '2009 - 2013',
            },
            skills: [
                { category: 'Languages', items: 'JavaScript (ES6+), TypeScript, HTML5, CSS3, SASS' },
                { category: 'Frontend & Mobile', items: 'React, React Native, Next.js, AngularJS, Relay, Material Design, Bootstrap' },
                { category: 'Web Services & APIs', items: 'REST, GraphQL, WebSockets, Service Workers, Core Web Vitals' },
                { category: 'Build & Automation', items: 'Webpack, Rollup, Appium, Puppeteer, Docker, Jenkins, Git' },
                { category: 'Backend & Runtime', items: 'Node.js, Express.js' },
            ],
            experience: [
                {
                    company: 'Google',
                    position: 'Senior Software Engineer',
                    period: 'March 2025 - Present',
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
                    position: 'Senior Staff Software Engineer',
                    period: 'August 2024 - March 2025',
                    projects: [
                        {
                            name: 'Application Platform',
                            responsibilities: [
                                'Revamped ServiceNow e-commerce store (https://store.servicenow.com) using React, optimizing SEO, UX, and Core Web Vitals to boost conversions and decrease bounce rates.',
                                'Drove substantial improvements in system efficiency by optimizing slow database queries, which reduced average response time by approximately 60%.',
                                'Led frontend performance audits and resolved critical information discovery issues, significantly decreasing related support ticket volumes.',
                            ],
                        },
                    ],
                },
                {
                    company: 'Amazon',
                    position: 'Frontend Engineer II',
                    period: 'July 2022 - August 2024',
                    projects: [
                        {
                            name: 'Fire TV Devices (Stealth Mode)',
                            responsibilities: [
                                'Served as sole frontend engineer, providing technical leadership and mentoring cross-functional teams in JavaScript and modern frontend practices.',
                                'Led end-to-end development of a React Native TV application using Amazon\'s Vega Script; architected Network and Onboarding apps with shared reusable core modules.',
                                'Introduced MVVM design pattern for maintainability, and implemented proxy patterns enabling seamless compatibility between Kepler Script and Vanilla React Native.',
                                'Developed custom turbomodules offloading heavy tasks from JavaScript thread, delivering critical performance optimization for memory-constrained TV devices (1GB RAM).',
                                'Implemented proxy patterns for common libraries, enabling seamless compatibility between Kepler Script and Vanilla React Native, enhancing code flexibility and reusability.',
                                'Developed monotonic timers to prevent time synchronization issues while executing deferred functions in JavaScript.',
                            ],
                        },
                        {
                            name: 'Internal Tools & Optimization (YATO)',
                            responsibilities: [
                                'Developed YATO (Yet Another Tool for Optimization) consolidating on-call handovers, team cost implications, ticket trends, and S3/ECS utilization across AWS accounts into a single dashboard.',
                                'Optimized on-call handover workflows across 47 engineering teams.',
                            ],
                        },
                    ],
                },
                {
                    company: 'Atlassian',
                    position: 'Software Development Engineer II',
                    period: 'December 2021 - July 2022',
                    projects: [
                        {
                            name: 'Atlassian Help',
                            responsibilities: [
                                'Built an Atlassian initiative from scratch: an interface connecting help providers and seekers. Owned GraphQL implementation using Relay.',
                                'Mentored a summer intern for 6 months, guiding the implementation of visual diffing for E2E test cases, evolving from a Hackday project.',
                            ],
                        },
                    ],
                },
                {
                    company: 'Flipkart',
                    position: 'Frontend Engineer II',
                    period: 'April 2018 - November 2021',
                    projects: [
                        {
                            name: 'Ease of Order Discovery & CX',
                            responsibilities: [
                                'Completely revamped the My Orders module to add Search, Filters, and recommendations.',
                                'Delivered a 15% increase in click-throughs from My Orders to Order Details, with total search interaction events exceeding 10 Million in the first month post-launch.',
                                'Introduced nudges to assist users during reason-based cancellations, achieving ~25% user retention and action on orders instead of cancellation.',
                                'Completed migration from order-level item grouping to unit/item level for My Orders and Order Details Page for Desktop.',
                                'Migrated web apps to use Brotli compression, reducing over-the-network payload transfer size by ~20%.',
                                'Created internal automation chatbots integrating JIRA, GitHub, and Jenkins.',
                            ],
                        },
                        {
                            name: 'Automated Regression & Sanity Testing',
                            responsibilities: [
                                'Automated regression and sanity testing for Android, iOS, and Mobile Web apps using Appium with a single shared codebase, authoring ~1,200 test cases.',
                                'Onboarded QA engineers and removed manual verification processes, reducing turnaround time from 2 hours to a few minutes.',
                                'Set up VM infrastructure and execution dashboards to execute test cases on the fly with single-click triggers.',
                                'Created multiple Puppeteer automation tools for User interaction events (simulating GA/Omniture events) and Visual GUI verification (comparing baseline screenshots against post-deployment UI).',
                            ],
                        },
                        {
                            name: 'Self-Serve CX & Customer Engagement',
                            responsibilities: [
                                'Added capability to change order address and add alternate phone numbers, contributing to 15% fewer order cancellations.',
                                'Developed Order in-transit widget for native Android (React Native), iOS (AsyncDisplayKit), and Mobile Web homepages, driving ~15% increase in customer awareness and self-serve effectiveness.',
                                'Developed consoles for monitoring customer experience agent status.',
                                'Converted single-tenant Smart Assist app to multi-tenant architecture and extended support to Myntra, trimming annual expenses by over $750K (6 Cr INR).',
                                'Developed return and refund flows on flipkart.com, accelerating adoption for fast refund methods (NEFT and EGV).',
                                'Introduced Pull to Refresh in webview pages across Native and Mobile Web apps, reducing order-status support tickets by 6%.',
                                'Standardized React components across platforms, enabling 2gud.com client components to replicate and reuse Flipkart components.',
                                'Developed a tool to mimic user app state (My Orders, Order Details, Help Centre) using account IDs, reducing customer support query resolution time.',
                                'Optimized Jenkins Groovy build scripts and precompiled dependencies with custom Docker images to reduce deployment man-hours.',
                                'Developed client-side flows for delivery slot rescheduling, address modifications, and callback scheduling within user-preferred timeframes.',
                            ],
                        },
                    ],
                },
                {
                    company: 'Furlenco',
                    position: 'Senior Software Engineer',
                    period: 'October 2015 - April 2018',
                    responsibilities: [
                        'Responsible for developing and maintaining the company\'s core e-commerce portal (www.furlenco.com) utilizing React and modern JavaScript.',
                    ],
                },
                {
                    company: 'Lexnimble Solutions',
                    position: 'Junior Programmer Analyst',
                    period: 'July 2014 - October 2015',
                    responsibilities: [
                        'Designed and developed full-duplex chat mechanisms using Spring WebSockets, SockJS, and STOMP.',
                        'Developed and maintained law practice management platform (www.simplelaw.com).',
                    ],
                },
            ],
            previousExperience: [
                {
                    company: 'Atlassian',
                    position: 'Software Development Engineer II',
                    period: 'Dec 2021 - Jul 2022',
                    url: 'https://www.atlassian.com',
                },
                {
                    company: 'Flipkart',
                    position: 'Frontend Engineer II',
                    period: 'Apr 2018 - Dec 2021',
                    url: 'https://www.flipkart.com',
                },
                {
                    company: 'Furlenco',
                    position: 'Senior Software Engineer',
                    period: 'Oct 2015 - Apr 2018',
                    url: 'https://www.furlenco.com',
                },
                {
                    company: 'LexNimble Solutions',
                    position: 'Junior Programmer Analyst',
                    period: 'Jul 2014 - Oct 2015',
                    url: 'https://simplelaw.com',
                },
            ],
        };
    }
});

