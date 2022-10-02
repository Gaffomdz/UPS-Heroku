import { SceneController } from "./congif/core/sceneController"
import { SceneLocations } from "./congif/enums"
import { SceneEntities } from "./congif/scenes"
import { Auditorium } from "./enviroment/auditorium"
import { hologram } from "./utils/hologram"

class GameController {
  private scenes = SceneEntities

  constructor() {
    SceneController.loadScene(SceneLocations.Exterior)
    Auditorium.preload()
  }

}

new GameController()



