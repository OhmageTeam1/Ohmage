/*
    XML processor for prompt page
*/

/*
    addProperties will add properties with right tag
    input: the XML of the prompt
    promptType: prompt's type (multiple choice, single choice, etc..)
*/
function addProperties(input, promptType) {
    xml = $.parseXML(input);
    text = $(xml).find("properties").text();
    var newText = "";
    if (promptType == "Multiple Choice" || promptType == "Multiple Choice Custom") {
        properties = text.split("\n");
        lenText = properties.length;
        for (i = 0; i < lenText; i++)
        {
            property = properties[i].split(":");
            key = "<key>" + i + "</key>";
            label = "<label>" + property[0] + "</label>";
            value = "<value>" + property[1] + "</value>";
            
            if (property[0] != "") {
                if (property[1] != "") {
                    newText += "<property>" + key + label + value + "</property>"
                }
                else {
                    newText += "<property>" + key + label + "</property>"
                }
            }
        }
        $(xml).find("properties").text(newText);
        return xml;
    }
    else if (promptType == "Number") {
        properties = text.split("\n");
        for (i = 0; i < 2; i++)
        {
            property = properties[i].split(":");
            key = "<key>" + property[0] + "</key>";
            label = "<label>" + property[1] + "</label>";
            newText += "<property>" + key + label + "</property>"
        }
        $(xml).find("properties").text(newText);
        return xml;
    }
    else if (promptType == "Photo") {
        properties = text.split("\n");
        property = properties[0].split(":");
        key = "<key>" + property[1] + "</key>";
        newText += "<property>" + key + "</property>"
        $(xml).find("properties").text(newText);
        return xml;
    }
    else if (promptType == "Remote Activity") {
        properties = text.split("\n");
        lenText = properties.length;
        for (i = 0; i < lenText; i++)
        {
            property = properties[i].split(":");
            key = "<key>" + property[0].toLowerCase() + "</key>";
            label = "<label>" + property[1] + "</label>";
            if (property[0] != "") {
                newText += "<property>" + key + label + "</property>";
            }
        }
        $(xml).find("properties").text(newText);
        return xml;
    }
    else if (promptType == "Single Choice" || promptType == "Single Choice Custom") {
        properties = text.split("\n");
        lenText = properties.length;
        for (i = 0; i < lenText; i++)
        {
            property = properties[i].split(":");
            key = "<key>" + i + "</key>";
            label = "<label>" + property[0] + "</label>";
            value = "<value>" + property[1] + "</value>";
            
            if (property[0] != "") {
                if (property[1] != "") {
                    newText += "<property>" + key + label + value + "</property>"
                }
                else {
                    newText += "<property>" + key + label + "</property>"
                }
            }
        }
        $(xml).find("properties").text(newText);
        return xml;
    }
    else if (promptType == "Text") {
        properties = text.split("\n");
        for (i = 0; i < 2; i++)
        {
            property = properties[i].split(":");
            key = "<key>" + property[0].toLowerCase() + "</key>";
            label = "<label>" + property[1] + "</label>";
            newText += "<property>" + key + label + "</property>"
        }
        $(xml).find("properties").text(newText);
        return xml;
    }
    else if (promptType == "Timestamp") {
        // doing nothing
        return xml;
    }
    else {
        // invalid
        return xml;
    }
    
}

/*
    extractProperties will extract all properties and return the text inside the properties tag
    input: the XML of the prompt
    promptType: prompt's type (multiple choice, single choice, etc..)
*/
function extractProperties(input, promptType) {
    //xml = $.parseXML(input);
    xml = input;
    text = $(xml).find("properties").text();
    var properties = "";
    
    $(xml).find('property').each(function(){
        console.log('Test');
        if (promptType == "Multiple Choice" || promptType == "Multiple Choice Custom") {
            var key = $(this).find('key').text();
            key = '<key>' + key + '</key>';
            var label = $(this).find('label').text();
            label = '<label>' + label + '</label>';
            var value = $(this).find('value').text();
            value = '<value>' + value + '</value>';
            properties += '<property>' + key + label + value + '</property>';
        }
        else if (promptType == "Number") {
            var key = $(this).find('key').text();
            key = '<key>' + key + '</key>';
            var label = $(this).find('label').text();
            label = '<label>' + label + '</label>'; 
            properties += '<property>' + key + label + '</property>';
        }
        else if (promptType == "Photo") {
            var key = $(this).find('key').text();
            key = '<key>' + key + '</key>';
            var label = $(this).find('label').text();
            label = '<label>' + label + '</label>';
            properties += '<property>' + key + label + '</property>';
        }
        else if (promptType == "Remote Activity") {
            var key = $(this).find('key').text();
            key = '<key>' + key + '</key>';
            var label = $(this).find('label').text();
            label = '<label>' + label + '</label>'; 
            properties += '<property>' + key + label + '</property>';
        }
        else if (promptType == "Single Choice" || promptType == "Single Choice Custom") {
            var key = $(this).find('key').text();
            key = '<key>' + key + '</key>';
            var label = $(this).find('label').text();
            label = '<label>' + label + '</label>';
            var value = $(this).find('value').text();
            value = '<value>' + value + '</value>';
            properties += '<property>' + label + value + '</property>';
            
        }
        else if (promptType == "Text") {
            var key = $(this).find('key').text();
            key = '<key>' + key + '</key>';
            var label = $(this).find('label').text();
            label = '<label>' + label + '</label>'; 
            properties += '<property>' + key + label + '</property>';
        }
        else if (promptType == "Timestamp") {
            // doing nothing
        }
        else {
            // invalid
        }
        
    });
    return properties;
}
/*
    change a XML object into string
*/
jQuery.XMLtoStr = function(xmlData) {
  if (window.ActiveXObject) {
    return xmlData.xml;
  } else {
    return (new XMLSerializer()).serializeToString(xmlData);
  }
}

/*
    Create XML string for viewing from XML array
*/
function createXMLString(array) {
    var len = array.length;
    var result = "";
    for (i = 0; i < len; i++) {
        result += array[i];
    }
    result = "<survey>" + result + "</survey>";
    return result;
}