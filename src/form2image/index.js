import staticImages from './images';
import html2canvas from 'html2canvas';

export default {
	form2image({ avatar, nickName, desc, images, uploadTime, starNames, replyInfos }) {
		const resultOptions = {
			avatar,
			nickName,
			desc,
			images,
			uploadTime,
			starNames,
			replyInfos,
		};
		const resultHtml = this.getHtml(resultOptions);
		const container = document.createElement('div');
		document.body.appendChild(container);
		container.innerHTML = resultHtml;

		return new Promise((resolve, reject) => {
			html2canvas(document.getElementById('wrapper')).then(canvas => {
				try {
					const imageUrl = canvas.toDataURL();
					resolve(canvas.toDataURL());
				} catch (e) {
					reject(e);
				}
				document.removeChild(container);
			});
		});
	},
	getHtml({ avatar, nickName, desc, images, uploadTime, starNames, replyInfos }) {
		return `
			<div id="wrapper" style="padding-bottom: 10px; background: #fff; width: 1242px; font-family: Heiti SC; line-height: 1.5; position: fixed;">
				<img src="${staticImages.iphone6s}" alt="手机头部" width="1242" />
				<div style="width: 1242px; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 45px;">
					<div class="avatar" style="padding-left: 50px; padding-right: 35px; float: left;">
						<div>
							<img src="${avatar}" alt="头像" />
						</div>
					</div>
				<div style="padding-right: 60px; font-size: 46px; overflow: hidden;">
					<div style="color: #576B94;">${nickName}</div>
					<div>${desc}</div>
					<div style="margin-top: 35px;">
						${images.map(image => `<img src="${image}" alt="主内容部分图片" />`)}
					</div>
				</div>
				<div style="font-size: 35px; color: #999; margin-top: 17px; padding-left: 5px;">
					<div style="float: right;">
						<img src="${staticImages.heartIcon}" alt="心icon" />
					</div>
					<div>${uploadTime}</div>
				</div>
				<div class="triangle" style="
					width: 0;
					height: 0;
					border: 18px solid transparent;
					border-bottom-color: #f3f3f5; 
					margin-left: 30px;
				"></div>
				<div class="response-panel" style="background: #f3f3f5;">
					<div class="stars" style="padding: 10px 30px; border-bottom: 1px solid #ddd;">
						<span class="icon-star">
							<img src="${staticImages.messageIcon}" alt="回复框icon" />
						</span>
						<span class="star-names">
							${starNames.map((starName, index) => `
								<span style="color: #576B94;">${starName}</span>
								${index === starNames.length - 1 ? '' : ','}
							`)}
						</span>
					</div>
					<div class="items" style="margin-top: 17px; padding: 0 30px; padding-bottom: 15px;">
						${replyInfos.map(replayInfo => `
							<div class="item" style="margin-top: 10px;">
								<div>
									<span class="name" style="color: #576B94;">${replayInfo.name}</span>:
									<span class="content">${replayInfo.content}</span>
								</div>
							</div>
						`)}
					</div>
				</div>
			</div>
		`;
	},
}
