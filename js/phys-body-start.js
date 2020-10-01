//Начальные параметры моделируемой системы

//Расстояние в м
const Rmsun = 0;
const Rmearth = 149597870700; //между Землей и Солнцем
const Rmmoon = 384399000; // между Землей и Луной

//Расстояние в а.е.
const Rsun = Rmsun / AU;
const Rearth = Rmearth / AU;
const Rmoon = Rmmoon / AU;

//Начальные положения объектов
const Psun = new Position(0, 0);
const Pearth = new Position(Rearth, 0);
const Pmoon = new Position(Rearth - Rmoon, 0);

//Начальная орбитальная скорость, м/c
const Vmsun = 0;
const Vmearth = 29783; //относительно Солнца
const Vmmoon = 1023; //относительно Земли

//Начальная орбитальная скорость, a.e./c
const Vausun = Vmsun / Rmearth;
const Vauearth = Vmearth / Rmearth
const Vaumoon = Vmmoon / Rmearth

//Начальная орбитальная скорость относительно Солнца
const Vsun = new Velocity(Vausun, 0);
const Vearth = new Velocity(0, -Vauearth);
const Vmoon = new Velocity(0, -Vauearth + Vaumoon);

//Начальные состояния тел симуляции
var sun = new Body("Sun", Msun, 50, "#FFCC00", Psun, Vsun);
var earth = new Body("Earth", Mearth, 10, "#00CCFF", Pearth, new Velocity(0, 0));
var moon = new Body("Moon", Mmoon, 5, "#AAAAAA", Pmoon, Vmoon);
