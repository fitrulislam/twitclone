import { observable } from 'mobx';
import axios from 'axios';
import twitStore from './twits';

class User {
	@observable user = {};
	@observable users = [];
	@observable loadingStatus = false;
	@observable loginStatus = false;
	@observable errorStatus = false;

	onLoad() {
		this.loadingStatus = true;
	};

	onLoadSuccess() {
		this.loadingStatus = false;
	};

	onSuccess() {
		this.loginStatus = true;
	};

	onLogOut() {
		this.loginStatus = false;
	};

	onError() {
		this.errorStatus = true;
		this.loadingStatus = false;
	}

	fetchDataOnSuccess(user) {
		this.user = user;
	};

	fetchDataUser(token) {
		axios.get('http://192.168.0.19:4000/user/oneuser', {
			headers: {
				token: token
			}
		})
			.then(response => {
				this.user = response.data.user;
				twitStore.readOwnTwits(this.user._id);
			})
			.catch(err => {

			})
	};

	updateFollow(id) {
		this.user.following.push(id);
	};

	updateUnfollow(id) {
		let newArray = this.user.following.filter(followerId => followerId !== id);
		this.user.following = newArray;
	};
};

export default new User();