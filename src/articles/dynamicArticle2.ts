import { Dash_AnimationQueue, Dash_Ease, Dash_Tweaker } from "dcldash"
import { article1background, article1page1, article1page2, article1page3, article1page4, article1page5, article1page6, article1page7 } from "src/articles/articleResources/article1"
import { article2page1, article2page2, article2page3, article2page4, article2page5, article2page6, article2page7, article2page8, article2page9 } from "./articleResources/article2"

export class dynamicArticle2 extends Entity{

    private pagenum = 1
    private cooldown = 0

    public page1 = new Entity()
    public page2 = new Entity()
    public page3 = new Entity()
    public page4 = new Entity()
    public page5 = new Entity()
    public page6 = new Entity()
    public page7 = new Entity()
    public page8 = new Entity()
    public page9 = new Entity()

    public currentEntity = new Entity()

    constructor(){
        super()
        this.pagenum = 1


        this.addComponentOrReplace(new PlaneShape)
        this.addComponentOrReplace(article1background)
        this.addComponentOrReplace(new Transform({
            position: new Vector3(24.090, 2.800, 21.910),
            scale: new Vector3(2.680, 3.080, 4.100),
            rotation: new Quaternion().setEuler(0.000, 90.000, 180.000),
         }))

        this.loadPages()


    }

    loadPages(){
        [
            this.page1,
            this.page2,
            this.page3,
            this.page4,
            this.page5,
            this.page6,
            this.page7,
            this.page8,
            this.page9
        ].forEach(page => {
            page.addComponentOrReplace(new PlaneShape())
            page.addComponentOrReplace(new Transform({
                position: new Vector3(24.080, 2.800, 21.910),
                scale: new Vector3(2.680, 5.080, 4.100),
                rotation: new Quaternion().setEuler(0.000, 90.000, 180.000),
            }))
        })
        this.page1.addComponentOrReplace(article2page1)
        this.page2.addComponentOrReplace(article2page2)
        this.page3.addComponentOrReplace(article2page3)
        this.page4.addComponentOrReplace(article2page4)
        this.page5.addComponentOrReplace(article2page5)
        this.page6.addComponentOrReplace(article2page6)
        this.page7.addComponentOrReplace(article2page7)   
        this.page8.addComponentOrReplace(article2page8)
        this.page9.addComponentOrReplace(article2page9)
    }

    load(){
        engine.addEntity(this.page1)
        engine.addEntity(this)
        this.pagenum = 1
        this.currentEntity = this.page1
        Dash_AnimationQueue.add({
            duration: 1,
            data: {},
            onFrame: (progress, data) => {
                const transform = this.page1.getComponent(Transform)
                const transform2 = this.getComponent(Transform)

                const easeValuex = Scalar.Lerp(1, 2.68, Dash_Ease.easeInOutCirc(progress))
                const easeValuey = Scalar.Lerp(1, 3.08, Dash_Ease.easeInOutCirc(progress))
                const easeValuez = Scalar.Lerp(1, 4.10, Dash_Ease.easeInOutCirc(progress))

                const easeValuex2 = Scalar.Lerp(1, 2.68, Dash_Ease.easeInOutCirc(progress))
                const easeValuey2 = Scalar.Lerp(1, 3.08, Dash_Ease.easeInOutCirc(progress))
                const easeValuez2 = Scalar.Lerp(1, 4.10, Dash_Ease.easeInOutCirc(progress))

                transform.scale.set(easeValuex, easeValuey, easeValuez)
                transform2.scale.set(easeValuex2, easeValuey2, easeValuez2)
            },
            onComplete: () => {
                log('Animation Done! [LOAD]')
            }
        })
    }

    pageSpawn(entityOld: Entity, entityNew: Entity){
        engine.addEntity(entityNew)
        this.currentEntity = entityNew

        entityNew.addComponentOrReplace(new Transform({
            position: new Vector3(24.080, 2.800, 21.910),
            scale: new Vector3(2.680, 5.080, 4.100),
            rotation: new Quaternion().setEuler(0.000, 90.000, 180.000),
        }))

        entityOld.addComponentOrReplace(new Transform({
            position: new Vector3(24.080, 2.800, 21.910),
            scale: new Vector3(2.680, 5.080, 4.100),
            rotation: new Quaternion().setEuler(0.000, 90.000, 180.000),
        }))
        


        Dash_AnimationQueue.add({
            duration: 1,
            data: {},
            onFrame: (progress, data) => {
                const transformNEW = entityNew.getComponent(Transform)
                const easeValuexNEW = Scalar.Lerp(1, 2.68, Dash_Ease.easeInOutCirc(progress))
                const easeValueyNEW = Scalar.Lerp(1, 3.08, Dash_Ease.easeInOutCirc(progress))
                const easeValuezNEW = Scalar.Lerp(1, 4.10, Dash_Ease.easeInOutCirc(progress))


                const transformOld = entityOld.getComponent(Transform)
            
                transformOld.position.x = transformOld.position.x + 0.0001
                const easeValuexOld = Scalar.Lerp(2.68, 0, Dash_Ease.easeInOutCirc(progress))
                const easeValueyOld = Scalar.Lerp(3.08, 0, Dash_Ease.easeInOutCirc(progress))
                const easeValuezOld = Scalar.Lerp(4.10, 0, Dash_Ease.easeInOutCirc(progress))




                transformNEW.scale.set(easeValuexNEW, easeValueyNEW, easeValuezNEW)
                transformOld.scale.set(easeValuexOld, easeValueyOld, easeValuezOld)


            },
            onComplete: () => {
                log('Animation Done! [Entity Spawning]')
                engine.removeEntity(entityOld)
                this.cooldown = 0
            }
        })

        

    }

