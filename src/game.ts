import { SceneController } from "./congif/core/sceneController"
import { SceneLocations } from "./congif/enums"
import { SceneEntities } from "./congif/scenes"
import { hologram } from "./utils/hologram"

class GameController {
  private scenes = SceneEntities

  constructor() {
    SceneController.loadScene(SceneLocations.Exterior)
  }

}

new GameController()



