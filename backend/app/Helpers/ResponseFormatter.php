<?php

namespace App\Helpers;

class ResponseFormatter
{
    public static function format(string $status, string $message, $result = null): array
    {
        return compact('status', 'message', 'result');
    }
}