import { Exterior } from "src/enviroment/exterior"
import { Scene } from "./core/scene"
import { SceneLocations } from "./enums"


export const SceneEntities: {[key: number] : Scene } = {
    [SceneLocations.Exterior]: Exterior,
}

export const getSceneEntityFromLocation = (location: SceneLocations) : (Scene | undefined) => {
    return SceneEntities[location]
}