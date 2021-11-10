'use strict';

const findNextStep = goal => {
    let nextStep = null;
    goal.steps().forEach(step => {
        if (!step.completed) {
            if (!nextStep) {
                nextStep = step;
            } else if (step.dueDate < nextStep.dueDate) {
                nextStep = step;
            }
        };
    });
    return nextStep;
}

module.exports = function(Goal) {
    Goal.completeById = function(goalId) {
        return Goal.findById(goalId).then(goal => {
            if (!goal) {
                throw new Error('Goal was not found');
            }

            goal.completed = true;
            return goal.save();
        });
    };
    Goal.remoteMethod(
        'completeById', {
          description: "updates a goal's status to complete",
          http: {
            path: '/complete/:goalId',
            verb: 'put',
          },
          accepts: [
            {arg: 'goalId', type: 'string', required: true, http: {source: 'path'}},
          ],
          returns: {
            root: true,
          },
        }
    );

    Goal.getNextSteps = function() {
        return Goal.find({include: {"steps": "goal"}}).then(goals => {

            return goals.map(findNextStep).filter(step => !!step);
        });
    };
    Goal.remoteMethod(
        'getNextSteps', {
          description: " return the next uncomplete step for every goal",
          http: {
            path: '/next-steps',
            verb: 'get',
          },
          accepts: [],
          returns: {
            root: true,
          },
        }
    );
};