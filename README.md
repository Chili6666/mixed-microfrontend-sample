# Vue 3 + Vite + Module Federation

*First raw test focusing on how to setup a Product with a shell and 2 MFE's within*

Steps to start:
run scripts from global package.json

1) npm install:all
2) build:mfe1 / build:mfe2
3) start

Open Browser and enter the following url: http://localhost:5000/



## Setup a project like this:

1) create 3 independed vue projects.
- npm create vite@latest app-shell -- --template vue-ts
- npm create vite@latest mfe1 -- --template vue-ts
- npm create vite@latest mfe2 -- --template vue-ts


2) install the vite modulfederation in each project

- npm install @originjs/vite-plugin-federation --save-dev

### Configure the microfrontends (mfe1 & mfe2)

- open the vite.config.ts file (both mfe1 & mfe2)
- add import: 
```ts
import federation from '@originjs/vite-plugin-federation'
```
- setup the exposes: 

```ts
export default defineConfig({
  plugins: [
    vue(),
    federation({
      //The name of your host application
      name: "mfe1",
      filename: "remoteEntry.js",
      // Modules to expose
      exposes: {
        "./App": "./src/App.vue",
      },
      // Common dependencies that should be shared
      shared: ["vue"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        minifyInternalExports: false,
      },
    },
  },
});
```

### Notes:

The federation plugin is configured with:

- name: The name of your microfrontend
- exposes: Components you want to share with other applications
- shared: Common dependencies that should be shared

Important configuration notes:

- Set target: 'esnext' in the build options
- Disable minification during development
- Disable CSS code splitting
- Configure shared dependencies (like Vue) as singletons


### Configure the shell

- open the vite.config.ts file (shell-app)
- add import: 
```ts
import federation from '@originjs/vite-plugin-federation'
```

- setup the remotes: 

```ts
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'app-shell',
      remotes: {
        mfe1: 'http://localhost:4001/assets/remoteEntry.js',
        mfe2: 'http://localhost:4002/assets/remoteEntry.js'
      },
      shared: ['vue']
    })
  ],
  server: {
    port: 5000
  },
  build: {
    target: 'esnext', // Use a target that supports top-level await
    minify: false,
    cssCodeSplit: false
  }
})
```

Notes:
The federation plugin is configured with:

- name: The name of your host application
- remotes: External components you want to consume
- shared: Common dependencies that should be shared



### Ensure that the app-shell router is correctly configured to handle the MFE routes. For example:

*To resolve the issue of the module not being found, ensure that the remotes.d.ts file is correctly placed and that TypeScript is aware of it.*

Here are the steps:


1) Create or update remotes.d.ts file:
Ensure you have a remotes.d.ts file at the root of your project or in the src directory with the following content:


```ts
declare module 'mfe1/App';
declare module 'mfe2/App';
```

2) Include the remotes.d.ts file in tsconfig.app.json:

Make sure that the remotes.d.ts file is included in your tsconfig.app.json file. Add the include section if it doesn't exist:

```ts
 "include": ["remotes.d.ts"]
```



