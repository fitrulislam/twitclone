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
		console.log('ambil data')
		axios.get('http://user-tuitclone.roarized.com/user/oneuser', {
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