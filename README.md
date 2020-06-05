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
	     <p> <Chunk identifier="cnk_123"/> </p>
	     <p> <Chunk identifier="cnk_321"> I have default content </Chunk> </p>
	  </div>
	);
}
```

Alternatively, if you are using one of our **text editor plugins** and would like to create a new chunk directly from the editor, you may select the piece of text you would like to convert and hit CMD+SHIFT+L. (For Visual Studio Code users, you can also hit CMD+SHIFT+P to open the command palette, type "Editmode: Create Chunk" and hit enter).

#### Rendering a chunk collection:

Chunk collections are simply a way to categorise chunks and can be used to render repeatable content.
Each collection can contain many properties and each property can hold different types of information.

A good use case example would be creating a "Team Member" collection. It may have `Full Name`,  `Title` and `Headshot` properties. Within your React app, you may want to display the name, title and headshot of all your team members (ie all chunks within the Team Member collection). You can do this by passing the chunk collection identifier as a prop to the ChunkCollection component. To render the name, title and headshot for each team member, pass the identifiers for each property as a prop to the ChunkProperty component: 

```
import { ChunkCollection, ChunkProperty } from "editmode-react";

function Example() {
	return (
	   <section className="meet_the_team">
	       <ChunkCollection identifier="lst_123" className="team_member">
		  <h2> <ChunkProperty identifier="prop_001" className="name"/> <h2>
		  <h5> <ChunkProperty identifier="prop_002" className="title"/> </h5>
		  <ChunkProperty identifier="prop_003" className="headshot"/>
	       </ChunkCollection>
	   </section>
	);
}
```
This will render editable headings containing the name and title and an image containing the headshot for every person in the "Team Member" collection.

### Step 3:

You can now edit and save all of the chunks in your React app from within the browser - just add `editmode=1` as a query string parameter to the current URL.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://ericclemmons.com/"><img src="https://avatars0.githubusercontent.com/u/15182?v=4" width="40px;" alt=""/><br /><sub><b>Eric Clemmons</b></sub></a><br /><a href="https://github.com/Editmode-app/editmode-react/commits?author=ericclemmons" title="Documentation">📖</a> <a href="#infra-ericclemmons" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/Editmode-app/editmode-react/commits?author=ericclemmons" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!