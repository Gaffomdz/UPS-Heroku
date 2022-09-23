import * as utils from '@dcl/ecs-scene-utils'
export class teleportBox extends Entity {
  private shape: BoxShape = new BoxShape()
  public onCameraEnter: () => void = () => { }
  public onCameraExit: () => void = () => { }
  private distance: number = 5
  private message: string = "Interact"
  public triggerBox = new utils.TriggerBoxShape(new Vector3(1.300, 2.000, 2.200))

  constructor() {
    super()
    this.addComponent(this.shape)
    this.addComponent(new Transform({
      position: new Vector3(2.350, 12.200, 27.990),
      scale: new Vector3(1.300, 1.200, 2.200),
      rotation: new Quaternion().setEuler(0.000, 0.000, 0.000),
   }))
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

        }



      )
    )
  }
}