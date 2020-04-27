# Editmode for React

TBC

## Description
Editmode allows you to turn plain text in your React app into easily inline-editable bits of content that can be managed by anyone with no technical knowledge.

## Installation
Use npm to install Editmode by running:
```
npm install editmode-react
```


## Usage
Step 1:
    Within your React app, navigate to `index.js` within your src directory.
    Import the Editmode wrapper and wrap your App within it.
    ```
      ....
      import { Editmode } from "editmode-react";
         
      ReactDOM.render(
        <React.StrictMode>
          <Editmode>
            <App />
          </Editmode>
        </React.StrictMode>,
      document.getElementById("root")
      );
    ```
Step 2:  
  Import the Editmode "Chunk" component to any file that you would like to make editable.
  
  ```
  import { Chunk } from "editmode-react";
  ```
  
  Select a piece of text and hit CMD+SHIFT+P to open the command palette. Type "Editmode: Create Chunk" and hit enter.
  That's it - you should be able to edit your selected piece of content within the browser!
