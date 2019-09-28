import { h, app } from "hyperapp";

export default _ => ({
    state: {},
    actions: {},
    view: _ => {
        return (
            <div class="section">
                <div class="introduction">
                    <div class="about-me">
                        <span style="font-size: 40px; color: #fc9c09">hello, </span>
                        <span>
                            <span>i'm Jatin Tiwari</span>, <span>Full Stack Developer.</span>
                        </span>
                        &nbsp;
                        <br class="hidden-mobile" />
                        <span>
                            Currently working in India for{" "}
                            <a target="_blank" href="https://en.wikipedia.org/wiki/Flipkart">
                                Flipkart
                            </a>
                            .
                        </span>
                    </div>
                </div>
            </div>
        );
    }
});
