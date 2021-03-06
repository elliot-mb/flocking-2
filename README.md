# Flocking 2
[Visit deployment.](https://elliot-mb.github.io/flocking-2/)\
A pure js implementation of my own flocking algorithm.\
It's my second attempt at flocking simulation ([first attempt](https://github.com/ElliotSemiColon/flocking)).\
This program will run best in chrome (it can be run using [Visual Studio Code Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)).

# Some GIFs
Simulation of 400 agents:\
![ezgif-6-c1a984df573ff](https://user-images.githubusercontent.com/45922387/122753032-9198e100-d289-11eb-92fd-52951869d2bd.gif)\
How the steering force behaves:\
![dag nabbit4](https://user-images.githubusercontent.com/45922387/122754275-5ac3ca80-d28b-11eb-8e65-b6ab1b3e9da3.gif)\
The force steering the agent towards its goal is trying to change its velocity to eventually match the target vector.
Steering force (green) is calculated by simply subtracting the velocity vector (red) from the target vector (blue), i.e. the difference between them.\
The target vector has a set magnitude which can be thought of as maximum speed, and its drawn in the direction of the goal.\
Maximum steering force is reached fairly quickly in this gif; observe that the green vector rarely changes magnitude. There are parameters for these two maximums which change how the agent behaves. Each behaviour (cohesion, avoidance, alignment) has these parameters.

# So why make another one?
This one is far more reliable when changing settings and behaves as it should far more often than the previous version. Also since it uses simple and effective steering rather than a naive implementation of it, it pertains to the definition of flocking better.\
Another advantage this version has is it gives agents a restricted FOV around themselves, which stops them seeing backwards. Backwards vision gave me lots of issues in the previous version.
