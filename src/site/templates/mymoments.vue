<style scoped>
    .row{
        padding: 5px;
    }
</style>
<template>
    <div class="row">
        <span>头像</span>
         <input type="file" accept="image/*" v-on:change="avatarChange">
    </div>
    <div class="row">
        <span>昵称</span>
        <input type="text" v-model="nickName">
    </div>
    <div class="row">
        <span>内容</span>
        <input type="text" v-model="desc">
    </div>
    <div class="row">
        <span>附件图片</span>
        <input type="file" name="images" accept="image/*">
    </div>
    <div class="row">
        <span>发布时间</span>
        <input type="text" v-model="uploadTime">
    </div>
    <div class="row">
        <input type="button" value="添加点赞人员" v-on:click="addStarName">
    </div>
    <div class="row" v-for="starName in starNames">
        <span>点赞人员</span>
        <input type="text" v-model="starN">
    </div>
    <div class="row">
        <span>聊天内容</span>
    </div>
    <div class="row" v-for="replyInfo in replyInfos">
        <input type="text" v-model="replyInfo.name" data-auto="false">
        <input type="text" v-model="replyInfo.content" data-auto="false">
    </div>
    <div class="row">
        <input type="button" name="submit" value="生成图片">
    </div>
</template>

<script>


    let canvas2base64 = {
        canvas: document.createElement('canvas'),
        init: function () {
            this.ctx = this.canvas.getContext('2d');
            return this;
        },
        do: function (img, width, height) {
            this.canvas.width = width || img.width;
            this.canvas.height = height || img.height;
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            return this.canvas.toDataURL();
        }
    };

    let getbase64 = canvas2base64.init().do;
    let imageWidth = 50;
    let imageHeight = 50;

    module.exports = {
        data: function () {
            return (localStorage.happy_formData && JSON.parse(localStorage.happy_formData)) || {
                avatar: '', // 头像 图片
                nickName: '', // 昵称
                desc: '', // 描述
                images: [], // 上传的图片数组 图片
                uploadTime: '', // 发朋友圈时间
                starNames: [''], // 点赞的人名
                replyInfos: [{
                    name: '',
                    content: ''
                }] // 回复数组
            };
        },
        methods: {
            avatarChange: function (e) {
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.onload = (function(theFile, self){
                    return function(e){
                        let img = document.createElement('img');
                        img.src = e.target.result;
                        self.avatar = getbase64(img, imageWidth, imageHeight);
                    }
                })(file, this);
            },
            addStarName: function () {
                this.starNames.push('');
            }
        }
    };
</script>
