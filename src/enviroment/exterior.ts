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
import { article1background, article1page1 } from "src/articles/articleResources/article1"
import { ButtonNext } from "./buttonNext"
import { ButtonPrev } from "./buttonPrev"
import { ButtonStop } from "./buttonStop"
import { dynamicArticle1 } from "src/articles/Floor1/dynamicArticle1"
import { dynamicArticle2 } from "src/articles/Floor1/dynamicArticle2"
import { dynamicArticle3 } from "src/articles/Floor1/dynamicArticle3"
import { dynamicArticle4 } from "src/articles/Floor1/dynamicArticle4"
import { createUiInstructionPrompt } from "src/uiPrompts/uiInstructionPrompt"
import { dynamicArticle1floor2 } from "src/articles/Floor2/dynamicArticle1"
import { ExitPlane } from "src/utils/exitPlane"
import { dynamicArticle2floor2 } from "src/articles/Floor2/dynamicArticle2"
import { dynamicArticle3floor2 } from "src/articles/Floor2/dynamicArticle3"

let x = 0

class ExteriorInstance extends Scene {

    //environment
    private mainGeo = new Entity()
    private bottomFloorVS = new Entity()
    private frontDoor = new Entity()
    private newStandGeo = new Entity()
    private newStandPosters = new Entity()
    //first floor
    private prompt1 = new TriggerPrompts()
    private prompt2 = new TriggerPrompts()
    private prompt3 = new TriggerPrompts()
    private prompt4 = new TriggerPrompts()
    private triggerDoor1 = new TriggerDoor()
    private elevatorPad = new Entity()

    private teleportBox = new teleportBox()
    private teleportBox2 = new teleportBox()

    private hologram = new Entity()
    private instructionPrompt = new TriggerDoor()

    public articlenum = 0
    public pagenum = 0

    //article elements
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

    //Floor2
    // private prompt5 = new TriggerPrompts()
    // private prompt6 = new TriggerPrompts()
    // private prompt7 = new TriggerPrompts()
    // private article5 = new dynamicArticle1floor2()
    // private article6 = new dynamicArticle2floor2()
    // private article7 = new dynamicArticle2floor2()
    // private nextbuttonA1F2 = new ButtonNext()
    // private prevbuttonA1F2 = new ButtonPrev()
    // private stopbuttonA1F2 = new ButtonStop()
    // private nextbuttonA2F2 = new ButtonNext()
    // private prevbuttonA2F2 = new ButtonPrev()
    // private stopbuttonA2F2 = new ButtonStop()
    // private nextbuttonA3F2 = new ButtonNext()
    // private prevbuttonA3F2 = new ButtonPrev()
    // private stopbuttonA3F2 = new ButtonStop()
    //teleport collider
    private teleportCollider = new Entity()
    //testTeleport
    private testTeleport = new ExitPlane()

