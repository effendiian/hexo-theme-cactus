'use strict';

/**
 * @typedef {object} GoogleFormComponentOptions
 * @property {string} id The iframe id.
 * @property {number} [height] The height of the iframe.
 * @property {number} [width] The width of the iframe.
 * @property {number} [frameborder] The border size of the frame.
 * @property {number} [marginheight] The margin height of the iframe.
 * @property {number} [marginwidth] The margin width of the iframe.
 * @property {string} [title] The title of the iframe.
 * @property {string} [placeholder] The placeholder content of the iframe.
 *
 * @typedef {string} GoogleFormComponentReturn
 */

/**
 * Create a google form snippet.
 * @param {GoogleFormComponentOptions} options
 * @returns {GoogleFormComponentReturn}
 */
const GoogleFormComponent = function (options) {
    // Get options or defaults.
    const { 
        id,
        width = 600,
        height = 1145,
        frameborder = 0,
        marginheight = 0,
        marginwidth = 0,
        placeholder = "Loading..."
    } = options ?? {};

    // Create the encoded URI.
    const embed_url = encodeURI(`https://docs.google.com/forms/d/e/${id}/viewform?embedded=true`);
    
    // Get the attribute string.
    const attrs = [
        `src="${embed_url}"`,
        `width="${width}"`,
        `height="${height}"`,
        `frameborder="${frameborder}"`,
        `marginheight="${marginheight}"`,
        `marginwidth="${marginwidth}"`,
    ].join(" ");

    // Handle element resolution.
    if (id === undefined) {
        return `<div>An error occurred while rendering the form. Please contact the site maintainer.</div>`;
    } else {
        return `<iframe ${attrs}>${placeholder}</iframe>`;
    }
}

/** Register the helper function. */
hexo.extend.helper.register("google_form", GoogleFormComponent);