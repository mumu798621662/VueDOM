var mains = Vue.component("mains",{
    template:`
     <div>
       
        <div class="content">
       
          <div class="left">
             <router-view name="lefts"></router-view>
          </div>
          
          <div class="right"> 
            <router-view name="rights"></router-view>
          </div>
 
        </div>
     </div>
    `
})


var left1 = Vue.component("left1",{
    template:`
      <div>
         <ul style="padding-left: 20px">
         
         
           <div v-for="item in data">
           <li style="color: green;font-size: 20px;margin-bottom: 10px"><router-link :to="'#'+item.id" :id="'#'+item.id" style="color: green;text-decoration: none">{{item.title}}</router-link></li>
           
             <ul>
              <li v-for="item1 in item.child" style="font-size:14px;padding-left: 25px;box-sizing: border-box;margin-bottom: 10px"><router-link :to="'#'+item1.id" :id="'#'+item1.id" style="color: blue;text-decoration: none">{{item1.title}}</router-link></li>
             </ul> 
           </div>
           
           
         </ul>
      </div>
    `,
    data(){
        return {
            menu:[

            ]
        }
    },
    computed:{
        data(){
            var arr=[];
            for(var i in this.menu){
                if(this.menu[i].pid==0){
                    var obj=this.menu[i];
                    arr.push(obj);
                }else{
                    for(var j in arr){
                        if(this.menu[i].pid==arr[j].id){
                            if(arr[j].child){
                                arr[j].child.push(this.menu[i])
                            }else{
                                arr[j].child=[];
                                arr[j].child.push(this.menu[i])

                            }
                        }
                    }
                }
            }
            console.log(arr);
            return arr;
        }
    },
    created(){
        fetch("./demo.txt").then(function(e){
            return e.json()
        }).then((e)=>{
            this.menu=e;
        })
    },
    watch:{
        $route(){
            var num = this.$route.hash.slice(1);
            console.log(num)
            var pos = document.querySelector("#a"+num).offsetTop;
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({ number:document.querySelector('.right').scrollTop})
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({number:pos}, 500)
                .onUpdate(function () {
                    document.querySelector('.right').scrollTop= this.number.toFixed(0)
                })
                .start()
            animate()
        }
    }
})

var right1 = Vue.component("right1",{
    template:`
      <div class="markdown-body">
      <div v-html="data" style="padding-left: 20px;box-sizing: border-box" class="right1"></div>
      </div>
    `,
    data(){
        return {
            data:""
        }
    },
    mounted(){
        fetch("./doc.txt").then(function(e){
            return e.text()
        }).then((e)=>{
            this.data=e
        })
    }
})
var quicklys = Vue.component("quicklys",{
    template:`
    <div>
    这里是快速入门
    这里是快速入门
    这里是快速入门
    这里是快速入门
    这里是快速入门
    这里是快速入门
    这里是快速入门
    </div>
    `
})