var campaignEditor = {

    /*
    Creates and sets up new campaign object.
    INPUT: Campaign metadata
    OUTPUT: New campaign object
    */
    createCampaign: function(title, version) {
        if (typeof(version) === 'undefined') {
            version = 1;
        }

        if (!title) {
            return false;
        }

        var author = $.cookie('username');
        var campaign = {};

        campaign['campaignUrn'] = campaignEditor.generateCampaignURN(title, author, version);
        campaign['campaignName'] = title;
        campaign['surveys'] = {'survey': []};

        return campaign;
    },

    /*
    Adds a survey to the given campaign object.
    INPUT: Campaign object, survey metadata
    OUTPUT: True if the addition succeeded, false otherwise
    */
    addSurvey: function(campaign, surveyData) {
        // Check if all required components are present
        if (!campaign || !surveyData['title'] || !surveyData['submitText'] ||
            (surveyData['showSummary'] && !surveyData['summaryText']) || 
            (typeof(surveyData['anytime']) === 'undefined')) {
            return false;
        }

        var survey = {'contentList': []};
           
        survey['id'] = surveyData['title'].replace(/\s/g, '');    // ID is equivalent to title sans whitespace
        survey['title'] = surveyData['title'];
        if (surveyData['description']) survey['description'] = surveyData['description'];
        if (surveyData['introText']) survey['introText'] = surveyData['introText'];
        survey['submitText'] = surveyData['submitText'];
        survey['showSummary'] = surveyData['showSummary'];
        if (surveyData['showSummary']) {
            survey['summaryText'] = surveyData['summaryText'];
            survey['editSummary'] = surveyData['editSummary'];
        }
        survey['anytime'] = surveyData['anytime'];

        campaign['surveys']['survey'].push(survey);

        return true;
    },

    /*
    Adds a message to the given survey of the given campaign.
    INPUT: Campaign object, the index of the survey within that campaign, and messageData
        messageData can contain the following keys:
            messageText,
            condition
    OUTPUT: Index of added item, false otherwise
    */
    addMessage: function(campaign, surveyIndex, messageData) {

        // Check if all required components are present
        if (!campaign || !surveyIndex || !messageData['messageText']) {
            return -1;
        }

        var message = {};

        message['messageText'] = messageData['messageText'];
        if (messageData['condition']) message['condition'] = messageData['condition'];
        
        message['id'] = campaign['surveys']['survey'][surveyIndex]['contentList'].length + 1;
        campaign['surveys']['survey'][surveyIndex]['contentList'].push(message);

        return message['id'] - 1;
    },


    //TODO: TURN PARAMETERS INTO AN OBJECT INSTEAD...
    /*
    Adds a prompt to the given survey of the given campaign.
    INPUT: Campaign object, the index of the survey within that campaign, prompt metadata
    OUTPUT: True if the addition succeeded, false otherwise
    */
    addPrompt: function(
        campaign,
        surveyIndex,
        displayLabel,
        displayType,
        promptText,
        abbrText,
        promptType,
        defaultValue,
        condition,
        skippable,
        skipLabel,
        properties
        ) {

        var showSummary = campaign['surveys']['survey'][surveyIndex]['showSummary'];
        // Check if all required components are present
        if (!campaign || !surveyIndex || !displayLabel || !displayType ||
            !promptText || (showSummary && !abbrText) || !promptType ||
            (skippable && !skipLabel) || !properties) {
            return -1;
        }

        var promptItem = {};

        promptItem['displayLabel'] = displayLabel;
        promptItem['displayType'] = displayType;
        promptItem['promptText'] = promptText;
        if (showSummary) {
            promptItem['abbreviatedText'] = abbrText;
        }
        promptItem['promptType'] = promptType;
        promptItem['default'] = defaultValue;
        promptItem['condition'] = condition;
        promptItem['skippable'] = skippable
        if (skippable) {
            promptItem['skipLabel'] = skipLabel;
        }

        promptItem['id'] = campaign['surveys']['survey'][surveyIndex]['contentList'].length + 1;
        campaign['surveys']['survey'][surveyIndex]['contentList'].push(promptItem);

        return promptItem['id'] - 1;

    },

    /*
    Adds a repeatable set to the given survey of the given campaign.
    INPUT: Campaign object, the index of the survey within that campaign, repeatable set metadata
    OUTPUT: True if the addition succeeded, false otherwise
    */
    addRepeatableSet: function(
        campaign,
        surveyIndex,
        termQuestion,
        termTrueLabel,
        termFalseLabel,
        termSkipEnabled,
        termSkipLabel,
        condition
        ) {

        // Check if all required components are present
        if (!campaign || !surveyIndex || !termQuestion || !termTrueLabel ||
            !termFalseLabel || (termSkipEnabled && !termSkipLabel)) {
            return false;
        }

        var repeatableSet = {'prompts': {'prompt': []}};

        repeatableSet['terminationQuestion'] = termQuestion;
        repeatableSet['terminationTrueLabel'] = termTrueLabel;
        repeatableSet['terminationFalseLabel'] = termFalseLabel;
        repeatableSet['terminationSkipEnabled'] = termSkipEnabled
        if (termSkipEnabled) {
            repeatableSet['terminationSkipLabel'] = termSkipLabel;
        }
        repeatableSet['condition'] = condition;

        repeatableSet['id'] = campaign['surveys']['survey'][surveyIndex]['contentList'].length + 1;
        campaign['surveys']['survey'][surveyIndex]['contentList'].push(repeatableSet);

        return true;
    },

    /*
    Generate the URN for a campaign based on the campaign title, current author, etc.
    INPUT: Campaign metadata, current author
    OUTPUT: The campaign URN string
    */
    generateCampaignURN: function(title, author, version) {
        var campaignURN = 'urn:campaign:';
        campaignURN += title.replace(/\s/g, '') + '::' + author + ':' + version;

        return campaignURN;
    },

    shiftSurveyItems: function(startIndex, endIndex) {
        var surveyIndex = $.cookie('currentSurvey');
        var contentList = campaignWrapper['campaign']['surveys']['survey'][surveyIndex]['contentList'];

        // Remove element, and insert it into endIndex
        contentList.splice(endIndex, 0, contentList.splice(startIndex, 1)[0]);
    }
};
