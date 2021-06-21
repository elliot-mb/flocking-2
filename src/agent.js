export default class Agent{

    constructor(width, height){

        ////behavioural attributes
        this.mass = 2;

        //steering parametrs

        this.tCohesion = 20; // magnitude of cohesion target vector 
        this.fCohesion = 0.4; // maximum cohesive steering force

        this.tAvoidance = -10; // magnitude of separation target vector 
        this.fAvoidance = 3; // maximum separative steering force
        
        this.tAlignment = 20; //
        this.fAlignment = 0.5; // maximum aligning force

        this.angle = Math.random() * Math.PI * 2;

        ////functional attributes

        this.startSpeed = 5;
        this.forwardSpeed = 4.9;

        //position vector
        this.x = Math.random() * width;
        this.y = Math.random() * height;

        //velocity vector
        this.vi = Math.cos(this.angle) * this.startSpeed, this.vj = Math.sin(this.angle) * this.startSpeed;

        //force (accel vector)
        this.ai = 0, this.aj = 0; //acceleration buffer (resets each tick)

        //desired/target vector
        this.ti = 0, this.tj = 0;        

        ////visual attributes
        this.size = 20;
        this.colour = "#cc11aa";

    }

    draw(ctx){

        this.angle = Math.atan2(this.vj, this.vi);
        this.triangle(ctx, this.angle, this.colour, this.x, this.y, this.size);

        //this.drawVectors(this.shownVects, ctx);

    }

    triangle(ctx, angle, colour, x, y, size){
        
        ctx.fillStyle = colour;
        ctx.beginPath();
        ctx.moveTo(x + (size * Math.cos(angle)), y + (size * Math.sin(angle)));
        ctx.lineTo(size * Math.cos(angle - (3 * Math.PI / 4)) + x, size * Math.sin(angle - (3 * Math.PI / 4)) + y);
        ctx.lineTo(size * Math.cos(angle + (3 * Math.PI / 4)) + x, size * Math.sin(angle + (3 * Math.PI / 4)) + y);
        ctx.fill();

        //console.log(angle, colour, x, y, size);

    }

    cohesion(agents){

        if(agents.length > 0){

            let tx = 0, ty = 0, factor, magnitudeSquared, ai, aj; //target position

            for(let i = 0; i < agents.length; i++){
                tx += agents[i].x;
                ty += agents[i].y;
            }

            tx /= agents.length;
            ty /= agents.length;

            this.ti = tx - this.x;
            this.tj = ty - this.y;

            factor = this.tCohesion / Math.sqrt((this.ti * this.ti) + (this.tj * this.tj));

            this.ti *= factor; //generated vector pointing to target of magnitude cohesion
            this.tj *= factor;

            //desired vector minus current vector = steering force
            ai = this.ti - this.vi; 
            aj = this.tj - this.vj;

            magnitudeSquared = (ai * ai) + (aj * aj);

            if(magnitudeSquared > this.fCohesion * this.fCohesion){
                factor = this.fCohesion / Math.sqrt(magnitudeSquared);
                ai *= factor;
                aj *= factor;
            }

            this.ai += ai;
            this.aj += aj;

        }

    }

    avoidance(agents){

        if(agents.length > 0){

            let tx = 0, ty = 0, factor, magnitude, ai, aj; //target position

            for(let i = 0; i < agents.length; i++){
                tx += agents[i].x;
                ty += agents[i].y;
            }

            tx /= agents.length;
            ty /= agents.length;

            this.ti = tx - this.x;
            this.tj = ty - this.y;

            factor = this.tAvoidance / Math.sqrt((this.ti * this.ti) + (this.tj * this.tj)); //negative magnitude

            this.ti *= factor; //generated vector pointing to target of magnitude cohesion
            this.tj *= factor;

            //desired vector minus current vector = steering force
            ai = this.ti - this.vi; 
            aj = this.tj - this.vj;

            magnitude = Math.sqrt((ai * ai) + (aj * aj));

            if(magnitude > this.fAvoidance){
                factor = this.fAvoidance / magnitude;
                ai *= factor;
                aj *= factor;
            }

            this.ai += ai;
            this.aj += aj;
        }

    }

    alignment(agents){

        if(agents.length > 0){

            let ai, aj, vMagnitude, fMagnitude, factor; //target heading
            let vi = 0, vj = 0; 

            for(let i = 0; i < agents.length; i++){
                vi += agents[i].vi;
                vj += agents[i].vj;
            }

            //average velocity vector of all neighbours
            vi /= agents.length; 
            vj /= agents.length;

            //ctx.font = "30px Arial";
            //ctx.fillStyle = "red"
            //ctx.fillText(`(${Math.round(vi*100)/100}, ${Math.round(vj*100)/100})`, this.x + 30, this.y - 30);
/*
            vMagnitude = Math.sqrt((vi * vi) + (vj * vj));
            
            if(vMagnitude > this.tAlignment){
                factor = this.tAlignment / vMagnitude; // factor with which to correct **target** velocity to max allowed velocity 
                vi *= factor;
                vj *= factor;
            }
*/
            ai = vi - this.vi;
            aj = vj - this.vj;

            fMagnitude = Math.sqrt((ai * ai) + (aj * aj));

            if(fMagnitude > this.fAlignment){
                factor = this.fAlignment / fMagnitude;
                ai *= factor; //scales back both components so it matches max magnitude;
                aj *= factor;
            }

            this.ai += ai;
            this.aj += aj;
        }

    }

    move(){

        if((this.vi * this.vi) + (this.vj * this.vj) < this.forwardSpeed * this.forwardSpeed){

            this.ai += this.vi/2;
            this.aj += this.vj/2;

        } //forward force

        //console.log(this.x, this.y, this.vi, this.vj, this.ai, this.aj);

        //works out velocity vector
        this.vi += this.ai / this.mass;
        this.vj += this.aj / this.mass;

        // moves agent according to v
        this.x += this.vi;
        this.y += this.vj;

        this.ai = 0;
        this.aj = 0;

    }

    drawVectors(ctx){ //debug
/*
        //ctx.font = `${this.scale.text}px Georgia`;
        
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#ff33ff";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + (this.ai * 1000), this.y + (this.aj * 1000));
        ctx.stroke();

        ctx.strokeStyle = "#33ffff";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + (this.ti * 100), this.y + (this.tj * 100));
        ctx.stroke();*/

    }

}