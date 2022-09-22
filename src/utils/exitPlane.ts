import * as utils from '@dcl/ecs-scene-utils'
export class ExitPlane extends Entity {
    private shape: PlaneShape = new PlaneShape()
    public onClick: () => void = () => {}
    public onCameraEnter : () => void = () => {}
    private distance: number = 5
    private message: string = "Interact"
    private triggerBox = new utils.TriggerBoxShape()

    constructor(){
        super()
        this.addComponent(new Transform())
        this.addComponent(this.shape)
        this.updateOnTrigger()
    }

    private updateOnTrigger(){
        this.addComponentOrReplace(
            new utils.TriggerComponent(
              this.triggerBox, //shape
              {
                onCameraEnter : () => {
                log('triggered!')
                this.onCameraEnter()
                }
              }
            )
          )
    }
}