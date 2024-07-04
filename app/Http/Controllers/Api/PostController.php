<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('category')
            ->when(request('search_category'), function ($query){
                $query->where('category_id', request('search_category'));
            })
            ->when(request('search_id'), function ($query){
                $query->where('id', request('search_id'));
            })
            ->when(request('search_title'), function ($query){
                $query->where('title', 'like','%'.request('search_title').'%');
            })
            ->when(request('search_content'), function ($query){
                $query->where('content','like','%'. request('search_content').'%');
            })
            ->when(request('search_global'), function ($query){
                $query->where(function ($q){
                    $q->orWhere('id', request('search_global'))
                        ->orWhere('category_id', request('search_category'))
                        ->orWhere('title', 'like','%'.request('search_global').'%')
                        ->orWhere('content','like','%'. request('search_global').'%');
                });
            })
            ->paginate(10);
        return PostResource::collection($posts);
    }

    public function store(StorePostRequest $request)
    {
        $this->authorize('posts.create');
        if ($request->hasFile('thumbnail')) {
            $fileName = $request->file('thumbnail')->getClientOriginalName();
            info($fileName);
        }
        $post = Post::create($request->validated());
        return new PostResource($post);
    }

    public function show(Post $post)
    {
        $user = auth()->user();
        $hasPermission = $user->roles()->whereHas('permissions', function ($q) {
            $q->where('name', 'posts.update');
        })->exists();

        $this->authorize('posts.update');
        return new PostResource($post);
    }

    public function update(Post $post, StorePostRequest $request)
    {
        $this->authorize('posts.update');
        $post->update($request->validated());
        return new PostResource($post);
    }

    public function destroy(Post $post)
    {
        $this->authorize('posts.delete');
        $post->delete();

        return response()->noContent();
    }
}
