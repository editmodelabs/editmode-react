// @ts-nocheck
import React from "react";
import { toBase64, Head } from "./utilities";
import { imageConfigDefault, VALID_LOADERS } from "./utilities";
import { useIntersection } from "./use-intersection";

const loadedImageURLs = new Set();

if (typeof window === "undefined") {
  global.__NEXT_IMAGE_IMPORTED = true;
}

const VALID_LOADING_VALUES = ["lazy", "eager", undefined];

const loaders = new Map([
  ["default", defaultLoader],
  ["imgix", imgixLoader],
  ["cloudinary", cloudinaryLoader],
  ["akamai", akamaiLoader],
  ["custom", customLoader],
]);

const VALID_LAYOUT_VALUES = [
  "fill",
  "fixed",
  "intrinsic",
  "responsive",
  undefined,
];

function isStaticRequire(src) {
  return src.default !== undefined;
}

function isStaticImageData(src) {
  return src.src !== undefined;
}

function isStaticImport(src) {
  return typeof src === "object";
}

const {
  deviceSizes: configDeviceSizes,
  imageSizes: configImageSizes,
  loader: configLoader,
  path: configPath,
  domains: configDomains,
} = process.env.__NEXT_IMAGE_OPTS || imageConfigDefault;
// sort smallest to largest
const allSizes = [...configDeviceSizes, ...configImageSizes];
configDeviceSizes.sort((a, b) => a - b);
allSizes.sort((a, b) => a - b);

function getWidths(width, layout, sizes) {
  if (sizes && (layout === "fill" || layout === "responsive")) {
    // Find all the "vw" percent sizes used in the sizes prop
    const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g;
    const percentSizes = [];
    for (let match; (match = viewportWidthRe.exec(sizes)); match) {
      percentSizes.push(parseInt(match[2]));
    }
    if (percentSizes.length) {
      const smallestRatio = Math.min(...percentSizes) * 0.01;
      return {
        widths: allSizes.filter(
          (s) => s >= configDeviceSizes[0] * smallestRatio
        ),
        kind: "w",
      };
    }
    return { widths: allSizes, kind: "w" };
  }
  if (
    typeof width !== "number" ||
    layout === "fill" ||
    layout === "responsive"
  ) {
    return { widths: configDeviceSizes, kind: "w" };
  }

  const widths = [
    ...new Set(
      [width, width * 2 /*, width * 3*/].map(
        (w) => allSizes.find((p) => p >= w) || allSizes[allSizes.length - 1]
      )
    ),
  ];
  return { widths, kind: "x" };
}

function generateImgAttrs({
  src,
  unoptimized,
  layout,
  width,
  quality,
  sizes,
  loader,
}) {
  if (unoptimized) {
    return { src, srcSet: undefined, sizes: undefined };
  }

  const { widths, kind } = getWidths(width, layout, sizes);
  const last = widths.length - 1;

  return {
    sizes: !sizes && kind === "w" ? "100vw" : sizes,
    srcSet: widths
      .map(
        (w, i) =>
          `${loader({ src, quality, width: w })} ${
            kind === "w" ? w : i + 1
          }${kind}`
      )
      .join(", "),
    src: loader({ src, quality, width: widths[last] }),
  };
}

function getInt(x) {
  if (typeof x === "number") {
    return x;
  }
  if (typeof x === "string") {
    return parseInt(x, 10);
  }
  return undefined;
}

function defaultImageLoader(loaderProps) {
  const load = loaders.get(configLoader);
  if (load) {
    return load({ root: configPath, ...loaderProps });
  }
  throw new Error(
    `Unknown "loader" found in "next.config.js". Expected: ${VALID_LOADERS.join(
      ", "
    )}. Received: ${configLoader}`
  );
}

function handleLoading(img, src, placeholder, onLoadingComplete) {
  if (!img) {
    return;
  }
  const handleLoad = () => {
    if (!img.src.startsWith("data:")) {
      const p = "decode" in img ? img.decode() : Promise.resolve();
      p.catch(() => {}).then(() => {
        if (placeholder === "blur") {
          img.style.filter = "none";
          img.style.backgroundSize = "none";
          img.style.backgroundImage = "none";
        }
        loadedImageURLs.add(src);
        if (onLoadingComplete) {
          onLoadingComplete();
        }
      });
    }
  };
  if (img.complete) {
    handleLoad();
  } else {
    img.onload = handleLoad;
  }
}

