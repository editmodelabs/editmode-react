//@ts-ignore
import React, { useContext } from "react";
import Effect from "./side-effect.jsx";
import { AmpStateContext } from "./amp-context";
import { HeadManagerContext } from "./head-manager-context";
import { isInAmpMode } from "./amp";

export function defaultHead(inAmpMode = false) {
  const head = [<meta charSet="utf-8" />];
  if (!inAmpMode) {
    head.push(<meta name="viewport" content="width=device-width" />);
  }
  return head;
}

function onlyReactElement(list, child) {
  if (typeof child === "string" || typeof child === "number") {
    return list;
  }
  // Adds support for React.Fragment
  if (child.type === React.Fragment) {
    return list.concat(
      React.Children.toArray(child.props.children).reduce(
        (fragmentList, fragmentChild) => {
          if (
            typeof fragmentChild === "string" ||
            typeof fragmentChild === "number"
          ) {
            return fragmentList;
          }
          return fragmentList.concat(fragmentChild);
        },
        []
      )
    );
  }
  return list.concat(child);
}

const METATYPES = ["name", "httpEquiv", "charSet", "itemProp"];

function unique() {
  const keys = new Set();
  const tags = new Set();
  const metaTypes = new Set();
  const metaCategories = {};

  return (h) => {
    let isUnique = true;
    let hasKey = false;

    if (h.key && typeof h.key !== "number" && h.key.indexOf("$") > 0) {
      hasKey = true;
      const key = h.key.slice(h.key.indexOf("$") + 1);
      if (keys.has(key)) {
        isUnique = false;
      } else {
        keys.add(key);
      }
    }

    // eslint-disable-next-line default-case
    switch (h.type) {
      case "title":
      case "base":
        if (tags.has(h.type)) {
          isUnique = false;
        } else {
          tags.add(h.type);
        }
        break;
      case "meta":
        for (let i = 0, len = METATYPES.length; i < len; i++) {
          const metatype = METATYPES[i];
          if (!h.props.hasOwnProperty(metatype)) continue;

          if (metatype === "charSet") {
            if (metaTypes.has(metatype)) {
              isUnique = false;
            } else {
              metaTypes.add(metatype);
            }
          } else {
            const category = h.props[metatype];
            const categories = metaCategories[metatype] || new Set();
            if ((metatype !== "name" || !hasKey) && categories.has(category)) {
              isUnique = false;
            } else {
              categories.add(category);
              metaCategories[metatype] = categories;
            }
          }
        }
        break;
    }

    return isUnique;
  };
}

/**
 *
 * @param headElements List of multiple <Head> instances
 */
function reduceComponents(headElements, props) {
  return headElements
    .reduce((list, headElement) => {
      const headElementChildren = React.Children.toArray(
        headElement.props.children
      );
      return list.concat(headElementChildren);
    }, [])
    .reduce(onlyReactElement, [])
    .reverse()
    .concat(defaultHead(props.inAmpMode))
    .filter(unique())
    .reverse()
    .map((c, i) => {
      const key = c.key || i;
      if (
        process.env.NODE_ENV !== "development" &&
        process.env.__NEXT_OPTIMIZE_FONTS &&
        !props.inAmpMode
      ) {
        if (
          c.type === "link" &&
          c.props["href"] &&
          ["https://fonts.googleapis.com/css", "https://use.typekit.net/"].some(
            (url) => c.props["href"].startsWith(url)
          )
        ) {
          const newProps = { ...(c.props || {}) };
          newProps["data-href"] = newProps["href"];
          newProps["href"] = undefined;

          newProps["data-optimized-fonts"] = true;

          return React.cloneElement(c, newProps);
        }
      }
      return React.cloneElement(c, { key });
    });
}

export function Head({ children }) {
  const ampState = useContext(AmpStateContext);
  const headManager = useContext(HeadManagerContext);
  return (
    <Effect
      reduceComponentsToState={reduceComponents}
      headManager={headManager}
      inAmpMode={isInAmpMode(ampState)}
    >
      {children}
    </Effect>
  );
}
