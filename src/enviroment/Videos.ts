export class Videos extends Entity{

   public myVideoClip = new VideoClip('') 
   public myVideoTexture = new VideoTexture(this.myVideoClip)  
   public myMaterial = new Material()
   public currentvid = 1

    constructor(){
        super()
        this.myMaterial.albedoTexture = this.myVideoTexture
        this.addComponent(new PlaneShape())
        this.addComponent( new Transform())
        this.addComponent(this.myMaterial)
        this.myVideoTexture.play()
        log('Video Playing')
    }

}
// Link v1: https://player.vimeo.com/external/754766612.m3u8?s=6d7b0c1bae5cc2964a7be4ba9d824b9b1916422c
// Link v2: https://player.vimeo.com/external/754766418.m3u8?s=5786122a2c94e1638e56602b5e0103ddb86aa5c8
// Link v3: https://player.vimeo.com/external/754766219.m3u8?s=61339c6fbf53af2dafdf89908fc2bb4ad8991c93