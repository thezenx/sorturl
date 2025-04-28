<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Table_url;
use Carbon\Carbon;
use Illuminate\Support\Str;


class tableUrlController extends Controller
{

    public function getUrls()
    {

        $urls = Table_url::whereNull('delete_at')
            ->get();

        return response()->json([
            'urls' => $urls,
        ]);
    }

    public function updateUrl(Request $request, $id)
    {

        $url = Table_url::where('id_url', $id)->first();
        if (!$url) {
            return response()->json([
                'message' => 'URL not found'
            ], 404);
        }
        $url->delete_at = Carbon::now();
        $url->save();

        return response()->json([
            'message' => 'URL updated successfully',
            'url' => $url,
        ]);
    }

    public function shorten(Request $request)
    {
        $validated = $request->validate([
            'long_url' => 'required|url',
        ]);

        // สร้าง short code โดยใช้ Str::random
        $shortCode = Str::random(6);

        
        $url = Table_url::create([
            'original_url' => $validated['long_url'],
            'short_code' => $shortCode,
        ]);


        return response()->json(['short_url' => url("/$shortCode")]);
    }

    public function redirectToUrl($shortCode)
    {
        // ค้นหา short code ที่ตรงกับในฐานข้อมูล
        $url = Table_url::where('short_code', $shortCode)->first();


        if (!$url) {
            return response()->json(['message' => 'Short URL not found'], 404);
        }


        return redirect()->to($url->original_url);
    }
}
