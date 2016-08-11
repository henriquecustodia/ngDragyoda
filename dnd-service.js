(function (angular) {

    angular.module('hDragyoda')
        .service('hDragyodaService', function () {
            this.closest = closest;

            function closest(draggable, droppables, fn) {
                var droppableClosest;

                var draggableTop = draggable.offsetTop;
                var draggableBottom = draggable.offsetTop + draggable.offsetHeight;
                var draggableLeft = draggable.offsetLeft;
                var draggableRight = draggable.offsetLeft + draggable.offsetWidth;

                angular.forEach(droppables, function (droppable) {

                    var droppableTop = droppable.offsetTop;
                    var droppableBottom = droppable.offsetTop + droppable.offsetHeight;
                    var droppableLeft = droppable.offsetLeft;
                    var droppableRight = droppable.offsetLeft + droppable.offsetWidth;

                    var droppableCenterX = droppableLeft + droppable.offsetWidth / 2;
                    var droppableCenterY = droppableTop + droppable.offsetHeight / 2;

                    var isCloserAtVertical, isCloserAtHorizontal;

                    if (draggableRight >= droppableLeft && draggableRight <= droppableRight) {
                        isCloserAtHorizontal = true;
                    }

                    if (draggableLeft >= droppableLeft && draggableLeft <= droppableRight) {
                        isCloserAtHorizontal = true;
                    }

                    if (draggableTop >= droppableTop && draggableTop <= droppableBottom) {
                        isCloserAtVertical = true;
                    }

                    if (draggableBottom >= droppableTop && draggableBottom <= droppableBottom) {
                        isCloserAtVertical = true;
                    }

                    var closest = isCloserAtHorizontal && isCloserAtVertical;

                    if (closest) {
                        var horizontalApprouch = draggableRight - droppableCenterX;
                        horizontalApprouch < 0 && (horizontalApprouch *= -1);

                        var verticalApprouch = draggableTop - droppableCenterY;
                        verticalApprouch < 0 && (verticalApprouch *= -1);

                        if (!droppableClosest) {
                            droppableClosest = {
                                element: droppable,
                                horizontal: horizontalApprouch,
                                vertical: verticalApprouch
                            }
                        } else {
                            if (verticalApprouch <= droppableClosest.vertical || horizontalApprouch <= droppableClosest.horizontal) {
                                droppableClosest.element = droppable;
                                droppableClosest.vertical = verticalApprouch;
                                droppableClosest.horizontal = horizontalApprouch;
                            }
                        }
                    }
                });

                droppableClosest && fn && fn(droppableClosest.element);
            }
        });
})(window.angular);
