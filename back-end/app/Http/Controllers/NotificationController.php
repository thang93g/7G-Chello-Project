<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotificationController extends Controller
{
    public function index($user_id){
        $notifications = DB::table('notifications')
        ->join('tasks', 'notifications.task_id', '=', 'tasks.id')
        ->join('columns', 'tasks.column_id', '=', 'columns.id')
        ->join('boards', 'columns.board_id', '=', 'boards.id')
        ->join('groups', 'boards.group_id', '=', 'groups.id')
        ->join('group_user', 'group_user.group_id', '=', 'groups.id')
        ->join('users', 'notifications.user_id', '=', 'users.id')
        ->select('notifications.task_id',
        'users.name as user_name',
        'notifications.content',
        'groups.name AS group',
        'boards.name AS board',
        'columns.name AS column',
        'tasks.title AS task',
        'users.image AS image',
        )
        ->where('group_user.user_id','=',$user_id)
        ->orderByRaw('notifications.id DESC')
        ->limit(10)
        ->get();

        return response()->json($notifications);
    }

    public function store(Request $request){
        $notification = new Notification();
        $notification->fill($request->all());
        $notification->save();
        return response()->json($notification);
    }
}
