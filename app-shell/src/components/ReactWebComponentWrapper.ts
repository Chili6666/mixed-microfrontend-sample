// Importing React library
import * as React from "react";
// Importing ReactDOM for rendering React components
import * as ReactDOM from "react-dom/client";

export class ReactWebComponentWrapper extends HTMLElement {
  private root: ReactDOM.Root | null = null;
  private containerRef: HTMLElement | undefined;

  constructor() {
    super();
  }

  async connectedCallback() {
    // Create shadow root
    const shadow = this.attachShadow({ mode: "open" });

    const module = await import("mfe3/remote-app");
    const remoteApp = module.default as React.ComponentType;

    console.log("Loading remote component...");

    // Create the template with content
    const template = `<div id="remote-container"></div>`;

    // Set the innerHTML of the shadow root
    shadow.innerHTML = template;

    // Access the red-box element
    const redBox = shadow.querySelector("#remote-container");
    if (redBox) {
      // You can now manipulate the redBox element as needed
      this.containerRef = redBox as HTMLElement;
      if (this.containerRef && remoteApp) {
        // Creating a root for the React component
        this.root = ReactDOM.createRoot(this.containerRef);
        // Rendering the React component inside the container element
        this.root.render(React.createElement(remoteApp));
      }
    }
  }
}

// Register the custom element
if (!customElements.get("react-webcomponent-wrapper")) {
  customElements.define("react-webcomponent-wrapper", ReactWebComponentWrapper);
}
