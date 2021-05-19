class Game {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        //
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector("#id-canvas")
        this.context = this.canvas.getContext("2d")
        // events
        var self = this
        window.addEventListener('keydown', function (event) {
            self.keydowns[event.key] = 'down'
        })

        window.addEventListener('keyup', function (event) {
            self.keydowns[event.key] = 'up'
        })
        this.init()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    drawImage(img) {
        this.context.drawImage(img.texture, img.x, img.y)
    }
    // update
    update() {
        this.scene.update()
    }
    // draw
    draw() {
        this.scene.draw()
    }
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    runloop() {
        var g = this
        var actionKeys = Object.keys(g.actions)
        for (var i = 0; i < actionKeys.length; i++) {
            var key = actionKeys[i]
            var status = g.keydowns[key]
            if (status === 'down') {
                // 如果按键被按了，调用注册的 action
                g.actions[key]('down')
            } else if (status === 'up') {
                g.actions[key]('up')
                // 删除掉这个key的状态
                g.keydowns[key] = null
            }
        }
        // 外部注册，用于与按键无关的状态更新
        if (!window.paused) {
            g.update()
            g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
            // 外部注册，绘制
            g.draw()
        }
        // next run loop
        setTimeout(function () {
            g.runloop()
        }, 1000/window.fps)
    }
    textureByName(name) {
        var g = this
        log ('g.images', g.images)
        var img = g.images[name]
        // var image = {
        //     w: img.width,
        //     h: img.height,
        //     image: img,
        // }
        return img
    }
    runWithScene(scene) {
        var g = this
        g.scene = scene
        // 开始运行程序
        g.runloop()
    }

    __start() {
        this.runCallback(this)
    }
    init() {
        var g = this
        var loads = []
        // 预先载入所有图片
        var names = Object.keys(g.images)
        for (let i = 0; i < names.length; i++) {
            let name = names[i]
            let path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function() {
                // 存入g.images 中
                g.images[name] = img
                loads.push(1)
                if (loads.length === names.length) {
                    g.__start ()
                }
            }
        }
    }
}
