<?php

use App\Events\MessagePosted;
use Illuminate\Support\Facades\Auth;
use App\Events\MessageDeleted;
use App\Room;
use App\Message;
use App\User;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function(){
    $rooms = Room::all();
    return view('welcome', ['rooms' => $rooms]);
});

Route::get('/chatroom/{room_name}', function($room_name){
    $rooms = Room::all();
    $current_room = Room::where('name', '=', $room_name)->first();
    if (!$current_room) {
        if (Auth::user()->id === 1) {
            $new_room = Room::create(['name' => $room_name]);
            return view('chat', ['rooms' => $rooms, 'new_room'=> $new_room]);
        } else {
           return redirect('/');
        }
    }
    return view('chat', ['rooms' => $rooms, 'current_room' => $current_room]);
})->middleware('auth');


Route::get('/messages/{room_id}', function($room_id){
    return Message::with('user')->where('room_id', '=', $room_id)->get();
})->middleware('auth');

Route::post('/messages/{room_id}', function($room_id){
    // Store the new message
    $mess = new Message();
    $mess->message = request()->get('mess');
    $user_id = intval(request()->get('userId'));
    $mess->user_id = $user_id;
    $user = User::find($user_id);
    $mess->room_id = $room_id;
    $mess->save();
    // Announce that a new message has been posted
    broadcast(new MessagePosted($mess, $user))->toOthers();
    return ['status' => 'OK'];
})->middleware('auth');

Route::post('/delmessage/{message_id}', function ($message_id) {
    $deleteUserId = intval(request()->get('deleteUserId'));
    $mess = Message::find(intval($message_id));
    $userId = $mess->user_id;
   
    if(($deleteUserId == 1) || ($deleteUserId == $userId)) {
        broadcast(new MessageDeleted($mess));
        $mess->delete();
        return ['status' => true, 'messId' => intval($message_id)];
    }
    return ['status' => false];
    })->middleware('auth');

Auth::routes();

Route::get('/home', 'HomeController@index');
