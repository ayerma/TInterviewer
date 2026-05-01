/**
 * Post-action for dm-reator tickets.
 * Parses the AI-generated JSON, writes content files, and posts a Jira comment.
 */
function action(params) {
    try {
        var ticket = params.ticket;
        var ticketKey = ticket.key;

        // AI response can be in different fields depending on DMtools version / outputType
        var aiResponse = params.result || params.response || params.aiResult || '';

        if (!aiResponse || aiResponse.trim() === '') {
            jira_post_comment(ticketKey,
                '[dm-creator] Failed to generate content: AI response was empty. Please check the CI run for details.'
            );
            return { success: false, error: 'Empty AI response for ticket ' + ticketKey };
        }

        // Strip markdown code fences if the AI wrapped the JSON
        var jsonStr = aiResponse.trim();
        var fenceMatch = jsonStr.match(/^```(?:json)?\s*\n([\s\S]*?)\n```\s*$/);
        if (fenceMatch) {
            jsonStr = fenceMatch[1].trim();
        }

        var parsed;
        try {
            parsed = JSON.parse(jsonStr);
        } catch (parseErr) {
            jira_post_comment(ticketKey,
                '[dm-creator] Failed to parse generated JSON for ticket ' + ticketKey + '.\nError: ' + parseErr.toString() +
                '\n\nRaw response (first 500 chars):\n' + aiResponse.substring(0, 500)
            );
            return { success: false, error: 'JSON parse error: ' + parseErr.toString() };
        }

        // Validate required fields
        if (!parsed.filePath || !parsed.content || !parsed.indexEntry) {
            jira_post_comment(ticketKey,
                '[dm-creator] AI output is missing required fields (filePath, content, or indexEntry) for ticket ' + ticketKey + '.'
            );
            return { success: false, error: 'Missing required fields in AI output' };
        }

        // Write question content file
        var questionFilePath = 'output/questions/' + parsed.filePath;
        file_write(questionFilePath, JSON.stringify(parsed.content, null, 2));

        // Write index entry for the workflow step to update spaces-index.json
        var indexEntryPath = 'output/index-entries/' + ticketKey + '.json';
        file_write(indexEntryPath, JSON.stringify(parsed.indexEntry, null, 2));

        // Post success comment on the Jira ticket
        jira_post_comment(ticketKey,
            '[dm-creator] Content generated successfully!\n\n' +
            'Question: ' + parsed.content.title + '\n' +
            'File: ' + parsed.filePath + '\n\n' +
            'A pull request will be created by the CI pipeline shortly.'
        );

        return { success: true, filePath: questionFilePath };
    } catch (error) {
        return { success: false, error: error.toString() };
    }
}
