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

    private auditoriumGeo = new Entity()
     //utils
     private teleportToLobby = new teleportBox()
     private screen = new Videos()
     private nextmoviebutton = new ButtonNext()
     private stopmoviebutton = new ButtonStop()


    constructor() {
        super(SceneLocations.Auditorium)
        this.addComponent(new GLTFShape('models/new models/UPS_auditorium_Colliders.glb'))
        this.auditoriumGeo.addComponent(new GLTFShape('models/new models/UPS_auditorium_geo.glb'))
        this.createMovieScreen()
        this.createmoviebutton()
        this.screen.setParent(this)

        this.auditoriumGeo.setParent(this)
        this.createPortal()
    }
    preload(){
        engine.addEntity(this)
        log('preloaded Auditorium!')
        this.addComponent(new Transform({scale: new Vector3(0.0001,0.0001,0.0001)}))
        Dash_Wait(()=>{
            engine.removeEntity(this)
            log('Auditorium Preload Removed.')
            this.removeComponent(Transform)
            this.addComponent(new Transform({
                position: new Vector3(0,0,0),
                scale: new Vector3(1,1,1)
            }))
        },5)
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
            new Vector3(12.50,1.08,15.61),
            new Vector3(10.99, 2, 11.86),
        )

    }
    goLobby(position: Vector3, direction: Vector3) {
        SceneController.loadScene(SceneLocations.Exterior)
        movePlayerToVector3(position, direction)
    }
    createMovieScreen() {
        // [this.screen,].forEach(screen => {
        //     // teleports.addComponent(Dash_Material.transparent())
        // })

        this.screen.addComponentOrReplace(new PlaneShape())
        this.screen.addComponentOrReplace(new Transform({
            position: new Vector3(1.250, 7.480, 13.030),
            scale: new Vector3(18.000, 7.013, 7.213),
            rotation: new Quaternion().setEuler(0.000, 90.000, 360.000),
         }))
        
    }
    createmoviebutton() {
        engine.addEntity(this.nextmoviebutton)
        engine.addEntity(this.stopmoviebutton)
       
        this.nextmoviebutton.setParent(this)
        this.stopmoviebutton.setParent(this)
        
        this.nextmoviebutton.addComponentOrReplace(new Transform({
            position: new Vector3(11.49,1.10,13.54),
            scale: new Vector3(3.300, 3.100, -1.900),
            rotation: new Quaternion().setEuler(360.000, 270.000, 360.000),
        }))



        this.stopmoviebutton.addComponentOrReplace(new Transform({
            position: new Vector3(11.49,1.10,13.54),
            scale: new Vector3(3.300, 3.100, -1.900),
            rotation: new Quaternion().setEuler(360.000, 270.000, 360.000),
        }))
        this.stopmoviebutton.addComponentOrReplace(new OnPointerDown(() => {
            this.screen.myVideoTexture.pause()
           

        }, {
            hoverText: 'Stop'
        }))


    }
}



export const Auditorium = new AuditoriumInstance()