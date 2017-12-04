@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading" id="room_name" style="width: 100%;">
                        @if(isset($rooms))
                            @foreach($rooms as $room)
                            <a href="/chatroom/{{$room->name}}">{{$room->name}}</a>
                            @endforeach
                        @endif
                    </div>
                    <div class="panel-heading" id="room_name">
                        <span id="room_id" style="display:none;">{{$current_room->id}}</span>
                        {{$current_room->name}}
                        <span class="badge pull-right">@{{ usersInRoom.length }}</span>
                    </div>

                    <chat-log :messages="messages" v-on:messagedeleted="delMessage"></chat-log>
                    <chat-composer v-on:messagesent="addMessage"></chat-composer>
                </div>
            </div>
        </div>
    </div>
@endsection
