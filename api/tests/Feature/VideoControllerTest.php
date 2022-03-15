<?php

namespace Tests\Feature;

use App\Models\Video;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Mockery;
use Tests\TestCase;

class VideoControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_get_videos_with_empty_db ()
    {
        $response = $this->get('/api/videos');
        $response
            ->assertStatus(200)
            ->assertJsonPath('data', []);
    }

    public function test_add_video ()
    {
        Storage::fake('public');
        $mp4 = UploadedFile::fake()->create('my-video.mp4', 1356, 'video/mp4');
        $response = $this->post('/api/videos', [
            'video' => $mp4
        ]);

        /** @var Video $video */
        $video = $response->baseResponse->original;

        $response->assertStatus(201);
        $response->assertJsonStructure([
            'data' => [
                'id', 'path'
            ]
        ]);
        $this->assertNotNull($video);
        Storage::assertExists($video->path);
        Mockery::close();
    }

    public function test_get_videos ()
    {
        Video::factory()->count(3)->create();
        $response = $this->get('/api/videos');
        $response
            ->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_get_single_video ()
    {
        $video = Video::factory()->create();
        $response = $this->get("/api/videos/{$video->getKey()}");
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'id', 'path'
                ]
            ]);
    }
}
