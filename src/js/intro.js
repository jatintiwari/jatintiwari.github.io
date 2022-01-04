import { h, app } from "hyperapp";

export default _ => ({
    state: {},
    actions: {},
    view: _ => {
        return (
            <div class="section">
                <div class="introduction">
                    <div class="about-me">
                        <span style="font-size: 40px; color: #fc9c09">👋 </span>
                        <span>
                            <span>i'm Jatin Tiwari</span>, <span>Full Stack Developer.</span>
                        </span>
                        &nbsp;
                        <br class="hidden-mobile" />
                        <span>
                            Currently working in India for{" "}
                            <a target="_blank" href="https://www.google.com/search?q=atlassian">
                                Atlassian
                            </a>
                            .
                        </span>
                    </div>
                </div>
            </div>
        );
    }
});
