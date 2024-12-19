/* Select an object in Firefox's Inspector, 
* the run this in console to output all CSS 
* rules for object and all descendants, limited 
* to the styles that are actually defined in the 
* stylesheets and inline styles, not browser-defined 
* styles or other styles that are inherited. 
* Result is returned as an object. 
*
* Confirmed working on Firefox 133.0.3. 
* May work on other versions or other browsers*/

(function() {
    let selected = $0;
    let rules = [];
    
    function getDefinedStyles(element) {
        let sheets = document.styleSheets;
        let elementRules = [];
        let selector = '';
        
        // Build selector for this element
        selector = element.tagName.toLowerCase();
        if (element.id) selector += '#' + element.id;
        if (element.className) {
            selector += '.' + Array.from(element.classList).join('.');
        }
        
        // Check each stylesheet
        for (let sheet of sheets) {
            try {
                let cssRules = sheet.cssRules || sheet.rules;
                for (let rule of cssRules) {
                    try {
                        // Check if this rule matches our element
                        if (element.matches(rule.selectorText)) {
                            elementRules.push(`${rule.selectorText} {\n${rule.style.cssText.split(';').join(';\n')}\n}`);
                        }
                    } catch(e) {
                        // Skip rules that might cause errors (like @import)
                        continue;
                    }
                }
            } catch(e) {
                // Skip cross-origin stylesheets
                continue;
            }
        }
        
        // Add inline styles if any exist
        if (element.style.length > 0) {
            let inlineStyles = `${selector} [inline] {\n`;
            for (let prop of element.style) {
                inlineStyles += `    ${prop}: ${element.style.getPropertyValue(prop)};\n`;
            }
            inlineStyles += '}';
            elementRules.push(inlineStyles);
        }
        
        if (elementRules.length > 0) {
            rules.push(`/* Styles for ${selector} */`);
            rules = rules.concat(elementRules);
        }
        
        // Process all descendants
        element.querySelectorAll('*').forEach(descendant => {
            getDefinedStyles(descendant);
        });
    }
    
    getDefinedStyles(selected);
    console.log(rules.join('\n\n'));
})();