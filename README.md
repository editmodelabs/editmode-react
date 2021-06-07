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
      <ChunkCollection identifier="col_123..." className="team_member_container" itemClass="team_member">
        <h2><ChunkFieldValue identifier="fld_001..." className="name"/><h2>
        <h5><ChunkFieldValue identifier="fld_002..." className="title"/></h5>
        <div><ChunkFieldValue identifier="fld_003..." className="headshot"/></div>
      </ChunkCollection>
    </section>
	);
}
```

This will render editable headings containing the name and title and an image containing the headshot for every person in the "Team Member" collection.

#### ChunkCollection Attributes

| Attribute  | Type           | Description                                                                                                               |
| ---------- | -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| identifier | `string`       | Takes the id of a collection you want to loop through                                                                     |
| limit      | `int` `string` | `optional` The number of collection items you want to display                                                             |
| tags       | `array`        | `optional` Filter collection items based on tags listed in this prop                                                      |
| className  | `string`       | `optional` Class name(s) that will be added along with "chunks-collection-wrapper" to the main collection `<div>` element |
| itemClass  | `string`       | `optional` Class name(s) that will be added along with "chunks-collection-item--wrapper" to all collection items          |

#### ChunkFieldValue Attributes

| Attribute  | Type     | Description                                                                |
| ---------- | -------- | -------------------------------------------------------------------------- |
| identifier | `string` | Takes the identifier or field_name of a collection field                   |
| className  | `string` | `optional` Class name(s) that will be added in the chunk `em-span` element |

#### A different way to render a chunk collection based on your definition:

Our ChunkCollection component specifies a default rendering behaviour - it iterates over your chunk collection data and renders each collection item in the exact manner the collection was set up. However, you might be looking for a more specific behavior, like dynamically rendering chunks in the collection based on certain properties in your chunk collection data.

A good use case would be rendering a collection of e-gamer cards. Maybe you'd like to render the card of the highest scorer with a unique class name that specifies a different set of styles. You can achieve this using a combination of our useCollectionChunks hook and a trio of components (CustomChunkCollection, CollectionItemWrapper and ChunkFieldValue).

CustomChunkCollection is the parent wrapper for your collection, a bit like the ChunkCollection component is, but it lets you:

- Supply the data its children will render
- Determine what precisely is supplied to the inner components and alongside what

CollectionItemWrapper returns and wraps a `div` around each chunk in a collection.

useCollectionChunks returns an array of the chunks in a collection, with each chunk being an object containing data specific to that chunk (you may log its return value to your console to see the content of the array).

```js
import {
  Editmode,
  ChunkFieldValue,
  useCollectionChunks,
  CustomChunkCollection,
  CollectionItemWrapper,
} from "editmode-react";

function Example () {
  const collectionId = "col_Vy60de...";
  const chunks = useCollectionChunks(collectionId);
  return (
    <section className="gamer-cards">
        <CustomChunkCollection identifier="col_Vy60de...y" chunks={chunks}>
          {chunks.map((chunk) => (
            <CollectionItemWrapper chunk={chunk} className={some logic here based on a chunk property}
              key={chunk.identifier}>
              <h2>
                <ChunkFieldValue identifier="fld_QmQNy..." />
              </h2>
              <h3>
                <ChunkFieldValue identifier="fld_vr8o..." />
              </h3>
            </CollectionItemWrapper>
          ))}
        </CustomChunkCollection>
    </section>
  );
}
```

#### CustomChunkCollection Attributes

| Attribute  | Type           | Description                                                                                                             |
| ---------- | -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| identifier | `string`       | Takes the id of a collection you want to loop through                                                                   |
| chunks     | `array`        | This is the array of collections you've extracted from useCollectionChunks                                              |
| className  | `string`       | `optional` Class name(s) that will be added along with “chunks-collection-wrapper” to the main collection `div` element |
| limit      | `int` `string` | `optional` The number of collection items you want to display                                                           |
| tags       | `array`        | `optional` Filter collection items based on tags listed in this prop                                                    |

#### CollectionItemWrapper Attributes

| Attribute | Type     | Description                                                                                                                   |
| --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| chunk     | `object` | The current chunk object while iterating over a collection of chunks                                                          |
| className | `string` | `optional` Class name(s) that will be added along with “chunks-collection-item--wrapper” to the collection item `div `element |

#### Using default chunks array as fallback:

For cases when there's no internet connection but your app is designed to work in offline mode, Editmode supports having an array of default chunks as fallback.

```js
const defaultChunksValue = [
  {
    identifier: "cnk_2177d77492a2dead1585",
    chunk_type: "single_line_text",
    project_id: "prj_h3Gk3gFVMXbl",
    branch_id: "d1dWhVyF85Yr",
    master_branch: true,
    content_key: "",
    content: "This is a single line text!",
  },
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
        <Chunk
          identifier="cnk_2177d77492a2dead1585"
          variables={{ name: "John" }}
        />
      </Editmode>
    </section>
  );
}
```

With this, chunks such as `Hello, {{name}}!` will be parsed as `Hello, John!`

#### Working with Image Transformation:

Use `transformation` attribute to perform real-time image transformations to deliver perfect images to the end-users.

```js
// This chunk should render an image with 200 x 200 dimension
<Chunk identifier='cnk_23123123' transformation="w-200 h-200" />

// For image inside a collection
<ChunkCollection identifier="col_123...">
	<ChunkFieldValue identifier='Avatar' transformation="w-200 h-200"  />
</ChunkCollection>
```

Please see complete list of [transformation parameters](https://editmode.com/docs#/imagekit_properties).

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
    <td align="center"><a href="https://github.com/puuripurii"><img src="https://avatars1.githubusercontent.com/u/26903002?v=4?s=40" width="40px;" alt=""/><br /><sub><b>Jen Villaganas</b></sub></a><br /><a href="https://github.com/Editmode-app/editmode-react/commits?author=puuripurii" title="Code">💻</a> <a href="https://github.com/Editmode-app/editmode-react/commits?author=puuripurii" title="Documentation">📖</a> <a href="#infra-puuripurii" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="http://boseriko.com/"><img src="https://avatars1.githubusercontent.com/u/10940193?v=4?s=40" width="40px;" alt=""/><br /><sub><b>Bos Eriko Reyes</b></sub></a><br /><a href="https://github.com/Editmode-app/editmode-react/commits?author=BosEriko" title="Code">💻</a> <a href="https://github.com/Editmode-app/editmode-react/commits?author=BosEriko" title="Documentation">📖</a> <a href="#infra-BosEriko" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/francisbulus"><img src="https://avatars.githubusercontent.com/u/25318739?v=4?s=40" width="40px;" alt=""/><br /><sub><b>Francis Bulus</b></sub></a><br /><a href="https://github.com/Editmode-app/editmode-react/commits?author=francisbulus" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
