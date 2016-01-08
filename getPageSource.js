function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }

    // extract iframes only 
    var iframes = html.match(/(<iframe.*?>.*?<\/iframe>)/g);

    var filtered = "";
    for(var i = 0; i < iframes.length; i++){
        filtered += filter_iframe(iframes[i])
        if(filtered == undefined){
            filtered = "YOLO";
        }
    }
    console.log("here filtered is: " + filtered);
    return filtered;
}

function filter_iframe(iframe_tag){
    var line_break = "<br />";
    var f = iframe_tag.concat(line_break);
    if(f == undefined){
        f = "YOLO";
    }
    return f;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});