import { TriggerBoxShape, TriggerComponent } from "@dcl/ecs-scene-utils"
import { movePlayerTo } from "@decentraland/RestrictedActions"
import { Dash_AnimationQueue, Dash_Ease, Dash_Material, Dash_Tweaker } from "dcldash"
import { Scene } from "src/congif/core/scene"
import { SceneLocations } from "src/congif/enums"
import { movePlayerToVector3 } from "src/utils/movePlayerToVector3"
import { teleportBox } from "src/utils/teleportBox"
import { TriggerDoor } from "src/utils/triggerDoor"
import { TriggerPrompts } from "../utils/triggerPrompts"
import * as utils from '@dcl/ecs-scene-utils'
import { article1page1 } from "src/articles/articleResources/article1"
import { ButtonNext } from "./buttonNext"
import { ButtonPrev } from "./buttonPrev"
import { ButtonStop } from "./buttonStop"
import { dynamicArticle1 } from "src/articles/dynamicArticle1"
import { dynamicArticle2 } from "src/articles/dynamicArticle2"
import { dynamicArticle3 } from "src/articles/dynamicArticle3"
import { dynamicArticle4 } from "src/articles/dynamicArticle4"



class ExteriorInstance extends Scene {

    private mainGeo = new Entity()
    private bottomFloorVS = new Entity()
    private frontDoor = new Entity()
    private newStandGeo = new Entity()
    private newStandPosters = new Entity()
    private prompt1 = new TriggerPrompts()
    private prompt2 = new TriggerPrompts()
    private prompt3 = new TriggerPrompts()
    private prompt4 = new TriggerPrompts()
    private triggerDoor1 = new TriggerDoor()
    private elevatorPad = new Entity()
    private teleportBox = new teleportBox()
    private teleportBox2 = new teleportBox()
    private hologram = new Entity()

    public articlenum = 0
    public pagenum = 0

    private article1 = new dynamicArticle1()
    private article2 = new dynamicArticle2()
    private article3 = new dynamicArticle3()
    private article4 = new dynamicArticle4()

    private nextbuttonLeft = new ButtonNext()
    private prevbuttonLeft = new ButtonPrev()
    private stopbuttonLeft = new ButtonStop()
    private nextbuttonRight = new ButtonNext()
    private stopbuttonRight = new ButtonStop()
    private prevbuttonRight = new ButtonPrev()

    private teleportCollider = new Entity()

    constructor() {
        super(SceneLocations.Exterior)
        this.addComponent(new GLTFShape('models/UPS_Colliders.glb'))
        this.mainGeo.addComponent(new GLTFShape('models/UPS_MainGeo_5.glb'))
        this.bottomFloorVS.addComponent(new GLTFShape('models/UPS_bottom_floor_videoscreen_2.glb'))
        this.elevatorPad.addComponent(new GLTFShape('models/UPS_ElevatorPad.glb')) // We are not using the elevetor yet
        this.frontDoor.addComponent(new GLTFShape('models/UPS_FrontDoor.glb'))
        this.frontDoor.addComponent(new Animator)
        this.frontDoor.getComponent(Animator).addClip(new AnimationState('GlassDoor_Open', { layer: 0, weight: 0.01 }))
        this.frontDoor.getComponent(Animator).addClip(new AnimationState('GlassDoor_Close', { layer: 1, weight: 0.01 }))
        this.newStandPosters.addComponent(new GLTFShape('models/UPS_Newstand_posters.glb'))
        this.newStandGeo.addComponent(new GLTFShape('models/UPS_Newstand_geo.glb'))
        // this.hologram.addComponent(new GLTFShape('models/hologram_2.glb'))

        this.mainGeo.setParent(this)
        this.elevatorPad.setParent(this) // We are not using the elevetor yet
        this.bottomFloorVS.setParent(this)
        this.frontDoor.setParent(this)
        this.newStandGeo.setParent(this)
        this.newStandPosters.setParent(this)

        this.teleportCollider.addComponent(new BoxShape)
        this.teleportCollider.addComponent(new Transform({
            position: new Vector3(4.170, 2.020, 27.980),
            scale: new Vector3(5.000, 5.000, 3.000),
            rotation: new Quaternion().setEuler(0.000, 0.000, 0.000),
         }))
         this.teleportCollider.addComponent(Dash_Material.transparent())
        engine.addEntity(this.teleportCollider)


        this.createTriggerPrompts()
        this.triggerPortal1()
        this.teleportBuild()
        // this.articleFeed()
        this.clickPrompt1()
    }
    createTriggerPrompts() {
        [this.prompt1, this.prompt2, this.prompt3, this.prompt4
        ].forEach(triggerPrompts => {
            triggerPrompts.addComponent(Dash_Material.transparent())
            triggerPrompts.setParent(this)
        })

        this.prompt1.addComponentOrReplace(new  Transform({
            position: new Vector3(24.070, 2.600, 22.550),
            scale: new Vector3(1.180, 2.100, 1.900),
            rotation: new Quaternion().setEuler(1.000, 91.000, 360.000),
         }))
        this.prompt1.onClick = () => this.articleFeed1()

        this.prompt2.addComponentOrReplace(new  Transform({
            position: new Vector3(24.070, 2.600, 21.260),
            scale: new Vector3(1.200, 2.120, 1.920),
            rotation: new Quaternion().setEuler(1.000, 91.000, 360.000),
         }))
        this.prompt2.onClick = () => this.articleFeed2()

        this.prompt3.addComponentOrReplace(new Transform({
            position: new Vector3(24.070, 2.600, 19.350),
            scale: new Vector3(1.180, 2.100, 1.900),
            rotation: new Quaternion().setEuler(1.000, 91.000, 360.000),
         }))
         this.prompt3.onClick = () => this.articleFeed3()

         this.prompt4.addComponentOrReplace( new Transform({
            position: new Vector3(24.070, 2.600, 18.050),
            scale: new Vector3(1.180, 2.100, 1.900),
            rotation: new Quaternion().setEuler(1.000, 91.000, 360.000),
         }))
         this.prompt4.onClick = () => this.articleFeed4()

    }

