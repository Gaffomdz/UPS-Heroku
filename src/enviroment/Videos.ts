export class Videos1 extends Entity{

    public myVideoClip1 = new VideoClip('https://player.vimeo.com/external/754766612.m3u8?s=6d7b0c1bae5cc2964a7be4ba9d824b9b1916422c') 
    public myVideoTexture1 = new VideoTexture(this.myVideoClip1) 
    public myVideoClip2 = new VideoClip('https://player.vimeo.com/external/754766418.m3u8?s=5786122a2c94e1638e56602b5e0103ddb86aa5c8') 
    public myVideoTexture2 = new VideoTexture(this.myVideoClip2)   
    public myVideoClip3 = new VideoClip('https://player.vimeo.com/external/754766219.m3u8?s=61339c6fbf53af2dafdf89908fc2bb4ad8991c93') 
    public myVideoTexture3 = new VideoTexture(this.myVideoClip3)   
    public myMaterial = new Material()
    
     //inside const: video:VideoClip
     constructor(){
         super()
         //this.myVideoClip = video
         this.myMaterial.albedoTexture = this.myVideoTexture1 
         this.addComponent(new PlaneShape())
         this.addComponent( new Transform())
         this.addComponent(this.myMaterial)
         
         
         
     }
    
 }
 export class Videos2 extends Entity{
 
     public myVideoClip = new VideoClip('https://player.vimeo.com/external/754766418.m3u8?s=5786122a2c94e1638e56602b5e0103ddb86aa5c8') 
     public myVideoTexture = new VideoTexture(this.myVideoClip)  
     public myMaterial = new Material()
     
      //inside const: video:VideoClip
      constructor(){
          super()
          //this.myVideoClip = video
          this.myMaterial.albedoTexture = this.myVideoTexture
          this.addComponent(new PlaneShape())
          this.addComponent( new Transform())
          this.addComponent(this.myMaterial)
          
          
          
      }
     
  }
  export class Videos3 extends Entity{
 
     public myVideoClip = new VideoClip('https://player.vimeo.com/external/754766219.m3u8?s=61339c6fbf53af2dafdf89908fc2bb4ad8991c93') 
     public myVideoTexture = new VideoTexture(this.myVideoClip)  
     public myMaterial = new Material()
     
      //inside const: video:VideoClip
      constructor(){
          super()
          //this.myVideoClip = video
          this.myMaterial.albedoTexture = this.myVideoTexture
          this.addComponent(new PlaneShape())
          this.addComponent( new Transform())
          this.addComponent(this.myMaterial)
          
          
          
      }
     
  }
  
 
     
 
 
 
 // Link v1: https://player.vimeo.com/external/754766612.m3u8?s=6d7b0c1bae5cc2964a7be4ba9d824b9b1916422c
 // Link v2: https://player.vimeo.com/external/754766418.m3u8?s=5786122a2c94e1638e56602b5e0103ddb86aa5c8
 // Link v3: https://player.vimeo.com/external/754766219.m3u8?s=61339c6fbf53af2dafdf89908fc2bb4ad8991c93