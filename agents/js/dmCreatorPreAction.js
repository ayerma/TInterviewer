/**
 * Pre-action for dm-reator tickets.
 * Prevents double-processing by checking if the ticket is already being handled.
 */
function action(params) {
    try {
        var ticket = params.ticket;
        var ticketKey = ticket.key;
        var labels = (ticket.fields.labels || []).map(function(l) {
            return (typeof l === 'string') ? l : (l.name || '');
        });

        if (labels.indexOf('dm-creator-processing') !== -1) {
            return { skip: true, reason: 'Ticket ' + ticketKey + ' is already being processed (dm-creator-processing label present).' };
        }

        return { success: true };
    } catch (error) {
        return { success: false, error: error.toString() };
    }
}
