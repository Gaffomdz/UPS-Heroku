import { Dash_Tweaker } from "dcldash"

export class hologram extends Entity {
    constructor(){
        super()
        this.addComponent(new GLTFShape('models/UPS_Hologram.glb'))
        this.addComponent(new Transform({
            position: new Vector3(0.000, 6.100, 6.500),
            scale: new Vector3(1.000, 1.000, 1.000),
            rotation: new Quaternion().setEuler(0.000, 0.000, 0.000),
         }))
        engine.addEntity(this)


        // let materials = new Array
        // let counter = 0

        // let framecount = 21
        // let framecounter = 20

        // for(let d=1; d<=framecount;d++){
        //     let material = new Material()
        //     let texture = new Texture(`models/UPS_Holo2_frames/${d}.png`)
        //     material.emissiveTexture = texture
        //     material.albedoTexture = texture
        //     // material.alphaTexture
        //     // material.alphaTest = 0
        //     material.transparencyMode = 2
        //         material.emissiveIntensity = 10000
        //     materials.push(material)
        //     log(materials[d])
        // }

        // let entity = new Entity()
        // entity.addComponent(new Transform({
        //        position: new Vector3(15.400, 4.300, 4.000),
        //        scale: new Vector3(14.200, 7.000, 7.000),
        //        rotation: new Quaternion().setEuler(0.000, 360.000, 180.000),
        //     }))
        // entity.addComponent(new PlaneShape())
        // // engine.addEntity(entity)
        // Dash_Tweaker(this)
        
        // class flipBook {
        //     update(cc: number) {
        //         if(counter < framecounter){
        //             //log(counter)
        //             entity.addComponentOrReplace(materials[counter])
        //             log(materials[counter])
        //             counter++
        //       }
        //       if(counter == framecounter){
        //         // log('coming to 28')
        //         // log(counter)
        //         log('RESET??')
        //         entity.addComponentOrReplace(materials[counter])
        //         counter = 0
        //       }
        //     }
        //     }
        
        // // engine.addSystem(new flipBook)

    }
}