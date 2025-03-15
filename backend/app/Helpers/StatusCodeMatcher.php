<?php

namespace App\Helpers;

class StatusCodeMatcher
{
    public static function getStatusCode(string $status): int
    {
        switch ($status) {
            case 'success':
                return 200;
            case 'created':
                return 201;
            case 'bad request':
                return 400;
            case 'unauthorized':
                return 401;
            case 'forbidden':
                return 403;
            case 'not found':
                return 404;
            case 'validation error':
                return 422;
            case 'error':
                return 500;
            default:
                return 200;
        }
    }
}
