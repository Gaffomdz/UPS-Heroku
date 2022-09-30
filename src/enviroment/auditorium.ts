import { getEntityWorldRotation } from "@dcl/ecs-scene-utils"
import { Dash_Ease, Dash_Material, Dash_Tweaker, Dash_Wait } from "dcldash"
import { Scene } from "src/congif/core/scene"
import { SceneController } from "src/congif/core/sceneController"
import { SceneLocations } from "src/congif/enums"
import { movePlayerToVector3 } from "src/utils/movePlayerToVector3"
import { teleportBox } from "src/utils/teleportBox"
import { ButtonNext } from "./buttonNext"
import { ButtonStop } from "./buttonStop"
import { Videos } from "./Videos"

export class AuditoriumInstance extends Scene {


    //geo
    private auditoriumGeo = new Entity()
    //screen
    private screen1 = new Videos()
    private screen2 = new Videos()
    private screen3 = new Videos()
    private nextmoviebutton = new ButtonNext()
    private stopmoviebutton = new ButtonStop()
    //utils
    private teleportToLobby = new teleportBox()



    constructor() {
        super(SceneLocations.Auditorium)
        this.addComponent(new GLTFShape('models/new models/UPS_auditorium_Colliders.glb'))
        this.auditoriumGeo.addComponent(new GLTFShape('models/new models/UPS_auditorium_geo.glb'))
        this.screen1.myVideoClip = (new VideoClip('https://player.vimeo.com/external/754766612.m3u8?s=6d7b0c1bae5cc2964a7be4ba9d824b9b1916422c'))
        this.screen2.myVideoClip = (new VideoClip('https://player.vimeo.com/external/754766418.m3u8?s=5786122a2c94e1638e56602b5e0103ddb86aa5c8'))
        this.screen3.myVideoClip = (new VideoClip('https://player.vimeo.com/external/754766219.m3u8?s=61339c6fbf53af2dafdf89908fc2bb4ad8991c93'))



        this.auditoriumGeo.setParent(this)
        this.createPortal()
        this.createMovieScreen()
        // this.createmoviebutton()
    }
    preload() {
        engine.addEntity(this)
        log('preloaded Auditorium!')
        this.addComponent(new Transform({ scale: new Vector3(0.0001, 0.0001, 0.0001) }))
        Dash_Wait(() => {
            engine.removeEntity(this)
            log('Auditorium Preload Removed.')
            this.removeComponent(Transform)
            this.addComponent(new Transform({
                position: new Vector3(0, 0, 0),
                scale: new Vector3(1, 1, 1)
            }))
        }, 5)
    }
    createPortal() {
        this.teleportToLobby.setParent(this)
        this.teleportToLobby.addComponent(Dash_Material.transparent())
        this.teleportToLobby.addComponentOrReplace(new Transform({
            position: new Vector3(28.860, 4.780, 5.620),
            scale: new Vector3(1.400, 3.000, 2.000),
            rotation: new Quaternion().setEuler(2.000, 3.000, 1.000),
        }))
        this.teleportToLobby.onCameraEnter = () => this.goLobby(
            new Vector3(12.50, 1.08, 15.61),
            new Vector3(10.99, 2, 11.86),
        )

    }
    goLobby(position: Vector3, direction: Vector3) {
        SceneController.loadScene(SceneLocations.Exterior)
        movePlayerToVector3(position, direction)
    }
    createMovieScreen() {
        [this.screen1, this.screen2, this.screen3].forEach(screen => {
            screen.setParent(this)
            screen.addComponentOrReplace(new PlaneShape())
            screen.addComponentOrReplace(new Transform({
                position: new Vector3(1.250, 7.480, 13.030),
                scale: new Vector3(18.000, 7.013, 7.213),
                rotation: new Quaternion().setEuler(0.000, 90.000, 360.000),
            }))
        })
        //     engine.addEntity(this.screen1)



    }
    // createmoviebutton() {
    //     engine.addEntity(this.nextmoviebutton)
    //     engine.addEntity(this.stopmoviebutton)

    //     this.nextmoviebutton.setParent(this)
    //     this.stopmoviebutton.setParent(this)

    //     this.nextmoviebutton.addComponentOrReplace(new Transform({
    //         position: new Vector3(11.49, 1.10, 13.54),
    //         scale: new Vector3(3.300, 3.100, -1.900),
    //         rotation: new Quaternion().setEuler(360.000, 270.000, 360.000),
    //     }))
    //     this.nextmoviebutton.addComponentOrReplace(new OnPointerDown(() => {

    //         if (this.screen1.currentvid = 1) {
    //             this.screen1.myVideoTexture.pause()
    //             engine.removeEntity(this.screen1)
    //             engine.addEntity(this.screen2)

    //         }

    //         this.screen1.myVideoTexture.pause()

    //     }, {
    //         hoverText: 'Next'
    //     }))



    //     this.stopmoviebutton.addComponentOrReplace(new Transform({
    //         position: new Vector3(11.49, 1.10, 13.54),
    //         scale: new Vector3(3.300, 3.100, -1.900),
    //         rotation: new Quaternion().setEuler(360.000, 270.000, 360.000),
    //     }))
    //     this.stopmoviebutton.addComponentOrReplace(new OnPointerDown(() => {
    //         this.screen1.myVideoTexture.play()


    //     }, {
    //         hoverText: 'Stop'
    //     }))


    // }
}



export const Auditorium = new AuditoriumInstance()