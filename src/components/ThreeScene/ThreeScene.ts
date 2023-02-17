import {defineComponent, onMounted } from "vue";
import { toRaw } from "vue";

import SceneBuilder from './SceneBuilder';


export default defineComponent({
    name:"ThreeScene",
    props:{
    },
    components:{
    },
    setup(){       
        return {            
        }
    },
    data(){
        return{
           sketch:null,
           description:null,
           width: 540,
           rendered:false,
        }
    },
    methods:{
        redirectToDetailed(){
        },
        updateWindowWidth() {
		        this.scene.camera.aspect = window.innerWidth / window.innerHeight;
            this.scene.camera.updateProjectionMatrix();
            this.scene.renderer.setSize( window.innerWidth, window.innerHeight );
            this.updateWindowWidth()
          }
    },
    mounted(){
        this.scene = new SceneBuilder(this.$refs.sketch)
        this.scene.render()
        window.addEventListener('resize', this.updateWindowWidth);
        this.rendered = true;
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.updateWindowWidth);
      },
    computed:{
        
    }
  }
);