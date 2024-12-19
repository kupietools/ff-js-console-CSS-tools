# Firefox JS Console CSS Utils

A collection of utility scripts for analyzing CSS in Firefox's Developer Tools.

## Scripts

### ff-whole-page-css.js
A browser console script that extracts all CSS rules from every stylesheet on the current page (except the browser's user agent stylesheet). 

#### Usage
1. Open Firefox Developer Tools (possibly F12 or option-command-i)
2. Copy and paste the script into the Console
3. Run the script (optionally wrap in `copy()` to copy to clipboard)
4. The output will be a string containing all CSS rules from the page

### ff-element-descendants-computed-css.js
A browser console script that extracts all computed CSS styles for a selected element and its descendants in Firefox's Inspector. This includes:
- Browser-defined styles
- Inherited styles
- Applied styles from stylesheets
- Inline styles

#### Usage
1. Open Firefox Developer Tools (possibly F12 or option-command-i)
2. Select an element in the Inspector
3. Copy and paste the script into the Console
4. Run the script
5. The output will be a formatted list of CSS rules for the selected element and all its descendants
6. Note that this function runs slowly and it may sit for a few minutes and appear not to be doing anything before the output appears. Be patient.

### ff-element-descendants-defined-css.js
A browser console script that extracts only explicitly defined CSS styles for a selected element and its descendants. This includes:
- Styles defined in stylesheets
- Inline styles
- Excludes browser-defined and inherited styles

#### Usage
Same as above, but the output will only include styles that are explicitly defined in your stylesheets or as inline styles.

## Requirements
- Firefox Browser (Confirmed working on Firefox 133.0.3)
- May work on other browsers that support `$0` reference and the required DOM APIs

## License
This repository contains code under two licenses:

### MIT License
The original code in this repository is licensed under the MIT License:
- `ff-element-descendants-computed-css.js`
- `ff-element-descendants-defined-css.js`

Copyright (c) 2024 Michael E. Kupietz <kupietools@michaelkupietz.com>

See the [LICENSE](LICENSE) file for full MIT license terms.

### CC BY-SA 4.0 License
Some code originated from other sources and maintains its original license:
- `ff-whole-page-css.js` contains code by Stack Overflow user Zenit, licensed under [Creative Commons Attribution-Share Alike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/)