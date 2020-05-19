# Editmode for React

Editmode allows you to turn plain text in your React app into easily inline-editable bits of content that can be managed by anyone with no technical knowledge.

## Installation
Use npm to install Editmode:
```
npm install editmode-react
```

## Usage

### Step 1:

Within your React app, navigate to the index file within your src directory. 
Import the Editmode wrapper and wrap your App within. 

```
import { Editmode } from "editmode-react";

ReactDOM.render(
  <React>
     <Editmode>
        <App />
     </Editmode>
  </React>,
document.getElementById("root")
);
```


### Step 2:

#### Rendering a chunk:

If you have already created the chunk you would like to render on the Editmode CMS, you can simply pass the identifier as a prop and begin editing. 
You can provide default content as a fallback should anything go wrong trying to retrieve the data from the API:

```
import { Chunk } from "editmode-react";

function Example() {
	return (
		<div>
			<p>
				<Chunk identifier="cnk_123"/>
			</p>
			<p>
				<Chunk identifier="cnk_321">
					I have default content
				</Chunk>
			</p>
		</div>
	);
}
```

Alternatively, if you are using one of our **text editor plugins** and would like to create a new chunk directly from the editor, you may select the piece of text you would like to convert and hit CMD+SHIFT+L. (For Visual Studio Code users, you can also hit CMD+SHIFT+P to open the command pallete, type "Editmode: Create Chunk" and hit enter).

#### Rendering a chunk collection:

TBC

### Step 3:

You can now edit all of the chunks in your React app from within the browser - just add `editmode=1` as a query string parameter to the current URL.
