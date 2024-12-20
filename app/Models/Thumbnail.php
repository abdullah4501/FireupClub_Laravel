<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Thumbnail extends Model
{
    use HasFactory;

    protected $fillable = ['file_path', 'post_id'];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
