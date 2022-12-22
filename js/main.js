//requirements and goals
// make a simple crawler game
//using canvas
// manipulate in jS

// we need two entities, a hero and an ogre
//hero should move wiht the WASD or ARROW keys
// ogre for now, stationary
// hero and ogre should be able to collide to make something happen
// when hero hits ogre, ogre is removed from screen, game ends, sends message to user that they won.

// first we grab our html elements for easy reference later. 

const game = document.getElementById('canvas')
const movement = document.getElementById('movement')
const status = document.getElementById('status')

// status.innerText = 'whats up how are you'

// we need to set the game's context to be 2d
// also want to save that context to a variable for reference later 
// this is how we tell code to work within the context of the canvas
const ctx = game.getContext('2d')

// x y cooordinate sysstem. top left is 0,0, bottom right can flex based on window size (ctx.w for width, ctx.h for height)
// we need to get the computed size of canvas. save that attribute to our canvas. refer to it later. 
// once we have exact size of our canvas, can use those dimensions to simulate movement in cool ways
// these set the width and height attributes according to how they look in browser

// SETUP //

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
game.height = 360

// console.log('w h after setting')
// console.log(game)

// const hero = {
//     x: 10,
//     y: 10,
//     color: 'hotpink',
//     width: 20,
//     height: 20,
//     alive: true,
//     render: function () {
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// }
// const ogre = {
//     x: 300,
//     y: 100,
//     color: '#bada55',
//     width: 60,
//     height: 120,
//     alive: true,
//     render: function () {
//         ctx.fillStyle = this.color
//         //built in func
//         // must pass args like this
//         //must pass x/y/w in pix /h in pix
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// }

// CRAWLER CLASS//

// since these objects are basically the same, we cna use a class!!! 

class Crawler {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}
// could easily have a ton of players, or ogre's (bad guys)
const player = new Crawler(10, 10, 16, 16, 'lightsteelblue')
const ogre = new Crawler(200, 50, 32, 48, '#bada55')

// player.render()
//ogre.render()

/////  MOVEMENT  ///////

// our movement handler function tells our code how and when to move player around, tied to event listener or key events
const movementHandler = (e) => {
    //here the e is standing for event=> keydown event
    // gonna use key codes to tell it to do differnet moves
    // for diff keys
    // here are some basics
    // w = 87, a = 65, s= 83, d = 68
    // up = 38, left = 37, down= 40, right = 39
    // by linking these keycodes to a function(or code block) we can tell them to change the player x or y values
    console.log('what the heck is ', e.keyCode)
    // make a conditional
    // if keycode equals something, do somethign !! 
    // use a switch case
    // switch is my condition, opens up for a multitude of cases 
    switch (e.keyCode) {
        // move up
        case (87): 
        case (38):
            //this moves player up 10px every press
            player.y -= 10
            //we need the break keyword ot mvoe to another case if needed
            break
        // move left
        case (65):
        case (37):
            player.x -= 10
            break
        // move down
        case (83):
        case (40):
        player.y += 10
            break
        // move right
        case (68):
        case (39):
            // if you make it plus minus 2 or whatever, it just moves SLOWER
            player.x += 10
            break
    }
}



/// GAME LOOP //

// make a game loop to see animation. get things moving
// we're going to setup a gameLoop function
// attached to an interval
// will run every interval (amount of ms)
// this is how we will animate our game

const gameLoop = () => {
    //no console logs here if you can avoid it
    //for testing ok, but not in final
    
    // to resemble movement we shoudl clear the old canvas every loop, then instead of drawing a snake , b/c its maintaining all old positions of character, we'll just see our player move around
    ctx.clearRect(0, 0, game.width, game.height)

    player.render()
    movement.textContent = `${player.x}, ${player.y}`
    //if ogre is alive, he shows up
    if (ogre.alive) {
        ogre.render()
    }
}

// DOM CONTENT LOAD///

// here we'll add an event listener, when dom loads, run the game on an interval
// eventually we'll hav emore in it
document.addEventListener('DOMContentLoaded', function () {
    // put movement handler event here
    document.addEventListener('keydown', movementHandler)
    // here is our game loop interval
    setInterval(gameLoop, 60)
})

// coudl do tennis, ping pong, block breaker?, avoid bouncy ball, etc.







