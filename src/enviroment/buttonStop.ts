import { Dash_AnimationQueue, Dash_Ease } from "dcldash"


export class ButtonStop extends Entity{
    private shape: GLTFShape = new GLTFShape('models/buttons/Jukebox_006_Button_Stop_2.glb')
    public onClick: () => void = () => {}
    private distance: number = 5
    private message: string = "Stop"

    constructor(){
        super()
        this.addComponent(this.shape)
        
        this.addComponent(new OnPointerHoverEnter(()=>{
            Dash_AnimationQueue.add({
                duration: 0.5,
                data: {},
                onFrame: (progress, data) => {
                    const transform = this.getComponent(Transform)
                    const easeValue = Scalar.Lerp(3, 3.08, Dash_Ease.easeInOutBounce(progress))
                    transform.scale.set(3, easeValue, 3)
                },
                onComplete: () => {
                    log('Animation Done!')
                }
            })
        }))

        this.addComponent(new OnPointerHoverExit(()=>{
            Dash_AnimationQueue.add({
                duration: 0.5,
                data: {},
                onFrame: (progress, data) => {
                    const transform = this.getComponent(Transform)
                    const easeValue = Scalar.Lerp(3.08, 3, Dash_Ease.easeInOutBounce(progress))
                    transform.scale.set(3, easeValue, 3)
                },
                onComplete: () => {
                    log('Animation Done!')
                }
            })
        }))

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