    triggerPortal1() {
        [this.triggerDoor1,
        ].forEach(TriggerDoor => {
            TriggerDoor.setParent(this)
            // TriggerDoor.addComponent(Dash_Material.transparent())
            TriggerDoor.getComponent(BoxShape).withCollisions = false
            TriggerDoor.removeComponent(BoxShape)
        })


        this.triggerDoor1.addComponentOrReplace(new Transform({
            position: new Vector3(14.410, 0.980, 10.160),
            scale: new Vector3(6.800, 5.000, 12.000),
            rotation: new Quaternion().setEuler(1.000, 180.000, 1.000),
        }))
        this.triggerDoor1.onCameraEnter = () => this.enter()
        this.triggerDoor1.onCameraExit = () => this.exit()
    }
    enter() {
        //Door animation plays
        this.frontDoor.getComponent(Animator).getClip('GlassDoor_Close').stop()
        this.frontDoor.getComponent(Animator).getClip('GlassDoor_Open').play()
        this.frontDoor.getComponent(Animator).getClip('GlassDoor_Open').looping = false

    }
    exit() {
        //this.frontDoor.getComponent(Animator).getClip('GlassDoor_Close').stop()
        this.frontDoor.getComponent(Animator).getClip('GlassDoor_Open').stop()
        this.frontDoor.getComponent(Animator).getClip('GlassDoor_Close').play()
        this.frontDoor.getComponent(Animator).getClip('GlassDoor_Close').looping = false
    }

    teleportBuild() {
        // this.teleportBox.addComponent(new Transform({
        //     position: new Vector3(1,1,1),
        //     scale: new Vector3(1,1,1)
        // }))

        this.teleportBox.onCameraEnter = () => {
            movePlayerToVector3(new Vector3(10.94, 20.98, 22.35), new Vector3(23.80, 24.08, 21.87))
        }
        engine.addEntity(this.teleportBox)


        this.teleportBox2.addComponentOrReplace(new Transform({
            position: new Vector3(7.290, 21.980, 22.020),
            scale: new Vector3(2.000, 2.000, 2.000),
            rotation: new Quaternion().setEuler(0.000, 0.000, 0.000),
        }))
        engine.addEntity(this.teleportBox2)

        this.teleportBox2.getComponent(TriggerComponent).shape = new utils.TriggerBoxShape(new Vector3(2.000, 2.000, 2.000))

        this.teleportBox2.onCameraEnter = () => {
            movePlayerToVector3(new Vector3(4.78, 2.08, 27.71), new Vector3(15.14, 1.08, 20.26))
        }

        this.teleportBox2.removeComponent(BoxShape)
        this.teleportBox.removeComponent(BoxShape)

    }

    articleFeed1() {
        engine.removeEntity(this.prompt1)
        engine.removeEntity(this.prompt2)
        engine.addEntity(this.article1)
        this.articlenum = 1
        this.pagenum = 1
        this.article1.load()
        this.createButtonsLeft()
    }

    articleFeed2(){
        engine.removeEntity(this.prompt1)
        engine.removeEntity(this.prompt2)

        this.articlenum = 2
        this.pagenum = 1
        this.article2.load()
        this.createButtonsLeft()

    }

