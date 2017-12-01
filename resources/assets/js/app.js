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
            var room_id = $('#room_id').text();
            // Add to existing messages
            this.messages.push(message);
            alert(message.user.name);
            // Persist to the database etc
            axios.post('/messages/' + room_id, {
                mess: message.message,
                userId: message.user.id,
                username: message.user.name
            })
            .then(response => {
                // Do whatever;
            });
        }
    },
    created() {
        var room_id = parseInt($('#room_id').text());
        axios.get('/messages/' + room_id).then(response => {
            console.log(this.messages);
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
            this.usersInRoom = this.usersInRoom.filter(u => u != user)
        })
        .listen('MessagePosted', (e) => {
            this.messages.push({
                message: e.message.message,
                user: e.user
            });
        });
    }
});
