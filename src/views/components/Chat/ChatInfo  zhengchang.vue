<template>
    <transition
      appear
      name="animate__animated animate__bounce"
      enter-active-class="animate__backInUp"
      leave-active-class="animate__backOutDown"
    >
      <div ref="box" class="main">
        <header>
          <button @click="zxl" class="iconfont icon-xingzhuanggongnengtubiao-"></button>
          <span class="three">{{ $route.query.data.answername }}</span>
        </header>
        <div  class="chatlist" id="chatlist" v-for="(item,index) in chatlist" :key="index"> 
            <div v-if="item.senderid==userinfo.id" class="right"> 
            <div class="tupian"><img :src="userinfo.avatar" alt=""></div> <div class="wenzi">{{ item.content }}
            <div class="timer">{{ item.sendtime }}</div>
            </div>
         </div>
       <div v-else class="left"> 
        <div class="tupian"><img :src="avatar" alt="">
        </div> <div class="wenzi">{{ item.content }}<div class="timer">{{ item.sendtime }}</div></div>
        
         </div>
        </div>
        <footer><input type="text" v-model="content" placeholder="按Enter或点击按钮发送信息😊😊" @keydown.enter="send"><button @click="send">发送</button></footer>
      </div>
    </transition>
  </template>
  <script>
  import "animate.css";
  import { mapState } from "vuex";
  import moment from "moment";
  export default {
    name: "chatlist",
    data() {
      return {
            chatlist: [],
          content: '',
          avatar: '',
      };
    },
    computed: {
    ...mapState("loginModule", ["userinfo"]),
      },
    mounted() {
      // console.log(document.documentElement.scrollTop, document.body.scrollTop);
        this.avatar = this.$route.query.data.avatar
      // console.log(this.$route.query.data,'this.$route.query.datahhh');
        this.setchathave()
        this.add()
  },
  beforeUpdate(){
            var div = this.$refs.box;
               console.log(`我被更新Dom之前,更新前的div.scrollHeight是${div.scrollHeight}`)
           },
           updated(){
            var div = this.$refs.box;
               console.log(`我被更新了Dom,更新后的div.scrollHeight是${div.scrollHeight}`)
           },
    methods: {
      zxl() {
        this.$router.go(-1)
        console.log('555');
      },
        add() {
          var div = this.$refs.box;
          setTimeout(() => {
            console.log(`点击了添加按钮,此时的div.scrollHeight是${div.scrollHeight}`)
          div.scrollTop = div.scrollHeight;
          },500);
      },
      //把未读信息改为已读
        setchathave() {
        this.$api.SetChatHave({
          senderid:this.$route.query.data.answerid,
          answerid:this.userinfo.id
        })
      },
          
        send() {
              if (this.content == '')
          { this.$message({
          message: '输入不能为空',
          type: 'warning'
            });
            }
                else {
                    let chat = {
                        senderid:this.userinfo.id,
                        answerid:this.$route.query.data.answerid,
                        sendtime: moment().format("YYYY-MM-DD HH:mm:ss"),
                        content: this.content,
                        status:0
                    }
                    this.$api.SendChat(chat).then(res => {
                          if (res.data.status === 200) {
                            this.content=''
                                this.http()

                                this.add()
      
                              
                        }
                    })
            
        }
      },
      // 获取聊天列表
      http() {
        // console.log("收到了", page);
        this.$api
          .GetChat({
                senderid: this.userinfo.id,
             answerid:this.$route.query.data.answerid
          })
          .then((res) => {
                if (res.data.status === 200) {
                console.log('聊天列表',res.data.data)
              res.data.data.forEach((data) => {
                data.sendtime = moment(data.sendtime).format(
                  "YYYY-MM-DD HH:mm:ss"
                );
              });
              this.chatlist = res.data.data;
            }
          });
      },
    },
    created() {
      this.http();
    },
  };
  </script>
  
  <style lang="less" scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .icon-xingzhuanggongnengtubiao-{
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #999;
    border: #999;
    z-index: 100;
    position: absolute;
    top:0;
    left: 5px;
    cursor: pointer;

  }
  .icon-tupian{
    display: inline-block;
    position: absolute;
    top:0;
    cursor: pointer;
    left: 60px;
  }
  header{
    background-color: #999;
    text-align:center;
    width: 600px;
    margin-left: -20px;
    position: fixed;
    top: 50px;
    z-index: 50;
  }
  footer{
    width: 600px;
    margin-left: -20px;
    position: fixed;
    bottom: 15px;
    z-index: 50;
    button{
        height: 40px;
        width: 60px;
        position: absolute;
        right: 0;
    }
    input{
        width: 520px;
       height: 40px;
    }
  }
  .main {
    overflow: auto;
    box-sizing: border-box;
    position: relative;
    font-size: 16px;
    padding-top: 10px;
    padding-left: 20px;
    // padding-bottom: 10px;
    width: 600px;
    min-height: 500px;
    background-color: aliceblue;
    // background-color: aqua;
    // height: auto;
    height: 100%;
    margin: 50px auto;
    // background-color: rgba(0, 0, 0, 0.5);
    // background-color: #999999;
  }
  .left{
    background-color: red;
   
        .tupian{
            margin-left: 10px;
            // border-bottom: 1px solid #999;
        }
        .wenzi{
            color: #333;
            position: absolute;
            top: 20px;
            left: 70px;
        }
  }
  .right{
    background-color: blue;

    .wenzi{
            color: #333;
            // position: absolute;
            // top: 20px;
            // left: 400px;
            margin-right: 65px;
            margin-top: 20px;
            text-align: right;
        }
        .tupian{
            // margin-left: 10px;
            position: absolute;
            right: 5px;
            // border-bottom: 1px solid #999;
        }
  }
  .chatlist {
    width: 100%;
    // height: auto;
    // overflow: auto;

    .left ,.right{
        background-color: aliceblue;
        position: relative;
        width: 100%;
        height: 60px;
        padding-top: 10px;
        .timer{
            color: #999;
            font-size: 10px;
        }
        .tupian{
            margin-left: 10px;
            // border-bottom: 1px solid #999;
        }
      
    }
    img{
        width: 50px;
        height: 50px;
    }
  }
  .pagination-wrapper {
    width: 95%;
    background-color: #fff;
  }
 
  </style>