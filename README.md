# editmode-react
`editmode-react` is a tool that allows you to turn plain text in your React app into easily inline-editable chunks of content that can be managed by anyone with no technical knowledge.

## Prerequisites 
#### 	Sign up for Editmode:
If you haven't done so already, you'll need to register an account for Editmode and create your new project. See [editmode.app](https://editmode.app/docs#/readme) for more details.

#### Text editor plugins:
Although it's not mandatory to install one of our text editor plugins to get up and running with `editmode-react`, we find that it can aid in the initial process of converting the content of your React app into Editmode chunks.

Currently, we have a [Sublime Text Plugin](https://packagecontrol.io/packages/Editmode) and a [Visual Studio Code Plugin](https://marketplace.visualstudio.com/items?itemName=MeganEnnis.editmode). 
 
## Installation
```
npm install editmode-react
```

## Usage

### Step 1:

Wrap your app in the Editmode wrapper:

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

### Rendering chunks:
---
- **Using a text editor plugin to create a new chunk:**
To create a new chunk directly from the editor, simply select the piece of text you would like to convert and hit CMD+SHIFT+L. For Visual Studio Code users, you can also open the command palette, type "Editmode: Create Chunk" and hit enter.

- **Without a text editor plugin/rendering existing chunks:**
Alternatively, if you've already created the chunk on the Editmode CMS, you can simply pass the identifier as a prop to the *Chunk* component. 
You can also provide default content as a fallback should anything go wrong trying to retrieve the data from the API:
	```
	import { Chunk } from "editmode-react";
	
	function Example() {
		return (
		  <div>
		     <p><Chunk identifier="cnk_123"/></p>
		     <p><Chunk identifier="cnk_321"> I have default content </Chunk></p>
		  </div>
		);
	}
	```

### Rendering chunk collections:
---

Chunk collections are simply a way to categorise chunks and can be used to render **repeatable content**.
Each collection can contain many properties and each property can hold different types of information.

A good use case example would be creating a "Team Member" collection. It may have `Full Name`,  `Title` and `Headshot` properties. Within your app, you may want to display the value of each of these properties for every "person" within the collection (i.e. every chunk) in a "Meet the Team" section or page.

You can do this by passing the chunk collection identifier as a prop to the *ChunkCollection* component. To render the name, title and headshot for each team member, pass the identifiers for each property  to the *ChunkProperty* component: 

```
import { ChunkCollection, ChunkProperty } from "editmode-react";

function Example() {
	return (
		<section className="meet_the_team">
			<ChunkCollection identifier="lst_123" className="team_member">
				<h2><ChunkProperty identifier="prop_001" className="full_name"/><h2>
				<h5><ChunkProperty identifier="prop_002" className="title"/></h5>
				<ChunkProperty identifier="prop_003" className="headshot"/>
			</ChunkCollection>
		</section>
	);
}
```
The above example would render editable headings containing the `Full Name` and `Title` for every person in the "Team Member" collection, as well as an image containing their `Headshot`.

### Step 3:

That's it! You can now edit and save all of the chunks in your React app from within the browser - just add `editmode=1` as a query string parameter to the current URL.
