import { getEntityWorldRotation, TriggerComponent } from "@dcl/ecs-scene-utils"
import { Dash_Ease, Dash_Material, Dash_Tweaker, Dash_Wait } from "dcldash"
import { Scene } from "src/congif/core/scene"
import { SceneController } from "src/congif/core/sceneController"
import { SceneLocations } from "src/congif/enums"
import { movePlayerToVector3 } from "src/utils/movePlayerToVector3"
import { teleportBox } from "src/utils/teleportBox"
import { ButtonNext } from "./buttonNext"
import { ButtonPrev } from "./buttonPrev"
import { ButtonStop } from "./buttonStop"
import * as utils from '@dcl/ecs-scene-utils'
import { Videos1, Videos2, Videos3 } from "./Videos"
import { TriggerPrompts } from "src/utils/triggerPrompts"

let x=0
export class AuditoriumInstance extends Scene {

    private auditoriumGeo = new Entity()
    //utils
    private teleportToLobby = new teleportBox()
    private screen1 = new Videos1()
    private screen2 = new Videos2()
    private screen3 = new Videos3()
    private auditoriumconsole = new Entity()
    private nextmoviebutton = new ButtonPrev()
    private stopmoviebutton = new ButtonStop()
    private prevmoviebutton = new ButtonNext()
    private playmoviebutton = new ButtonStop()
    private consolebuttonprev = new TriggerPrompts()
    private consolebuttonplay = new TriggerPrompts()
    private consolebuttonstop = new TriggerPrompts()
    private consolebuttonnext = new TriggerPrompts()
    private triggervideo = new teleportBox()

    private proximityBoxa = new teleportBox()
    private currentvid = 1
    

