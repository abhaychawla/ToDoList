(function() {

    angular
        .module('app')
        .controller('TodoController', ['$scope', '$filter', '$timeout', function($scope, $filter, $timeout) {
            var vm = this;
            
            vm.tasks = [];
            
            vm.successMessage = '';
            vm.errorMessage = '';

            vm.incompleteTasks = false;
            vm.completeTasks = false;

            vm.addOrEditTask = function($event) {
                if($event.keyCode === 13) {
                    if(!vm.task) {
                        vm.errorMessage = 'No Task Specified!';

                        $timeout(function() {
                            vm.errorMessage = '';
                        }, 2000);
                    }
                    else {
                        vm.tasks.push({ value: vm.task, completed: false });
                        vm.task='';

                        vm.successMessage = 'Task Added!';

                        $timeout(function() {
                            vm.successMessage = '';
                        }, 2000);
                    }
                }
            };

            vm.editTask = function(task) {
                vm.task = task.value;
                vm.tasks.splice(vm.tasks.indexOf(task), 1);
            };

            vm.deleteTask = function(task) {
                vm.tasks.splice(vm.tasks.indexOf(task), 1);

                vm.errorMessage = 'Task Deleted!';

                $timeout(function() {
                    vm.errorMessage = '';
                }, 2000);
            };

            //Watch for any change in tasks
            $scope.$watch(function() {
                return vm.tasks;
            }, function(newTasks, oldTasks) {

                var oldCompleteTasks = $filter('filter')(oldTasks, { completed: true }).length,
                    newCompleteTasks = $filter('filter')(newTasks, { completed: true }).length,
                    newIncompleteTasks = $filter('filter')(newTasks, { completed: false }).length;
                
                vm.incompleteTasks = newIncompleteTasks > 0;
                vm.completeTasks =  newCompleteTasks > 0;

                if(newCompleteTasks > oldCompleteTasks) {
                    vm.successMessage = 'Task Completed!';

                    $timeout(function() {
                        vm.successMessage = '';
                    }, 2000);
                }

            }, true);

        }]);

})();