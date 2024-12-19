/* Run this in Firefox's console to output 
* all CSS rules for the entire page as a string. 
* You can wrap this in `copy()` to copy the output 
* to the clipboard. If you wrap it in `copy()`, 
* remember to remove the final semicolon (;). 
*
* Confirmed working on Firefox 133.0.3. May work on 
* other versions or other browsers
*
* The below function originated from user Zenit on 
* Stack Overflow and is therefore licensed under the 
* same terms as that code (Creative Commons 
* Attribution-Share Alike 4.0 International 
* (CC BY-SA 4.0) license) */

(function (){
    let cssStyles = '';
  
    // Started at index 1 for index 0 is browser's user agent stylesheet.
    for (let i = 1; i < document.styleSheets.length; i++) {
      let style = null;
  
      try {
        if (document.styleSheets[i]) {
          const classes =
            document.styleSheets[i].cssRules || document.styleSheets[i].rules;
  
          if (classes) style = classes;
        }
        for (const item in style) {
          if (style[item].cssText != undefined) cssStyles += style[item].cssText;
        }
      } catch (e) {
        continue;
      }
  
      
    }
  
    return cssStyles;
  })();