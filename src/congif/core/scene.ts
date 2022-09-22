import { SceneLocations } from "../enums"
import { SceneController } from "./sceneController"


export abstract class Scene extends Entity {
    protected onHide?(): void
    protected onShow?(): void

    constructor(public location: SceneLocations) {
        super()
        SceneController.addScene(location, this)
    }
    hide() {
        if (this.alive) { engine.removeEntity(this) }
        if (this.onHide) this.onHide()
    }
    show() {
        if (!this.alive) { engine.addEntity(this) }
        if (this.onShow) this.onShow()
    }

}