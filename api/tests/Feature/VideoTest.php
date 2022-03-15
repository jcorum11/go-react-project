<?php

namespace Tests\Feature;

use App\Models\Video;
use Tests\TestCase;

class VideoTest extends TestCase
{
    public function test_create()
    {
        $video = new Video(['path' => 'storage/myvideo.mp4']);
        $result = $video->save();
        $this->assertTrue($result);
    }
}
