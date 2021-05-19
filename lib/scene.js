class Scene {
    constructor(game) {
        this.game = game
        this.debugModeEnable = true
        this.elements = []
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }
    draw() {
        for (let e of this.elements) {
            e.draw()
        }
    }
    update() {
        this.debug && this.debug()
        if (this.debugModeEnable) {
            for (let i = 0; i < this.elements.length; i++) {
                var e = this.elements[i]
                e.debug && e.debug()
            }
        }
        for (let i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update()
        }
    }
}