export function NextImage({
  src,
  sizes,
  unoptimized = false,
  priority = false,
  loading,
  lazyBoundary = "200px",
  className,
  quality,
  width,
  height,
  objectFit,
  objectPosition,
  onLoadingComplete,
  loader = defaultImageLoader,
  placeholder = "empty",
  blurDataURL,
  ...all
}) {
  let rest = all;
  let layout = sizes ? "responsive" : "intrinsic";
  if ("layout" in rest) {
    // Override default layout if the user specified one:
    if (rest.layout) layout = rest.layout;

    // Remove property so it's not spread into image:
    delete rest["layout"];
  }

  let staticSrc = "";
  if (isStaticImport(src)) {
    const staticImageData = isStaticRequire(src) ? src.default : src;

    if (!staticImageData.src) {
      throw new Error(
        `An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(
          staticImageData
        )}`
      );
    }
    blurDataURL = blurDataURL || staticImageData.blurDataURL;
    staticSrc = staticImageData.src;
    if (!layout || layout !== "fill") {
      height = height || staticImageData.height;
      width = width || staticImageData.width;
      if (!staticImageData.height || !staticImageData.width) {
        throw new Error(
          `An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(
            staticImageData
          )}`
        );
      }
    }
  }
  src = typeof src === "string" ? src : staticSrc;

  const widthInt = getInt(width);
  const heightInt = getInt(height);
  const qualityInt = getInt(quality);

  let isLazy =
    !priority && (loading === "lazy" || typeof loading === "undefined");
  if (src.startsWith("data:")) {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
    unoptimized = true;
    isLazy = false;
  }
  if (typeof window !== "undefined" && loadedImageURLs.has(src)) {
    isLazy = false;
  }

  if (process.env.NODE_ENV !== "production") {
    if (!src) {
      throw new Error(
        `Image is missing required "src" property. Make sure you pass "src" in props to the \`next/image\` component. Received: ${JSON.stringify(
          { width, height, quality }
        )}`
      );
    }
    if (!VALID_LAYOUT_VALUES.includes(layout)) {
      throw new Error(
        `Image with src "${src}" has invalid "layout" property. Provided "${layout}" should be one of ${VALID_LAYOUT_VALUES.map(
          String
        ).join(",")}.`
      );
    }
    if (
      (typeof widthInt !== "undefined" && isNaN(widthInt)) ||
      (typeof heightInt !== "undefined" && isNaN(heightInt))
    ) {
      throw new Error(
        `Image with src "${src}" has invalid "width" or "height" property. These should be numeric values.`
      );
    }
    if (layout === "fill" && (width || height)) {
      console.warn(
        `Image with src "${src}" and "layout='fill'" has unused properties assigned. Please remove "width" and "height".`
      );
    }
    if (!VALID_LOADING_VALUES.includes(loading)) {
      throw new Error(
        `Image with src "${src}" has invalid "loading" property. Provided "${loading}" should be one of ${VALID_LOADING_VALUES.map(
          String
        ).join(",")}.`
      );
    }
    if (priority && loading === "lazy") {
      throw new Error(
        `Image with src "${src}" has both "priority" and "loading='lazy'" properties. Only one should be used.`
      );
    }
    if (placeholder === "blur") {
      if (layout !== "fill" && (widthInt || 0) * (heightInt || 0) < 1600) {
        console.warn(
          `Image with src "${src}" is smaller than 40x40. Consider removing the "placeholder='blur'" property to improve performance.`
        );
      }
      if (!blurDataURL) {
        const VALID_BLUR_EXT = ["jpeg", "png", "webp"]; // should match next-image-loader

        throw new Error(
          `Image with src "${src}" has "placeholder='blur'" property but is missing the "blurDataURL" property.
          Possible solutions:
            - Add a "blurDataURL" property, the contents should be a small Data URL to represent the image
            - Change the "src" property to a static import with one of the supported file types: ${VALID_BLUR_EXT.join(
              ","
            )}
            - Remove the "placeholder" property, effectively no blur effect
          Read more: https://nextjs.org/docs/messages/placeholder-blur-data-url`
        );
      }
    }
    if ("ref" in rest) {
      console.warn(
        `Image with src "${src}" is using unsupported "ref" property. Consider using the "onLoadingComplete" property instead.`
      );
    }
    if ("style" in rest) {
      console.warn(
        `Image with src "${src}" is using unsupported "style" property. Please use the "className" property instead.`
      );
    }
    const rand = Math.floor(Math.random() * 1000) + 100;
    if (
      !unoptimized &&
      !loader({ src, width: rand, quality: 75 }).includes(rand.toString())
    ) {
      console.warn(
        `Image with src "${src}" has a "loader" property that does not implement width. Please implement it or use the "unoptimized" property instead.` +
          `\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader-width`
      );
    }
  }

  const [setRef, isIntersected] = useIntersection({
    rootMargin: lazyBoundary,
    disabled: !isLazy,
  });
  const isVisible = !isLazy || isIntersected;

  let wrapperStyle;
  let sizerStyle;
  let sizerSvg;
  let imgStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,

    boxSizing: "border-box",
    padding: 0,
    border: "none",
    margin: "auto",

    display: "block",
    width: 0,
    height: 0,
    minWidth: "100%",
    maxWidth: "100%",
    minHeight: "100%",
    maxHeight: "100%",

    objectFit,
    objectPosition,
  };
  const blurStyle =
    placeholder === "blur"
      ? {
          filter: "blur(20px)",
          backgroundSize: objectFit || "cover",
          backgroundImage: `url("${blurDataURL}")`,
          backgroundPosition: objectPosition || "0% 0%",
        }
      : {};
  if (layout === "fill") {
    // <Image src="i.png" layout="fill" />
    wrapperStyle = {
      display: "block",
      overflow: "hidden",

      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,

      boxSizing: "border-box",
      margin: 0,
    };
  } else if (
    typeof widthInt !== "undefined" &&
    typeof heightInt !== "undefined"
  ) {
    // <Image src="i.png" width="100" height="100" />
    const quotient = heightInt / widthInt;
    const paddingTop = isNaN(quotient) ? "100%" : `${quotient * 100}%`;
    if (layout === "responsive") {
      // <Image src="i.png" width="100" height="100" layout="responsive" />
      wrapperStyle = {
        display: "block",
        overflow: "hidden",
        position: "relative",

        boxSizing: "border-box",
        margin: 0,
      };
      sizerStyle = { display: "block", boxSizing: "border-box", paddingTop };
    } else if (layout === "intrinsic") {
      // <Image src="i.png" width="100" height="100" layout="intrinsic" />
      wrapperStyle = {
        display: "inline-block",
        maxWidth: "100%",
        overflow: "hidden",
        position: "relative",
        boxSizing: "border-box",
        margin: 0,
      };
      sizerStyle = {
        boxSizing: "border-box",
        display: "block",
        maxWidth: "100%",
      };
      sizerSvg = `<svg width="${widthInt}" height="${heightInt}" xmlns="http://www.w3.org/2000/svg" version="1.1"/>`;
    } else if (layout === "fixed") {
      // <Image src="i.png" width="100" height="100" layout="fixed" />
      wrapperStyle = {
        overflow: "hidden",
        boxSizing: "border-box",
        display: "inline-block",
        position: "relative",
        width: widthInt,
        height: heightInt,
      };
    }
  } else {
    // <Image src="i.png" />
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        `Image with src "${src}" must use "width" and "height" properties or "layout='fill'" property.`
      );
    }
  }

  let imgAttributes = {
    src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    srcSet: undefined,
    sizes: undefined,
  };

  if (isVisible) {
    imgAttributes = generateImgAttrs({
      src,
      unoptimized,
      layout,
      width: widthInt,
      quality: qualityInt,
      sizes,
      loader,
    });
  }

  let srcString = src;

  return (
    <div style={wrapperStyle}>
      {sizerStyle ? (
        <div style={sizerStyle}>
          {sizerSvg ? (
            <img
              style={{
                maxWidth: "100%",
                display: "block",
                margin: 0,
                border: "none",
                padding: 0,
              }}
              alt=""
              aria-hidden={true}
              role="presentation"
              src={`data:image/svg+xml;base64,${toBase64(sizerSvg)}`}
            />
          ) : null}
        </div>
      ) : null}
      {!isVisible && (
        <noscript>
          <img
            {...rest}
            {...generateImgAttrs({
              src,
              unoptimized,
              layout,
              width: widthInt,
              quality: qualityInt,
              sizes,
              loader,
            })}
            decoding="async"
            style={imgStyle}
            className={className}
          />
        </noscript>
      )}
      <img
        {...rest}
        {...imgAttributes}
        decoding="async"
        className={className}
        ref={(img) => {
          setRef(img);
          handleLoading(img, srcString, placeholder, onLoadingComplete);
        }}
        style={{ ...imgStyle, ...blurStyle }}
      />
      {priority ? (
        // Note how we omit the `href` attribute, as it would only be relevant
        // for browsers that do not support `imagesrcset`, and in those cases
        // it would likely cause the incorrect image to be preloaded.
        //
        // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
        <Head>
          <link
            key={
              "__nimg-" +
              imgAttributes.src +
              imgAttributes.srcSet +
              imgAttributes.sizes
            }
            rel="preload"
            as="image"
            href={imgAttributes.srcSet ? undefined : imgAttributes.src}
            // @ts-ignore: imagesrcset is not yet in the link element type
            imagesrcset={imgAttributes.srcSet}
            // @ts-ignore: imagesizes is not yet in the link element type
            imagesizes={imgAttributes.sizes}
          ></link>
        </Head>
      ) : null}
    </div>
  );
}

