(function () {
    'use strict';

    angular.module('hDragyoda', [])
        .directive('hDraggable', ['hDragyodaService', draggable])
        .directive('hDroppable', [droppable]);

    function draggable(hDragyodaService) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                var el = element[0];
                var droppables = document.querySelectorAll('[h-droppable]');

                el.onmousedown = function (e) {
                    var el = e.target;

                    onmousemove = function (mouse) {
                        el.style.cursor = 'move';
                        el.style.position = 'absolute';
                        el.style.left = mouse.x - (el.offsetWidth / 2);
                        el.style.top = mouse.y - (el.offsetHeight / 2);
                    }
                };

                el.onmouseup = function (e) {
                    var el = e.target;
                    onmousemove = null;

                    hDragyodaService.closest(el, droppables, function (droppableCloser) {
                        el.style.position = '';
                        angular.element(droppableCloser).scope().addChild(el);
                    });
                };
            }
        };
    }
    
    function droppable() {
        return {
            restrict: 'A',
            scope: true,
            link: function (scope, element) {
                var el = element[0];

                scope.addChild = function (draggable) {
                    el.appendChild(draggable);
                }
            }
        }
    };
} ());
