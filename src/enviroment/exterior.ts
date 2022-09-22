import { Dash_Material } from "dcldash"
import { Scene } from "src/congif/core/scene"
import { SceneLocations } from "src/congif/enums"
import { createUiPrompt1 } from "src/uiPrompts/uiPrompt1"
import { createUiPrompt2 } from "src/uiPrompts/uiPrompt2"
import { TriggerPrompts } from "../utils/triggerPrompts"


class ExteriorInstance extends Scene {

    private mainGeo = new Entity()
    // private elevatorPad = new Entity() // We are not using the elevetor yet
    private bottomFloorVS = new Entity()
    // private frontDoor = new Entity()
    private hologram = new Entity()
    private newStandGeo = new Entity()
    private newStandPosters = new Entity()
    private prompt1 = new TriggerPrompts()
    private prompt2 = new TriggerPrompts()

    constructor() {
        super(SceneLocations.Exterior)
        this.addComponent(new GLTFShape('models/UPS_Colliders.glb'))
        this.mainGeo.addComponent(new GLTFShape('models/UPS_MainGeo_2.glb'))
        this.bottomFloorVS.addComponent(new GLTFShape('models/UPS_bottom_floor_videoscreen.glb'))
        // this.elevatorPad.addComponent(new GLTFShape('models/UPS_ElevatorPad.glb')) // We are not using the elevetor yet
        // this.frontDoor.addComponent(new GLTFShape('models/UPS_FrontDoor.glb'))
        // this.frontDoor.addComponent(new Animator())
        // this.frontDoor.getComponent(Animator).addClip(new AnimationState('GlassDoor_Open', { layer: 0, weight: 0.02 }))
        // this.frontDoor.getComponent(Animator).addClip(new AnimationState('GlassDoor_Close', { layer: 1, weight: 0.01 }))
        // this.frontDoor.getComponent(Animator).getClip('GlassDoor_Open').play(true)
        // this.frontDoor.getComponent(Animator).getClip('GlassDoor_Close').pause()

        // this.hologram.addComponent(new GLTFShape('models/Test_1.glb'))
        // this.hologram.addComponent(new Transform({
        //     position: new Vector3(0,0,0),
        //     scale: new Vector3(1, 1, 1),
        // }))
        this.newStandPosters.addComponent(new GLTFShape('models/UPS_Newstand_posters.glb'))
        this.newStandGeo.addComponent(new GLTFShape('models/UPS_Newstand_geo.glb'))

        this.mainGeo.setParent(this)
        // this.elevatorPad.setParent(this) // We are not using the elevetor yet
        this.bottomFloorVS.setParent(this)
        // this.frontDoor.setParent(this)
        // this.hologram.setParent(this)
        this.newStandGeo.setParent(this)
        this.newStandPosters.setParent(this)

        this.createTriggerPrompts()
    }
    createTriggerPrompts(){
        [this.prompt1,this.prompt2,
        ].forEach(triggerPrompts => {
            triggerPrompts.addComponent(Dash_Material.transparent())
            triggerPrompts.setParent(this)
        })

        this.prompt1.addComponentOrReplace(new Transform({
            position: new Vector3(23.82,3,22.16),
            scale: new Vector3(3.000, 3.000, 4.000),
            rotation: new Quaternion().setEuler(1.000, 100.000, 2.000),
        }))
        this.prompt1.onClick = () => this.showPrompt(
        )
        this.prompt2.addComponentOrReplace(new Transform({
            position: new Vector3(23.82,3,18.5),
            scale: new Vector3(3.000, 4.000, 5.000),
            rotation: new Quaternion().setEuler(1.000, 100.000, 2.000),
        }))
        this.prompt2.onClick = () => this.showPrompt(
        )
        
    }
    showPrompt() {
        log('cartel abierto')
        // createUiPrompt1.show()
        // createUiPrompt2.show()
    }
}

export const Exterior = new ExteriorInstance()