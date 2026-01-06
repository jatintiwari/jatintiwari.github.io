import { html, LitElement } from 'lit';

class ResumeApp extends LitElement {
    static properties = {
        data: { type: Object },
    };

    constructor() {
        super();
        this.data = {};
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

                      <div class="heading-container" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #333; margin-bottom: 25px; padding-bottom: 15px;">
                          <div class="left-col" style="flex: 1; text-align: left;">
                                <h2 class="heading" style="font-size: 2rem; font-weight: 700; text-transform: uppercase; line-height: 1.1; margin: 0;text-align: left;">${this.data.personalInfo.name}</h2>
                          </div>
                          <div class="right-col" style="flex: 1; display: flex; flex-direction: column; align-items: flex-end; justify-content: center; text-align: right; font-size: 1rem; line-height: 1.5;">
                              <div class="subheading">
                                  <a href="mailto:${this.data.personalInfo.email}" style="text-decoration: none; color: inherit;">${this.data.personalInfo.email}</a>
                              </div>
                              <div class="subheading">
                                  <a href="tel:${this.data.personalInfo.phone}" style="text-decoration: none; color: inherit;">${this.data.personalInfo.phone}</a>
                              </div>
                              <div class="subheading">
                                  <a href="https://${this.data.personalInfo.website}" target="_blank" style="text-decoration: none; color: inherit;">${this.data.personalInfo.website}</a>
                              </div>
                          </div>
                      </div>

                      <div class="content-container" style="display: block;">
                          
                          ${this.data.summary ? html`
                            <div class="section" style="margin-bottom: 20px;">
                                <p style="line-height: 1.6;">${this.data.summary}</p>
                            </div>
                          ` : ''}

                          <div class="section" style="margin-bottom: 20px;">
                                <div class="section-heading" style="border-bottom: 1px solid #ddd; margin-bottom: 15px; font-weight: bold; text-transform: uppercase;">Experience</div>
                                ${this.data.experience.map(job => this.renderJob(job))}
                          </div>

                          <div class="section" style="margin-bottom: 20px;">
                                <div class="section-heading" style="border-bottom: 1px solid #ddd; margin-bottom: 15px; font-weight: bold; text-transform: uppercase;">Education</div>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                    <span style="font-weight: bold;">${this.data.education.degree}</span>
                                    <span>${this.data.education.period}</span>
                                </div>
                                <div>${this.data.education.university}</div>
                          </div>

                          <div class="section" style="margin-bottom: 20px;">
                                <div class="section-heading" style="border-bottom: 1px solid #ddd; margin-bottom: 15px; font-weight: bold; text-transform: uppercase;">Skills</div>
                                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 10px;">
                                    ${this.data.skills.map(skill => html`
                                        <div>
                                            <span style="font-weight: bold;">${skill.category}:</span> <span>${skill.items}</span>
                                        </div>
                                    `)}
                                </div>
                          </div>

                      </div>
                  </div>
              `
            : html``;
    }

    renderJob(job) {
        return html`
            <div style="margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <h3 style="margin: 0; font-size: 1.3rem; font-weight: 700;">${job.company}</h3>
                    <div style="font-style: italic;">${job.period}</div>
                </div>
                <div style="font-weight: 500; margin-bottom: 5px;">${job.position}</div>
                
                <ul style="margin-top: 5px; padding-left: 20px;">
                    ${job.projects
                        ? job.projects.map(
                              (project) => html`
                                  <li style="list-style-type: none; margin-left: -20px; font-weight: bold; margin-top: 10px; margin-bottom: 5px;">${project.name}</li>
                                  
                                      ${project.ellaborated_text.map((resp) => html`<li style="margin-bottom: 5px;">${resp}</li>`)}
                                  
                              `
                          )
                        : job.ellaborated_text.map((resp) => html`<li style="margin-bottom: 5px;">${resp}</li>`)}
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
        resumeApp.data = {
            personalInfo: {
                name: 'Dipti Sharma',
                email: 'gitanjali81992@gmail.com',
                phone: '(+91) 7009171388',
                website: 'www.linkedin.com/in/dipti-sharma-21jt18/',
                lastUpdated: 'Jan 2026',
            },
            summary: "I am a dedicated professional with 9.5 years of experience in Energy, Mining, and Industrial Services Domain, having a solid foundation in techno functional aspects of APM tools.",
            education: {
                degree: 'B. Tech, Computer Science(9.5 CGPA)',
                university: 'Guru Nanak Dev University, Jalandhar',
                period: '2016',
            },
            skills: [
                { category: 'APM Tools', items: 'GE APM V5.x, V4.x, V3.x' },
                { category: 'Data & Reporting', items: 'SQL, SSRS' },
                { category: 'ERP/Integrations', items: 'SAP(PM), Azure services' },
                { category: 'Predictive Maint', items: 'XMPro, Aspen Mtell' },
                { category: 'Scripting', items: 'VBA, vb.net' },
                { category: 'Source Control', items: 'Gitlab' },
                { category: 'Soft Skills', items: 'Leadership, Team Management, Adaptive, Customer-Centric, Problem Solving' },
            ],
            experience: [
                {
                    company: 'Accenture',
                    position: 'APM Software Engineer',
                    period: '28th Feb’20 – Present',
                    projects: [
                        {
                            name: 'XMPro POD Lead for Implementation and Operational Transition(Jul’25 – Present)',
                            ellaborated_text: [
                                'Directed operational handover and innovation roadmap, positioning the platform as a core enabler for AI-driven predictive maintenance.',
                                'Transitioned operational control from vendors to in-house DevOps, ensuring process governance and equipping the team for independent execution.',
                                'Managed Azure ACI/ACR upgrades using Docker/PowerShell and spearheading the development of CI/CD pipelines for automated deployments.',
                                'Coordinated with vendors and end-users to expedite complex issue resolution through technical analysis.',
                                'Researched about SageMaker and RAG integration to elevate predictive maintenance and decision automation capabilities.'
                            ],
                            responsibilities: [
                                'Directed operational handover and innovation roadmap for AI-driven predictive maintenance.',
                                'Transitioned operations to in-house DevOps, establishing governance and increasing team capacity.',
                                'Managed Azure upgrades (ACI/ACR) and spearheaded CI/CD pipeline development.',
                                'Expedited complex issue resolution through vendor coordination and technical analysis.',
                                'Exploring SageMaker and RAG integration to enhance predictive capabilities.'
                            ],
                        },
                        {
                            name: 'GE APM Technical SME & Consultant (Mar’ 24 - Aug’ 25)',
                            ellaborated_text: [
                                'Technical SME and consultant for implementation of GE APM implementation in V4.5 and GE APM Upgrade to V5.1.2 for Australian Mining Client- BHP',
                                'Successfully led multiple high-impact technology initiatives including architecting & upgrading GE APM from v4.5 to v5.1.2, integrating with SAP S4, and implementing advanced analytics environments—ensuring seamless operations across billions of records.',
                                'Well equipped with knowledge on software installation of APM, APM Connect Boomi, Advanced Visualization, Ingestion servers, Elastic search, Rserve through docker in Linux, ActiveMQ and architectural changes in V5.1.2.',
                                'Implemented a containerized R & Rserve environment on Linux with 40+ R packages, accelerating predictive analytics capability and cutting project ramp-up time by 40%.',
                                'Created data cleanup processes using SQL, cursors, and Ansible–ServiceNow workflows to delete APM records from complex data models like ASM, ASI, RCM/FMEA, templates, reducing processing time from ~1 hour/request to seconds',
                                'Standardized and optimized 64 Azure VMs across five environments with infrastructure team to save AUD $32.8K/month.',
                                'Built a Custom APM Data Loader to automate thousands of record ingestions in minutes which incorporated the code changes as per baseline product in custom loader.',
                                'Proficient in working with Policies, R nodes, SQL, queries, .net code customizations, configurations, content creation, SAP integration'
                            ],
                            responsibilities: [
                                'Led GE APM upgrade (v4.5 to v5.1.2) and SAP S4 integration for a major mining client.',
                                'Orchestrated full-stack implementation: APM Connect, Visualization, Elastic Search, and Rserve.',
                                'Accelerated analytics by 40% via containerized R environment with 40+ packages.',
                                'Automated data cleanup with SQL/Ansible, reducing processing time from hours to seconds.',
                                'Optimized Azure infrastructure, saving ~$32.8K AUD/monthly, and automated data ingestion workflows.'
                            ],
                        },
                        {
                            name: 'GE APM Technical SME Lead (Apr’ 22 – Mar’ 24)',
                            ellaborated_text: [
                                'Technical SME for implementation of GE APM (v4.6) for Japanese COSMO client.',
                                'Worked on customizations, configurations, and content development-SSRS reports, queries, graphs, and dashboards; for health (AHM), strategy (ASM, RCM, FMEA, ACA), integrity (RBI 580/581, IM, TM), and reliability (RCA, RA) modules.',
                                'Created dashboards and KPIs (consisting of ~300+ SQL queries and graphs) that have helped to provide one concise view to the user in all the areas of work processes: strategy, health, integrity, and reliability, to ease their day-to-day activities and for the formulation of the yearly construction budget.',
                                'Worked on APM Connect interfaces, configurations in the APM Connect server, site configuration, and filtration in the IRD database. Did master data migration (functional location, equipment, work history, technical characteristics and EAM plans) from SAP to GE APM.',
                                'Created a policy for specific client requirement to calculate the corrosion rate and create health indicators by taking inputs as OSI PI tags. Also created a policy for automating tasks such as setting resource roles, linking, or deleting orphan records, and updating fields in a family.',
                                'Taking care of all the issues, enhancements, new requirement feasibility checks, and their development (across all the modules), along with their documentation.',
                                'Worked on Data loading activities via data loaders and creating 90+ validation queries for all the major modules.'
                            ],
                            responsibilities: [
                                'Led GE APM (v4.6) implementation for a Japanese client, delivering custom dashboards across all modules.',
                                'Designed 300+ SQL-based KPIs for unified operational visibility and budget planning.',
                                'Managed master data migration from SAP to GE APM and configured APM Connect interfaces.',
                                'Automated health indicators (OSI PI) and administrative tasks using custom policies.',
                                'Optimized data loading and validation processes to ensure data integrity.'
                            ],
                        },
                        {
                            name: 'Team Lead (Apr’ 21 – Apr’22)',
                            ellaborated_text: [
                                'Application modernization and migration to Hybrid platform.',
                                'Worked as technical resource for Quorum – Land suite and agreement application, supporting change requests, issues resolution, interface integration and data cleanup using SQL and excel skills.',
                                'Supported on custom Add-In Excel application that demanded making changes in code for custom menu items of excel, building connections of Excel with client environment, testing and complete documentation.',
                                'Handled a team looking after 43 SaaS applications migration and support.'
                            ],
                            responsibilities: [
                                'Led application modernization and migration to hybrid platforms.',
                                'Provided technical support for Quorum Land suite, including SQL/Excel data cleanup and integrations.',
                                'Maintained custom Excel Add-ins and managed client environment connections.',
                                'Led a team supporting the migration and maintenance of 43 SaaS applications.'
                            ],
                        },
                        {
                            name: 'Senior Analyst (Feb’ 20 – Mar’21)',
                            ellaborated_text: [
                                'Technical SME for GE APM (Meridium) v4.3 and Aspen Mtell (Predictive Maintenance Tool). Worked in IM/TM and Foundation module with role of resolving tickets, daily monitoring, requirement gathering, customizing, or configuring the solution in consideration to impact on existing functionality; Support business teams (Operation and Maintenance) for their automation requirements. Managing client communications on application issues, queries and meeting committed SLAs on logged tickets'
                            ],
                            responsibilities: [
                                'Technical SME for GE APM v4.3 and Aspen Mtell, managing IM/TM modules and ticket resolution.',
                                'Collaborated with business teams to gather requirements and deliver automation solutions.',
                                'Managed client communications and ensured adherence to SLAs for issue resolution.'
                            ],
                        },
                    ],
                },
                {
                    company: 'Tata Consultancy Services',
                    position: 'Systems Engineer',
                    period: '20th Jun’16 – 22nd Feb’20',
                    projects: [
                        {
                            name: 'IT Analyst (July’ 19 – Feb’20)',
                            ellaborated_text: [
                                'Offshore lead for APM v3.6, IM/TM, Foundation implementation in three European sites of British Petroleum including legacy data migration.',
                                'APM IM/TM, Product configuration, customizations, SSRS report creation/update (from simple to complex), KPIs development and enhancements as per requirements. Responsible for data loading from legacy application of IM/TM like Credo, SAP custom modules –IDA and RL.',
                                'Worked on custom compliance management solution and European Inspection Management for clients that saved 80% of their effort and is incorporated into the tool (GE APM) by vendor in V4.5. Worked on strategies and Macros for meeting the out of box requirements of publishing reports to SharePoint, customizing data loader code to add additional features.',
                                'Experience in taking care of UAT sessions as a technical consultant and leading production deployment.'
                            ],
                            responsibilities: [
                                'Offshore Lead for APM v3.6 implementation across three BP European sites.',
                                'Customized IM/TM products, SSRS reports, and KPIs; managed legacy data loading from Credo/SAP.',
                                'Developed a compliance solution saving 80% effort, later incorporated into the vendor\'s core product.',
                                'Led UAT sessions and managed production deployments.'
                            ],
                        },
                        {
                            name: 'Systems Engineer (Jun’16 – June’19)',
                            ellaborated_text: [
                                'Ranges from developer to project planner (CMMS Restructuring). Data Load SME/Lead (Meridium BHP GSK site Implementation). Was also Assistant PMO from Sep’ 2016 – Oct’ 2018.'
                            ],
                            responsibilities: [
                                'Roles ranged from Developer to Project Planner for CMMS Restructuring.',
                                'Data Load SME for Meridium BHP GSK implementation.',
                                'Served as Assistant PMO (Sep 2016 – Oct 2018).'
                            ],
                        },
                    ],
                },
            ],
            previousExperience: [],
        };
    }
});
