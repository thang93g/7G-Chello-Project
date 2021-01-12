<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

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
}
