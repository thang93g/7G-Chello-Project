<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    //

    public function commentOnTask(Request $request)
    {
        $comment = new Comment();
        $comment->content = $request->comment;
        $comment->user_id = $request->user_id;
        $comment->task_id = $request->task_id;
        $comment->save();
        return response()->json("Bình luận thành công");
    }

    public function getUserComment($task_id) {
        
        $userComment = DB::table('comments')
            ->join('users', 'comments.user_id', '=', 'users.id')
            ->join('tasks', 'comments.task_id', '=', 'tasks.id')
            ->where('comments.task_id', '=', $task_id)
            ->orderByRaw('comments.id DESC')
            ->get();
        $userCommentExist = DB::table('comments')
            ->join('users', 'comments.user_id', '=', 'users.id')
            ->join('tasks', 'comments.task_id', '=', 'tasks.id')
            ->where('comments.task_id', '=', $task_id)
            ->exists();
        if ($userCommentExist) {
        return response()->json($userComment);
        }
        return response()->json(['error' => 'Không có bình luận nào'], 500);
    }
}
