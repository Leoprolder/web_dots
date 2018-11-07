var model = {items: []};
var dots = [];
var DotsApp = angular.module("DotsApp", []);
DotsApp.controller("DotsController", function ($scope)
{
    Draw = function(dots_list)
    {
        var drawingCanvas = document.getElementById('canvas');
        if (drawingCanvas && drawingCanvas.getContext)
        {
            var context = drawingCanvas.getContext('2d');
            context.strokeStyle = "#0095ff";
            context.fillStyle = "#ddfaff";
            context.fillRect(0,0,800,600);
            context.fillStyle = "#0900d2";

            //Точки
            for(var i = 0; i < dots_list.length; i++)
            {
                context.beginPath();
                context.arc(drawingCanvas.offsetWidth/2 + dots_list[i].x,drawingCanvas.offsetHeight/2 - dots_list[i].y,5,0,Math.PI*2,true);
                context.closePath();
                context.fill();
            }
            context.strokeStyle = "#000000";
            context.lineWidth = 1;

            //Координатные оси
            context.beginPath();
            context.moveTo(400,0);
            context.lineTo(400,600);
            context.stroke();
            context.moveTo(0,300);
            context.lineTo(800,300);
            context.stroke();
            context.closePath();

            //Контур
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(drawingCanvas.offsetWidth/2 + dots_list[0].x,drawingCanvas.offsetHeight/2 - dots_list[0].y);
            for(var i = 0; i<dots_list.length; i++)
            {
                context.lineTo(drawingCanvas.offsetWidth/2 + dots_list[i].x,drawingCanvas.offsetHeight/2 - dots_list[i].y);
                context.stroke();
            }
            context.closePath();
        }
    }
    $scope.list = model;
    $scope.addItem = function (x, y)
    {
        x = parseFloat(x); // преобразуем введенные значения к числу
        y = parseFloat(y);
        if(!isNaN(x) && !isNaN(y)) // если поля не пустые, то добавляем
        {
            $scope.list.items.push({ x: x, y: y });
            dots[dots.length] = {x: x, y: y};
            console.log("added " + x + " " + y);
        }
    }
    $scope.sortAndDraw = function(dots_list)
    {
        dots_list = dots;
        dots_list.sort(function compare(a,b)
        {
            return a.x-b.x;
        });

        Draw(dots_list);
    }

    $scope.sortAndDrawOnServer = function(dots_list)
    {
        dots_list = dots;
        exports.list = dots_list;

        var drawingCanvas = document.getElementById('canvas');
        if (drawingCanvas && drawingCanvas.getContext)
        {
            var context = drawingCanvas.getContext('2d');
            context.strokeStyle = "#0095ff";
            context.fillStyle = "#ddfaff";
            context.fillRect(0,0,800,600);
            context.fillStyle = "#0900d2";

            //Точки
            for(var i = 0; i < dots_list.length; i++)
            {
                context.beginPath();
                context.arc(drawingCanvas.offsetWidth/2 + dots_list[i].x,drawingCanvas.offsetHeight/2 - dots_list[i].y,5,0,Math.PI*2,true);
                context.closePath();
                context.fill();
            }
            context.strokeStyle = "#000000";
            context.lineWidth = 1;

            //Координатные оси
            context.beginPath();
            context.moveTo(400,0);
            context.lineTo(400,600);
            context.stroke();
            context.moveTo(0,300);
            context.lineTo(800,300);
            context.stroke();
            context.closePath();

            //Контур
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(drawingCanvas.offsetWidth/2 + dots_list[0].x,drawingCanvas.offsetHeight/2 - dots_list[0].y);
            for(var i = 1; i<dots_list.length; i++)
            {
                context.lineTo(drawingCanvas.offsetWidth/2 + dots_list[i].x,drawingCanvas.offsetHeight/2 - dots_list[i].y);
                context.stroke();
            }
            context.closePath();
        }
    }
});

