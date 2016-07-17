// Created by: Rogerio Ribeiro
// Student Number: 500527368
// Created for CPS630 Lab04

var app = angular.module('myApp', []);
var storedList = [];
var completedList = [];

app.controller('todoCtrl', function($scope, $http) {
    
    // Gets the JSON file to parse    
    $http.get('../json/todo.json')
        .then(function sucessCallBack(res){
        $scope.todos = res.data.todo;
        for(i=0; i<$scope.todos.length; i++){
            storedList.push($scope.todos[i].task);
            console.log(storedList);
        }
    }, function errorCallBack(res){
        alert("Error. The JSON file did not upload!");
    });
    
    // Gets the users input from the textbox and stores it into the scope and a storedList array.
    // The stored list is used to grab the JSON inputs and combine them with further user input as AngularJS doe not allow manipulation of the JSON file.
    // Also, prompts the user if their is multiple of the same tasks.
    $scope.todoAdd = function(todoInput, todoDesc) {
        // Validates for duplicates
        if(storedList.indexOf(todoInput) == -1){
            $scope.todos.push({task:todoInput, complete:false, description: todoDesc});
            storedList.push($scope.todos[$scope.todos.length-1].task);
        } else {
            alert('Sorry, that task is already in your task list. Try Again.')
        }

    };
    
    // The remove checked button, initiates this function which removes them from the todos scope and adds them to a list scope.
    // The list scope holds the completed tasks.
    $scope.completedTasks = function() {
        var oldList = $scope.todos;
        $scope.todos = [];
        $scope.list = [];
        
        angular.forEach(oldList, function(x) {;
            if(x.complete === true){
                completedList.push({task:x.task, description: x.description});
                for(i=0;i<completedList.length;i++){
                    $scope.list.push(completedList[i]);
                    storedList.pop(x.task);
                }
//                console.log($scope.todos);
            } else {
                $scope.todos.push(x);
                $scope.list = completedList;
            }
        });
        
    };
    
    // This function is prompted by the completed tasks button which shows and hides all the completed tasks.
    $scope.IsHidden = true;
    $scope.ShowHide = function () {
        //If DIV is hidden it will be visible and vice versa.
        $scope.IsHidden = $scope.IsHidden ? false : true;
    }
    
    // This function intiated by the trashcan icon deletes the selected task.
    $scope.delete = function(){
        $scope.todos.splice(this.$index, 1);
        storedList.pop(this.$index);
    }
    

            
});
