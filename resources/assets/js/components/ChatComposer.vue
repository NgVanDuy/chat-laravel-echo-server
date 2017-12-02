<template lang="html">
  <div class="chat-composer" id="input-mess">
      <input id="message" type="text" placeholder="Start typing your message..." v-model="messageText" @keyup.enter="sendMessage">
      <button class="btn btn-primary" @click="sendMessage">Send</button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            messageText: ''
        }
    },
    methods: {
        sendMessage() {
            this.$emit('messagesent', {
                message: this.messageText,
                user: {
                    name: $('#user_name').text(),
                    id: parseInt($('#user_id').text())
                }
            });
            this.messageText = '';
        }
    }
}
</script>

<style lang="css">
.chat-composer {
    display: flex;
}

#input-mess {
    /*position: fixed;*/
    /*display:flex;*/
    bottom: 10px;
}

.chat-composer input {
    flex: 1 auto;
    padding: .5rem 1rem;
    /*position: fixed;*/
    /*bottom: 10px;   */
}

.chat-composer button {
    border-radius: 0;
}
</style>
