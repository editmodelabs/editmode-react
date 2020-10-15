# Editmode for React

Editmode allows you to turn plain text in your React app into easily inline-editable bits of content that can be managed by anyone with no technical knowledge.

## Installation

Use npm to install Editmode:

```
npm install editmode-react
```

or if you prefer yarn:

```
yarn add editmode-react
```

## Usage

### Step 1:

Within your React app, navigate to the index file within your src directory.
Import the Editmode wrapper and wrap your App within.
<div class="project-id-holder"></div>

```js
import { Editmode } from "editmode-react";

// 👉 `project_id` can be found in the URL:
// https://editmode.com/projects/{project_id}/chunks

ReactDOM.render(
  <React>
    <Editmode projectId={project_id}>
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

```js
import { Chunk } from "editmode-react";

function Example() {
  return (
    <section>
      <Chunk identifier="cnk_321">I have default content</Chunk>
      <Chunk identifier="cnk_123" />
    </section>
  );
}
```

Alternatively, if you are using one of our **text editor plugins** and would like to create a new chunk directly from the editor, you may select the piece of text you would like to convert and hit <button class="display-button">CMD</button>+<button class="display-button">SHIFT</button>+<button class="display-button">L</button> if you're on Mac and <button class="display-button">WIN</button>+<button class="display-button">SHIFT</button>+<button class="display-button">L</button> if you're on Windows. (For Visual Studio Code users, you can also hit <button class="display-button">CMD</button>+<button class="display-button">SHIFT</button>+<button class="display-button">P</button> if you're on Mac and <button class="display-button">WIN</button>+<button class="display-button">SHIFT</button>+<button class="display-button">P</button> if you're on Windows to open the command palette, type "Editmode: Create Chunk" and hit enter).

#### Rendering a chunk collection:

Chunk collections are simply a way to categorise chunks and can be used to render repeatable content.
Each collection can contain many properties and each property can hold different types of information.

A good use case example would be creating a "Team Member" collection. It may have `Full Name`, `Title` and `Headshot` properties. Within your React app, you may want to display the name, title and headshot of all your team members (ie all chunks within the Team Member collection). You can do this by passing the chunk collection identifier as a prop to the ChunkCollection component. To render the name, title and headshot for each team member, pass the identifiers for each property as a prop to the ChunkFieldValue component:

```js
import { ChunkCollection, ChunkFieldValue } from "editmode-react";

function Example() {
	return (
    <section className="meet_the_team">
      <ChunkCollection identifier="lst_123" className="team_member">
        <h2><ChunkFieldValue identifier="prop_001" className="name"/><h2>
        <h5><ChunkFieldValue identifier="prop_002" className="title"/></h5>
        <div><ChunkFieldValue identifier="prop_003" className="headshot"/></div>
      </ChunkCollection>
    </section>
	);
}
```

This will render editable headings containing the name and title and an image containing the headshot for every person in the "Team Member" collection.

#### Using default chunks array as fallback:

For cases when there's no internet connection but your app is designed to work in offline mode, Editmode supports having an array of default chunks as fallback.

```js
const defaultChunksValue = [
  {"identifier":"cnk_2177d77492a2dead1585","chunk_type":"single_line_text","project_id":"prj_h3Gk3gFVMXbl","branch_id":"d1dWhVyF85Yr","master_branch":true,"content_key":"","content":"This is a single line text!"},
];

function Example() {
  return (
    <section>
      <Editmode projectId="prj_h3Gk3gFVMXbl" defaultChunks={defaultChunksValue}>
        <Chunk identifier="cnk_2177d77492a2dead1585" />
      </Editmode>
    </section>
  );
}
```

#### Using variables:

Variables that are created in the Editmode CMS are also supported by passing an object prop as `variables`.

```js
function Example() {
  return (
    <section>
      <Editmode projectId="prj_h3Gk3gFVMXbl" defaultChunks={defaultChunksValue}>
        <Chunk identifier="cnk_2177d77492a2dead1585" variables={{ "name": "John" }} />
      </Editmode>
    </section>
  );
}
```

With this, chunks such as `Hello, {{name}}!` will be parsed as `Hello, John!`

### Step 3:

You can now edit and save all of the chunks in your React app from within the browser - just add `editmode=1` as a query string parameter to the current URL.

<div class="contributors-section"></div>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://ericclemmons.com/"><img src="https://avatars0.githubusercontent.com/u/15182?v=4?s=40" width="40px;" alt=""/><br /><sub><b>Eric Clemmons</b></sub></a><br /><a href="https://github.com/Editmode-app/editmode-react/commits?author=ericclemmons" title="Documentation">📖</a> <a href="#infra-ericclemmons" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/Editmode-app/editmode-react/commits?author=ericclemmons" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/puuripurii"><img src="https://avatars1.githubusercontent.com/u/26903002?v=4?s=40" width="40px;" alt=""/><br /><sub><b>Jen Villaganas</b></sub></a><br /><a href="https://github.com/Editmode-app/editmode-react/commits?author=puuripurii" title="Code">💻</a></td>
    <td align="center"><a href="http://boseriko.com/"><img src="https://avatars1.githubusercontent.com/u/10940193?v=4?s=40" width="40px;" alt=""/><br /><sub><b>Bos Eriko Reyes</b></sub></a><br /><a href="https://github.com/Editmode-app/editmode-react/commits?author=BosEriko" title="Code">💻</a> <a href="https://github.com/Editmode-app/editmode-react/commits?author=BosEriko" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