function normalizeSrc(src) {
  return src[0] === "/" ? src.slice(1) : src;
}

function imgixLoader({ root, src, width, quality }) {
  // Demo: https://static.imgix.net/daisy.png?auto=format&fit=max&w=300
  const url = new URL(`${root}${normalizeSrc(src)}`);
  const params = url.searchParams;

  params.set("auto", params.get("auto") || "format");
  params.set("fit", params.get("fit") || "max");
  params.set("w", params.get("w") || width.toString());

  if (quality) {
    params.set("q", quality.toString());
  }

  return url.href;
}

function akamaiLoader({ root, src, width }) {
  return `${root}${normalizeSrc(src)}?imwidth=${width}`;
}

function cloudinaryLoader({ root, src, width, quality }) {
  // Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
  const params = [
    "f_auto",
    "c_limit",
    "w_" + width,
    "q_" + (quality || "auto"),
  ];
  let paramsString = params.join(",") + "/";
  return `${root}${paramsString}${normalizeSrc(src)}`;
}

function customLoader({ src }) {
  throw new Error(
    `Image with src "${src}" is missing "loader" prop.` +
      `\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader`
  );
}

function defaultLoader({ root, src, width, quality }) {
  if (process.env.NODE_ENV !== "production") {
    const missingValues = [];

    // these should always be provided but make sure they are
    if (!src) missingValues.push("src");
    if (!width) missingValues.push("width");

    if (missingValues.length > 0) {
      throw new Error(
        `Next Image Optimization requires ${missingValues.join(
          ", "
        )} to be provided. Make sure you pass them as props to the \`next/image\` component. Received: ${JSON.stringify(
          { src, width, quality }
        )}`
      );
    }

    if (src.startsWith("//")) {
      throw new Error(
        `Failed to parse src "${src}" on \`next/image\`, protocol-relative URL (//) must be changed to an absolute URL (http:// or https://)`
      );
    }

    if (!src.startsWith("/") && configDomains) {
      let parsedSrc;
      try {
        parsedSrc = new URL(src);
      } catch (err) {
        console.error(err);
        throw new Error(
          `Failed to parse src "${src}" on \`next/image\`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)`
        );
      }

      if (
        process.env.NODE_ENV !== "test" &&
        !configDomains.includes(parsedSrc.hostname)
      ) {
        throw new Error(
          `Invalid src prop (${src}) on \`next/image\`, hostname "${parsedSrc.hostname}" is not configured under images in your \`next.config.js\`\n` +
            `See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host`
        );
      }
    }
  }

  return `${root}?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
}
