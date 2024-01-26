
let aliens: Sprite = null
let asteroids: Sprite = null
let laser: Sprite = null
let spaceship: Sprite = null
// sets background to black
scene.setBackgroundColor(15)
// adds star effect
effects.starField.startScreenEffect()
// creates the spaceship
spaceship = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . 1 1 . . . . . . . 
    . . . . . . . 1 1 . . . . . . . 
    . . . . . . . 1 1 . . . . . . . 
    . . . . . . 1 1 1 1 . . . . . . 
    . . . . . 1 1 1 1 1 1 . . . . . 
    . . . . 1 1 1 1 1 1 1 1 . . . . 
    . . . . 1 f f f f f f 1 . . . . 
    . . . . 1 1 1 f f 1 1 1 . . . . 
    . . . . 1 1 1 f f 1 1 1 . . . . 
    . . . . 1 1 1 f f 1 1 1 . . . . 
    . . . . 1 f f f f f f 1 . . . . 
    . . . . 1 1 1 1 1 1 1 1 . . . . 
    . . . . 1 1 1 1 1 1 1 1 . . . . 
    . . . . . . . 4 5 . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
// lets us make it move around
controller.moveSprite(spaceship, 100, 100)
// keeps the spaceship going outside of the perimeter
spaceship.setFlag(SpriteFlag.StayInScreen, true)
// sets the position of spaceship (80 is the middle)
spaceship.setPosition(80, 100)
info.setLife(5)
info.setScore(0)

game.onUpdateInterval(Math.randomRange(500, 1250), function () {
    aliens = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 1 1 1 1 1 . . . . . . 
        . . . . 1 9 9 9 6 6 1 . . . . . 
        . . . 1 9 9 9 9 9 9 6 1 . . . . 
        . . d d 9 9 9 7 9 9 9 d d . . . 
        . . . d d d d d d d d d . . . . 
        . . . . d d d d d d d . . . . . 
        . . . . . d d d d d . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, Math.randomRange(-10, 10), Math.randomRange(30, 70))
    aliens.setPosition(Math.randomRange(0, 160), 0)
    aliens.setKind(SpriteKind.Enemy)
    aliens.setScale(2, ScaleAnchor.Middle)
})
game.onUpdateInterval(Math.randomRange(500, 1250), function () {
    asteroids = sprites.createProjectileFromSide(img`
        . . . . . . . . 8 8 8 8 . . . . 
        . . . . 8 8 8 8 8 8 8 8 8 . . . 
        . . . 8 f 8 8 6 6 6 6 8 6 8 . . 
        . . 8 8 f f f f 6 6 6 8 6 6 8 . 
        . . 8 8 6 f f 8 6 6 f f f 6 6 8 
        . . 8 8 6 6 6 6 b 8 f f f 6 6 8 
        . 8 8 8 8 6 8 8 b 6 f 8 6 6 8 8 
        8 6 f f 8 8 8 6 b b 9 b b b 8 8 
        8 6 f f f f 8 8 8 9 b b b 6 6 8 
        8 6 6 c f f 8 6 9 9 b b b 6 6 8 
        8 8 b 6 6 6 6 b 9 b b 6 b b 6 . 
        . 8 8 b b b b b b b 6 8 8 b 6 . 
        . . 8 8 8 b 8 8 8 b 6 6 b 8 . . 
        . . . . 8 b 6 8 8 b b b 8 . . . 
        . . . . 8 b b 6 6 6 b 8 . . . . 
        . . . . . . b 6 6 8 8 . . . . . 
        `, Math.randomRange(-10, 10), Math.randomRange(30, 70))
    asteroids.setPosition(Math.randomRange(0, 160), 0)
    asteroids.setKind(SpriteKind.create())
})


// fires the bullets from spaceship
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    laser = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 4 2 . . . . . . . 
        . . . . . . . 5 4 . . . . . . . 
        . . . . . . . 2 5 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, 0, -100)
    laser.setPosition(spaceship.x, spaceship.y)
    laser.setKind(SpriteKind.Projectile)
    music.pewPew.play()
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.create(), function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.fire, 50)
    otherSprite.destroy(effects.disintegrate, 1)
    music.thump.play()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.destroy(effects.fire, 50)
    otherSprite.destroy(effects.disintegrate, 1)
    music.baDing.play()
    sprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.fire, 50)
    otherSprite.destroy(effects.disintegrate, 1)
    music.thump.play()
})

sprites.onOverlap(SpriteKind.Projectile, asteroids, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 50)
    otherSprite.destroy(effects.disintegrate, 1)
    music.knock.play()
    sprite.destroy()
})