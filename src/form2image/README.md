## form2image

### install
```bash
npm install form2image --save
```

### usage
```javascript
const form2image = require('form2image'); 

interface Reply {
	name: string; // 名字
	content: string; // 回复内容
}

function form2image(form: {
	avatar: string; // 头像 图片
	nickName: string; // 昵称
	desc: string; // 描述
	images: string[]; // 上传的图片数组 图片
	uploadTime: string; // 发朋友圈时间
	starNames: string[]; // 点赞的人名
	replyInfos: Reply[]; // 回复数组
}, type: number):Promise<imageUrl>;
```
