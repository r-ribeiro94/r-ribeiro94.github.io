Created by: Rogerio Ribeiro
Student Number: 500527368
Created for CPS630 Lab04

The app works pretty straightforward, user must input a title to the task and a description if neither is inputed it will prompt user to fill the field.

The format of the JSON file is as per recommened, for example:

    {
        "todo" : [
            {
                "task": "Complete this Lab",
                "complete": false,
                "description": "Complete this lab by Saturday, March 26, 2016 @ 11:00PM"
            },
            {
                "task": "Complete Assignments",
                "complete": false,
                "description": "Complete all assignments before due date."
            }
        ]
    }
    
That is the format, any new JSON file that is to be used with this app must follow this format or you will get an error.

The remove checked button will remove all the checked tasks and stored it in a list of completed task.

The completed tasks button will hide/show the completed tasks.