    onExit(entity: Entity){
        entity = this.currentEntity
            Dash_AnimationQueue.add({
                duration: 0.5,
                data: {},
                onFrame: (progress, data) => {
                    const transform = entity.getComponent(Transform)
                    const transform2 = this.getComponent(Transform)

                    const easeValuey = Scalar.Lerp(2.68, 0, Dash_Ease.easeOutCirc(progress))
                    const easeValue2 = Scalar.Lerp(2.68, 0, Dash_Ease.easeOutCirc(progress))


                    transform.scale.set(2.68, easeValuey, 4.10)
                    transform2.scale.set(2.68, easeValue2, 4.10)
                },
                onComplete: () => {
                    engine.removeEntity(entity)
                    engine.removeEntity(this)
                    this.pagenum = 1
                }
            })
    }

    nextPage(){

        if(this.cooldown==0){
            this.cooldown=1
        


        if(this.pagenum ==1){
            this.pageSpawn(this.page1, this.page2)
            this.pagenum = 2
            log('pagenum: '+ this.pagenum)
        }else
        if(this.pagenum ==2){
            this.pageSpawn(this.page2, this.page3)
            this.pagenum = 3
            log('pagenum: '+ this.pagenum)
        }else
        if(this.pagenum ==3){
            this.pageSpawn(this.page3, this.page4)
            this.pagenum = 4
            log('pagenum: '+ this.pagenum)
        }else
        if(this.pagenum ==4){
            this.pageSpawn(this.page4, this.page5)
            this.pagenum = 5
            log('pagenum: '+ this.pagenum)
        }else
        if(this.pagenum ==5){
            this.pageSpawn(this.page5, this.page6)
            this.pagenum = 6
            log('pagenum: '+ this.pagenum)
        }else
        if(this.pagenum ==6){
            this.pageSpawn(this.page6, this.page7)
            this.pagenum = 7
            log('pagenum: '+ this.pagenum)
        }else
        if(this.pagenum ==7){
            this.pageSpawn(this.page7, this.page8)
            this.pagenum = 8
            log('pagenum: '+ this.pagenum)
        }else
        if(this.pagenum ==8){
            this.pageSpawn(this.page8, this.page9)
            this.pagenum = 9
        }else
        if(this.pagenum==9){
            this.pageSpawn(this.page9, this.page1)
            this.pagenum = 1
        }

    }
    }
    prevPage(){

        if(this.cooldown==0){
            this.cooldown=1

        if(this.pagenum ==1){
            this.pageSpawn(this.page1, this.page9)
            this.pagenum = 9
            log('pagenum: '+ this.pagenum)
        }else

        if(this.pagenum ==9){
            this.pageSpawn(this.page9, this.page8)
            this.pagenum = 8
        }else

        if(this.pagenum==8){
            this.pageSpawn(this.page8, this.page7)
            this.pagenum = 7
        }else

        if(this.pagenum ==7){
            this.pageSpawn(this.page7, this.page6)
            this.pagenum = 6
            log('pagenum: '+ this.pagenum)
        }else
        if(this.pagenum ==6){
            this.pageSpawn(this.page6, this.page5)
            this.pagenum = 5
            log('pagenum: '+ this.pagenum)
        }else
        if(this.pagenum ==5){
            this.pageSpawn(this.page5, this.page4)
            this.pagenum = 4
            log('pagenum: '+ this.pagenum)
        }else
        if(this.pagenum ==4){
            this.pageSpawn(this.page4, this.page3)
            this.pagenum = 3
            log('pagenum: '+ this.pagenum)
        }else
        if(this.pagenum ==3){
            this.pageSpawn(this.page3, this.page2)
            this.pagenum = 2
            log('pagenum: '+ this.pagenum)
        }else
        if(this.pagenum ==2){
            this.pageSpawn(this.page2, this.page1)
            this.pagenum = 1
            log('pagenum: '+ this.pagenum)
        }

    }
}

}