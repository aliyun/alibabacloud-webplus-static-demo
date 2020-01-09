import {Item, ItemList, ItemQuery, ItemUpdate, emptyItemQuery} from './item';
import axios from "axios";

export default class Store {
	constructor(name, callback) {
		this._baseUrl = '/todolist/api';

		if (callback) {
			callback();
		}
	}

	find(query, callback) {
		if ('id' in query) {
			this._findById(query.id, callback);
		} else if ('completed' in query) {
			this._findByStatus(query.completed, callback);
		} else {
			this._findAll(callback);
		}
	}

	_findById(id, callback) {
		axios.get(`${this._baseUrl}/${id}`).then((response) => {
			if (callback) {
				callback([response.data]);
			}
		});
	}

	_findByStatus(status, callback) {
		axios.get(`${this._baseUrl}?completed=${status}`).then((response) => {
			if (callback) {
				callback(response.data);
			}
		});
	}

	_findAll(callback) {
		axios.get(this._baseUrl).then((response) => {
			if (callback) {
				callback(response.data);
			}
		});
	}

	insert(item, callback) {
		axios.post(`${this._baseUrl}`, JSON.stringify(item), {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		}).then((response) => {
			if (callback) {
				callback();
			}
		});
	}

	update(item, callback) {
		axios.put(`${this._baseUrl}/${item.id}`, JSON.stringify(item), {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		}).then((response) => {
			if (callback) {
				callback();
			}
		})
	}

	remove(query, callback) {
		if ('id' in query) {
			this._removeById(query.id, callback);
		} else if ('completed' in query) {
			this._removeByStatus(query.completed, callback);
		}
	}

	_removeById(id, callback) {
		axios.delete(`${this._baseUrl}/${id}`).then((response) => {
			if (callback) {
				callback(true);
			}
		})
	}

	_removeByStatus(status, callback) {
		axios.delete(`${this._baseUrl}?completed=${status}`).then((response) => {
			if (callback) {
				callback(true);
			}
		})
	}

	count(callback) {
		axios.get(`${this._baseUrl}/count`).then((response) => {
			if (callback) {
				let total = response.data.total;
				let completed = response.data.completed;
				callback(total, total - completed, completed);
			}
		})
	}
}