    constructor() {
        super(SceneLocations.Auditorium)
        this.addComponent(new GLTFShape('models/new models/UPS_auditorium_Collider.glb'))
        this.auditoriumGeo.addComponent(new GLTFShape('models/new models/UPS_auditorium_geo.glb'))
        this.auditoriumGeo.setParent(this)
        this.auditoriumconsole.addComponent(new GLTFShape('models/new models/UPS_Auditorium_Console.glb'))
        this.auditoriumconsole.addComponent(new Animator)
        this.auditoriumconsole.getComponent(Animator).addClip(new AnimationState('Console_Hidden', { layer: 0, weight: 0.02 }))
        this.auditoriumconsole.getComponent(Animator).addClip(new AnimationState('Console_Rise', { layer: 1, weight: 0.02 }))
        this.auditoriumconsole.getComponent(Animator).addClip(new AnimationState('Console_lower', { layer: 2, weight: 0.02 }))
        this.auditoriumconsole.getComponent(Animator).addClip(new AnimationState('Console_visible', { layer: 3, weight: 0.02 }))
        this.auditoriumconsole.getComponent(Animator).addClip(new AnimationState('Console_Prev_Highlight', { layer: 4, weight: 0.02 }))
        this.auditoriumconsole.getComponent(Animator).addClip(new AnimationState('Console_Stop_Highlight', { layer: 5, weight: 0.02 }))
        this.auditoriumconsole.getComponent(Animator).addClip(new AnimationState('Console_Play_Highlight', { layer: 6, weight: 0.02 }))
        this.auditoriumconsole.getComponent(Animator).addClip(new AnimationState('Console_Next_Highlight', { layer: 7, weight: 0.02 }))
        this.auditoriumconsole.getComponent(Animator).getClip('Console_Hidden').pause()
        this.auditoriumconsole.getComponent(Animator).getClip('Console_lower').pause()
        this.auditoriumconsole.getComponent(Animator).getClip('Console_Rise').pause()
        this.auditoriumconsole.getComponent(Animator).getClip('Console_visible').play()
        this.auditoriumconsole.setParent(this)
        this.currentvid


        this.createPortal()
        this.createMovieScreen()
        this.createConsoleButtons()
        this.createProximityBox()
        this.triggervid()
        
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
            position: new Vector3(28.860, 33.780, 5.620),
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
        [this.screen1,].forEach(screen => {
            screen.setParent(this)
            screen.addComponentOrReplace(new PlaneShape())
            screen.addComponentOrReplace(new Transform({
                position: new Vector3(1.250, 36.480, 13.030),
                scale: new Vector3(19.000, 8.013, 8.213),
                rotation: new Quaternion().setEuler(0.000, 90.000, 360.000),
            }))
        })

        this.screen2.setParent(this)
        this.screen2.addComponentOrReplace(new PlaneShape())
        this.screen2.addComponentOrReplace(new Transform({
            position: new Vector3(1.250, 36.480, 13.030),
            scale: new Vector3(19.000, 8.013, 8.213),
            rotation: new Quaternion().setEuler(0.000, 90.000, 360.000),
        }))
        engine.removeEntity(this.screen2)

        this.screen3.setParent(this)
        this.screen3.addComponentOrReplace(new PlaneShape())
        this.screen3.addComponentOrReplace(new Transform({
            position: new Vector3(1.250, 36.480, 13.030),
            scale: new Vector3(19.000, 8.013, 8.213),
            rotation: new Quaternion().setEuler(0.000, 90.000, 360.000),
        }))
        engine.removeEntity(this.screen3)
        

    }
    createConsoleButtons() {
        [this.consolebuttonprev, this.consolebuttonplay, this.consolebuttonstop,
        this.consolebuttonnext].forEach(consoleButtons => {
            consoleButtons.addComponent(Dash_Material.transparent())
            consoleButtons.setParent(this)
        })
        this.consolebuttonprev.addComponentOrReplace(new Transform({
            position: new Vector3(8.250, 31.010, 11.580),
            scale: new Vector3(0.800, 0.700, 0.400),
            rotation: new Quaternion().setEuler(1.000, 85.000, 0.000),
        }))
        this.consolebuttonprev.addComponentOrReplace(new OnPointerDown(() => {
            if (this.currentvid == 1) {
                this.screen1.myVideoTexture.pause()
                this.screen1.myVideoTexture.reset()
                engine.removeEntity(this.screen1)
                engine.addEntity(this.screen3)
                this.screen3.myVideoTexture.play()
                this.currentvid = 3
                return

            }
            if (this.currentvid == 2) {
                this.screen2.myVideoTexture.pause()
                this.screen2.myVideoTexture.reset()
                engine.removeEntity(this.screen2)
                engine.addEntity(this.screen1)
                this.screen1.myVideoTexture.play()
                this.currentvid = 1
                return
            }
            if (this.currentvid == 3) {
                this.screen3.myVideoTexture.pause()
                this.screen3.myVideoTexture.reset()
                engine.removeEntity(this.screen3)
                engine.addEntity(this.screen2)
                this.screen2.myVideoTexture.play()
                this.currentvid = 2
                return
            }

        }, {
            hoverText: 'Prev'
        }))
        this.consolebuttonstop.addComponentOrReplace(new Transform({
            position: new Vector3(8.250, 31.010, 12.580),
            scale: new Vector3(0.800, 0.700, 0.400),
            rotation: new Quaternion().setEuler(1.000, 85.000, 0.000),
        }))
        this.consolebuttonstop.addComponentOrReplace(new OnPointerDown(() => {
            if (this.currentvid == 1) {
                this.screen1.myVideoTexture.pause()
            }
            if (this.currentvid == 2) {
                this.screen2.myVideoTexture.pause()
            }
            if (this.currentvid == 3) {
                this.screen3.myVideoTexture.pause()
            }

        }, {
            hoverText: 'Stop'
        }))
        this.consolebuttonplay.addComponentOrReplace(new Transform({
            position: new Vector3(8.250, 31.010, 13.580),
            scale: new Vector3(0.800, 0.700, 0.400),
            rotation: new Quaternion().setEuler(1.000, 85.000, 0.000),
        }))
        this.consolebuttonplay.addComponentOrReplace(new OnPointerDown(() => {
            log(this.currentvid)
            if (this.currentvid == 1) {
                this.screen1.myVideoTexture.play()
            }
            if (this.currentvid == 2) {
                this.screen2.myVideoTexture.play()
            }
            if (this.currentvid == 3) {
                this.screen3.myVideoTexture.play()
            }

        }, {
            hoverText: 'Play'
        }))
        this.consolebuttonnext.addComponentOrReplace(new Transform({
            position: new Vector3(8.250, 31.010, 14.580),
            scale: new Vector3(0.800, 0.700, 0.400),
            rotation: new Quaternion().setEuler(1.000, 85.000, 0.000),
        }))
        this.consolebuttonnext.addComponentOrReplace(new OnPointerDown(() => {
            log("the video should be playing   ", this.screen1.myVideoClip.url)
            if (this.currentvid == 1) {
                this.screen1.myVideoTexture.pause()
                this.screen1.myVideoTexture.reset()
                engine.removeEntity(this.screen1)
                engine.addEntity(this.screen2)
                this.screen2.myVideoTexture.play()

                log(this.currentvid)
                this.currentvid = 2
                log(this.currentvid)
                return

            }
            if (this.currentvid == 2) {
                this.screen2.myVideoTexture.pause()
                this.screen2.myVideoTexture.reset()
                engine.removeEntity(this.screen2)
                engine.addEntity(this.screen3)
                this.screen3.myVideoTexture.play()
                log(this.currentvid)
                this.currentvid = 3
                log(this.currentvid)
                return
            }
            if (this.currentvid == 3) {
                this.screen3.myVideoTexture.pause()
                this.screen3.myVideoTexture.reset()
                engine.removeEntity(this.screen3)
                engine.addEntity(this.screen1)
                this.screen1.myVideoTexture.play()
                log(this.currentvid)
                this.currentvid = 1
                log(this.currentvid)
                return
            }

        }, {
            hoverText: 'Next'
        }))


    }
    triggervid(){
        
            [this.triggervideo,
            ].forEach(vid => {
                vid.setParent(this)
                // instruction.addComponent(Dash_Material.transparent())
                vid.getComponent(BoxShape).withCollisions = false
                vid.removeComponent(BoxShape)
            })
    
    
            this.triggervideo.addComponentOrReplace(new Transform({
                position: new Vector3(28.21, 33.08, 13.21),
                scale: new Vector3(-1.200, 1.000, 7.000),
                rotation: new Quaternion().setEuler(1.000, 180.000, 1.000),
            }))
            this.triggervideo.onCameraEnter = () => this.enterTriggerv()
            this.triggervideo.onCameraExit = () => this.exitTriggerv()
    
        
    

    }
    enterTriggerv(){
        if (x == 0) {
           this.screen1.myVideoTexture.play()
            x = x + 1
            log('entro and vid is playing')

        } else {
            
        }  
    }
    exitTriggerv(){}

    
    createProximityBox() {
        this.proximityBoxa.addComponentOrReplace(new Transform({
            position: new Vector3(11.550, 1.100, 12.900),
            scale: new Vector3(10.000, 10.000, 10.000),
            rotation: new Quaternion().setEuler(0.000, 0.000, 0.000),
         }))
        this.proximityBoxa.setParent(this)

        this.proximityBoxa.getComponent(TriggerComponent).shape = new utils.TriggerBoxShape(new Vector3(10.000, 10.000, 10.000))

        this.proximityBoxa.onCameraEnter = () => {
            // this.auditoriumconsole.getComponent(Animator).getClip('Console_Rise').play(true)
            // this.auditoriumconsole.getComponent(Animator).getClip('Console_Rise').looping = false

            //this.auditoriumconsole.getComponent(Animator).getClip('Console_visible').play 
            //this.elevator.getComponent(Animator).getClip('Console_visible').playing = !this.elevator.getComponent(Animator).getClip('ElevatorLift').playing

        }
        this.proximityBoxa.onCameraExit = () => {
           
            // this.auditoriumconsole.getComponent(Animator).getClip('Console_lower').play(true)
            // this.auditoriumconsole.getComponent(Animator).getClip('Console_lower').looping = false

            

        }

        
        this.proximityBoxa.removeComponent(BoxShape)
        

    }
}



export const Auditorium = new AuditoriumInstance()