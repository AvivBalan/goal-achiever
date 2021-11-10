'use strict';

module.exports = function(Step) {
    Step.completeById = function(stepId) {
        return Step.findById(stepId).then(step => {
            if (!step) {
                throw new Error('Step was not found');
            }

            step.completed = true;
            return step.save();
        });
    };
    Step.remoteMethod(
        'completeById', {
          description: "updates a goal's status to complete",
          http: {
            path: '/complete/:stepId',
            verb: 'put',
          },
          accepts: [
            {arg: 'stepId', type: 'string', required: true, http: {source: 'path'}},
          ],
          returns: {
            root: true,
          },
        }
    );
};