<?php

namespace App\Http\Controllers;

use App\Events\MessageEvent;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function newMessage(Request $request){
        $data = $request->json()->all();
        if($data['user'] === 'client' || $data['user'] === 'operator'){
            $message = new Message;
            $message->text = $data['text'];
            $message->user = $data['user'];
            $message->save();

            broadcast(new MessageEvent(Message::all()->toArray()));

            return response()->json([
                'access' => true,
                'message' => $message
            ]);
        }else{
            return response()->json([
               'access' => false,
               'text' => 'User is not identified'
            ]);
        }
    }

    public function getAllMessage(){
        return response()->json([
            'access' => true,
            'messages' => Message::all()
        ]);
    }

    public function clearAllMessage(Request $request){
        if($request->input('user') === 'operator') {
            Message::query()->truncate();
            return response()->json([
                'access' => true
            ]);
        }else{
            return response()->json([
                'access' => false,
                'text' => 'Insufficient rights'
            ]);
        }
    }

    public function getUsers(){
        return response()->json([
            'users' => [
                [
                    'type' => 'client',
                    'name' => 'Клиент'
                ],
                [
                    'type' => 'operator',
                    'name' => 'Оператор'
                ]
            ]
        ]);
    }
}
