class SceneEnd extends Scene {
    constructor(game) {
        super(game)
        this.game = game
        var bg = GameImage.new(game, 'bg')
        this.addElement(bg)
        this.grounds = []
        for (let i = 0; i < 30; i++) {
            var g = GameImage.new(game, 'ground')
            g.x = i * 19
            g.y = 300
            this.addElement(g)
            this.grounds.push(g)
        }
    }
    draw() {
        super.draw()
        this.game.context.font = "24px serif"
        this.game.context.fillStyle = 'white'
        this.game.context.fillText('GameOver', 85, 130)
    }
}
