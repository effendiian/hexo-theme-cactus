'use strict';

/**
 * @typedef {object} GoogleFormComponentOptions
 * @property {string} id The iframe id.
 * @property {number} [height] The height of the iframe.
 * @property {number} [width] The width of the iframe.
 * @property {string} [placeholder] The placeholder content of the iframe.
 * @property {number} [frameborder] The border size of the frame.
 * @property {number} [marginheight] The margin height of the iframe.
 * @property {number} [marginwidth] The margin width of the iframe.
 * @property {string} [title] The title of the iframe.
 *
 * @typedef {string} GoogleFormComponentReturn
 *
 * @typedef {(options: GoogleFormComponentOptions) => GoogleFormComponentReturn} GoogleFormComponentFn
 *
 * @typedef {(args: any[], content: string, callback?: Function) => string | PromiseLike<string>} TagFunction
 */

/**
 * Create the element HTML.
 * @param {string} id The iframe id.
 * @param {number} [height] The height of the iframe.
 * @param {number} [width] The width of the iframe.
 * @param {number} [frameborder] The border size of the frame.
 * @param {number} [marginheight] The margin height of the iframe.
 * @param {number} [marginwidth] The margin width of the iframe.
 * @param {string} [title] The title of the iframe.
 * @param {string} [placeholder] The placeholder content of the iframe.
 */
const getComponentOptions = (id, height, width, frameborder, marginheight, marginwidth, title, placeholder) => {
    return {
        id,
        height,
        width,
        placeholder,
        frameborder,
        marginheight,
        marginwidth,
        title
    }
}; 

/**
 * The helper function with bound context.
 * @type {GoogleFormComponentFn}
 */
const getContactFormHTML = hexo.extend.helper.get("google_form").bind(hexo);

// Define the tag.
/**
 * @type {{ name: string, macro: TagFunction }}
 */
const ContactFormTag = {
    name: "contact_form",
    macro: function (args, content) {
        // Build the element.
        const parameters = args;
        const options = getComponentOptions.apply({}, parameters);
        options.placeholder = content ?? options.placeholder;
        const iframe = getContactFormHTML(options);
        const element = `<div id="contact"><div class="contact-form">${iframe}</div></div>`;

        // Return the element content.
        return element;
    },
}

/** Register the helper function. */
hexo.extend.tag.register(
    ContactFormTag.name,
    ContactFormTag.macro
);