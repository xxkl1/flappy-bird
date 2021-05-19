class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 150
        this.pipeHorizontalSpace = 150
        this.columsOfPipe = 3
        for (let i = 0; i < 3; i++) {
            var p1 = GameImage.new(game, 'pipe')
            p1.flipY = true
            p1.x = 500 + i * this.pipeHorizontalSpace
            var p2 = GameImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    static new(game) {
        return new this(game)
    }
    debug() {
        this.pipeHorizontalSpace = config.pipe_horizontal_space.value
        this.pipeSpace = config.pipe_space.value
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-150, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    update() {
        for (let p of this.pipes) {
            p.x -= 5
            if (p.x < -100) {
                p.x += this.pipeHorizontalSpace * this.columsOfPipe
            }
        }
    }
    draw() {
        var context = this.game.context
        for (const p of this.pipes) {
            context.save()

            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)

            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)
            context.drawImage(p.texture, 0, 0)
            context.restore()
        }
    }
}

class SceneTitle extends Scene {
    constructor(game) {
        super(game)
        this.debugModeEnable = true
        // bg
        var bg = GameImage.new(game, 'bg')
        this.addElement(bg)
        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        // 循环移动的地面
        this.grounds = []
        for (let i = 0; i < 30; i++) {
            var g = GameImage.new(game, 'ground')
            g.x = i * 19
            g.y = 300
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4
        // bird
        var b = Animation.new(game)
        b.x = 100
        b.y = 200
        this.birdSpeed = 2
        this.bird = b
        this.addElement(b)

        this.setupInputs()

    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }
    update() {
        super.update()
        // 地面移动
        this.skipCount--
        var offset = -5
        if (this.skipCount === 0) {
            this.skipCount = 4
            offset = 15
        }
        for (let i = 0; i < 30; i++) {
            var g = this.grounds[i]
            g.x += offset
        }
        for (const p of this.pipe.pipes) {
                if (this.bird.x >= p.x && this.bird.x <= (p.x + p.w)) {
                    let isImpact = false
                    if (p.flipY) {
                        if (this.bird.y <= p.y + p.h) {
                            isImpact = true
                        }
                    } else {
                        if (this.bird.y >= p.y) {
                            isImpact = true
                        }
                        if (this.bird.y + this.bird.h >= p.y) {
                            isImpact = true
                        }
                    }

                    if (isImpact) {
                        var s = SceneEnd.new(this.game)
                        this.game.runWithScene(s)
                    }
                }
        }
    }
    setupInputs() {
        var self = this
        var b = this.bird
        self.game.registerAction('a', function (keyStatus) {
            b.move(-self.birdSpeed, keyStatus)
        })
        self.game.registerAction('d', function (keyStatus) {
            b.move(self.birdSpeed, keyStatus)
        })
        self.game.registerAction('j', function (keyStatus) {
            b.jump(2, keyStatus)
        })
    }
}
