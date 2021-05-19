var loadLevel = function (game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (let i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var blocks = []
var enableDebugMode = function (game, enable) {
    window.paused = false
    if (!enable) {
        return
    }
    // 这是为了debug
    window.addEventListener('keydown', function (event) {
        var k = event.key
        if (k === 'p') {
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了debug临时加入载入关卡功能
            // blocks = loadLevel(game, Number(k))
        }
    })
    document.querySelector('#id-input-range').addEventListener('input', function (event) {
        var input = event.target
        window.fps = Number(input.value)
    })
}

var __main = function () {
    var images = {
        // flappy bird images
        bg: 'bird/bg.png',
        ground: 'bird/ground.png',
        b1: 'bird/b1.png',
        b2: 'bird/b2.png',
        b3: 'bird/b3.png',
        pipe: 'bird/PipeUp.png',
    }

    var game = Game.instance(30, images, function(g) {
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        game.runWithScene(s)
    })

    enableDebugMode(game, true)
}
__main()
