let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let c = canvas.getContext('2d')

class Ball {
    constructor(x,y){
        this.baseR = 25
        this.r = this.baseR
        this.x = x || randomadd(0+this.r,window.innerWidth-this.r)
        this.y = y || randomadd(0+this.r,window.innerHeight-this.r)
        this.vx = (Math.random() - 0.5)*20 
        this.vy = (Math.random() - 0.5)*20
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
    if (this.x + this.r > window.innerWidth || this.x-this.r < 0){
        this.vx = -this.vx
    }
    if (this.y + this.r > window.innerHeight || this.y-this.r < 0){
        this.vy = -this.vy
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

let balls = []
for (let i = 0; i < 8 ;i++) {
    balls.push(new Ball())
}

function animate() {
    // c.fillStyle = "rgba(0, 0, 0, 0.1)" // رنگ مشکی با شفافیت
    // c.fillRect(0, 0, window.innerWidth, window.innerHeight)
    c.clearRect(0,0,window.innerWidth,window.innerHeight)//برای fps
    balls.forEach(ball => {
    ball.update()
})



    requestAnimationFrame(animate);
}
window.addEventListener('click',(e)=>{
    balls.push(new Ball(e.clientX,e.clientY))
})

window.addEventListener('mousemove' , (e)=>{
    balls.forEach(ball=>{
        let distance = Math.sqrt(Math.pow(e.clientX - ball.x,2) + Math.pow(e.clientY - ball.y,2))
        if(distance < 100  && ball.r < ball.baseR * 4) {
            ball.r += 1
        } else if(ball.r > ball.baseR) {
            ball.r -= 1
        }
    })
})

window.addEventListener('resize' , ()=>{
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

})

animate()

function randomadd(min,max){
    return Math.floor(Math.random() * (max - min+1) + min)
}