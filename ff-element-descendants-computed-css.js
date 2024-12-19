/* Select an object in Firefox's Inspector, 
* the run this in console to output all CSS 
* rules for object and all descendants, including 
* browser-defined styles and styles that are inherited. 
* Result is returned as an object. 
*
* Confirmed working on Firefox 133.0.3. 
* May work on other versions or other browsers
* 
* Note that this function runs slowly and it may
* sit for a few minutes and appear not to be doing 
* anything before the output appears. */

(function() {
    let selected = $0;  // $0 is Firefox's reference to currently selected element
    let rules = [];
    
    function getAllCssRules(element) {
        // Get computed styles
        let styles = window.getComputedStyle(element);
        let selector = element.tagName.toLowerCase();
        
        // Add id if exists
        if (element.id) selector += '#' + element.id;
        
        // Add classes if exist
        if (element.className) {
            selector += '.' + Array.from(element.classList).join('.');
        }
        
        // Create rule string
        let ruleText = `${selector} {\n`;
        for (let prop of styles) {
            ruleText += `    ${prop}: ${styles.getPropertyValue(prop)};\n`;
        }
        ruleText += `}\n`;
        rules.push(ruleText);
        
        // Process all descendants using querySelectorAll
        element.querySelectorAll('*').forEach(descendant => {
            let descendantStyles = window.getComputedStyle(descendant);
            let descendantSelector = descendant.tagName.toLowerCase();
            
            if (descendant.id) descendantSelector += '#' + descendant.id;
            if (descendant.className) {
                descendantSelector += '.' + Array.from(descendant.classList).join('.');
            }
            
            let descendantRuleText = `${descendantSelector} {\n`;
            for (let prop of descendantStyles) {
                descendantRuleText += `    ${prop}: ${descendantStyles.getPropertyValue(prop)};\n`;
            }
            descendantRuleText += `}\n`;
            rules.push(descendantRuleText);
        });
    }
    
    getAllCssRules(selected);
    console.log(rules.join('\n'));
})();
