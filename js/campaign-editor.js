var campaignEditor = {

    // Creates and sets up new campaign object.
    // INPUT: Campaign metadata
    // OUTPUT: New campaign object
    createCampaign: function(title, description = 'campaign', version = 1) {
        var author = $.cookie('username');
        var campaign = {};

        campaign['campaignUrn'] = campaignEditor.generateCampaignURN(title, author, description, version);
        campaign['campaignName'] = title;
        campaign['surveys'] = {'survey': []};

        return campaign;
    },

    // Adds a survey to the given campaign object.
    // INPUT: Campaign object, survey metadata
    // OUTPUT: True if the addition succeeded, false otherwise
    addSurvey: function(
        campaign,
        title,
        description,
        introText,
        submitText,
        showSummary,
        summaryText,
        editSummary,
        anytime
        ) {

        // Check if all required components are present
        if (!campaign || !title || !submitText || (showSummary && !summaryText) || 
            (typeof(anytime) === 'undefined')) {
            return false;
        }

        var survey = {'contentList': []};
           
        survey['id'] = title.replace(/\s/g, '');    // ID is equivalent to title sans whitespace
        survey['title'] = title;
        if (description) survey['description'] = description;
        if (introText) survey['introText'] = introText;
        survey['submitText'] = submitText;
        survey['showSummary'] = showSummary
        if (showSummary) {
            survey['summaryText'] = summaryText;
            survey['editSummary'] = editSummary
        }
        survey['anytime'] = anytime

        campaign['surveys']['survey'].push(survey);

        return true;
    },

    // Adds a message to the given survey of the given campaign.
    // INPUT: Campaign object, the index of the survey within that campaign, message metadata
    // OUTPUT: True if the addition succeeded, false otherwise
    addMessage: function(campaign, surveyIndex, messageText, condition) {

        // Check if all required components are present
        if (!campaign || !surveyIndex || !messageText) {
            return false;
        }

        var message = {};

        message['messageText'] = messageText;
        if (condition) message['condition'] = condition;

        message['id'] = campaign['surveys']['survey'][surveyIndex]['contentList'].length + 1;
        campaign['surveys']['survey'][surveyIndex]['contentList'].push(message);

        return true;
    },

    // Adds a prompt to the given survey of the given campaign.
    // INPUT: Campaign object, the index of the survey within that campaign, prompt metadata
    // OUTPUT: True if the addition succeeded, false otherwise
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
            return false;
        }

        var promptItem = {};

        promptItem['displayLabel'] = displayLabel;
        promptItem['displayType'] = displayType;
        promptItem['promptText'] = promptText;
        if (campaign['surveys']['survey'][surveyIndex]['showSummary'] === 'true') {
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

        return true;

    },

    // Adds a repeatable set to the given survey of the given campaign.
    // INPUT: Campaign object, the index of the survey within that campaign, repeatable set metadata
    // OUTPUT: True if the addition succeeded, false otherwise
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

    // Generate the URN for a campaign based on the campaign title, current author, etc.
    // INPUT: Campaign metadata, current author
    // OUTPUT: The campaign URN string
    generateCampaignURN: function(title, author, description, version) {
        var campaignURN = 'urn:campaign:';
        campaignURN += title + ':' + description + ':' + author + ':' + version;

        return campaignURN;
    }
};