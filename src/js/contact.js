import { h, app } from "hyperapp";

export default _ => ({
    state: {
        ctas: {
            LINKEDIN: "https://www.linkedin.com/in/jatin-tiwari-3783aa50",
            GITHUB: "https://www.github.com/jatintiwari",
            EMAIL: "mailto:mail@jatintiwari.com"
        }
    },
    actions: {},
    view: (state, actions) => {
        const ctas = state.ctas;
        const ctaKeys = Object.keys(ctas);
        return (
            <div class="section contacts-container">
                <div class="contacts">
                    <div class="ctas">
                        {ctaKeys.map(cta => (
                            <a href={ctas[cta]} target={cta === "EMAIL" ? "_self" : "_blank"} class="cta">
                                {cta}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
});
