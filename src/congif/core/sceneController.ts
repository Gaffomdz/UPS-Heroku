import { SceneLocations } from "../enums"
import { Scene } from "./scene"


declare const Map: any

export class SceneControllerInstance {
    private scenes: typeof Map = new Map()

    constructor() { }

    addScene(location: SceneLocations, entity: Entity) {
        this.scenes.set(location, entity)
    }

    preload() {
        
    }

    loadScene(location: SceneLocations) {
        this.scenes.forEach((scene: Scene) => {
            if (scene.location == location) {
                scene.show()
            } else {
                scene.hide()
            }
        })
    }
}

export const SceneController = new SceneControllerInstance()