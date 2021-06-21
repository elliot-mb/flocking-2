import Agent from "./agent.js"

export default class Flock{

    constructor(){

        this.agents = [];

        //// radii (px)
        this.cohesion = 150;
        this.alignment = 150;
        this.avoidance = 30;
        this.fov = -Math.PI * 0.2; // vision on either side of the heading

    }

    generate(count, width, height){ // makes all the agents

        for(let i = 0; i < count; i++){ this.agents.push(new Agent(width, height)); }

    }

    update(){

        let heading, angleToAgent, distance; //avoiding using sqrt as its a slow function 

        this.agents.forEach(agent =>{

            let cohesions = [], alignments = [], avoidances = [], l1, l2; //collections of agents inside each respective radius 

            heading = Math.atan2(agent.vj, agent.vi) + (2 * Math.PI);
            
            //ctx.font = "30px Arial";
            //ctx.fillStyle = "red"
            //ctx.fillText(`${Math.round(heading*100)/100}`, agent.x + 30, agent.y - 30);

            this.agents.forEach(check =>{
                
                if(check != agent){
                    distance = Math.sqrt(((check.x - agent.x) * (check.x - agent.x)) + ((check.y - agent.y) * (check.y - agent.y)));
                    //console.log(distance);

                    l1 = (heading - this.fov) % (2 * Math.PI); //limits of fov
                    l2 = (heading + this.fov) % (2 * Math.PI);
                    angleToAgent = Math.atan2(check.y - agent.y, check.x - agent.x) + Math.PI; // 0 to 2PI

                    //in fov
                    if(l1 < l2){ 
                        if(angleToAgent > l1 && angleToAgent < l2){ 
                        
                            if(distance <= this.cohesion){ cohesions.push(check); }
                            if(distance <= this.alignment){ alignments.push(check); }
                            if(distance <= this.avoidance){ avoidances.push(check); }
    
                        }
                    }else{
                        if(angleToAgent < l2 || angleToAgent > l1){ 
                        
                            if(distance <= this.cohesion){ cohesions.push(check); }
                            if(distance <= this.alignment){ alignments.push(check); }
                            if(distance <= this.avoidance){ avoidances.push(check); }
    
                        }
                    }

                    

                }

            });

            agent.cohesion(cohesions);
            agent.alignment(alignments);
            agent.avoidance(avoidances);

        });

    }

    move(){ this.agents.forEach(agent => { agent.move(); }); }

    draw(ctx){ 
        this.agents.forEach(agent => { 
            agent.draw(ctx); 

            // fov 
            /*
            let heading =  Math.atan2(agent.vj, agent.vi);

            ctx.lineWidth = 2;
            ctx.strokeStyle = "#55ee22";
            ctx.beginPath();
            ctx.moveTo(agent.x, agent.y);
            ctx.lineTo(agent.x + (Math.cos(this.fov + heading) * - this.avoidance), agent.y + (Math.sin(this.fov + heading) * - this.avoidance));
            ctx.moveTo(agent.x, agent.y);
            ctx.lineTo(agent.x + (Math.cos(heading - this.fov) * - this.avoidance), agent.y + (Math.sin(heading - this.fov) * - this.avoidance));
            ctx.arc(agent.x, agent.y, this.avoidance, -this.fov + heading + Math.PI, this.fov + heading + Math.PI);
            ctx.stroke();*/

        })
    }

}