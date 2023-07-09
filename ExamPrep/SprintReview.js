function calculateSum([numberOfTasks, ...elements]) {
  const assigneesAndTasks = [];

  const createAssigneeAndTask = ([assignee, taskId, title, status, estimatedPoints]) => {
    const assigneeAndTasksIndex = checkAssigneeExists(assignee);

    if (assigneeAndTasksIndex === 1) {
      commands["Add New"](assigneeAndTasksIndex, [taskId, title, status, estimatedPoints]);
      return;
    }

    return {
      assignee,
      tasks: [createTask([taskId, title, status, estimatedPoints])],
    };
  };

  const createTask = ([taskId, title, status, estimatedPoints]) => {
    return {
      taskId,
      title,
      status,
      estimatedPoints,
    };
  };

  const checkAssigneeExists = (assignee) => {
    if (assigneesAndTasks.length === 0) {
      return -1;
    }

    return assigneesAndTasks.findIndex((obj) => {
      return obj.assignee === assignee;
    });
  };

  const checkTaskExists = (tasks, taskId) => {
    return tasks.findIndex((task) => task.taskId === taskId);
  };

  const processCommand = (commandToProccess) => {
    const [command, assignee, ...taskInfo] = commandToProccess.split(":");

    const assigneeAndTasksIndex = checkAssigneeExists(assignee);

    if (assigneeAndTasksIndex === -1) {
      console.log(`Assignee ${assignee} does not exist on the board!`);
      return;
    }
    commands[command](assigneeAndTasksIndex, taskInfo);
  };

  const commands = {
    "Add New"(assigneeAndTasksIndex, taskInfo) {
      assigneesAndTasks[assigneeAndTasksIndex].tasks.push(createTask(taskInfo));
    },
    "Change Status"(assigneeAndTasksIndex, taskInfo) {
      const tasks = assigneesAndTasks[assigneeAndTasksIndex].tasks;
      const taskId = taskInfo[0];
      const taskIndex = checkTaskExists(tasks, taskId);

      if (taskIndex === -1) {
        console.log(
          `Task with ID ${taskId} does not exist for ${assigneesAndTasks[assigneeAndTasksIndex].assignee}!`
        );
        return;
      }
      tasks[taskIndex].status = taskInfo[1];
    },
    "Remove Task"(assigneeAndTasksIndex, taskInfo) {
      const tasks = assigneesAndTasks[assigneeAndTasksIndex].tasks;
      const taskIndex = Number(taskInfo[0]);
      const isValid = taskIndex >= 0 && taskIndex < tasks.length;
      
      if (!isValid) {
        console.log("Index is out of range!");
        return;
      }
      tasks.splice(taskIndex, 1);
    },
  };

  for (let index = 0; index < numberOfTasks; index++) {
    const info = elements[index].split(":");
    const assigneeAndTasks = createAssigneeAndTask(info);
    assigneeAndTasks && assigneesAndTasks.push(assigneeAndTasks);
  }
  elements.splice(0, numberOfTasks);

  elements.forEach((element) => processCommand(element));

  const points = {
    ToDo: 0,
    "In Progress": 0,
    "Code Review": 0,
    "Done Points": 0,
  };

  assigneesAndTasks.forEach((assigneeAndTasks) => {
    const tasks = assigneeAndTasks.tasks;

    tasks.forEach((task) => {
      const status = task.status;
      const estimatedPoints = Number(task.estimatedPoints);
      points[status === "Done" ? "Done Points" : status] += estimatedPoints;
    });
  });

  let notDonePoints = 0;

  Object.entries(points).forEach(([taskStatus, points]) => {
    if (taskStatus !== "Done Points") {
      notDonePoints += points;
    }
    console.log(`${taskStatus}: ${points}pts`);
  });

  if (points["Done Points"] >= notDonePoints) {
    console.log("Sprint was successful!");
    return;
  }
  console.log("Sprint was unsuccessful...");
}

calculateSum([
  "5",
  "Kiril:BOP-1209:Fix Minor Bug:ToDo:3",
  "Mariya:BOP-1210:Fix Major Bug:In Progress:3",
  "Peter:BOP-1211:POC:Code Review:5",
  "Georgi:BOP-1212:Investigation Task:Done:2",
  "Mariya:BOP-1213:New Account Page:In Progress:13",
  "Add New:Kiril:BOP-1217:Add Info Page:In Progress:5",
  "Change Status:Peter:BOP-1290:ToDo",
  "Remove Task:Mariya:1",
  "Remove Task:Joro:1",
]);

calculateSum([
  "4",
  "Kiril:BOP-1213:Fix Typo:Done:1",
  "Peter:BOP-1214:New Products Page:In Progress:2",
  "Mariya:BOP-1215:Setup Routing:ToDo:8",
  "Georgi:BOP-1216:Add Business Card:Code Review:3",
  "Add New:Sam:BOP-1237:Testing Home Page:Done:3",
  "Change Status:Georgi:BOP-1216:Done",
  "Change Status:Will:BOP-1212:In Progress",
  "Remove Task:Georgi:3",
  "Change Status:Mariya:BOP-1215:Done",
]);
