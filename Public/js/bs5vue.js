//vue 2.0

// var myObject=new Vue({
//     el: "#portfolio",
//     data: {Portfolio: []}
//     })
//     $.ajax({
//         url:"/portfolio",
//         method: "get",
//         dataType: "json",
//         success: function(data){
//             myObject.Portfolio = data;
//         }
//     })

//     var vueService = new Vue({
//         el: "#services",
//         data: {Services:[
//            {icon:'fa-shopping-cart', title:'E-Commerce', text:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur porro laborum fuga repellat necessitatibus corporis nulla, in ex velit recusandae obcaecati maiores, doloremque quisquam similique, tempora aspernatur eligendi delectus! Rem.'},
//            {icon:'fa-laptop', title:'Responsive Design', text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.'},
//            {icon:'fa-lock', title:'Web Security', text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.'}
//         ]}
//     })
const { createApp, ref } = Vue;

var serviceApp=createApp({
    data(){
        return{
            Services: []
        }
    }
}).mount("#services");

//req services data fromm server
$.ajax({
    url:"/services",
    method:"get",
    dataType:"json",
    success: (result)=>{
        serviceApp.Services = result;
    }
})



createApp({
    setup(){
        return{
            Portfolio: ref()
        }
    }
}).mount("#portfolio");