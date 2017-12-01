<template lang="html">
  <div class="chat-message" v-bind:id= message.id>
    <p>{{ message.message }}</p>
    <small>{{ message.user.name}}</small>
    <button @click="deleteMessage" class="close" aria-label="Close">
     <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
    props: ['message'],
    methods: {
        deleteMessage() {
            this.$parent.$emit('messagedeleted', {
                id: parseInt(this.$el.id)
            });
        }
    }
}
</script>

<style lang="css">
.chat-message {
    padding: 1rem;
}

.chat-message > p {
    margin-bottom: .5rem;
}
</style>
