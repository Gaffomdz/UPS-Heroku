import * as utils from '@dcl/ecs-scene-utils'
export class TriggerDoor extends Entity {
  private shape: BoxShape = new BoxShape()
  public onCameraEnter: () => void = () => { }
  public onCameraExit: () => void = () => { }
  private distance: number = 0.5
  private message: string = "Interact"
  private triggerBox = new utils.TriggerBoxShape(new Vector3(6.800, 5.000, 14.000))

  constructor() {
    super()
    this.addComponent(new Transform())
    this.addComponent(this.shape)
    this.getComponent(BoxShape).withCollisions = false
    this.updateOnTrigger()
  
    this.getComponent(Transform)
  
  
  }




  private updateOnTrigger() {
    this.addComponentOrReplace(
      new utils.TriggerComponent(
        this.triggerBox, //shape
        {
          onCameraEnter: () => {
            log('triggered!')
            this.onCameraEnter()
          },
          onCameraExit: () => {
            log('Exit!')
            this.onCameraExit()
          }

        },



      )
    )
  }
}