    createButtonsLeft(){
        engine.addEntity(this.nextbuttonLeft)
        engine.addEntity(this.stopbuttonLeft)
        engine.addEntity(this.prevbuttonLeft)


        this.nextbuttonLeft.addComponentOrReplace(new Transform({
            position: new Vector3(24.070, -2.030, 22.570),
            scale: new Vector3(3.000, 3.000, 3.000),
            rotation: new Quaternion().setEuler(360.000, 270.000, 360.000),
         }))

        this.nextbuttonLeft.addComponentOrReplace(new OnPointerDown(()=>{
            if(this.articlenum==1){
                log('clicked!')
                this.article1.nextPage()
            }
            if(this.articlenum==2){
                this.article2.nextPage()
            }
        },{
            hoverText: 'Next Page'
        }))

        this.stopbuttonLeft.addComponentOrReplace(new   Transform({
            position: new Vector3(24.000, -2.610, 23.130),
            scale: new Vector3(3.000, 3.000, 3.000),
            rotation: new Quaternion().setEuler(360.000, 270.000, 360.000),
         }))

         this.stopbuttonLeft.addComponentOrReplace(new OnPointerDown(()=>{
            if(this.articlenum==1){
                this.article1.onExit(this.article1.currentEntity)
                engine.addEntity(this.prompt1)
                engine.addEntity(this.prompt2)

                engine.removeEntity(this.nextbuttonLeft)
                engine.removeEntity(this.stopbuttonLeft)
                engine.removeEntity(this.prevbuttonLeft)
            }
            if(this.articlenum==2){
                this.article2.onExit(this.article2.currentEntity)
                engine.addEntity(this.prompt1)
                engine.addEntity(this.prompt2)

                engine.removeEntity(this.nextbuttonLeft)
                engine.removeEntity(this.stopbuttonLeft)
                engine.removeEntity(this.prevbuttonLeft)

            }
        },{
            hoverText: 'Close Article'
        }))


        this.prevbuttonLeft.addComponentOrReplace(new 
            Transform({
                position: new Vector3(24.000, -2.030, 24.340),
                scale: new Vector3(3.000, 3.000, 3.000),
                rotation: new Quaternion().setEuler(360.000, 270.000, 360.000),
             })
)

         this.prevbuttonLeft.addComponentOrReplace(new OnPointerDown(()=>{
            if(this.articlenum==1){
                this.article1.prevPage()
            }
            if(this.articlenum==2){
                this.article2.prevPage() 
            }
        },{
            hoverText: 'Previous Page'
        }))
    }

    articleFeed3(){
        engine.removeEntity(this.prompt3)
        engine.removeEntity(this.prompt4)
        engine.addEntity(this.article3)
        this.articlenum = 3
        this.pagenum = 1
        this.article3.load()
        this.createButtonsRight()
    }

    articleFeed4(){
        engine.removeEntity(this.prompt3)
        engine.removeEntity(this.prompt4)
        engine.addEntity(this.article4)
        this.articlenum = 4
        this.pagenum = 1
        this.article4.load()
        this.createButtonsRight()
    }


    createButtonsRight(){
        engine.addEntity(this.nextbuttonRight)
        engine.addEntity(this.stopbuttonRight)
        engine.addEntity(this.prevbuttonRight)


        this.nextbuttonRight.addComponentOrReplace(new  Transform({
            position: new Vector3(24.070, -2.030, 19.37),
            scale: new Vector3(3.000, 3.000, 3.000),
            rotation: new Quaternion().setEuler(360.000, 270.000, 360.000),
         }))
        this.nextbuttonRight.addComponentOrReplace(new OnPointerDown(()=>{
            if(this.articlenum==3){
                log('clicked!')
                this.article3.nextPage()
            }
            if(this.articlenum==4){
                this.article4.nextPage()
            }
        },{
            hoverText: 'Next Page'
        }))

        this.stopbuttonRight.addComponentOrReplace(new Transform({
            position: new Vector3(24.000, -2.610, 19.93),
            scale: new Vector3(3.000, 3.000, 3.000),
            rotation: new Quaternion().setEuler(360.000, 270.000, 360.000),
         }))
        this.stopbuttonRight.addComponentOrReplace(new OnPointerDown(()=>{
            if(this.articlenum==3){
                this.article3.onExit(this.article3.currentEntity)
                engine.addEntity(this.prompt3)
                engine.addEntity(this.prompt4)

                engine.removeEntity(this.nextbuttonRight)
                engine.removeEntity(this.stopbuttonRight)
                engine.removeEntity(this.prevbuttonRight)
            }
            if(this.articlenum==4){
                this.article4.onExit(this.article2.currentEntity)
                engine.addEntity(this.prompt3)
                engine.addEntity(this.prompt4)

                engine.removeEntity(this.nextbuttonRight)
                engine.removeEntity(this.stopbuttonRight)
                engine.removeEntity(this.prevbuttonRight)

            }
        },{
            hoverText: 'Close Article'
        }))


        this.prevbuttonRight.addComponentOrReplace(new Transform({
            position: new Vector3(24.000, -2.030, 21.14),
            scale: new Vector3(3.000, 3.000, 3.000),
            rotation: new Quaternion().setEuler(360.000, 270.000, 360.000),
         }))
         this.prevbuttonRight.addComponentOrReplace(new OnPointerDown(()=>{
            if(this.articlenum==3){
                this.article3.prevPage()
            }
            if(this.articlenum==4){
                this.article4.prevPage() 
            }
        },{
            hoverText: 'Previous Page'
        }))


    }

    clickPrompt1() {
        //enter the code of prompt1 trigger actions
        
    }
    clickPrompt2() {
        //enter the code of prompt2 trigger actions
    }

}

export const Exterior = new ExteriorInstance()