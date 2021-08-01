//@ts-ignore
import { useCallback, useEffect, useRef, useState } from "react";
import { requestIdleCallback, cancelIdleCallback } from "./utilities";

const hasIntersectionObserver = typeof IntersectionObserver !== "undefined";

export function useIntersection({ rootMargin, disabled }) {
  const isDisabled = disabled || !hasIntersectionObserver;

  const unobserve = useRef();
  const [visible, setVisible] = useState(false);

  const setRef = useCallback(
    (el) => {
      if (unobserve.current) {
        unobserve.current();
        unobserve.current = undefined;
      }

      if (isDisabled || visible) return;

      if (el && el.tagName) {
        unobserve.current = observe(
          el,
          (isVisible) => isVisible && setVisible(isVisible),
          { rootMargin }
        );
      }
    },
    [isDisabled, rootMargin, visible]
  );

  useEffect(() => {
    if (!hasIntersectionObserver) {
      if (!visible) {
        const idleCallback = requestIdleCallback(() => setVisible(true));
        return () => cancelIdleCallback(idleCallback);
      }
    }
  }, [visible]);

  return [setRef, visible];
}

function observe(element, callback, options) {
  const { id, observer, elements } = createObserver(options);
  elements.set(element, callback);

  observer.observe(element);
  return function unobserve() {
    elements.delete(element);
    observer.unobserve(element);

    // Destroy observer when there's nothing left to watch:
    if (elements.size === 0) {
      observer.disconnect();
      observers.delete(id);
    }
  };
}

const observers = new Map();
function createObserver(options) {
  const id = options.rootMargin || "";
  let instance = observers.get(id);
  if (instance) {
    return instance;
  }

  const elements = new Map();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const callback = elements.get(entry.target);
      const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;
      if (callback && isVisible) {
        callback(isVisible);
      }
    });
  }, options);

  observers.set(
    id,
    (instance = {
      id,
      observer,
      elements,
    })
  );
  return instance;
}
