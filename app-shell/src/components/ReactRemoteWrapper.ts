import { defineComponent, h, onMounted, ref } from "vue";
import type { Component } from "vue";
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

export const ReactRemoteWrapper = defineComponent({
  name: "ReactRemoteWrapper",
  setup() {
    const RemoteApp = ref<Component | null>(null);
    const containerRef = ref<HTMLElement | null>(null);
    let root: any = null;

    onMounted(async () => {
      try {
        console.log("Loading remote component...");
        const module= await import("mfe3/remote-app");
        RemoteApp.value = module.default;
        
        if (containerRef.value && RemoteApp.value) {
          root = ReactDOM.createRoot(containerRef.value);
          root.render(React.createElement(RemoteApp.value));
        }
      } catch (err) {
        console.error("Failed to load remote component:", err);
      }
    });

    return () => {
      if (containerRef) {
        console.log("before...");
        const tt = h('div', 
          { 
            ref: containerRef,
            class: 'react-wrapper',
            style: {
              padding: '20px',
              border: '1px solid #ccc'
            } 
          }
        );
        console.log("after.....");
        return tt;
        //return h(RemoteApp.value)
      }
      return h("div", "Loading remote component...");
    };
  },
});
