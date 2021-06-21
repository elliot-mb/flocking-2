# Flocking 2
A pure js implementation of a flocking algorithm.\
It's my second attempt at flocking simulation using proper steering algorithms ([first attempt](https://github.com/ElliotSemiColon/flocking)).\
This program will run best in chrome (it can be run using [Visual Studio Code Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)).\

# Some GIFs
Simulation of 400 agents:\
![ezgif-6-c1a984df573ff](https://user-images.githubusercontent.com/45922387/122753032-9198e100-d289-11eb-92fd-52951869d2bd.gif)\
How the steering force behaves:\
![dag nabbit4](https://user-images.githubusercontent.com/45922387/122754275-5ac3ca80-d28b-11eb-8e65-b6ab1b3e9da3.gif)\
Steering force (green) is calculated by simply subtracting the velocity vector (red) from the target vector (blue). The target vector has a set magnitude which can be thought of as maximum speed, and its drawn in the direction of the goal.\
Maximum steering force is reached fairly quickly in this gif, observe that the green vector rarely changes magnitude. There are parameters for these maximums which change how the agent behaves. Each behaviour (cohesion, avoidance, alignment) has these two parameters.
