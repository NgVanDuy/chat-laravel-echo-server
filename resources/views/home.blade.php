@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading content">
                    <div class="links">
                        @if(isset($rooms))
                            @foreach($rooms as $room)
                                <a href="/chatroom/{{$room->name}}">{{$room->name}}</a>
                            @endforeach
                        @endif
                    </div>
                </div>
                <div class="panel-body">
                    You are logged in!
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
