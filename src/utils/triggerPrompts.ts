import * as utils from '@dcl/ecs-scene-utils'
export class TriggerPrompts extends Entity {
    private shape: PlaneShape = new PlaneShape()
    public onClick: () => void = () => {}
    private distance: number = 5
    private message: string = "Interact"
    private triggerBox = new utils.TriggerBoxShape()

    constructor(){
        super()
        this.addComponent(new Transform())
        this.addComponent(this.shape)
        this.updateOnPointerDown()
    }
    private updateOnPointerDown(){
        this.addComponentOrReplace(new OnPointerDown(() => {
            this.onClick()
        },{
            hoverText: this.message,
            distance: this.distance,
        }))
    }
}