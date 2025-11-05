let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let c = canvas.getContext('2d')

let screen = {
    width : window.innerWidth,
    height : window.innerHeight
}
this.mouse = {
    x : screen.width /2,
    y : screen.height /2
}

class Ball {
    constructor(x,y){
        this.gravity = 1
        this.friction = 0.8
        this.baseR = 25
        this.r = this.baseR
        this.x = x || randomadd(0+this.r,window.innerWidth-this.r)
        this.y = y || randomadd(0+this.r,window.innerHeight-this.r)
        this.vx = (Math.random() - 0.5)* 60 
        this.vy = (Math.random())* 40
        this.color = randomColor()
        this.draw()
    }
    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.r,0,2 * Math.PI)//کشیدن دایره
        c.fillStyle = this.color
        c.fill()
    }
    update(){
    if( this.y + this.r + this.vy >= screen.height) {
        this.vy = - this.vy * this .friction
        this.vx = - this.vx * this .friction
    }else{
         this.vy += this.gravity
    }
    if (this.x + this.r + this.vx >= screen.width || this.x - this.r + this.vx <= 0 ) {
        this.vx = - this.vx 
    }

    this.y += this.vy
    this.x += this.vx


    this.draw()
    }
}


function randomColor() {
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)
    return `rgb(${r},${g},${b})`
}



class Canvas {
    constructor() {
        this.balls = []
        for (let i = 0; i < 50; i++) {
            this.balls.push(new Ball())
        }
    }

    animate() {
    // c.fillStyle = "rgba(0, 0, 0, 0.1)" // رنگ مشکی با شفافیت
    // c.fillRect(0, 0, window.innerWidth, window.innerHeight)
    c.clearRect(0, 0, window.innerWidth, window.innerHeight)
        this.balls.forEach(ball=>{
        ball.update()
    })
    requestAnimationFrame(this.animate.bind(this));
}}

let mycan = new Canvas()
mycan.animate()



window.addEventListener('mousemove' , (e)=>{
    mouse.x = e.clientX
    mouse.y = e.clientY
})

window.addEventListener('resize' , ()=>{
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

})


function randomadd(min,max){
    return Math.floor(Math.random() * (max - min+1) + min)
}