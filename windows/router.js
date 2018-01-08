var router = new VueRouter({
    routes:[
        {
            path:'/',
            component:mains,
            children:[
                {
                    path:'',
                    components:{
                        lefts:left1,
                        rights:right1,
                    },
                }


            ]
        },
        {
            path:'/quickly',
            component:quicklys,
        }

    ]
})