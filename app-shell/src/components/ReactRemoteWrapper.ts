// Importing necessary functions and types from Vue
import { defineComponent, h, onMounted, ref } from "vue";
// Importing the Component type from Vue
import type { Component } from "vue";
// Importing React library
import * as React from 'react';
// Importing ReactDOM for rendering React components
import * as ReactDOM from 'react-dom/client';

// Defining a new Vue component named ReactRemoteWrapper
export const ReactRemoteWrapper = defineComponent({
  // Setting the name of the component
  name: "ReactRemoteWrapper",
  // Defining the setup function for the component
  setup() {
    // Creating a ref to hold the remote React component
    const RemoteApp = ref<Component | null>(null);
    // Creating a ref to hold the container element where the React component will be rendered
    const containerRef = ref<HTMLElement | null>(null);
    // Variable to hold the root of the React component
    let root: any = null;

    // Lifecycle hook that runs when the component is mounted
    onMounted(async () => {
      try {
        console.log("Loading remote component...");
        // Dynamically importing the remote React component
        const module = await import("mfe3/remote-app");
        // Assigning the imported component to the RemoteApp ref
        RemoteApp.value = module.default as React.ComponentType;
        
        // Checking if the container element and the remote component are available
        if (containerRef.value && RemoteApp.value) {
          // Creating a root for the React component
          root = ReactDOM.createRoot(containerRef.value);
          // Rendering the React component inside the container element
          root.render(React.createElement(RemoteApp.value));
        }
      } catch (err) {
        console.error("Failed to load remote component:", err);
      }
    });

    // Returning a render function for the Vue component
    return () => {
      // Checking if the containerRef is available
      if (containerRef) {
        // Returning a div element with the containerRef attached
        return h('div', 
          { 
            ref: containerRef
          }
        );
      }
      // Returning a loading message if the containerRef is not available
      return h("div", "Loading remote component...");
    };
  },
});