    constructor() {
        super(SceneLocations.Exterior)
        this.addComponent(new GLTFShape('models/UPS_Colliders.glb'))
        this.addComponentOrReplace(new Transform({
            position: new Vector3(0, 0, 0),
            scale: new Vector3(1, 1, 1),
            rotation: new Quaternion().setEuler(0.000, 0.000, 0.000),
        }))
        this.mainGeo.addComponent(new GLTFShape('models/UPS_MainGeo_8.glb'))
        // this.bottomFloorVS.addComponent(new GLTFShape('models/UPS_bottom_floor_videoscreen_2.glb'))
        this.elevatorPad.addComponent(new GLTFShape('models/UPS_ElevatorPad.glb')) // We are not using the elevetor yet
        this.frontDoor.addComponent(new GLTFShape('models/UPS_FrontDoor.glb'))
        this.frontDoor.addComponent(new Animator)
        this.frontDoor.getComponent(Animator).addClip(new AnimationState('GlassDoor_Open', { layer: 0, weight: 0.01 }))
        this.frontDoor.getComponent(Animator).addClip(new AnimationState('GlassDoor_Close', { layer: 1, weight: 0.01 }))
        this.newStandPosters.addComponent(new GLTFShape('models/UPS_Newstand_posters.glb'))
        this.newStandGeo.addComponent(new GLTFShape('models/UPS_Newstand_geo.glb'))

        this.mainGeo.setParent(this)
        this.elevatorPad.setParent(this) // We are not using the elevetor yet
        this.bottomFloorVS.setParent(this)
        this.frontDoor.setParent(this)
        this.newStandGeo.setParent(this)

        this.newStandPosters.setParent(this)

        // this.article5.setParent(this)
        // this.article6.setParent(this)
        // this.article7.setParent(this)

        // this.teleportCollider.addComponent(new BoxShape)
        // this.teleportCollider.addComponent(new Transform({
        //     position: new Vector3(4.170, 2.020, 27.980),
        //     scale: new Vector3(5.000, 5.000, 3.000),
        //     rotation: new Quaternion().setEuler(0.000, 0.000, 0.000),
        // }))
        // this.teleportCollider.addComponent(Dash_Material.transparent())

        this.fixReel()


        this.createTriggerPrompts()
        // this.createTriggerPromptsFloor2()
        this.triggerPortal1()
        this.teleportBuild()
        // this.articleFeed()
        this.triggerPromptInstruction()
        this.rotate()
        this.createTestTeleport()


    }
    createTriggerPrompts() {
        [this.prompt1, this.prompt2, this.prompt3, this.prompt4
        ].forEach(triggerPrompts => {
            triggerPrompts.addComponent(Dash_Material.transparent())
            triggerPrompts.setParent(this)
        })

        this.prompt1.addComponentOrReplace(new Transform({
            position: new Vector3(24.070, 2.600, 22.550),
            scale: new Vector3(1.180, 2.100, 1.900),
            rotation: new Quaternion().setEuler(1.000, 91.000, 360.000),
        }))
        this.prompt1.onClick = () => this.articleFeed1()

        this.prompt2.addComponentOrReplace(new Transform({
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

        this.prompt4.addComponentOrReplace(new Transform({
            position: new Vector3(24.070, 2.600, 18.050),
            scale: new Vector3(1.180, 2.100, 1.900),
            rotation: new Quaternion().setEuler(1.000, 91.000, 360.000),
        }))
        this.prompt4.onClick = () => this.articleFeed4()

    }
    // createTriggerPromptsFloor2() {
    //     [this.prompt5, this.prompt6, this.prompt7,
    //     ].forEach(triggerPromptsf2 => {
    //         // triggerPromptsf2.addComponent(Dash_Material.transparent())
    //         triggerPromptsf2.setParent(this)
    //     })
    //     this.prompt5.addComponentOrReplace(new Transform({
    //         position: new Vector3(28.353, 20.300, 25.550),
    //         scale: new Vector3(2.861, 3.670, 1.900),
    //         rotation: new Quaternion().setEuler(1.000, 91.000, 180.000),
    //     }))
    //     this.prompt5.onClick = () => this.articleFeed5()


    //     this.prompt6.addComponentOrReplace(new Transform({
    //         position: new Vector3(28.353, 20.300, 21.550),
    //         scale: new Vector3(2.861, 3.670, 1.900),
    //         rotation: new Quaternion().setEuler(1.000, 91.000, 180.000),
    //     }))
    //     this.prompt6.onClick = () => this.articleFeed6()

    //     this.prompt7.addComponentOrReplace(new Transform({
    //         position: new Vector3(28.353, 20.300, 17.550),
    //         scale: new Vector3(2.861, 3.670, 1.900),
    //         rotation: new Quaternion().setEuler(1.000, 91.000, 180.000),
    //     }))
    //     this.prompt7.onClick = () => this.articleFeed7()

    // }

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
        this.teleportBox.addComponentOrReplace(new Transform({
            position: new Vector3(4.38, 8.90, 1.84),
            scale: new Vector3(1, 1, 1)
        }))

        this.teleportBox.onCameraEnter = () => {
            movePlayerToVector3(new Vector3(9.98, 20.98, 11.98), new Vector3(10.94, 20.98, 22.35))
        }
        engine.addEntity(this.teleportBox)


        this.teleportBox2.addComponentOrReplace(new Transform({
            position: new Vector3(7.290, 21.980, 22.020),
            scale: new Vector3(2.000, 2.000, 2.000),
            rotation: new Quaternion().setEuler(0.000, 0.000, 0.000),
        }))
        this.teleportBox2.setParent(this)

        this.teleportBox2.getComponent(TriggerComponent).shape = new utils.TriggerBoxShape(new Vector3(2.000, 2.000, 2.000))

        this.teleportBox2.onCameraEnter = () => {
            movePlayerToVector3(new Vector3(11.06, 1.08, 14.14), new Vector3(15.14, 1.08, 20.26))
        }

        this.teleportBox2.removeComponent(BoxShape)
        this.teleportBox.removeComponent(BoxShape)

    }

    articleFeed1() {
        engine.removeEntity(this.prompt1)
        engine.removeEntity(this.prompt2)
        engine.addEntity(this.article1)
        this.article1.setParent(this)
        this.articlenum = 1
        this.pagenum = 1
        this.article1.load()
        this.createButtonsLeft()
    }

    articleFeed2() {
        engine.removeEntity(this.prompt1)
        engine.removeEntity(this.prompt2)
        engine.addEntity(this.article2)
        this.article2.setParent(this)
        this.articlenum = 2
        this.pagenum = 1
        this.article2.load()
        this.createButtonsLeft()

    }

    createButtonsLeft() {
        engine.addEntity(this.nextbuttonLeft)
        engine.addEntity(this.stopbuttonLeft)
        engine.addEntity(this.prevbuttonLeft)

        this.nextbuttonLeft.setParent(this)
        this.stopbuttonLeft.setParent(this)
        this.prevbuttonLeft.setParent(this)

        this.nextbuttonLeft.addComponentOrReplace(new Transform({
            position: new Vector3(24.070, -2.030, 22.570),
            scale: new Vector3(3.000, 3.000, 3.000),
            rotation: new Quaternion().setEuler(360.000, 270.000, 360.000),
        }))

        this.nextbuttonLeft.addComponentOrReplace(new OnPointerDown(() => {
            if (this.articlenum == 1) {
                log('clicked!')
                this.article1.nextPage()
            }
            if (this.articlenum == 2) {
                this.article2.nextPage()
            }
        }, {
            hoverText: 'Next Page'
        }))

        // this.nextbuttonLeft.setParent(article1background)

        this.stopbuttonLeft.addComponentOrReplace(new Transform({
            position: new Vector3(24.000, -2.610, 23.130),
            scale: new Vector3(3.000, 3.000, 3.000),
            rotation: new Quaternion().setEuler(360.000, 270.000, 360.000),
        }))

        this.stopbuttonLeft.addComponentOrReplace(new OnPointerDown(() => {
            if (this.articlenum == 1) {
                this.article1.onExit(this.article1.currentEntity)
                engine.addEntity(this.prompt1)
                engine.addEntity(this.prompt2)

                engine.removeEntity(this.nextbuttonLeft)
                engine.removeEntity(this.stopbuttonLeft)
                engine.removeEntity(this.prevbuttonLeft)
            }
            if (this.articlenum == 2) {
                this.article2.onExit(this.article2.currentEntity)
                engine.addEntity(this.prompt1)
                engine.addEntity(this.prompt2)

                engine.removeEntity(this.nextbuttonLeft)
                engine.removeEntity(this.stopbuttonLeft)
                engine.removeEntity(this.prevbuttonLeft)

            }
        }, {
            hoverText: 'Close Article'
        }))


        this.prevbuttonLeft.addComponentOrReplace(new
            Transform({
                position: new Vector3(24.000, -2.030, 24.340),
                scale: new Vector3(3.000, 3.000, 3.000),
                rotation: new Quaternion().setEuler(360.000, 270.000, 360.000),
            })
        )

        this.prevbuttonLeft.addComponentOrReplace(new OnPointerDown(() => {
            if (this.articlenum == 1) {
                this.article1.prevPage()
            }
            if (this.articlenum == 2) {
                this.article2.prevPage()
            }
        }, {
            hoverText: 'Previous Page'
        }))
    }

    articleFeed3() {
        engine.removeEntity(this.prompt3)
        engine.removeEntity(this.prompt4)
        engine.addEntity(this.article3)
        this.article3.setParent(this)
        this.articlenum = 3
        this.pagenum = 1
        this.article3.load()
        this.createButtonsRight()
    }

    articleFeed4() {
        engine.removeEntity(this.prompt3)
        engine.removeEntity(this.prompt4)
        engine.addEntity(this.article4)
        this.article4.setParent(this)
        this.articlenum = 4
        this.pagenum = 1
        this.article4.load()
        this.createButtonsRight()
    }
    createButtonsRight() {
        engine.addEntity(this.nextbuttonRight)
        engine.addEntity(this.stopbuttonRight)
        engine.addEntity(this.prevbuttonRight)

        this.nextbuttonRight.setParent(this)
        this.stopbuttonRight.setParent(this)
        this.prevbuttonRight.setParent(this)

        this.nextbuttonRight.addComponentOrReplace(new Transform({
            position: new Vector3(24.070, -2.030, 19.37),
            scale: new Vector3(3.000, 3.000, 3.000),
            rotation: new Quaternion().setEuler(360.000, 270.000, 360.000),
        }))
        this.nextbuttonRight.addComponentOrReplace(new OnPointerDown(() => {
            if (this.articlenum == 3) {
                log('clicked!')
                this.article3.nextPage()
            }
            if (this.articlenum == 4) {
                this.article4.nextPage()
            }
        }, {
            hoverText: 'Next Page'
        }))

        this.stopbuttonRight.addComponentOrReplace(new Transform({
            position: new Vector3(24.000, -2.610, 19.93),
            scale: new Vector3(3.000, 3.000, 3.000),
            rotation: new Quaternion().setEuler(360.000, 270.000, 360.000),
        }))
        this.stopbuttonRight.addComponentOrReplace(new OnPointerDown(() => {
            if (this.articlenum == 3) {
                this.article3.onExit(this.article3.currentEntity)
                engine.addEntity(this.prompt3)
                engine.addEntity(this.prompt4)

                engine.removeEntity(this.nextbuttonRight)
                engine.removeEntity(this.stopbuttonRight)
                engine.removeEntity(this.prevbuttonRight)
            }
            if (this.articlenum == 4) {
                this.article4.onExit(this.article2.currentEntity)
                engine.addEntity(this.prompt3)
                engine.addEntity(this.prompt4)

                engine.removeEntity(this.nextbuttonRight)
                engine.removeEntity(this.stopbuttonRight)
                engine.removeEntity(this.prevbuttonRight)

            }
        }, {
            hoverText: 'Close Article'
        }))


        this.prevbuttonRight.addComponentOrReplace(new Transform({
            position: new Vector3(24.000, -2.030, 21.14),
            scale: new Vector3(3.000, 3.000, 3.000),
            rotation: new Quaternion().setEuler(360.000, 270.000, 360.000),
        }))
        this.prevbuttonRight.addComponentOrReplace(new OnPointerDown(() => {
            if (this.articlenum == 3) {
                this.article3.prevPage()
            }
            if (this.articlenum == 4) {
                this.article4.prevPage()
            }
        }, {
            hoverText: 'Previous Page'
        }))


    }
    // articleFeed5() {
    //     log('article 5 removed')
    //     engine.removeEntity(this.prompt5)
    //     engine.addEntity(this.article5)
    //     this.article5.setParent(this)
    //     this.article5.addComponentOrReplace(new Transform({
    //         position: new Vector3(30.650, 21.500, 25.480),
    //         scale: new Vector3(2.780, 2.480, 4.100),
    //         rotation: new Quaternion().setEuler(360.000, 90.000, 360.000),
    //     }))
    //     this.articlenum = 1
    //     this.pagenum = 1
    //     this.article5.load()

    //     log(this.article5.getComponent(Transform).position)
    //     this.createButtonA1F2()
    // }


    // createButtonA1F2() {
    //     engine.addEntity(this.nextbuttonA1F2)
    //     engine.addEntity(this.stopbuttonA1F2)
    //     engine.addEntity(this.prevbuttonA1F2)

    //     this.nextbuttonA1F2.setParent(this)
    //     this.stopbuttonA1F2.setParent(this)
    //     this.prevbuttonA1F2.setParent(this)

    //     this.nextbuttonA1F2.addComponentOrReplace(new Transform({
    //         position: new Vector3(29.470, 16.210, 26.370),
    //         scale: new Vector3(3.000, 3.000, 3.000),
    //         rotation: new Quaternion().setEuler(360.000, 270.000, 360.000),
    //      }))
    //     this.nextbuttonA1F2.addComponentOrReplace(new OnPointerDown(() => {
    //         this.article5.nextPage()

    //     }, {
    //         hoverText: 'Next Page'
    //     }))


    //     this.stopbuttonA1F2.addComponentOrReplace(new Transform({
    //         position: new Vector3(29.470, 15.650, 26.770),
    //         scale: new Vector3(3.000, 3.000, 3.000),
    //         rotation: new Quaternion().setEuler(360.000, 270.000, 360.000),
    //     }))
    //     this.stopbuttonRight.addComponentOrReplace(new OnPointerDown(() => {
    //         this.article5.onExit(this.article5.currentEntity)
    //         engine.addEntity(this.prompt5)
    //         engine.removeEntity(this.nextbuttonA1F2)
    //         engine.removeEntity(this.stopbuttonA1F2)
    //         engine.removeEntity(this.prevbuttonA1F2)

    //     }, {
    //         hoverText: 'Close Article'
    //     }))
        


    //     this.prevbuttonA1F2.addComponentOrReplace(new Transform({
    //         position: new Vector3(29.480, 16.220, 27.690),
    //         scale: new Vector3(3.000, 3.000, 3.000),
    //         rotation: new Quaternion().setEuler(360.000, 270.000, 360.000),
    //      }))
    //     this.prevbuttonA1F2.addComponentOrReplace(new OnPointerDown(() => {

    //         this.article5.prevPage()

    //     }, {
    //         hoverText: 'Previous Page'
    //     }))
    //     Dash_Tweaker(this.prevbuttonA1F2)
    // }

    // articleFeed6() {
    //     log('article 6 removed')
    //     engine.removeEntity(this.prompt6)
    //     engine.addEntity(this.article6)
    //     this.article6.setParent(this)
    //     this.article6.addComponentOrReplace(new Transform({
    //         position: new Vector3(30.650, 21.500, 21.490),
    //         scale: new Vector3(2.720, 3.210, 4.100),
    //         rotation: new Quaternion().setEuler(360.000, 90.000, 360.000),
    //     }))


    //     this.articlenum = 1
    //     this.pagenum = 1
    //     this.article6.load()
    //     Dash_Tweaker(this.article6)
    // }
    // createButtonA2F2() {
    //     engine.addEntity(this.nextbuttonA2F2)
    //     engine.addEntity(this.stopbuttonA2F2)
    //     engine.addEntity(this.prevbuttonA2F2)

    //     this.nextbuttonA2F2.setParent(this)
    //     this.stopbuttonA2F2.setParent(this)
    //     this.prevbuttonA2F2.setParent(this)

    //     this.nextbuttonA2F2.addComponentOrReplace(new Transform({
    //         position: new Vector3(29.470, 16.210, 26.370),
    //         scale: new Vector3(3.000, 3.000, 3.000),
    //         rotation: new Quaternion().setEuler(360.000, 270.000, 360.000),
    //      }))
    //     this.nextbuttonA2F2.addComponentOrReplace(new OnPointerDown(() => {
    //         this.article6.nextPage()

    //     }, {
    //         hoverText: 'Next Page'
    //     }))


    //     this.stopbuttonA2F2.addComponentOrReplace(new Transform({
    //         position: new Vector3(29.470, 15.650, 26.770),
    //         scale: new Vector3(3.000, 3.000, 3.000),
    //         rotation: new Quaternion().setEuler(360.000, 270.000, 360.000),
    //     }))
    //     this.stopbuttonRight.addComponentOrReplace(new OnPointerDown(() => {
    //         this.article6.onExit(this.article6.currentEntity)
    //         engine.addEntity(this.prompt6)
    //         engine.removeEntity(this.nextbuttonA2F2)
    //         engine.removeEntity(this.stopbuttonA2F2)
    //         engine.removeEntity(this.prevbuttonA2F2)

    //     }, {
    //         hoverText: 'Close Article'
    //     }))
        


    //     this.prevbuttonA2F2.addComponentOrReplace(new Transform({
    //         position: new Vector3(29.480, 16.220, 27.690),
    //         scale: new Vector3(3.000, 3.000, 3.000),
    //         rotation: new Quaternion().setEuler(360.000, 270.000, 360.000),
    //      }))
    //     this.prevbuttonA2F2.addComponentOrReplace(new OnPointerDown(() => {

    //         this.article6.prevPage()

    //     }, {
    //         hoverText: 'Previous Page'
    //     }))
    //     Dash_Tweaker(this.prevbuttonA1F2)
    // }

    // articleFeed7() {
    //     log('article 7 removed')
    //     engine.removeEntity(this.prompt7)
    //     engine.addEntity(this.article7)
    //     this.article7.setParent(this)
    //     this.article7.addComponentOrReplace(new Transform({
    //         position: new Vector3(30.650, 21.500, 17.490),
    //         scale: new Vector3(2.780, 3.280, 4.100),
    //         rotation: new Quaternion().setEuler(360.000, 90.000, 360.000),
    //     }))


    //     this.articlenum = 1
    //     this.pagenum = 1
    //     this.article7.load()
    //     Dash_Tweaker(this.article7)
    // }

    triggerPromptInstruction() {
        [this.instructionPrompt,
        ].forEach(instruction => {
            instruction.setParent(this)
            instruction.addComponent(Dash_Material.transparent())
            instruction.getComponent(BoxShape).withCollisions = false
            // instruction.removeComponent(BoxShape)
        })


        this.instructionPrompt.addComponentOrReplace(new Transform({
            position: new Vector3(23.000, 0.000, 20.200),
            scale: new Vector3(2.800, 4.000, 6.000),
            rotation: new Quaternion().setEuler(1.000, 180.000, 1.000),
        }))
        this.instructionPrompt.onCameraEnter = () => this.enterInstructionTrigger(
        )
        this.instructionPrompt.onCameraExit = () => this.exitInstructionTrigger()
    }

    enterInstructionTrigger() {
        if (x == 0) {
            createUiInstructionPrompt.show()
            x = x + 1

        } else {
            createUiInstructionPrompt.hide()
        }

    }
    exitInstructionTrigger() {
        createUiInstructionPrompt.hide()
    }

    rotate() {
        this.getComponent(Transform).rotation.setEuler(0, 270, 0)
        this.getComponent(Transform).position.set(32, 0, 0)
    }
    fixReel() {
        this.article1.page1.setParent(this)
        this.article1.page2.setParent(this)
        this.article1.page3.setParent(this)
        this.article1.page4.setParent(this)
        this.article1.page5.setParent(this)
        this.article1.page6.setParent(this)
        this.article1.page7.setParent(this)
        this.article1.page8.setParent(this)

        engine.removeEntity(this.article1.page1)
        engine.removeEntity(this.article1.page2)
        engine.removeEntity(this.article1.page3)
        engine.removeEntity(this.article1.page4)
        engine.removeEntity(this.article1.page5)
        engine.removeEntity(this.article1.page6)
        engine.removeEntity(this.article1.page7)
        engine.removeEntity(this.article1.page8)

        this.article2.page1.setParent(this)
        this.article2.page2.setParent(this)
        this.article2.page3.setParent(this)
        this.article2.page4.setParent(this)
        this.article2.page5.setParent(this)
        this.article2.page6.setParent(this)
        this.article2.page7.setParent(this)
        this.article2.page8.setParent(this)

        engine.removeEntity(this.article2.page1)
        engine.removeEntity(this.article2.page2)
        engine.removeEntity(this.article2.page3)
        engine.removeEntity(this.article2.page4)
        engine.removeEntity(this.article2.page5)
        engine.removeEntity(this.article2.page6)
        engine.removeEntity(this.article2.page7)
        engine.removeEntity(this.article2.page8)

        this.article3.page1.setParent(this)
        this.article3.page2.setParent(this)
        this.article3.page3.setParent(this)
        this.article3.page4.setParent(this)
        this.article3.page5.setParent(this)
        this.article3.page6.setParent(this)
        this.article3.page7.setParent(this)
        this.article3.page8.setParent(this)

        engine.removeEntity(this.article3.page1)
        engine.removeEntity(this.article3.page2)
        engine.removeEntity(this.article3.page3)
        engine.removeEntity(this.article3.page4)
        engine.removeEntity(this.article3.page5)
        engine.removeEntity(this.article3.page6)
        engine.removeEntity(this.article3.page7)
        engine.removeEntity(this.article3.page8)

        this.article4.page1.setParent(this)
        this.article4.page2.setParent(this)
        this.article4.page3.setParent(this)
        this.article4.page4.setParent(this)
        this.article4.page5.setParent(this)
        this.article4.page6.setParent(this)
        this.article4.page7.setParent(this)
        this.article4.page8.setParent(this)

        engine.removeEntity(this.article4.page1)
        engine.removeEntity(this.article4.page2)
        engine.removeEntity(this.article4.page3)
        engine.removeEntity(this.article4.page4)
        engine.removeEntity(this.article4.page5)
        engine.removeEntity(this.article4.page6)
        engine.removeEntity(this.article4.page7)
        engine.removeEntity(this.article4.page8)
    }
    createTestTeleport() {
        [this.testTeleport,].forEach(teleports => {
            teleports.addComponent(Dash_Material.transparent())
            teleports.setParent(this)
        })
        this.testTeleport.addComponentOrReplace(new Transform({
            position: new Vector3(7.260, 1.080, 27.920),
            scale: new Vector3(4.000, 4.000, 5.000),
            rotation: new Quaternion().setEuler(1.000, 100.000, 2.000),
         }))
        this.testTeleport.onCameraEnter = () => this.secondFloor(
            new Vector3(15.26,22,8.09),
            new Vector3(10.99,20.98,11.86),
        )
        Dash_Tweaker(this.testTeleport)

    }
    secondFloor(position: Vector3, direction: Vector3) {
        movePlayerToVector3(position, direction)
    }

}



export const Exterior = new ExteriorInstance()