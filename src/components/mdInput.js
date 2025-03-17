import React from "react";
import { marked } from "marked";

const markdown = require("markdown").markdown;

const initialInput = `
# Header 1

## Header 2

[A link to my GitHub profile](https://github.com/KartikC137)

**Inline Code:**

\`print("Hello Markdown!")\`

**Code Block:**

\`\`\`jsx
handleInput(event) {
    this.setState({
      inputMarkdown: event.target.value,
    });
}
\`\`\`

**A list:**

- this
  - was
    - fun

> HELLO THERE! This is a block quote

**And Guess where I learned it from?:**

![An Image](/heheh.png)
`;

export default class MDInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMarkdown: initialInput,
    };
    this.handleInput = this.handleInput.bind(this);
    this.mdToHtml = this.mdToHtml.bind(this);
  }

  handleInput(event) {
    this.setState({
      inputMarkdown: event.target.value,
    });
  }

  mdToHtml() {
    return marked(this.state.inputMarkdown);
  }
  render() {
    return (
      <div id="container" className="column">
        <div id="input-box" className="column">
          <textarea
            id="editor"
            value={this.state.inputMarkdown}
            onChange={this.handleInput}
          ></textarea>
        </div>
        <div
          id="preview"
          className="column"
          dangerouslySetInnerHTML={{ __html: this.mdToHtml() }}
        />
      </div>
    );
  }
}
