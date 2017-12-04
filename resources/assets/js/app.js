/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example', require('./components/Example.vue'));
Vue.component('chat-message', require('./components/ChatMessage.vue'));
Vue.component('chat-log', require('./components/ChatLog.vue'));
Vue.component('chat-composer', require('./components/ChatComposer.vue'));

const app = new Vue({
    el: '#app',
    data: {
        messages: [],
        usersInRoom: []
    },
    methods: {
        addMessage(message) {
            var room_id = parseInt($('#room_id').text());
            this.messages.push(message);
            axios.post('/messages/' + room_id, {
                mess: message.message,
                userId: message.user.id,
                username: message.user.name
            })
            .then(response => {
                var t = $('#chat-log');
                t.animate({ scrollTop: t.prop('scrollHeight') + (t.scrollTop() + t.height()) }, "slow");
            });
        },
        delMessage(message) {
            var deleteUserId = parseInt($('#user_id').text());
            axios.post('/delmessage/' + message.id, {
                deleteUserId: deleteUserId
            }).then(response => {
                if (!response.data.status) {
                    alert('ai cho xóa');
                } else {
                    console.log(response.data);
                }
            });
        }
    },
    created() {
        var room_id = parseInt($('#room_id').text());
        axios.get('/messages/' + room_id).then(response => {
            this.messages = response.data;
        });
        Echo.join("chatroom_" + room_id)
        .here((users) => {
            this.usersInRoom = users;
        })
        .joining((user) => {
            this.usersInRoom.push(user);
        })
        .leaving((user) => {
            // this.usersInRoom = this.usersInRoom.filter(u => u != user)
            this.usersInRoom.$remove(user);
            var room_id = $('#room_id').text();
            axios.get('/messages/' + room_id).then(response => {
                this.messages = response.data;
            });
        })
        .listen('MessagePosted', (e) => {
            this.messages.push({
                message: e.message.message,
                user: e.user
            });
        })
        .listen('MessageDeleted', (mess) => {
            // for (let i = 0; i < this.messages.length; i++) {
            //     if (this.messages[i].id == mess.id) {
            //         this.messages.remove(i);
            //         break;
            //     }
            // }
            var room_id = $('#room_id').text();
            axios.get('/messages/' + room_id).then(response => {
                this.messages = response.data;
                // console.log(this.messages);
            });
        })
    }
});
