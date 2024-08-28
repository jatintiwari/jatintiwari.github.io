<script>
    const name = 'Jatin Tiwari';
    const currentInterest = 'Sr Staff Software Engineer';
    const currentCompany = 'ServiceNow';
    const currentCompanyLink = 'https://www.google.com/search?q=servicenow';
    let currentCountry = 'India';
</script>

<div class="section">
    <div class="introduction">
        <div class="about-me">
            <span class="hello-hand">👋</span>
            <span>
                <span>
                    <span class="hello-text">Hello! I am {name}</span>
                </span>
                <br />
                <span>
                    <span>{currentInterest}</span>,
                    <a class="cta" target="_blank" href={currentCompanyLink}>{currentCompany}</a>,
                </span>
                {currentCountry}.
            </span>
        </div>
    </div>
</div>

<style lang="scss">
    .introduction {
        font-size: 18px;
        .about-me {
            display: flex;
            align-items: center;
            .hello-hand {
                padding-right: 0.2em;
                font-size: 4em;
            }
        }
        .hello-text {
            font-size: 24px;
        }
    }
    @media (max-width: 767px) {
        .introduction .about-me .hello-hand {
            padding-right: 0.2em;
            font-size: 2em;
        }
    }
</style>
