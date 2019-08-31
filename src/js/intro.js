import { h, app } from "hyperapp";

export default _ => ({
  state: {},
  actions: {},
  view: _ => {
    return (
      <div class="section">
        <div class="introduction">
          <div>
            <span style="font-size: 40px; color: #0EB7F6">hello,</span>
            <span>i'm Jatin Tiwari</span>, <span>Full Stack Developer.</span>
          </div>
          <div class="about-me">
            <div>Currently working in India for Flipkart.</div>
          </div>
        </div>
      </div>
    )
  }
});